const { app, BrowserWindow, shell, ipcMain, globalShortcut, clipboard } = require('electron');
const path = require('path');

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
app.whenReady().then(createWindow);

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
 * Convert a key code to an Electron accelerator string
 */
function keyCodeToAccelerator(keyCode) {
  const keyMap = {
    'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4', 'Digit5': '5',
    'Digit6': '6', 'Digit7': '7', 'Digit8': '8', 'Digit9': '9', 'Digit0': '0',
    'Minus': '-', 'Equal': '=', 'BracketLeft': '[', 'BracketRight': ']',
    'Semicolon': ';', 'Quote': "'", 'Comma': ',', 'Period': '.',
    'Slash': '/', 'Backslash': '\\'
  };
  return keyMap[keyCode] || keyCode;
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