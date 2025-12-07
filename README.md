# Islāmic Text Copier

A cross-platform desktop application built with React and Electron that provides easy access to commonly used Arabic Islamic texts such as Subḥānahu wa Taʾālá and Sallá Allāhu ʿAlayhī wa as-Salam.

## Features

- **16 Islamic Arabic phrases** with English transliterations and meanings
- **One-click copying** to clipboard
- **Hover tooltips** showing meanings
- **Cross-platform support** (macOS, Windows, Linux)
- **Update checking** functionality
- **Modern UI** with dark theme
- **Documentation access**

## Screenshots

The application maintains the same visual design as the original Python version with a dark theme (#1b1c27) and grid layout of Arabic phrase buttons.

## Download

The latest release can be downloaded from the [official website](https://itc.nasiratif.net) or from the [GitHub releases page](https://github.com/itextc/itc-osx/releases).

## Development

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/itextc/itc-osx.git
cd itc-osx

# Install dependencies
npm install

# Run in development mode
npm run dev
```

### Building

```bash
# Build for production
npm run build

# Package for distribution
npm run dist

# Platform-specific builds
npm run dist-mac    # macOS DMG
npm run dist-win    # Windows installer
npm run dist-linux  # Linux AppImage
```

## Technology Stack

- **Frontend:** React 19.1.1
- **Desktop Framework:** Electron 38.1.0
- **Build System:** Webpack 5
- **Package Manager:** npm
- **Build Tool:** electron-builder

## Migration from Python

This project has been migrated from Python/macOS to React/Electron for improved cross-platform support and better developer experience. See [MIGRATION.md](MIGRATION.md) for detailed migration documentation.

### Legacy Python (Removed)

The project previously included a Python/tkinter implementation kept for reference during migration. These files have now been removed from the repository to reduce maintenance and package size. See [MIGRATION.md](MIGRATION.md) for historical context.

## Contributing

Contributions are welcome! This includes:
- Bug fixes
- Adding more Islamic texts
- UI/UX improvements
- Cross-platform testing
- Documentation improvements

### Development Guidelines

1. Maintain the existing visual design and user experience
2. Ensure cross-platform compatibility
3. Follow React best practices
4. Test thoroughly on all supported platforms

## Build Issues Resolution

The migration resolves several build issues from the Python version:
- ✅ Python dependency conflicts (pyinstaller version issues)
- ✅ macOS-only build limitations
- ✅ Complex py2app configuration
- ✅ Platform-specific environment issues

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## Authors

- **Nāsir Ātif** - Original concept and development
- **Abdur-Rahman Bilal** - Development and contributions

## Acknowledgments

بارك الله فيك (May Allāh bless you) to all contributors and users of this application.

---

*For technical support or feature requests, please open an issue on GitHub.*
