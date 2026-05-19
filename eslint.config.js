import js from '@eslint/js';
import globals from 'globals';

export default [
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'styles/main.css',
      'test-results/**',
      'tests/reports/**',
      'playwright-report/**',
      'package-lock.json',
    ],
  },

  // Base JS config
  js.configs.recommended,

  // Source files (browser ES modules)
  {
    files: ['src/**/*.js', 'index.html.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      // Allow unused params (common in event handlers)
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Allow console.log in source (project uses it for debugging)
      'no-console': 'off',
    },
  },

  // Test files (Playwright)
  {
    files: ['tests/**/*.spec.js', 'tests/playwright.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },

  // Tailwind config
  {
    files: ['tailwind.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
];
