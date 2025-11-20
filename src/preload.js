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
   * Checks if running in Electron environment
   * @returns {boolean}
   */
  isElectron: true
});
