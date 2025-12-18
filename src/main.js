const { app, BrowserWindow, shell, ipcMain, globalShortcut, clipboard, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { autoUpdater } = require('electron-updater');

// Keep a global reference of the window object
let mainWindow;

// Track registered global shortcuts
const registeredShortcuts = new Map();

function createWindow() {
  // Create the browser window with secure configuration
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    x: 500,
    y: 280,
    webPreferences: {
      // Security: Disable Node.js integration in renderer process
      nodeIntegration: false,
      // Security: Enable context isolation for better security
      contextIsolation: true,
      // Use preload script to expose only specific APIs
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../icon.icns'),
    title: 'Islāmic Text Copier',
    backgroundColor: '#1b1c27',
    titleBarStyle: 'default'
  });

  // Load the React app
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    // In development, load from the built files in dist folder
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Emitted when the window is closed
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();
  
  // Configure auto-updater
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  
  // Check for updates after app is ready
  autoUpdater.checkForUpdates().catch(err => {
    console.log('Auto-update check failed:', err.message);
  });
});

// Send update status to renderer
function sendUpdateStatus(status, info = {}) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('update-status', { status, ...info });
  }
}

// Auto-updater events
autoUpdater.on('checking-for-update', () => {
  sendUpdateStatus('checking');
});

autoUpdater.on('update-available', (info) => {
  sendUpdateStatus('available', { version: info.version });
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Update Available',
    message: `A new version (${info.version}) is available. Would you like to download it now?`,
    buttons: ['Download', 'Later'],
    defaultId: 0,
    cancelId: 1
  }).then(result => {
    if (result.response === 0) {
      autoUpdater.downloadUpdate();
    }
  });
});

autoUpdater.on('update-not-available', () => {
  sendUpdateStatus('not-available');
});

autoUpdater.on('error', (err) => {
  sendUpdateStatus('error', { error: err.message });
});

autoUpdater.on('download-progress', (progressObj) => {
  sendUpdateStatus('downloading', { percent: progressObj.percent });
});

autoUpdater.on('update-downloaded', (info) => {
  sendUpdateStatus('downloaded', { version: info.version });
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Update Ready',
    message: `Version ${info.version} has been downloaded. Restart now to install?`,
    buttons: ['Restart', 'Later'],
    defaultId: 0,
    cancelId: 1
  }).then(result => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

// IPC Handlers - Secure communication between main and renderer processes

/**
 * Handle request to open external URL in default browser
 */
ipcMain.handle('open-external', async (event, url) => {
  try {
    await shell.openExternal(url);
  } catch (error) {
    console.error('Failed to open external URL:', error);
    throw error;
  }
});

/**
 * Handle request to open file path with default application
 */
ipcMain.handle('open-path', async (event, filePath) => {
  try {
    // Resolve path relative to app resources
    const resourcePath = app.isPackaged
      ? path.join(process.resourcesPath, filePath)
      : path.join(__dirname, '..', filePath);

    const result = await shell.openPath(resourcePath);
    return result; // Returns error string if failed, empty string if successful
  } catch (error) {
    console.error('Failed to open path:', error);
    return error.message;
  }
});

/**
 * Handle request to get application version
 */
ipcMain.handle('get-version', async () => {
  return app.getVersion(); // Returns version from package.json
});

/**
 * Settings persistence (stored in userData)
 */
function getSettingsFilePath() {
  return path.join(app.getPath('userData'), 'settings.json');
}

ipcMain.handle('get-settings', async () => {
  const settingsPath = getSettingsFilePath();
  try {
    const raw = await fs.promises.readFile(settingsPath, 'utf8');
    return { success: true, settings: JSON.parse(raw) };
  } catch (error) {
    if (error && (error.code === 'ENOENT' || error.code === 'ENOTDIR')) {
      return { success: true, settings: null };
    }
    console.error('Failed to read settings:', error);
    return { success: false, error: error.message, settings: null };
  }
});

ipcMain.handle('set-settings', async (event, settings) => {
  const settingsPath = getSettingsFilePath();
  try {
    await fs.promises.writeFile(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Failed to write settings:', error);
    return { success: false, error: error.message };
  }
});

/**
 * Convert a key code to an Electron accelerator string
 */
function keyCodeToAccelerator(keyCode) {
  const keyMap = {
    'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4', 'Digit5': '5',
    'Digit6': '6', 'Digit7': '7', 'Digit8': '8', 'Digit9': '9', 'Digit0': '0',
    'Minus': '-', 'Equal': '=', 'BracketLeft': '[', 'BracketRight': ']',
    'Semicolon': ';', 'Quote': "'", 'Comma': ',', 'Period': '.',
    'Slash': '/', 'Backslash': '\\', 'Backquote': '`'
  };

  if (keyMap[keyCode]) return keyMap[keyCode];
  if (typeof keyCode === 'string' && keyCode.startsWith('Key') && keyCode.length === 4) {
    return keyCode.slice(3);
  }
  return keyCode;
}

/**
 * Register a global shortcut
 */
ipcMain.handle('register-global-shortcut', async (event, { id, key, phrase }) => {
  try {
    // Unregister if already registered
    if (registeredShortcuts.has(id)) {
      globalShortcut.unregister(registeredShortcuts.get(id).accelerator);
    }

    const accelerator = `Alt+${keyCodeToAccelerator(key)}`;
    
    const success = globalShortcut.register(accelerator, () => {
      // Copy phrase to clipboard
      clipboard.writeText(phrase);
      
      // Send notification to renderer
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('global-shortcut-triggered', { id, phrase });
      }
    });

    if (success) {
      registeredShortcuts.set(id, { accelerator, phrase });
      return { success: true };
    } else {
      return { success: false, error: 'Failed to register shortcut' };
    }
  } catch (error) {
    console.error('Failed to register global shortcut:', error);
    return { success: false, error: error.message };
  }
});

/**
 * Unregister a global shortcut
 */
ipcMain.handle('unregister-global-shortcut', async (event, { id }) => {
  try {
    if (registeredShortcuts.has(id)) {
      const { accelerator } = registeredShortcuts.get(id);
      globalShortcut.unregister(accelerator);
      registeredShortcuts.delete(id);
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to unregister global shortcut:', error);
    return { success: false, error: error.message };
  }
});

/**
 * Unregister all global shortcuts
 */
ipcMain.handle('unregister-all-global-shortcuts', async () => {
  try {
    globalShortcut.unregisterAll();
    registeredShortcuts.clear();
    return { success: true };
  } catch (error) {
    console.error('Failed to unregister all global shortcuts:', error);
    return { success: false, error: error.message };
  }
});

// Unregister all shortcuts when app is about to quit
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// IPC handlers for auto-updater
ipcMain.handle('check-for-updates', async () => {
  try {
    await autoUpdater.checkForUpdates();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('download-update', async () => {
  try {
    await autoUpdater.downloadUpdate();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('quit-and-install', () => {
  autoUpdater.quitAndInstall();
});