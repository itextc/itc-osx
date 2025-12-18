import React, { useState, useEffect, useCallback } from 'react';
import { arabicPhrases } from '../data/phrases';
import PhraseButton from './PhraseButton';
import Documentation from './Documentation';
import Settings from './Settings';
import { defaultSettings } from '../data/settings';
import './App.css';

// Access secure Electron API exposed through preload script
// Falls back gracefully for browser mode
const electronAPI = window.electronAPI || null;

// Load settings from localStorage or use defaults (browser fallback)
const loadSettingsFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('itc-settings');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error('Failed to load settings:', err);
  }
  return defaultSettings;
};

// Save settings to localStorage (browser fallback)
const saveSettingsToLocalStorage = (settings) => {
  try {
    localStorage.setItem('itc-settings', JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings:', err);
  }
};

function App() {
  const [statusMessage, setStatusMessage] = useState('');
  const [meaningText, setMeaningText] = useState('');
  const [appVersion, setAppVersion] = useState('0.2.2');
  const [showDocs, setShowDocs] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(loadSettingsFromLocalStorage);
  const [globalNotification, setGlobalNotification] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');

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

  // Load settings from Electron main process when available
  useEffect(() => {
    const loadElectronSettings = async () => {
      if (!electronAPI || !electronAPI.isElectron || !electronAPI.getSettings) return;

      try {
        const result = await electronAPI.getSettings();
        if (result && result.success && result.settings) {
          setSettings(result.settings);
        }
      } catch (err) {
        console.error('Failed to load Electron settings:', err);
      }
    };

    loadElectronSettings();
  }, []);

  // Save settings whenever they change
  useEffect(() => {
    if (electronAPI && electronAPI.isElectron && electronAPI.setSettings) {
      electronAPI.setSettings(settings).catch((err) => {
        console.error('Failed to save Electron settings:', err);
      });
      return;
    }

    saveSettingsToLocalStorage(settings);
  }, [settings]);

  // Apply theme from settings
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  // Register/unregister global shortcuts when settings change
  useEffect(() => {
    if (!electronAPI || !electronAPI.registerGlobalShortcut) return;

    const registerShortcuts = async () => {
      // Unregister all first to clean up
      await electronAPI.unregisterAllGlobalShortcuts();

      if (!settings.globalShortcutsEnabled) {
        return;
      }

      // Register each shortcut that has global enabled
      for (const shortcut of settings.shortcuts) {
        if (shortcut.global) {
          // id is a direct index number
          const phraseIndex = typeof shortcut.id === 'number' ? shortcut.id : parseInt(String(shortcut.id).replace('phrase-', ''));
          if (arabicPhrases[phraseIndex]) {
            await electronAPI.registerGlobalShortcut(
              `phrase-${shortcut.id}`,
              shortcut.key,
              arabicPhrases[phraseIndex].phrase
            );
          }
        }
      }
    };

    registerShortcuts();

    // Cleanup on unmount
    return () => {
      electronAPI.unregisterAllGlobalShortcuts();
    };
  }, [settings.shortcuts, settings.globalShortcutsEnabled]);

  // Listen for global shortcut triggered events
  useEffect(() => {
    if (!electronAPI || !electronAPI.onGlobalShortcutTriggered) return;

    const cleanup = electronAPI.onGlobalShortcutTriggered(({ phrase }) => {
      setGlobalNotification(`${phrase} copied to clipboard`);
    });

    return cleanup;
  }, []);

  // Auto-hide global notification after 2 seconds
  useEffect(() => {
    if (globalNotification) {
      const timer = setTimeout(() => {
        setGlobalNotification('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [globalNotification]);

  // Listen for update status from electron-updater
  useEffect(() => {
    if (!electronAPI || !electronAPI.onUpdateStatus) return;

    const cleanup = electronAPI.onUpdateStatus(({ status, version, percent, error }) => {
      switch (status) {
        case 'checking':
          setUpdateStatus('Checking for updates...');
          break;
        case 'available':
          setUpdateStatus(`Update ${version} available`);
          break;
        case 'not-available':
          setUpdateStatus('');
          break;
        case 'downloading':
          setUpdateStatus(`Downloading update: ${Math.round(percent || 0)}%`);
          break;
        case 'downloaded':
          setUpdateStatus(`Update ${version} ready to install`);
          break;
        case 'error':
          setUpdateStatus(`Update error: ${error}`);
          setTimeout(() => setUpdateStatus(''), 5000);
          break;
        default:
          break;
      }
    });

    return cleanup;
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

  // Copy to clipboard function (defined before keyboard handler)
  const copyToClipboard = useCallback(async (phrase) => {
    try {
      await navigator.clipboard.writeText(phrase);
      setStatusMessage(`${phrase} copied to clipboard`);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setStatusMessage('Failed to copy to clipboard');
    }
  }, []);

  // Keyboard shortcuts for quick copying (Option/Alt + key) and app controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check if user is typing in an input field
      const isInputFocused =
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable;

      if (isInputFocused) return;

      // Cmd/Ctrl + , to open settings
      if ((e.metaKey || e.ctrlKey) && e.code === 'Comma') {
        e.preventDefault();
        setShowSettings(true);
        return;
      }

      // Only handle Option/Alt key combinations for phrase shortcuts
      if (!e.altKey) return;

      e.preventDefault();

      // Find matching shortcut from settings
      const shortcut = settings.shortcuts.find(s => s.key === e.code);
      if (shortcut) {
        // Find the phrase by id (id is a direct index number)
        const phraseIndex = typeof shortcut.id === 'number' ? shortcut.id : parseInt(String(shortcut.id).replace('phrase-', ''));
        if (arabicPhrases[phraseIndex]) {
          copyToClipboard(arabicPhrases[phraseIndex].phrase);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [settings.shortcuts, copyToClipboard]);

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

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
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
    // Use electron-updater if available
    if (electronAPI && electronAPI.checkForUpdates) {
      try {
        setUpdateStatus('Checking for updates...');
        const result = await electronAPI.checkForUpdates();
        if (!result.success) {
          setUpdateStatus(`Update check failed: ${result.error}`);
          setTimeout(() => setUpdateStatus(''), 5000);
        }
        // Status updates will come through onUpdateStatus listener
      } catch (error) {
        console.error('Update check failed:', error);
        setUpdateStatus('Failed to check for updates');
        setTimeout(() => setUpdateStatus(''), 5000);
      }
      return;
    }

    // Fallback to manual version check for browser mode
    try {
      const response = await fetch('https://raw.githubusercontent.com/itextc/itc-osx/main/version.txt');
      const remoteVersion = await response.text();
      const localVersion = appVersion;

      if (localVersion.trim() !== remoteVersion.trim()) {
        const shouldUpdate = window.confirm(
          'A new version of Islāmic Text Copier is available. Would you like to visit the GitHub releases page?'
        );
        if (shouldUpdate) {
          const releasesUrl = 'https://github.com/itextc/itc-osx/releases';
          window.open(releasesUrl, '_blank');
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
          <button className="nav-button" onClick={openSettings} title="Settings (⌘,)">
            Settings
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
          {updateStatus && <span className="update-status"> • {updateStatus}</span>}
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

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          settings={settings}
          onSave={handleSettingsChange}
          onClose={closeSettings}
        />
      )}

      {/* Global Shortcut Notification Overlay */}
      <div
        className={`global-notification ${globalNotification ? 'visible' : ''}`}
        role="alert"
        aria-live="assertive"
      >
        {globalNotification}
      </div>
    </div>
  );
}

export default App;