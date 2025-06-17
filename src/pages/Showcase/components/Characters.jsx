// src/pages/Showcase/components/Characters.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Characters.css"; // Import component-specific styles

const DEFAULT_CYCLE_DURATION = 30000;

function CharactersSection({ charactersData }) {
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [isCharacterFading, setIsCharacterFading] = useState(false);
    const [animationConfig, setAnimationConfig] = useState({
        duration: DEFAULT_CYCLE_DURATION,
        key: 0,
    });

    const characterTimeoutRef = useRef(null);
    // Use a ref to track the current index to avoid stale closures in the timer.
    const indexRef = useRef(currentCharacterIndex);

    // Keep the ref in sync with the state.
    useEffect(() => {
        indexRef.current = currentCharacterIndex;
    }, [currentCharacterIndex]);

    // Unified function to change character, handles fade and animation reset
    const changeCharacter = (newIndex) => {
        setIsCharacterFading(true);
        setTimeout(() => {
            setCurrentCharacterIndex(newIndex);
            setIsCharacterFading(false);
            // Always reset to the default 30s cycle after a character change
            setAnimationConfig(prev => ({
                duration: DEFAULT_CYCLE_DURATION,
                key: prev.key + 1,
            }));
        }, 300);
    };

    const selectCharacter = (index) => {
        if (index === currentCharacterIndex) return;
        clearTimeout(characterTimeoutRef.current);
        changeCharacter(index);
    };

    // nextCharacter now uses the ref to get the most up-to-date index
    const nextCharacter = () => {
        const newIndex = (indexRef.current + 1) % charactersData.length;
        changeCharacter(newIndex);
    };

    // Main timer effect: now only depends on animationConfig
    useEffect(() => {
        clearTimeout(characterTimeoutRef.current);
        if (charactersData && charactersData.length > 1) {
            characterTimeoutRef.current = setTimeout(nextCharacter, animationConfig.duration);
        }
        return () => clearTimeout(characterTimeoutRef.current);
    }, [animationConfig]); // Re-runs ONLY when the animation needs to restart.


    if (!charactersData || charactersData.length === 0) {
        return (
            <div className="characters-content-wrapper">Loading characters...</div>
        );
    }

    const currentCharacter = charactersData[currentCharacterIndex];

    return (
        <div className="characters-content-wrapper">
            <div
                className={`character-display ${isCharacterFading ? "fading" : ""}`}
                style={{
                    "--character-accent-color": currentCharacter.accentColor,
                }}
            >
                <img
                    src={
                        currentCharacter.image ||
                        "../../../assets/placeholders/character_large.png"
                    }
                    alt={currentCharacter.name}
                    className="character-main-image"
                    style={currentCharacter.styles || {}} // Apply custom styles here
                />
                <div className="character-info">
                    <h3>{currentCharacter.name}</h3>
                    <div className="character-title-wrapper">
                        <h4>{currentCharacter.title}</h4>
                        {charactersData.length > 1 && (
                            <div
                                className="character-cycle-progress-bar"
                                key={animationConfig.key} // Use key from state to force re-mount
                                style={{ animationDuration: `${animationConfig.duration}ms` }} // Use duration from state
                            ></div>
                        )}
                    </div>
                    {/* Star Rating Display */}
                    <div className="character-stars">
                        {Array.from({ length: currentCharacter.stars }, (_, i) => (
                            <span key={i}>★</span>
                        ))}
                    </div>
                    <p>{currentCharacter.description}</p>
                </div>
            </div>
            {charactersData.length > 1 && (
                <div className="character-thumbnails">
                    {charactersData.map((char, index) => (
                        <div
                            key={char.id}
                            className={`thumbnail-item ${index === currentCharacterIndex ? "active" : ""
                                }`}
                            onClick={() => selectCharacter(index)}
                        >
                            <img
                                src={char.thumbnail || "../../../assets/placeholders/thumb.png"}
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

CharactersSection.propTypes = {
    charactersData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            image: PropTypes.string,
            thumbnail: PropTypes.string,
            accentColor: PropTypes.string.isRequired,
            stars: PropTypes.number.isRequired,
            styles: PropTypes.object, // Added for custom image styling
        })
    ).isRequired,
};

export default CharactersSection;