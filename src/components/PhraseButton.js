import React from 'react';

function PhraseButton({ phrase, meaning, onCopy, onMouseEnter, onMouseLeave }) {
  const handleClick = () => {
    onCopy(phrase);
  };

  const handleMouseEnter = () => {
    onMouseEnter(meaning);
  };

  const handleMouseLeave = () => {
    onMouseLeave();
  };

  return (
    <button
      className="phrase-button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {phrase}
    </button>
  );
}

export default PhraseButton;