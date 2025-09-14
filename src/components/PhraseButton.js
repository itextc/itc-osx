import React from 'react';

function PhraseButton({ phrase, meaning, onCopy, onMouseEnter, onMouseLeave, gridPosition }) {
  const handleClick = () => {
    onCopy(phrase);
  };

  const handleMouseEnter = () => {
    onMouseEnter(meaning);
  };

  const handleMouseLeave = () => {
    onMouseLeave();
  };

  // Calculate grid position similar to the original Python layout
  const getGridStyle = () => {
    const col = gridPosition % 4;
    const row = Math.floor(gridPosition / 4);
    
    const leftPositions = [12, 32, 55.2, 81.3];
    const topPositions = [20, 38, 58, 78];
    
    return {
      left: `${leftPositions[col]}%`,
      top: `${topPositions[row]}%`
    };
  };

  return (
    <button
      className="phrase-button"
      style={getGridStyle()}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {phrase}
    </button>
  );
}

export default PhraseButton;