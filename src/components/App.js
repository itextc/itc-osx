import React, { useState, useEffect } from 'react';
import { arabicPhrases } from '../data/phrases';
import PhraseButton from './PhraseButton';
import Documentation from './Documentation';
import './App.css';

// Access secure Electron API exposed through preload script
// Falls back gracefully for browser mode
const electronAPI = window.electronAPI || null;

function App() {
  const [statusMessage, setStatusMessage] = useState('');
  const [meaningText, setMeaningText] = useState('');
  const [appVersion, setAppVersion] = useState('0.2.0');
  const [showDocs, setShowDocs] = useState(false);

  // Fetch app version from Electron main process on mount
  useEffect(() => {
    const fetchVersion = async () => {
      if (electronAPI && electronAPI.getVersion) {
        try {
          const version = await electronAPI.getVersion();
          setAppVersion(version);
        } catch (err) {
          console.error('Failed to fetch version:', err);
          // Keep default version if fetch fails
        }
      }
    };

    fetchVersion();
  }, []);

  // Auto-hide status message after 3 seconds with proper cleanup
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage('');
      }, 3000);

      // Cleanup function to prevent memory leaks
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Keyboard shortcuts for quick copying (Option/Alt + key)
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check if user is typing in an input field
      const isInputFocused =
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable;

      if (isInputFocused) return;

      // Only handle Option/Alt key combinations
      if (!e.altKey) return;

      e.preventDefault();

      // Option + number keys (1-9) to copy phrases 0-8
      if (e.code >= 'Digit1' && e.code <= 'Digit9') {
        const index = parseInt(e.code.replace('Digit', '')) - 1;
        if (arabicPhrases[index]) {
          copyToClipboard(arabicPhrases[index].phrase);
        }
      }

      // Option + 0 to copy phrase 9 (Alḥamdulillāh)
      if (e.code === 'Digit0') {
        if (arabicPhrases[9]) {
          copyToClipboard(arabicPhrases[9].phrase);
        }
      }

      // Option + - (dash/minus) to copy phrase 10 (Jazāk Allāhu Khairan)
      if (e.code === 'Minus') {
        if (arabicPhrases[10]) {
          copyToClipboard(arabicPhrases[10].phrase);
        }
      }

      // Option + = (equal) to copy phrase 11 (Bārak Allāhu Fīk)
      if (e.code === 'Equal') {
        if (arabicPhrases[11]) {
          copyToClipboard(arabicPhrases[11].phrase);
        }
      }

      // Option + [ (left bracket) to copy phrase 12 (As-Salāmu ʿAlaykum)
      if (e.code === 'BracketLeft') {
        if (arabicPhrases[12]) {
          copyToClipboard(arabicPhrases[12].phrase);
        }
      }

      // Option + ] (right bracket) to copy phrase 13 (ʾIn shāʾ Allāh)
      if (e.code === 'BracketRight') {
        if (arabicPhrases[13]) {
          copyToClipboard(arabicPhrases[13].phrase);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const copyToClipboard = async (phrase) => {
    try {
      await navigator.clipboard.writeText(phrase);
      setStatusMessage(`${phrase} copied to clipboard`);
      // Timeout now handled by useEffect above with proper cleanup
    } catch (err) {
      console.error('Failed to copy: ', err);
      setStatusMessage('Failed to copy to clipboard');
    }
  };

  const showMeaning = (meaning) => {
    setMeaningText(meaning);
  };

  const hideMeaning = () => {
    setMeaningText('');
  };

  const openDocumentation = () => {
    setShowDocs(true);
  };

  const closeDocumentation = () => {
    setShowDocs(false);
  };

  const openWebsite = async () => {
    const url = 'https://github.com/itextc/itc-osx';
    if (electronAPI) {
      try {
        await electronAPI.openExternal(url);
      } catch (err) {
        console.error('Error opening website:', err);
        // Fallback to window.open
        window.open(url, '_blank');
      }
    } else {
      window.open(url, '_blank');
    }
  };

  const checkForUpdates = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/itextc/itc-osx/main/version.txt');
      const remoteVersion = await response.text();
      const localVersion = appVersion; // Fetched from package.json via Electron API

      if (localVersion.trim() !== remoteVersion.trim()) {
        const shouldUpdate = window.confirm(
          'A new version of Islāmic Text Copier is available. Please download the latest version from the GitHub repository.\n\nDo you want to visit the GitHub repository to download the latest version?'
        );
        if (shouldUpdate) {
          const releasesUrl = 'https://github.com/itextc/itc-osx/releases';
          if (electronAPI) {
            try {
              await electronAPI.openExternal(releasesUrl);
            } catch (err) {
              console.error('Error opening releases page:', err);
              window.open(releasesUrl, '_blank');
            }
          } else {
            window.open(releasesUrl, '_blank');
          }
        }
      } else {
        alert('You are using the latest version of Islāmic Text Copier.');
      }
    } catch (error) {
      console.error('Update check failed:', error);
      alert('Failed to check for updates');
    }
  };

  return (
    <div className="app">
      {/* Top Navigation */}
      <header className="app-header" role="banner">
        <div className="header-side">
          <button className="nav-button" onClick={openDocumentation}>
            Documentation
          </button>
        </div>
        <h1 className="app-title" aria-label="Islāmic Text Copier heading">Islāmic Text Copier</h1>
        <div className="header-side">
          <button className="nav-button about-button" onClick={openWebsite}>
            About This App
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content" id="main-content">
        <div className="phrases-grid" role="grid" aria-label="Islamic phrases">
          {arabicPhrases.map((item, index) => (
            <PhraseButton
              key={index}
              phrase={item.phrase}
              meaning={item.meaning}
              onCopy={copyToClipboard}
              onMouseEnter={showMeaning}
              onMouseLeave={hideMeaning}
            />
          ))}
        </div>

        <div
          className={`meaning-display ${meaningText ? 'visible' : ''}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {meaningText || 'Hover over a phrase to see its meaning'}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="credits">
          Made by Nāsir Ātif & Abdur-Rahman Bilal
        </div>
        <div className="version-info">
          Version {appVersion}
        </div>
        <button className="footer-button" onClick={checkForUpdates}>
          Check for Updates
        </button>
      </footer>

      {/* Status Toast */}
      <div
        className={`status-display ${statusMessage ? 'visible' : ''}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {statusMessage}
      </div>

      {/* Documentation Modal */}
      {showDocs && <Documentation onClose={closeDocumentation} />}
    </div>
  );
}

export default App;