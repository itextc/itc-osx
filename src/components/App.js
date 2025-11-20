import React, { useState, useEffect } from 'react';
import { arabicPhrases } from '../data/phrases';
import PhraseButton from './PhraseButton';
import './App.css';

// Access secure Electron API exposed through preload script
// Falls back gracefully for browser mode
const electronAPI = window.electronAPI || null;

function App() {
  const [statusMessage, setStatusMessage] = useState('');
  const [meaningText, setMeaningText] = useState('');
  const [appVersion, setAppVersion] = useState('1.0.0');

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

  const openDocumentation = async () => {
    if (electronAPI) {
      try {
        const error = await electronAPI.openPath('resources/ITC_Documentation.pdf');
        if (error) {
          console.error('Failed to open documentation:', error);
          alert('Failed to open documentation. Please check if the file exists.');
        }
      } catch (err) {
        console.error('Error opening documentation:', err);
        alert('Failed to open documentation');
      }
    } else {
      alert('Documentation feature not available in browser mode');
    }
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
      <header className="app-header">
        <button className="nav-button" onClick={openDocumentation}>
          Documentation
        </button>
        <button className="nav-button about-button" onClick={openWebsite}>
          About This App
        </button>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="phrases-grid">
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

        <div className={`meaning-display ${meaningText ? 'visible' : ''}`}>
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
      <div className={`status-display ${statusMessage ? 'visible' : ''}`}>
        {statusMessage}
      </div>
    </div>
  );
}

export default App;