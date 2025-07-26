// src/pages/Showcase/components/Characters.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Characters.css";
import VoiceLinePlayer from "../../../components/VoiceLinePlayer/VoiceLinePlayer";
import VoiceActorCredit from "../../../components/VoiceActorCredit/VoiceActorCredit";

function CharactersSection({ charactersData }) {
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [isCharacterFading, setIsCharacterFading] = useState(false);

    const [animationKey, setAnimationKey] = useState(0);

    const characterTimeoutRef = useRef(null);
    const indexRef = useRef(currentCharacterIndex);

    useEffect(() => {
        indexRef.current = currentCharacterIndex;
    }, [currentCharacterIndex]);

    const changeCharacter = (newIndex) => {
        setIsCharacterFading(true);
        setTimeout(() => {
            setCurrentCharacterIndex(newIndex);
            setIsCharacterFading(false);
            setAnimationKey(prevKey => prevKey + 1); // Reset animation on character change
        }, 300);
    };

    const selectCharacter = (index) => {
        if (index === currentCharacterIndex) return;
        clearTimeout(characterTimeoutRef.current);
        changeCharacter(index);
    };

    const handleVoicelinePlay = () => {
        // Reset the timer and progress bar animation by changing the key
        setAnimationKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        clearTimeout(characterTimeoutRef.current);
        if (charactersData && charactersData.length > 1) {
            // The 15s countdown for auto-cycling
            characterTimeoutRef.current = setTimeout(() => {
                const newIndex = (indexRef.current + 1) % 3;
                changeCharacter(newIndex);
            }, 15000 + 5000); // Total duration is 15s animation + 5s delay
        }
        return () => clearTimeout(characterTimeoutRef.current);
    }, [animationKey, charactersData]); // animationKey resets the effect

    if (!charactersData || charactersData.length === 0) {
        return <div className="characters-content-wrapper">Loading characters...</div>;
    }

    const currentCharacter = charactersData[currentCharacterIndex];

    const { maxWidth: characterMaxWidth, ...showcaseSpecificStyles } = currentCharacter.showcaseStyles || {};
    const cardInlineStyles = characterMaxWidth ? { maxWidth: characterMaxWidth } : {};

    return (
        <div className="characters-content-wrapper">
            <div
                className={`character-display ${isCharacterFading ? "fading" : ""}`}
                style={{ "--character-accent-color": currentCharacter.accentColor }}
            >
                <div className="character-image-card" style={cardInlineStyles}>
                    <img
                        src={currentCharacter.image || "../../../assets/images/placeholders/character_large.png"}
                        alt={currentCharacter.name}
                        className="character-main-image"
                        style={showcaseSpecificStyles}
                    />
                </div>
                <div className="character-info">
                    <h3>{currentCharacter.name}</h3>
                    <div className="character-title-wrapper">
                        <h4>{currentCharacter.title}</h4>
                        {charactersData.length > 1 && (
                            <div
                                className="character-cycle-progress-bar"
                                key={animationKey} // The key is crucial for resetting the animation
                                style={{ animationDuration: '15s' }} // Static duration
                            ></div>
                        )}
                    </div>
                    <p>{currentCharacter.description}</p>
                    {currentCharacter.hasVoiceLines && (
                        <div onClick={handleVoicelinePlay}>
                            <VoiceLinePlayer
                                voiceLines={currentCharacter.voiceLines}
                                accentColor={currentCharacter.accentColor}
                                mode="simple"
                            />
                        </div>
                    )}
                    {currentCharacter.voiceActor && (
                        <VoiceActorCredit
                            name={currentCharacter.voiceActor.name}
                            url={currentCharacter.voiceActor.url}
                            className="showcase-va-credit"
                        />
                    )}
                </div>
                <Link to="/characterlist" className="view-all-chars-btn">
                    View All Characters
                </Link>
            </div>
            {charactersData.length > 1 && (
                <div className="character-thumbnails">
                    {charactersData.slice(0, 3).map((char, index) => (
                        <div
                            key={char.id}
                            className={`thumbnail-item ${index === currentCharacterIndex ? "active" : ""}`}
                            onClick={() => selectCharacter(index)}
                        >
                            <img src={char.thumbnail || "../../../assets/images/placeholders/thumb.png"} alt={char.name} />
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
            tier: PropTypes.number.isRequired,
            image: PropTypes.string,
            thumbnail: PropTypes.string,
            accentColor: PropTypes.string.isRequired,
            showcaseStyles: PropTypes.object,
            hasVoiceLines: PropTypes.bool,
            voiceLines: PropTypes.array,
            voiceActor: PropTypes.shape({
                name: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
            }),
        })
    ).isRequired,
};

export default CharactersSection;