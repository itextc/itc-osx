/**
 * Unit Tests for PhraseButton Component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PhraseButton from '../PhraseButton';

describe('PhraseButton Component', () => {
  // Mock functions
  const mockOnCopy = jest.fn();
  const mockOnMouseEnter = jest.fn();
  const mockOnMouseLeave = jest.fn();

  // Test props
  const defaultProps = {
    phrase: 'ﷺ',
    meaning: "Sallá Allāhu ʿAlayhī wa as-Salam",
    onCopy: mockOnCopy,
    onMouseEnter: mockOnMouseEnter,
    onMouseLeave: mockOnMouseLeave,
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the phrase text correctly', () => {
      render(<PhraseButton {...defaultProps} />);
      expect(screen.getByText('ﷺ')).toBeInTheDocument();
    });

    it('renders as a button element', () => {
      render(<PhraseButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });

    it('has type="button" attribute', () => {
      render(<PhraseButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Accessibility', () => {
    it('has aria-label with meaning', () => {
      render(<PhraseButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', `Copy ${defaultProps.meaning}`);
    });

    it('has title attribute with meaning', () => {
      render(<PhraseButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', defaultProps.meaning);
    });
  });

  describe('Styling Classes', () => {
    it('applies phrase-button base class', () => {
      render(<PhraseButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('phrase-button');
    });

    it('applies symbol-button class for short phrases (≤2 chars)', () => {
      render(<PhraseButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('symbol-button');
    });

    it('does not apply symbol-button class for longer phrases', () => {
      const longPhraseProps = {
        ...defaultProps,
        phrase: 'الحَمْدُ لله',
      };
      render(<PhraseButton {...longPhraseProps} />);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('symbol-button');
    });

    it('applies basmala-button class for Basmala', () => {
      const basmalaProps = {
        ...defaultProps,
        phrase: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      };
      render(<PhraseButton {...basmalaProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('basmala-button');
    });

    it('does not apply basmala-button for non-Basmala phrases', () => {
      render(<PhraseButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('basmala-button');
    });
  });

  describe('Event Handlers', () => {
    it('calls onCopy with phrase when clicked', () => {
      render(<PhraseButton {...defaultProps} />);
      const button = screen.getByRole('button');

      fireEvent.click(button);

      expect(mockOnCopy).toHaveBeenCalledTimes(1);
      expect(mockOnCopy).toHaveBeenCalledWith(defaultProps.phrase);
    });

    it('calls onMouseEnter with meaning when mouse enters', () => {
      render(<PhraseButton {...defaultProps} />);
      const button = screen.getByRole('button');

      fireEvent.mouseEnter(button);

      expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);
      expect(mockOnMouseEnter).toHaveBeenCalledWith(defaultProps.meaning);
    });

    it('calls onMouseLeave when mouse leaves', () => {
      render(<PhraseButton {...defaultProps} />);
      const button = screen.getByRole('button');

      fireEvent.mouseLeave(button);

      expect(mockOnMouseLeave).toHaveBeenCalledTimes(1);
      expect(mockOnMouseLeave).toHaveBeenCalledWith();
    });

    it('handles multiple clicks correctly', () => {
      render(<PhraseButton {...defaultProps} />);
      const button = screen.getByRole('button');

      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(mockOnCopy).toHaveBeenCalledTimes(3);
    });

    it('handles hover sequence correctly', () => {
      render(<PhraseButton {...defaultProps} />);
      const button = screen.getByRole('button');

      fireEvent.mouseEnter(button);
      expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);

      fireEvent.mouseLeave(button);
      expect(mockOnMouseLeave).toHaveBeenCalledTimes(1);

      fireEvent.mouseEnter(button);
      expect(mockOnMouseEnter).toHaveBeenCalledTimes(2);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty phrase gracefully', () => {
      const emptyProps = {
        ...defaultProps,
        phrase: '',
      };
      render(<PhraseButton {...emptyProps} />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe('');
    });

    it('handles special Unicode characters', () => {
      const unicodeProps = {
        ...defaultProps,
        phrase: '﷽',
        meaning: 'Bismillāh',
      };
      render(<PhraseButton {...unicodeProps} />);
      expect(screen.getByText('﷽')).toBeInTheDocument();
    });

    it('handles long meanings in aria-label', () => {
      const longMeaningProps = {
        ...defaultProps,
        meaning: 'A very long meaning text that should still work correctly',
      };
      render(<PhraseButton {...longMeaningProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', `Copy ${longMeaningProps.meaning}`);
    });
  });

  describe('PropTypes Validation', () => {
    // Console error spy to catch PropTypes warnings
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    afterEach(() => {
      consoleError.mockClear();
    });

    afterAll(() => {
      consoleError.mockRestore();
    });

    it('renders without PropTypes warnings when all props are provided', () => {
      render(<PhraseButton {...defaultProps} />);
      expect(consoleError).not.toHaveBeenCalled();
    });
  });
});
