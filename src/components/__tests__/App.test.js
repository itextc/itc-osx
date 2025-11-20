/**
 * Integration Tests for App Component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { arabicPhrases } from '../../data/phrases';

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Initial Rendering', () => {
    it('renders without crashing', () => {
      render(<App />);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('renders all navigation buttons', () => {
      render(<App />);
      expect(screen.getByText('Documentation')).toBeInTheDocument();
      expect(screen.getByText('About This App')).toBeInTheDocument();
    });

    it('renders all phrase buttons', () => {
      render(<App />);
      const buttons = screen.getAllByRole('button');
      // 16 phrase buttons + 3 navigation/footer buttons = 19 total
      expect(buttons.length).toBeGreaterThanOrEqual(16);
    });

    it('renders version information', () => {
      render(<App />);
      expect(screen.getByText(/Version/i)).toBeInTheDocument();
    });

    it('renders footer with credits', () => {
      render(<App />);
      expect(screen.getByText(/Made by Nāsir Ātif & Abdur-Rahman Bilal/i)).toBeInTheDocument();
    });

    it('renders Check for Updates button', () => {
      render(<App />);
      expect(screen.getByText('Check for Updates')).toBeInTheDocument();
    });
  });

  describe('Phrase Copying Functionality', () => {
    it('copies phrase to clipboard when button is clicked', async () => {
      render(<App />);
      const firstPhrase = arabicPhrases[0].phrase;

      // Find and click the first phrase button
      const phraseButton = screen.getByText(arabicPhrases[0].phrase);
      fireEvent.click(phraseButton);

      // Verify clipboard API was called
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(firstPhrase);
    });

    it('shows status message after copying', async () => {
      render(<App />);
      const firstPhrase = arabicPhrases[0].phrase;

      const phraseButton = screen.getByText(arabicPhrases[0].phrase);
      fireEvent.click(phraseButton);

      // Status message should appear
      await waitFor(() => {
        expect(screen.getByText(`${firstPhrase} copied to clipboard`)).toBeInTheDocument();
      });
    });

    it('auto-hides status message after 3 seconds', async () => {
      jest.useFakeTimers();
      render(<App />);

      const phraseButton = screen.getByText(arabicPhrases[0].phrase);
      fireEvent.click(phraseButton);

      // Status message should be visible immediately
      const statusMessage = await screen.findByText(/copied to clipboard/i);
      expect(statusMessage).toBeInTheDocument();

      // Fast-forward 3 seconds
      jest.advanceTimersByTime(3000);

      // Status message should be gone
      await waitFor(() => {
        expect(screen.queryByText(/copied to clipboard/i)).not.toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it('handles clipboard errors gracefully', async () => {
      // Mock clipboard to fail
      navigator.clipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));

      render(<App />);
      const phraseButton = screen.getByText(arabicPhrases[0].phrase);
      fireEvent.click(phraseButton);

      // Error message should appear
      await waitFor(() => {
        expect(screen.getByText('Failed to copy to clipboard')).toBeInTheDocument();
      });
    });
  });

  describe('Hover Tooltip Functionality', () => {
    it('shows meaning when hovering over phrase button', () => {
      render(<App />);
      const firstPhrase = arabicPhrases[0];

      const phraseButton = screen.getByText(firstPhrase.phrase);
      fireEvent.mouseEnter(phraseButton);

      // Meaning should be displayed
      expect(screen.getByText(firstPhrase.meaning)).toBeInTheDocument();
    });

    it('hides meaning when mouse leaves phrase button', () => {
      render(<App />);
      const firstPhrase = arabicPhrases[0];

      const phraseButton = screen.getByText(firstPhrase.phrase);

      // Show meaning
      fireEvent.mouseEnter(phraseButton);
      expect(screen.getByText(firstPhrase.meaning)).toBeInTheDocument();

      // Hide meaning
      fireEvent.mouseLeave(phraseButton);

      // Default message should be shown instead
      expect(screen.getByText('Hover over a phrase to see its meaning')).toBeInTheDocument();
    });

    it('updates meaning when hovering over different buttons', () => {
      render(<App />);
      const firstPhrase = arabicPhrases[0];
      const secondPhrase = arabicPhrases[1];

      const firstButton = screen.getByText(firstPhrase.phrase);
      const secondButton = screen.getByText(secondPhrase.phrase);

      // Hover over first button
      fireEvent.mouseEnter(firstButton);
      expect(screen.getByText(firstPhrase.meaning)).toBeInTheDocument();

      // Hover over second button
      fireEvent.mouseEnter(secondButton);
      expect(screen.getByText(secondPhrase.meaning)).toBeInTheDocument();
    });
  });

  describe('Keyboard Shortcuts', () => {
    it('copies phrase when Ctrl+1 is pressed', async () => {
      render(<App />);
      const firstPhrase = arabicPhrases[0].phrase;

      // Simulate Ctrl+1 key press
      fireEvent.keyDown(window, { key: '1', ctrlKey: true });

      // Verify clipboard was called
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(firstPhrase);
    });

    it('copies phrase when Cmd+1 is pressed (macOS)', async () => {
      render(<App />);
      const firstPhrase = arabicPhrases[0].phrase;

      // Simulate Cmd+1 key press
      fireEvent.keyDown(window, { key: '1', metaKey: true });

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(firstPhrase);
    });

    it('copies last phrase when Ctrl+0 is pressed', async () => {
      render(<App />);
      const lastPhrase = arabicPhrases[arabicPhrases.length - 1].phrase;

      fireEvent.keyDown(window, { key: '0', ctrlKey: true });

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(lastPhrase);
    });

    it('does not trigger shortcuts without modifier key', async () => {
      render(<App />);

      fireEvent.keyDown(window, { key: '1' });

      expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    });
  });

  describe('Version Management', () => {
    it('fetches and displays version from Electron API', async () => {
      window.electronAPI.getVersion.mockResolvedValueOnce('1.2.3');

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('Version 1.2.3')).toBeInTheDocument();
      });
    });

    it('displays default version if Electron API fails', async () => {
      window.electronAPI.getVersion.mockRejectedValueOnce(new Error('API error'));

      render(<App />);

      // Should fallback to default version
      await waitFor(() => {
        expect(screen.getByText(/Version 1\.0\.0/i)).toBeInTheDocument();
      });
    });

    it('calls getVersion on component mount', async () => {
      render(<App />);

      await waitFor(() => {
        expect(window.electronAPI.getVersion).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('External Link Handlers', () => {
    it('opens documentation when Documentation button is clicked', async () => {
      window.electronAPI.openPath.mockResolvedValueOnce('');

      render(<App />);
      const docButton = screen.getByText('Documentation');

      fireEvent.click(docButton);

      await waitFor(() => {
        expect(window.electronAPI.openPath).toHaveBeenCalledWith(
          'resources/ITC_Documentation.pdf'
        );
      });
    });

    it('opens GitHub when About button is clicked', async () => {
      render(<App />);
      const aboutButton = screen.getByText('About This App');

      fireEvent.click(aboutButton);

      await waitFor(() => {
        expect(window.electronAPI.openExternal).toHaveBeenCalledWith(
          'https://github.com/itextc/itc-osx'
        );
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<App />);

      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
      expect(screen.getByRole('main')).toBeInTheDocument(); // main
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
    });

    it('has ARIA live region for status messages', () => {
      render(<App />);
      const statusDisplays = screen.getAllByRole('status', { hidden: true });
      const statusDisplay = statusDisplays.find(el => el.className.includes('status-display'));
      expect(statusDisplay).toHaveAttribute('aria-live', 'polite');
      expect(statusDisplay).toHaveAttribute('aria-atomic', 'true');
    });

    it('has ARIA label on phrases grid', () => {
      render(<App />);
      const grid = screen.getByRole('grid');
      expect(grid).toHaveAttribute('aria-label', 'Islamic phrases');
    });

    it('has main content landmark with id', () => {
      render(<App />);
      const main = screen.getByRole('main');
      expect(main).toHaveAttribute('id', 'main-content');
    });
  });

  describe('Integration: Full User Flow', () => {
    it('completes full copy workflow: hover, click, see status', async () => {
      render(<App />);
      const firstPhrase = arabicPhrases[0];

      // 1. Hover to see meaning
      const phraseButton = screen.getByText(firstPhrase.phrase);
      fireEvent.mouseEnter(phraseButton);
      expect(screen.getByText(firstPhrase.meaning)).toBeInTheDocument();

      // 2. Click to copy
      fireEvent.click(phraseButton);

      // 3. Verify clipboard was called
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(firstPhrase.phrase);

      // 4. See status message
      await waitFor(() => {
        expect(screen.getByText(`${firstPhrase.phrase} copied to clipboard`)).toBeInTheDocument();
      });
    });

    it('handles multiple phrase copies in sequence', async () => {
      render(<App />);

      // Copy first phrase
      const firstButton = screen.getByText(arabicPhrases[0].phrase);
      fireEvent.click(firstButton);
      await waitFor(() => {
        expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument();
      });

      // Copy second phrase
      const secondButton = screen.getByText(arabicPhrases[1].phrase);
      fireEvent.click(secondButton);
      await waitFor(() => {
        expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument();
      });

      // Verify both calls were made
      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2);
    });
  });
});
