import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { keyCodeToLabel } from '../data/settings';
import './Settings.css';

function Settings({ settings, onSave, onClose }) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [recordingShortcutId, setRecordingShortcutId] = useState(null);

  // Handle keyboard shortcut recording
  useEffect(() => {
    if (recordingShortcutId === null) return;

    const handleKeyDown = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Only accept Option/Alt + key combinations
      if (!e.altKey) return;

      const keyCode = e.code;
      
      // Ignore modifier keys alone
      if (['AltLeft', 'AltRight', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'MetaLeft', 'MetaRight'].includes(keyCode)) {
        return;
      }

      // Check if key is already used by another shortcut
      const existingShortcut = localSettings.shortcuts.find(
        s => s.key === keyCode && s.id !== recordingShortcutId
      );

      if (existingShortcut) {
        alert(`This key is already assigned to another phrase.`);
        return;
      }

      // Update the shortcut
      setLocalSettings(prev => ({
        ...prev,
        shortcuts: prev.shortcuts.map(s =>
          s.id === recordingShortcutId
            ? { ...s, key: keyCode, label: keyCodeToLabel[keyCode] || keyCode }
            : s
        )
      }));

      setRecordingShortcutId(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [recordingShortcutId, localSettings.shortcuts]);

  const handleThemeChange = (theme) => {
    setLocalSettings(prev => ({ ...prev, theme }));
  };

  const handleGlobalToggle = (shortcutId) => {
    setLocalSettings(prev => ({
      ...prev,
      shortcuts: prev.shortcuts.map(s =>
        s.id === shortcutId ? { ...s, global: !s.global } : s
      )
    }));
  };

  const handleGlobalShortcutsToggle = () => {
    setLocalSettings(prev => ({
      ...prev,
      globalShortcutsEnabled: !prev.globalShortcutsEnabled
    }));
  };

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const startRecording = (shortcutId) => {
    setRecordingShortcutId(shortcutId);
  };

  const cancelRecording = () => {
    setRecordingShortcutId(null);
  };

  return (
    <div className="settings-overlay" onClick={handleCancel}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="settings-close" onClick={handleCancel} aria-label="Close settings">
            ✕
          </button>
        </div>

        <div className="settings-content">
          {/* Theme Section */}
          <section className="settings-section">
            <h3>Appearance</h3>
            <div className="theme-selector">
              <label className="theme-option">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={localSettings.theme === 'dark'}
                  onChange={() => handleThemeChange('dark')}
                />
                <span className="theme-preview dark-preview">
                  <span className="theme-label">Dark</span>
                </span>
              </label>
              <label className="theme-option">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={localSettings.theme === 'light'}
                  onChange={() => handleThemeChange('light')}
                />
                <span className="theme-preview light-preview">
                  <span className="theme-label">Light</span>
                </span>
              </label>
            </div>
          </section>

          {/* Keyboard Shortcuts Section */}
          <section className="settings-section">
            <h3>Keyboard Shortcuts</h3>
            <p className="settings-description">
              Click on a shortcut to change it. Press Option + your desired key.
            </p>

            {/* Global shortcuts master toggle */}
            <div className="global-toggle-row">
              <label className="toggle-label">
                <span>Enable global shortcuts (work outside the app)</span>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={localSettings.globalShortcutsEnabled}
                    onChange={handleGlobalShortcutsToggle}
                  />
                  <span className="toggle-slider"></span>
                </div>
              </label>
            </div>

            <div className="shortcuts-table">
              <div className="shortcuts-header">
                <span className="col-phrase">Phrase</span>
                <span className="col-shortcut">Shortcut</span>
                <span className="col-global">Global</span>
              </div>

              {localSettings.shortcuts.map((shortcut) => (
                <div key={shortcut.id} className="shortcut-row">
                  <span className="col-phrase arabic-text">{shortcut.phrase}</span>
                  <button
                    className={`col-shortcut shortcut-key ${recordingShortcutId === shortcut.id ? 'recording' : ''}`}
                    onClick={() => recordingShortcutId === shortcut.id ? cancelRecording() : startRecording(shortcut.id)}
                  >
                    {recordingShortcutId === shortcut.id ? (
                      <span className="recording-text">Press Option + key...</span>
                    ) : (
                      <span>⌥ {shortcut.label}</span>
                    )}
                  </button>
                  <label className="col-global">
                    <div className="toggle-switch small">
                      <input
                        type="checkbox"
                        checked={shortcut.global}
                        disabled={!localSettings.globalShortcutsEnabled}
                        onChange={() => handleGlobalToggle(shortcut.id)}
                      />
                      <span className="toggle-slider"></span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="settings-footer">
          <button className="settings-btn cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="settings-btn save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Settings;
