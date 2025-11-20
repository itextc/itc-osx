module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // Must be last to override other configs
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // React rules
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/prop-types': 'warn', // Warn about missing prop types
    'react/jsx-uses-react': 'off', // Not needed in React 17+

    // General code quality
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow console.warn and console.error
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused vars
    'prefer-const': 'warn', // Prefer const over let when possible

    // Best practices
    'eqeqeq': ['warn', 'always'], // Require === and !==
    'no-eval': 'error', // Disallow eval()
    'no-implied-eval': 'error', // Disallow implied eval()
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
};
