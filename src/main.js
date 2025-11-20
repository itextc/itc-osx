const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');

// Keep a global reference of the window object
let mainWindow;

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