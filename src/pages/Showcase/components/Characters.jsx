// src/pages/Showcase/components/Characters.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Characters.css";
import { charactersData } from "../data/charactersData";
import VoiceLinePlayer from "../../../components/features/VoiceLinePlayer/VoiceLinePlayer";
import VoiceActorCredit from "../../../components/ui/VoiceActorCredit/VoiceActorCredit";
import ArrowButton from "../../../components/ui/ArrowButton/ArrowButton";
import useBreakpoint from "../../../hooks/useBreakpoint";

const showcasedCharacters = charactersData.filter(char => char.showcased);

function CharactersSection() {
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [isCharacterFading, setIsCharacterFading] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);
    const { isMobile } = useBreakpoint();
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
            setAnimationKey(prevKey => prevKey + 1);
        }, 300);
    };
    
    const nextCharacter = () => {
        const newIndex = (currentCharacterIndex + 1) % showcasedCharacters.length;
        selectCharacter(newIndex);
    };
    
    const previousCharacter = () => {
        const newIndex = (currentCharacterIndex - 1 + showcasedCharacters.length) % showcasedCharacters.length;
        selectCharacter(newIndex);
    };

    const selectCharacter = (index) => {
        if (index === currentCharacterIndex) return;
        clearTimeout(characterTimeoutRef.current);
        changeCharacter(index);
    };

    const handleVoicelinePlay = () => {
        setAnimationKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        clearTimeout(characterTimeoutRef.current);
        if (showcasedCharacters.length > 1) {
            characterTimeoutRef.current = setTimeout(() => {
                const newIndex = (indexRef.current + 1) % showcasedCharacters.length;
                changeCharacter(newIndex);
            }, 15000 + 5000);
        }
        return () => clearTimeout(characterTimeoutRef.current);
    }, [animationKey]);

    if (showcasedCharacters.length === 0) {
        return <div className="characters-content-wrapper">Loading characters...</div>;
    }

    const currentCharacter = showcasedCharacters[currentCharacterIndex];
    const cardInlineStyles = currentCharacter.showcaseStyles?.maxWidth ? { maxWidth: currentCharacter.showcaseStyles.maxWidth } : {};

    return (
        <div className="characters-content-wrapper">
            <div
                className={`character-display ${isCharacterFading ? "fading" : ""}`}
                style={{ "--character-accent-color": currentCharacter.accentColor }}
            >
                <div className="character-image-card" style={cardInlineStyles}>
                    <div className="character-image-framer" style={currentCharacter.showcaseStyles || {}}>
                        <img
                            src={currentCharacter.showcaseImage || "../../../assets/images/placeholders/character_large.png"}
                            alt={currentCharacter.name}
                            className="character-main-image"
                        />
                    </div>
                </div>
                <div className="character-info">
                    <h3>{currentCharacter.name}</h3>
                    <div className="character-title-wrapper">
                        <h4>{currentCharacter.title}</h4>
                        {showcasedCharacters.length > 1 && (<div className="character-cycle-progress-bar" key={animationKey} style={{ animationDuration: '15s' }}></div>)}
                    </div>
                    <p>{currentCharacter.description}</p>
                    {currentCharacter.hasVoiceLines && (<div onClick={handleVoicelinePlay}><VoiceLinePlayer voiceLines={currentCharacter.voiceLines} accentColor={currentCharacter.accentColor} mode="simple" /></div>)}
                    {currentCharacter.voiceActor && (<VoiceActorCredit name={currentCharacter.voiceActor.name} url={currentCharacter.voiceActor.url} className="showcase-va-credit" />)}
                    <Link to="/characterlist" className="view-all-chars-btn">View Champions</Link>
                </div>
            </div>

            {!isMobile ? (
                <div className="character-thumbnails">
                    {showcasedCharacters.map((char, index) => (
                        <div
                            key={char.id}
                            className={`thumbnail-item ${index === currentCharacterIndex ? "active" : ""}`}
                            onClick={() => selectCharacter(index)}
                            style={{ '--char-accent-color': char.accentColor }}
                        >
                            <div className="thumbnail-visuals">
                                <div className="thumbnail-image-container">
                                    <img src={char.thumbnail || "../../../assets/images/placeholders/thumb.png"} alt={char.name} />
                                </div>
                            </div>
                            <span className="thumbnail-name">{char.name.split(' ')[0]}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="character-nav-controls">
                    <ArrowButton onClick={previousCharacter} direction="left" />
                    <div className="character-dots">
                        {showcasedCharacters.map((char, index) => (<button key={char.id} className={`dot ${index === currentCharacterIndex ? "active" : ""}`} onClick={() => selectCharacter(index)} aria-label={`Select character ${char.name}`} />))}
                    </div>
                    <ArrowButton onClick={nextCharacter} direction="right" />
                </div>
            )}
        </div>
    );
}

export default CharactersSection;