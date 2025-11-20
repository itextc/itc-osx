module.exports = {
  // Test environment
  testEnvironment: 'jsdom',

  // Setup files to run after Jest is initialized
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Module name mapper for CSS and asset imports
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Transform files with babel-jest
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js', // Exclude entry point
    '!src/main.js', // Exclude Electron main process
    '!src/preload.js', // Exclude Electron preload
    '!src/**/*.test.{js,jsx}', // Exclude test files
    '!src/setupTests.js', // Exclude test setup
  ],

  // Coverage thresholds (optional, can be adjusted)
  coverageThresholds: {
    global: {
      branches: 50,
      functions: 50,
      lines: 70,
      statements: 70,
    },
  },

  // Test match patterns
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/release/'],

  // Module file extensions
  moduleFileExtensions: ['js', 'jsx', 'json'],

  // Verbose output
  verbose: true,
};
