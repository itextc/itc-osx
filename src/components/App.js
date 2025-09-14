import React, { useState } from 'react';
import { arabicPhrases } from '../data/phrases';
import PhraseButton from './PhraseButton';
import './App.css';

const { shell } = window.require ? window.require('electron') : { shell: null };

function App() {
  const [statusMessage, setStatusMessage] = useState('');
  const [meaningText, setMeaningText] = useState('');

  const copyToClipboard = async (phrase) => {
    try {
      await navigator.clipboard.writeText(phrase);
      setStatusMessage(`${phrase} copied to clipboard`);
      setTimeout(() => setStatusMessage(''), 3000);
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
    if (shell) {
      shell.openPath('resources/ITC_Documentation.pdf');
    } else {
      alert('Documentation feature not available in browser mode');
    }
  };

  const openWebsite = () => {
    if (shell) {
      shell.openExternal('https://github.com/itextc/itc-osx');
    } else {
      window.open('https://github.com/itextc/itc-osx', '_blank');
    }
  };

  const checkForUpdates = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/itextc/itc-osx/main/version.txt');
      const remoteVersion = await response.text();
      const localVersion = '1.0'; // You can read this from package.json or version.txt

      if (localVersion.trim() !== remoteVersion.trim()) {
        const shouldUpdate = window.confirm(
          'A new version of Islāmic Text Copier is available. Please download the latest version from the GitHub repository.\n\nDo you want to visit the GitHub repository to download the latest version?'
        );
        if (shouldUpdate) {
          if (shell) {
            shell.openExternal('https://github.com/itextc/itc-osx/releases');
          } else {
            window.open('https://github.com/itextc/itc-osx/releases', '_blank');
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
          Version 1.0
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