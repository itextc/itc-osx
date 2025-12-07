/**
 * Preload Script - Secure bridge between main and renderer processes
 *
 * This script exposes only specific, safe APIs to the renderer process
 * through the contextBridge, preventing direct access to Node.js APIs
 * and enhancing security by isolating contexts.
 */

const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// specific functionality without exposing the entire electron API
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Opens a URL in the user's default external browser
   * @param {string} url - The URL to open
   * @returns {Promise<void>}
   */
  openExternal: (url) => ipcRenderer.invoke('open-external', url),

  /**
   * Opens a file or directory path with the default system application
   * @param {string} path - The file path to open
   * @returns {Promise<string>} - Returns error message if failed, empty string if successful
   */
  openPath: (path) => ipcRenderer.invoke('open-path', path),

  /**
   * Gets the application version
   * @returns {Promise<string>} - The app version from package.json
   */
  getVersion: () => ipcRenderer.invoke('get-version'),

  /**
   * Register a global shortcut that works outside the app
   * @param {string} id - Unique identifier for the shortcut
   * @param {string} key - The key code (e.g., 'Digit1', 'Minus')
   * @param {string} phrase - The phrase to copy when triggered
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  registerGlobalShortcut: (id, key, phrase) => 
    ipcRenderer.invoke('register-global-shortcut', { id, key, phrase }),

  /**
   * Unregister a global shortcut
   * @param {string} id - The shortcut identifier to unregister
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  unregisterGlobalShortcut: (id) => 
    ipcRenderer.invoke('unregister-global-shortcut', { id }),

  /**
   * Unregister all global shortcuts
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  unregisterAllGlobalShortcuts: () => 
    ipcRenderer.invoke('unregister-all-global-shortcuts'),

  /**
   * Listen for global shortcut triggered events
   * @param {Function} callback - Called with { id, phrase } when a global shortcut fires
   * @returns {Function} - Cleanup function to remove the listener
   */
  onGlobalShortcutTriggered: (callback) => {
    const handler = (event, data) => callback(data);
    ipcRenderer.on('global-shortcut-triggered', handler);
    return () => ipcRenderer.removeListener('global-shortcut-triggered', handler);
  },

  /**
   * Checks if running in Electron environment
   * @returns {boolean}
   */
  isElectron: true
});
