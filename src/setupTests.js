/**
 * Jest Setup File
 *
 * This file runs once before all tests. It configures the testing
 * environment and imports global test utilities.
 */

import '@testing-library/jest-dom';

// Mock window.electronAPI for tests
global.window.electronAPI = {
  openExternal: jest.fn(),
  openPath: jest.fn(),
  getVersion: jest.fn().mockResolvedValue('1.0.0'),
  getSettings: jest.fn().mockResolvedValue({ success: true, settings: null }),
  setSettings: jest.fn().mockResolvedValue({ success: true }),
  isElectron: true,
};

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(),
    readText: jest.fn().mockResolvedValue(''),
  },
});

// Suppress console errors in tests (optional, uncomment if needed)
// global.console.error = jest.fn();
// global.console.warn = jest.fn();
