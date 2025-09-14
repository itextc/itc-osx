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

  // Check if the phrase is a symbol (short phrases, typically Unicode symbols)
  const isSymbol = phrase.length <= 2;
  // Check if this is the Basmala
  const isBasmala = phrase === '﷽';

  let buttonClass = 'phrase-button';
  if (isBasmala) {
    buttonClass += ' basmala-button';
  } else if (isSymbol) {
    buttonClass += ' symbol-button';
  }

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {phrase}
    </button>
  );
}

export default PhraseButton;