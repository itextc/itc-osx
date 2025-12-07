# CLAUDE.md - AI Assistant Guide for Islamic Text Copier

## Co-Authors
This documentation is maintained by:
- **Abdur-Rahman Bilal** - aramb@aramservices.com
- **Nāsir Ātif** - Original concept and development

---

## Project Overview

**Islamic Text Copier (ITC)** is a cross-platform desktop application that provides easy access to 16 commonly used Arabic Islamic phrases with one-click copying functionality. The application has been successfully migrated from Python/tkinter to React/Electron for improved cross-platform support and modern development experience.

- **Repository**: https://github.com/itextc/itc-osx
- **License**: GPL-3.0
- **Primary Stack**: React 19.1.1 + Electron 38.1.0 + Webpack 5
- **Product Name**: "Islāmic Text Copier"
- **App ID**: com.itextc.islamic-text-copier

---

## Table of Contents

1. [Codebase Structure](#codebase-structure)
2. [Development Workflows](#development-workflows)
3. [Key Technologies](#key-technologies)
4. [Architectural Patterns](#architectural-patterns)
5. [Component Architecture](#component-architecture)
6. [State Management](#state-management)
7. [Styling System](#styling-system)
8. [Build Pipeline](#build-pipeline)
9. [Code Conventions](#code-conventions)
10. [Important Considerations](#important-considerations)
11. [Testing and Debugging](#testing-and-debugging)
12. [Common Tasks](#common-tasks)

---

## Codebase Structure

```
/home/user/itc-osx/
├── src/                            # ACTIVE: Modern React/Electron source
│   ├── main.js                     # Electron main process (60 lines)
│   ├── index.js                    # React entry point (10 lines)
│   ├── calibri.ttf                 # Font file for bundling
│   ├── components/
│   │   ├── App.js                  # Main React component (125 lines)
│   │   ├── App.css                 # Complete styling (573 lines)
│   │   └── PhraseButton.js         # Reusable button component (40 lines)
│   └── data/
│       └── phrases.js              # Arabic phrases data (18 lines)
│
├── public/
│   └── index.html                  # React app HTML template
│
├── resources/                      # Application assets
│   ├── calibri.ttf                 # Calibri font (1.6MB)
│   ├── icon.icns                   # macOS app icon
│   ├── ITC_Documentation.pdf       # User documentation (658KB)
│   └── main.png                    # Screenshots and resources
│
├── dist/                           # Webpack build output (gitignored)
│   ├── index.html                  # Generated from public/index.html
│   ├── bundle.js                   # Webpack bundled code
│   └── fonts/, images/             # Processed assets
│
├── release/                        # electron-builder output
│
├── package.json                    # npm configuration
├── webpack.config.js               # Webpack configuration
├── .gitignore                      # Git ignore rules
├── README.md                       # User-facing documentation
├── MIGRATION.md                    # Python → React migration guide
├── version.txt                     # Version number (221)
├── icon.icns & icon.ico            # Platform-specific icons
│
└── Legacy Python files: Removed from repository (see MIGRATION.md)
```

### Key File Purposes

#### Active React/Electron Files

**`src/main.js`** - Electron Main Process
- Creates BrowserWindow (1200x800, resizable)
- Loads React app from `dist/index.html`
- Opens DevTools in development mode
- Handles external links via `shell.openExternal()`
- Background color: #1b1c27 (dark theme)

**`src/index.js`** - React Entry Point
- Renders App component using React 19's `createRoot` API
- Wraps app in StrictMode

**`src/components/App.js`** - Main Application Component
- Contains all application logic and state
- Renders 16 Arabic phrase buttons in grid layout
- Core features:
  - `copyToClipboard()` - Modern Clipboard API integration
  - `showMeaning()` / `hideMeaning()` - Hover tooltip system
  - `checkForUpdates()` - Version checking from GitHub
  - `openDocumentation()` - PDF viewer via Electron
  - `openWebsite()` - External link handler

**`src/components/PhraseButton.js`** - Reusable Button Component
- Props: phrase, meaning, onCopy, onMouseEnter, onMouseLeave
- Special styling for symbols (≤2 chars) and Basmala (﷽)
- Presentational component with no internal state

**`src/data/phrases.js`** - Data Layer
- Exports `arabicPhrases` array (16 items)
- Structure: `{ phrase: string, meaning: string }`
- Single source of truth for all phrase data

**`src/components/App.css`** - Complete Styling (573 lines)
- CSS custom properties (design tokens)
- Grid layout with responsive breakpoints
- Dark theme (#1b1c27 background)
- Animated hover effects with shimmer
- Mobile-first responsive design

#### Configuration Files

**`package.json`** - npm Package Configuration
- Scripts for development, building, and distribution
- electron-builder configuration for macOS/Windows/Linux
- All dependencies in devDependencies (Electron pattern)

**`webpack.config.js`** - Webpack Configuration (55 lines)
- Entry: `./src/index.js`
- Output: `dist/bundle.js`
- Loaders for React, CSS, fonts, and images
- Target: `electron-renderer`
- HtmlWebpackPlugin for template processing

**`version.txt`** - Version Number
- Simple text file with version number (currently "221")
- Fetched remotely for update checking

---

## Development Workflows

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/itextc/itc-osx.git
cd itc-osx

# Install dependencies
npm install
```

### Development Commands

```bash
# Development mode (build + run with DevTools)
npm run dev

# Individual commands
npm run build-dev     # Webpack development build only
npm run electron-dev  # Run Electron in development mode
npm run electron      # Run Electron (production mode)
```

### Production Build Commands

```bash
# Production build
npm run build         # Webpack production build

# Run production build locally
npm run start         # Build + run Electron

# Platform-specific distribution
npm run dist          # Build + package for all platforms
npm run dist-mac      # macOS DMG (x64 + arm64 universal)
npm run dist-win      # Windows installer
npm run dist-linux    # Linux AppImage

# Package without distribution
npm run pack          # Creates unpacked app in dist/
```

### Build Pipeline Steps

1. **Webpack Build Phase**:
   - Entry point: `src/index.js`
   - Processes React JSX via Babel
   - Bundles CSS with style-loader + css-loader
   - Copies fonts to `dist/fonts/`
   - Copies images to `dist/images/`
   - Generates `dist/index.html` from `public/index.html`
   - Creates source maps for debugging
   - Output: `dist/bundle.js`

2. **Electron Packaging Phase** (dist commands only):
   - Includes: `src/main.js`, `dist/**/*`, `resources/**/*`, icons
   - Output directory: `release/`
   - Platform-specific formats:
     - macOS: Universal DMG (x64 + arm64)
     - Windows: Installer with custom icon
     - Linux: AppImage

### Environment Detection

```javascript
// In src/main.js
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  mainWindow.webContents.openDevTools();
}
```

---

## Key Technologies

### Primary Stack (Current)

- **Frontend Framework**: React 19.1.1
- **Desktop Framework**: Electron 38.1.0
- **Build System**: Webpack 5.101.3
- **Package Manager**: npm
- **Distribution Tool**: electron-builder 26.0.12

### Build Tools

- **Babel**: @babel/core 7.28.4 + @babel/preset-react 7.27.1
- **Loaders**:
  - babel-loader 10.0.0 (JSX transformation)
  - css-loader 7.1.2 (CSS imports)
  - style-loader 4.0.0 (CSS injection into DOM)
- **Plugins**:
  - html-webpack-plugin 5.6.4 (HTML template processing)

### Web APIs Used

- **Clipboard API**: `navigator.clipboard.writeText()` for modern async clipboard
- **Fetch API**: For version checking from GitHub
- **Electron APIs**: `shell.openExternal()`, `shell.openPath()`

### Legacy Python Stack (Historical)

Previously, a Python/tkinter implementation existed for macOS packaging via py2app/pyinstaller. It has been removed to simplify the repository and packaging. Historical details remain in MIGRATION.md.

---

## Architectural Patterns

### Component Architecture

The application follows a simple, functional React architecture:

```
App (Container Component)
├─ State Management (useState hooks)
├─ Business Logic (event handlers)
└─ Presentation Layer
   └─ PhraseButton × 16 (Presentational Components)
```

**Key Patterns**:
- **Functional components** with React Hooks (no class components)
- **Props drilling** for event handlers (only 1 level deep)
- **Single source of truth** for phrases data
- **Container/Presentational** pattern (App.js vs PhraseButton.js)
- **No global state management** (no Redux, Context, etc.)

### Separation of Concerns

```javascript
src/
  main.js          → Electron main process (Node.js environment)
  index.js         → React bootstrap (renderer process)
  components/      → UI components (view layer)
  data/            → Static data (model layer)
```

### Data Flow

```
phrases.js (static data)
    ↓ import
  App.js (container)
    ↓ map & props
  PhraseButton × 16 (presentational)
    ↓ user events (onClick, onMouseEnter, onMouseLeave)
  App.js event handlers
    ↓ setState
  UI updates (React re-render)
```

### Event Handling Pattern

Parent component owns all logic; child components trigger events:

```javascript
// App.js (parent)
const copyToClipboard = async (phrase) => {
  await navigator.clipboard.writeText(phrase);
  setStatusMessage(`${phrase} copied`);
  setTimeout(() => setStatusMessage(''), 3000);
};

// PhraseButton.js (child)
<button onClick={() => onCopy(phrase)}>
  {phrase}
</button>
```

---

## Component Architecture

### Component Hierarchy

```
App (root)
├─ header (nav)
│  ├─ Documentation button
│  └─ About button
├─ main
│  ├─ phrases-grid
│  │  └─ PhraseButton × 16
│  └─ meaning-display (hover tooltip)
├─ footer
│  ├─ credits
│  ├─ version-info
│  └─ Check for Updates button
└─ status-display (toast notification)
```

### App Component (Container)

**File**: `src/components/App.js`

**State**:
```javascript
const [statusMessage, setStatusMessage] = useState('');  // Toast notification
const [meaningText, setMeaningText] = useState('');      // Hover tooltip
```

**Key Methods**:
- `copyToClipboard(phrase)`: Async clipboard operation + status toast
- `showMeaning(meaning)`: Display hover tooltip
- `hideMeaning()`: Clear hover tooltip
- `checkForUpdates()`: Fetch version from GitHub raw URL
- `openDocumentation()`: Open PDF via Electron shell
- `openWebsite()`: Open GitHub repo in browser

**Rendering Pattern**:
```javascript
arabicPhrases.map(({ phrase, meaning }, index) => (
  <PhraseButton
    key={index}
    phrase={phrase}
    meaning={meaning}
    onCopy={copyToClipboard}
    onMouseEnter={showMeaning}
    onMouseLeave={hideMeaning}
  />
))
```

### PhraseButton Component (Presentational)

**File**: `src/components/PhraseButton.js`

**Props**:
```javascript
{
  phrase: string,          // Arabic text to display
  meaning: string,         // English meaning for tooltip
  onCopy: (phrase) => {},  // Click handler
  onMouseEnter: (meaning) => {},  // Hover enter
  onMouseLeave: () => {}   // Hover exit
}
```

**Dynamic Styling**:
```javascript
const buttonClass = `phrase-button ${
  phrase.length <= 2 ? 'symbol-button' : ''
} ${phrase === '﷽' ? 'basmala-button' : ''}`;
```

**Component Variants**:
1. **Default**: Regular Arabic text phrases
2. **Symbol** (≤2 characters): Larger font size (2.5rem vs 2rem)
3. **Basmala** (﷽): Special formatting, spans multiple grid columns

---

## State Management

### Local Component State Only

The application uses simple local state with React's `useState` hook. No global state management libraries are needed due to:
- Small application scope
- Shallow component hierarchy
- Minimal shared state

### State Variables

**In App.js**:
```javascript
const [statusMessage, setStatusMessage] = useState('');
// Purpose: Toast notification text
// Lifecycle: Set on action → Auto-clear after 3s

const [meaningText, setMeaningText] = useState('');
// Purpose: Hover tooltip content
// Lifecycle: Set on hover → Clear on mouse leave
```

### State Update Patterns

**Toast Notification**:
```javascript
setStatusMessage(`${phrase} copied to clipboard`);
setTimeout(() => setStatusMessage(''), 3000);  // Auto-clear
```

**Tooltip Display**:
```javascript
// Show
setMeaningText(meaning);

// Hide
setMeaningText('');
```

### Side Effects

**Async Operations**:
- Clipboard write: `navigator.clipboard.writeText(phrase)`
- Version fetch: `fetch('https://raw.githubusercontent.com/...')`
- PDF open: `shell.openPath(pdfPath)`
- External link: `shell.openExternal(url)`

**Timers**:
- Auto-hide status message: `setTimeout(..., 3000)`

### No State Persistence

The application has **no persistent state**:
- No localStorage
- No sessionStorage
- No IndexedDB
- Each launch starts fresh

---

## Styling System

### CSS Architecture

**File**: `src/components/App.css` (573 lines)

**Approach**: CSS-in-CSS (not CSS-in-JS)
- All styles in external stylesheet
- No inline styles
- No styled-components or emotion
- Traditional class-based styling

### Design Tokens (CSS Custom Properties)

```css
:root {
  /* Colors */
  --bg-primary: #1b1c27;           /* Dark background */
  --bg-secondary: #252632;         /* Card backgrounds */
  --text-primary: #ffffff;         /* Primary text */
  --text-secondary: #b0b0b0;       /* Secondary text */
  --accent-gold: #d4af37;          /* Gold accent */
  --accent-emerald: #50c878;       /* Green accent */
  --hover-glow: rgba(212, 175, 55, 0.2);  /* Gold glow */

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Typography */
  --font-calibri: 'Calibri', sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 2rem;
  --font-size-xl: 2.5rem;
}
```

### Grid Layout System

**Desktop (default)**:
```css
.phrases-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

/* Basmala (﷽) spans 2 columns */
.phrase-button:last-child {
  grid-column: span 2;
  justify-self: center;
}
```

**Responsive Breakpoints**:
```css
@media (max-width: 1200px) {
  /* Font size adjustments */
}

@media (max-width: 900px) {
  .phrases-grid {
    grid-template-columns: repeat(3, 1fr);  /* 3 columns */
  }
  .phrase-button:last-child {
    grid-column: span 3;  /* Basmala spans all */
  }
}

@media (max-width: 600px) {
  .phrases-grid {
    grid-template-columns: repeat(2, 1fr);  /* 2 columns */
  }
  .phrase-button:last-child {
    grid-column: span 2;
  }
}
```

### Naming Conventions

**Class Naming**: kebab-case (BEM-inspired, not strict BEM)
```css
.phrase-button
.phrase-button:hover
.symbol-button
.basmala-button
.phrases-grid
.meaning-display
.status-display
.visible  /* Utility class */
```

**CSS Variables**: kebab-case with double dashes
```css
--bg-primary
--accent-gold
--spacing-md
```

### Animation System

**Shimmer Effect on Hover**:
```css
.phrase-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(212, 175, 55, 0.4),
    transparent
  );
  transition: left 0.5s ease;
}

.phrase-button:hover::before {
  left: 100%;  /* Slides across button */
}
```

**Glow Effect**:
```css
.phrase-button:hover {
  box-shadow: 0 0 20px var(--hover-glow);
  transform: translateY(-2px);
}
```

**Toast Visibility**:
```css
.status-display {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s, transform 0.3s;
}

.status-display.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Typography

**Font Loading**:
```css
@font-face {
  font-family: 'Calibri';
  src: url('../calibri.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
```

**Font Sizes**:
- Base UI text: 1rem
- Phrase buttons: 2rem
- Symbol buttons: 2.5rem
- Headings: 1.8rem

---

## Build Pipeline

### Webpack Configuration

**File**: `webpack.config.js`

**Entry Point**:
```javascript
entry: './src/index.js'
```

**Output**:
```javascript
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js',
  clean: true  // Clean dist/ before each build
}
```

**Target**:
```javascript
target: 'electron-renderer'  // Enables Node.js integration
```

### Loaders

**JavaScript/React**:
```javascript
{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-react']
    }
  }
}
```

**CSS**:
```javascript
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
  // style-loader: Injects CSS into DOM
  // css-loader: Resolves @import and url()
}
```

**Fonts**:
```javascript
{
  test: /\.(woff|woff2|ttf|otf)$/,
  type: 'asset/resource',
  generator: {
    filename: 'fonts/[name][ext]'
  }
}
```

**Images**:
```javascript
{
  test: /\.(png|jpg|jpeg|gif|ico|icns)$/,
  type: 'asset/resource',
  generator: {
    filename: 'images/[name][ext]'
  }
}
```

### Plugins

**HtmlWebpackPlugin**:
```javascript
new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html'
})
// Generates dist/index.html with bundle.js injected
```

### Source Maps

```javascript
devtool: 'source-map'  // Enables debugging in DevTools
```

### Electron Builder Configuration

**File**: `package.json` (build section)

```json
{
  "build": {
    "appId": "com.itextc.islamic-text-copier",
    "productName": "Islāmic Text Copier",
    "directories": {
      "output": "release"
    },
    "files": [
      "src/main.js",
      "dist/**/*",
      "resources/ITC_Documentation.pdf",
      "icon.icns",
      "icon.ico"
    ],
    "mac": {
      "category": "public.app-category.utilities",
      "icon": "icon.icns",
      "target": [
        {
          "target": "dmg",
          "arch": ["x64", "arm64"]  // Universal binary
        }
      ]
    }
  }
}
```

---

## Code Conventions

### File Naming

- **Components**: PascalCase + `.js` extension
  - `App.js`, `PhraseButton.js`
- **Data/Utils**: camelCase
  - `phrases.js`
- **Config files**: kebab-case
  - `webpack.config.js`
- **Stylesheets**: Match component name
  - `App.css` pairs with `App.js`

### JavaScript/React Conventions

**Import Order**:
```javascript
// 1. External libraries
import React, { useState } from 'react';

// 2. Internal modules/data
import { arabicPhrases } from '../data/phrases';

// 3. Stylesheets
import './App.css';
```

**Function Declaration**:
```javascript
// Prefer function declarations for components
function App() {
  return <div>...</div>;
}

// Arrow functions for event handlers
const copyToClipboard = async (phrase) => {
  // ...
};
```

**Async/Await Pattern**:
```javascript
// Use async/await over .then() chains
const copyToClipboard = async (phrase) => {
  try {
    await navigator.clipboard.writeText(phrase);
    setStatusMessage(`${phrase} copied to clipboard`);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};
```

**Conditional Rendering**:
```javascript
// Ternary for className toggling
<div className={`status-display ${statusMessage ? 'visible' : ''}`}>

// Logical AND for conditional display
{meaningText && (
  <div className="meaning-display">{meaningText}</div>
)}
```

**Array Mapping**:
```javascript
// Always provide key prop
arabicPhrases.map(({ phrase, meaning }, index) => (
  <PhraseButton
    key={index}  // Use index only for static lists
    phrase={phrase}
    meaning={meaning}
  />
))
```

### CSS Conventions

**Class Naming**: kebab-case
```css
.phrase-button
.meaning-display
.status-display
```

**Utility Classes**: Single-purpose, reusable
```css
.visible { opacity: 1; }
```

**Pseudo-elements**: Use for effects
```css
.phrase-button::before { /* shimmer effect */ }
.phrase-button:hover { /* hover state */ }
```

**Custom Properties**: For theming
```css
:root { --accent-gold: #d4af37; }
.button { color: var(--accent-gold); }
```

### Git Conventions

**Commit Messages**:
Follow conventional commit format:
```
feat(ui): add new phrase button animation
fix(clipboard): resolve async clipboard error on Firefox
docs(readme): update installation instructions
refactor(components): extract PhraseButton component
```

**Branch Naming**:
```
claude/feature-name-sessionId
claude/fix-issue-sessionId
```

---

## Important Considerations

### Security Considerations

⚠️ **Electron Security Warning**:

The app currently uses:
```javascript
// src/main.js
webPreferences: {
  nodeIntegration: true,         // ⚠️ Security risk
  contextIsolation: false        // ⚠️ Security risk
}
```

**Why this is acceptable**:
- App loads **local content only** (no remote web pages)
- No user-generated content rendering
- Simplified development for desktop-only app

**Migration path** (if loading remote content in future):
1. Set `contextIsolation: true`
2. Set `nodeIntegration: false`
3. Create preload script for secure IPC
4. Use `contextBridge` to expose specific APIs

### Cross-Platform Compatibility

**Electron Shell APIs** - Graceful degradation:
```javascript
// Check if Electron is available
const { shell } = window.require ? window.require('electron') : { shell: null };

// Use with null check
if (shell) {
  shell.openExternal(url);
}
```

**Platform-Specific Behaviors**:
- macOS: `.icns` icon, DMG installer, universal binary
- Windows: `.ico` icon, installer with Inno Setup
- Linux: AppImage format

### Font Licensing

The application uses **Calibri font** (`calibri.ttf`):
- Calibri is a Microsoft proprietary font
- Bundling requires proper licensing
- Consider alternative: Open-source Arabic fonts (e.g., Amiri, Scheherazade)

### Update Checking

**Current Implementation**:
```javascript
fetch('https://raw.githubusercontent.com/itextc/itc-osx/main/version.txt')
  .then(response => response.text())
  .then(latestVersion => {
    // Compare with current version
  });
```

**Limitations**:
- No automatic updates (manual download required)
- Version stored in plain text file
- No signature verification

**Improvement Suggestions**:
- Implement Electron's `autoUpdater`
- Use GitHub Releases API
- Add update download + install flow

### Accessibility

**Current State**: Limited accessibility support

**Recommendations for AI Assistants**:
When making changes, consider adding:
- ARIA labels for buttons
- Keyboard navigation (Tab, Enter)
- Focus indicators
- Screen reader announcements for clipboard actions

Example:
```javascript
<button
  aria-label={`Copy ${phrase} - ${meaning}`}
  onClick={handleCopy}
>
  {phrase}
</button>
```

### Error Handling

**Current Error Handling**:
```javascript
try {
  await navigator.clipboard.writeText(phrase);
} catch (err) {
  console.error('Failed to copy:', err);
  // No user feedback on error
}
```

**Improvement Suggestions**:
- Display error toast to user
- Fallback to `document.execCommand('copy')` for older browsers
- Log errors to file in production

---

## Testing and Debugging

### Development Tools

**DevTools Access**:
```bash
npm run dev  # Opens Electron with DevTools enabled
```

**Source Maps**: Enabled in webpack config for debugging bundled code

**React DevTools**: Install browser extension, works in Electron DevTools

### Manual Testing Checklist

When making changes, test:
1. ✅ All 16 phrases copy correctly
2. ✅ Hover tooltips display meanings
3. ✅ Status toast appears and auto-hides
4. ✅ Update checker fetches latest version
5. ✅ Documentation PDF opens
6. ✅ About link opens GitHub in browser
7. ✅ Responsive layout at different window sizes
8. ✅ Keyboard navigation (if implemented)

### Platform Testing

Before releasing:
- **macOS**: Test on Intel (x64) and Apple Silicon (arm64)
- **Windows**: Test 32-bit and 64-bit
- **Linux**: Test AppImage on major distros (Ubuntu, Fedora)

### Common Issues

**Issue**: Webpack build fails with "Module not found"
**Solution**: Check import paths are correct, run `npm install`

**Issue**: Electron window is blank
**Solution**: Check DevTools console for errors, verify `dist/index.html` exists

**Issue**: Fonts not loading
**Solution**: Verify `calibri.ttf` in `src/` and webpack font loader config

**Issue**: Clipboard not working
**Solution**: Check HTTPS/secure context requirement for Clipboard API

---

## Common Tasks

### Adding a New Phrase

**Step 1**: Edit `src/data/phrases.js`
```javascript
export const arabicPhrases = [
  // ... existing phrases
  { phrase: 'اللَّهُ أَكْبَر', meaning: 'Allah is the Greatest' }
];
```

**Step 2**: Test in development
```bash
npm run dev
```

**Step 3**: Rebuild and package
```bash
npm run dist
```

### Modifying Colors/Theme

**Edit**: `src/components/App.css`

**Find CSS custom properties**:
```css
:root {
  --bg-primary: #1b1c27;      /* Change background */
  --accent-gold: #d4af37;     /* Change accent color */
  --text-primary: #ffffff;    /* Change text color */
}
```

**Test changes**:
```bash
npm run dev  # Hot reload should work for CSS changes
```

### Updating Version Number

**Step 1**: Edit `package.json`
```json
{
  "version": "1.1.0"  // Bump version
}
```

**Step 2**: Edit `version.txt`
```
222  // Increment for update checker
```

**Step 3**: Commit and tag
```bash
git add package.json version.txt
git commit -m "chore(release): bump version to 1.1.0"
git tag v1.1.0
git push origin main --tags
```

### Creating a New Component

**Step 1**: Create component file in `src/components/`
```javascript
// src/components/NewComponent.js
import React from 'react';
import './NewComponent.css';

function NewComponent({ prop1, prop2 }) {
  return (
    <div className="new-component">
      {/* component JSX */}
    </div>
  );
}

export default NewComponent;
```

**Step 2**: Create stylesheet
```css
/* src/components/NewComponent.css */
.new-component {
  /* styles */
}
```

**Step 3**: Import in parent component
```javascript
// src/components/App.js
import NewComponent from './NewComponent';

// Use in render
<NewComponent prop1={value1} prop2={value2} />
```

### Debugging Electron Main Process

**Add console logs**:
```javascript
// src/main.js
console.log('Main process log');  // Appears in terminal, not DevTools
```

**Run in dev mode**:
```bash
npm run dev  # Check terminal output
```

### Modifying Build Configuration

**Webpack changes**: Edit `webpack.config.js`
- Add new loaders for file types
- Modify output paths
- Add plugins

**Electron builder changes**: Edit `package.json` build section
- Change app name, ID
- Modify included files
- Configure installers

**Test build**:
```bash
npm run build  # Test webpack build
npm run pack   # Test electron packaging without installers
```

---

## AI Assistant Guidelines

### When Working on This Codebase

1. **Read before writing**: Always read existing files before editing
2. **Preserve patterns**: Follow established patterns in the codebase
3. **Test changes**: Run `npm run dev` to verify changes
4. **Check all platforms**: Consider cross-platform implications
5. **Update documentation**: Keep this CLAUDE.md file updated

### Code Modification Principles

**DO**:
- ✅ Use functional components with hooks
- ✅ Follow existing naming conventions
- ✅ Add comments for complex logic
- ✅ Test in development mode before committing
- ✅ Preserve existing visual design
- ✅ Consider accessibility improvements
- ✅ Use CSS custom properties for theming

**DON'T**:
- ❌ Convert to class components
- ❌ Add unnecessary dependencies
- ❌ Break existing features
- ❌ Change visual design without approval
- ❌ Reintroduce removed legacy Python files into active codebase
- ❌ Commit `node_modules/` or `dist/`
- ❌ Introduce security vulnerabilities

### Understanding Legacy Code

The repository contains **two implementations**:

1. **Active (React/Electron)**: `src/` directory
   - This is what you should modify
   - Modern, cross-platform, actively maintained

2. **Legacy (Python)**: Root-level `.py` files
   - Reference only, not active
   - Preserved for migration documentation
   - DO NOT modify or run

**When in doubt**: Work in `src/` directory.

### Typical Change Workflow

1. **Understand the request**: Read the user's requirement carefully
2. **Explore**: Use Glob/Grep to find relevant files
3. **Read**: Read current implementation
4. **Plan**: Outline changes in todo list
5. **Implement**: Make changes following patterns
6. **Test**: Run `npm run dev` and verify
7. **Commit**: Write clear commit message
8. **Push**: Push to feature branch

### Questions to Ask

Before implementing major changes, clarify:
- Should this change affect visual design?
- Is this a bug fix or new feature?
- Should I add new dependencies?
- Do we need to support older Electron versions?
- Should I update README.md or other docs?

---

## Resources and Documentation

### Official Documentation

- **React**: https://react.dev/
- **Electron**: https://www.electronjs.org/docs
- **Webpack**: https://webpack.js.org/concepts/
- **electron-builder**: https://www.electron.build/

### Project-Specific Docs

- **README.md**: User-facing installation and usage
- **MIGRATION.md**: Python to React migration guide
- **package.json**: Scripts and dependencies
- **webpack.config.js**: Build configuration

### External Resources

- **GitHub Repo**: https://github.com/itextc/itc-osx
- **Website**: https://itc.nasiratif.net
- **User Documentation**: `resources/ITC_Documentation.pdf`

---

## Changelog and Version History

### Current Version: 1.0.0

**Migration to React/Electron** (v1.0.0):
- ✅ Full React 19.1.1 implementation
- ✅ Electron 38.1.0 integration
- ✅ Cross-platform support (macOS, Windows, Linux)
- ✅ Modern Clipboard API
- ✅ Responsive grid layout
- ✅ Update checker functionality
- ✅ Webpack 5 build pipeline
- ✅ Universal macOS binary (x64 + arm64)

**Legacy Python Version**:
- Original tkinter implementation
- macOS-only py2app builds
- CustomTkinter UI experiments

---

## Contact and Support

### Maintainers

- **Abdur-Rahman Bilal**: aramb@aramservices.com
- **Nāsir Ātif**: Original concept and development

### Getting Help

- **Issues**: https://github.com/itextc/itc-osx/issues
- **Discussions**: GitHub Discussions
- **Pull Requests**: Contributions welcome

### Contributing

When contributing:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes following this guide
4. Test thoroughly
5. Submit pull request with clear description

---

**Last Updated**: 2025-11-20
**Document Version**: 1.0
**Maintained By**: Abdur-Rahman Bilal (aramb@aramservices.com)

بارك الله فيك (May Allāh bless you) for maintaining and improving this project!
