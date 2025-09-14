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
      <div className="app-header">
        <button className="doc-button" onClick={openDocumentation}>
          Documentation
        </button>
        <button className="made-by-button" onClick={openWebsite}>
          Made by<br/>
          Nāsir Ātif<br/>
          &<br/>
          Abdur-Rahman Bilal
        </button>
      </div>

      <div className="phrases-grid">
        {arabicPhrases.map((item, index) => (
          <PhraseButton
            key={index}
            phrase={item.phrase}
            meaning={item.meaning}
            onCopy={copyToClipboard}
            onMouseEnter={showMeaning}
            onMouseLeave={hideMeaning}
            gridPosition={index}
          />
        ))}
      </div>

      <div className="meaning-display">
        {meaningText}
      </div>

      <div className="status-display">
        {statusMessage}
      </div>

      <div className="app-footer">
        <button className="update-button" onClick={checkForUpdates}>
          Check for updates
        </button>
      </div>
    </div>
  );
}

export default App;