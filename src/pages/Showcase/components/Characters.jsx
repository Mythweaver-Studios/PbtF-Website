// src/pages/Showcase/components/Characters.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Characters.css"; // Import component-specific styles

function CharactersSection({ charactersData }) {
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [isCharacterFading, setIsCharacterFading] = useState(false); // For fade transition
  const characterTimeoutRef = useRef(null); // Stores timeout for auto-cycling

  // Selects a character by index with a fade transition.
  const selectCharacter = (index) => {
    if (index === currentCharacterIndex) return; // No change if same character
    setIsCharacterFading(true);
    clearTimeout(characterTimeoutRef.current); // Stop auto-cycle on manual selection
    setTimeout(() => {
      setCurrentCharacterIndex(index);
      setIsCharacterFading(false);
      // useEffect will handle restarting the timer due to currentCharacterIndex change
    }, 300); // Fade duration
  };

  // Cycles to the next character with a fade transition.
  const nextCharacter = () => {
    setIsCharacterFading(true);
    setTimeout(() => {
      setCurrentCharacterIndex(
        (prevIndex) => (prevIndex + 1) % charactersData.length // Loop through characters
      );
      setIsCharacterFading(false);
    }, 300); // Fade duration
  };

  // Sets up and clears the automatic character cycling timer.
  useEffect(() => {
    clearTimeout(characterTimeoutRef.current); // Clear any existing timeout first
    if (charactersData && charactersData.length > 1) {
      // Auto-cycle only if there's data and more than one character
      characterTimeoutRef.current = setTimeout(nextCharacter, 30000); // Initial or restarted auto-cycle
    }
    return () => clearTimeout(characterTimeoutRef.current); // Cleanup timer on unmount or before next run
  }, [currentCharacterIndex, charactersData]); // Dependencies for effect re-run

  if (!charactersData || charactersData.length === 0) {
    return (
      <div className="characters-content-wrapper">Loading characters...</div>
    ); // Or some placeholder
  }

  const currentCharacter = charactersData[currentCharacterIndex];

  return (
    <div className="characters-content-wrapper">
      <div
        className={`character-display ${isCharacterFading ? "fading" : ""}`}
        style={{
          "--character-accent-color": currentCharacter.accentColor, // Apply dynamic accent color
        }}
      >
        <img
          src={
            currentCharacter.image ||
            "../../../assets/placeholders/character_large.png" // Fallback image
          }
          alt={currentCharacter.name}
          className="character-main-image"
        />
        <div className="character-info">
          <h3>{currentCharacter.name}</h3>
          <h4>{currentCharacter.title}</h4>
          <p>{currentCharacter.description}</p>
        </div>
      </div>
      {charactersData.length > 1 && ( // Only show thumbnails if more than one character
        <div className="character-thumbnails">
          {charactersData.map((char, index) => (
            <div
              key={char.id}
              className={`thumbnail-item ${
                index === currentCharacterIndex ? "active" : ""
              }`}
              onClick={() => selectCharacter(index)}
              // Pause auto-cycle on hover, resume on leave
              onMouseEnter={() => clearTimeout(characterTimeoutRef.current)}
              onMouseLeave={() => {
                if (charactersData.length > 1) {
                  characterTimeoutRef.current = setTimeout(
                    nextCharacter,
                    15000 // Shorter delay after hover
                  );
                }
              }}
            >
              <img
                src={char.thumbnail || "../../../assets/placeholders/thumb.png"} // Fallback thumbnail
                alt={char.name}
              />
              <span>{char.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// PropTypes definition
CharactersSection.propTypes = {
  charactersData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string, // Fallback image is provided in component
      thumbnail: PropTypes.string, // Fallback thumbnail is provided in component
      accentColor: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CharactersSection;
