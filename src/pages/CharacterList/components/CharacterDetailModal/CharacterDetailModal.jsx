// src/pages/CharacterList/components/CharacterDetailModal/CharacterDetailModal.jsx
import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import "./CharacterDetailModal.css";
import { TIER_DATA } from "../../../../utils/tierData";
import CharacterEffects from "../CharacterEffects/CharacterEffects";
import VoiceLinePlayer from "../../../../components/VoiceLinePlayer/VoiceLinePlayer";
import VoiceActorCredit from "../../../../components/VoiceActorCredit/VoiceActorCredit";

// Helper to render stat bars
const StatBar = ({ value }) => (
    <div className="stat-bar-container">
        {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={`stat-bar-segment ${i < value ? 'filled' : ''}`}></div>
        ))}
    </div>
);

// Helper to render story with blurred parts
const ParsedStory = ({ text }) => {
    if (!text) return null;
    const parts = text.split(/(\[\[.*?\]\])/g);

    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('[[') && part.endsWith(']]')) {
                    return (
                        <span key={index} className="blurred-text">
                            {part.substring(2, part.length - 2)}
                        </span>
                    );
                }
                return part.split('\n').map((line, lineIndex) => (
                    <Fragment key={`${index}-${lineIndex}`}>
                        {line}
                        {lineIndex < part.split('\n').length - 1 && <br />}
                    </Fragment>
                ));
            })}
        </>
    );
};

function CharacterDetailModal({ character, onClose, onNavigateNext, onNavigatePrevious }) {
    const [isClosing, setIsClosing] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const tierInfo = TIER_DATA[character.tier] || TIER_DATA[1];

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleNavigation = (direction) => {
        setIsNavigating(true);
        setTimeout(() => {
            if (direction === "next") {
                onNavigateNext();
            } else {
                onNavigatePrevious();
            }
        }, 250);
    };

    useEffect(() => {
        setIsNavigating(false);
    }, [character.id]);


    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);

    const renderGenderIcon = (gender) => {
        if (gender === 'Male') return <span className="gender-icon male">♂</span>;
        if (gender === 'Female') return <span className="gender-icon female">♀</span>;
        return null;
    };

    const shouldShowAppearance = !character.image || character.id === 3;

    return (
        <div className={`modal-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={handleClose}>{'\u00D7'}</button>
                <div className="modal-left">
                    {shouldShowAppearance ? (
                        <div className="modal-char-appearance">
                            <h4 className="modal-section-title">Appearance</h4>
                            <p>{character.appearanceDescription}</p>
                        </div>
                    ) : (
                        <img
                            src={character.image}
                            alt={character.name}
                            className="modal-char-image"
                            style={character.showcaseStyles || {}}
                        />
                    )}
                </div>
                <div className="modal-right">
                    <CharacterEffects effectType={character.specialEffect} />
                    <div className={`modal-right-content-wrapper ${isNavigating ? 'navigating' : ''}`}>
                        <div className="modal-title-header">
                            <h2 className="modal-char-name">{character.name} {renderGenderIcon(character.gender)}</h2>
                            <div
                                className="modal-char-tier"
                                style={{ background: tierInfo.color, color: tierInfo.textColor }}
                            >
                                {tierInfo.name}
                            </div>
                        </div>
                        <h3 className={`modal-char-title ${character.title.includes("?") ? "blurred-text" : ""}`}>{character.title}</h3>
                        <div className="modal-divider"></div>
                        <div className="modal-char-details">
                            <p><strong>Full Name:</strong> <span className={character.fullName.includes("Unknown") ? "blurred-text" : ""}>{character.fullName}</span></p>
                            <p><strong>Species:</strong> <span className={character.species.includes("Unknown") ? "blurred-text" : ""}>{character.species}</span></p>
                            <p><strong>Class:</strong> <span className={character.class.includes("Unknown") ? "blurred-text" : ""}>{character.class}</span></p>
                            <p><strong>World:</strong> <span className={character.world.includes("Unknown") ? "blurred-text" : ""}>{character.world}</span></p>
                        </div>
                        {character.hasVoiceLines && (
                            <VoiceLinePlayer
                                voiceLines={character.voiceLines}
                                accentColor={character.accentColor}
                                mode="full"
                            />
                        )}
                        {character.voiceActor && (
                            <VoiceActorCredit
                                name={character.voiceActor.name}
                                url={character.voiceActor.url}
                                className="modal-va-credit"
                            />
                        )}
                        <div className="modal-char-story">
                            <p><ParsedStory text={character.longDescription} /></p>
                        </div>
                        <div className="modal-stats-section">
                            <h4 className="modal-section-title">Base Stats</h4>
                            {character.statsBlurred ? (
                                <div className="modal-stats-grid">
                                    {Object.keys(character.stats).map((statName) => (
                                        <div key={statName} className="stat-item">
                                            <span className="stat-name">{statName}</span>
                                            <div className="stat-bar-unknown">?</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="modal-stats-grid">
                                    {Object.entries(character.stats).map(([statName, statValue]) => (
                                        <div key={statName} className="stat-item">
                                            <span className="stat-name">{statName}</span>
                                            <StatBar value={statValue} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="modal-navigation">
                            <button className="nav-arrow-button" onClick={() => handleNavigation("prev")} aria-label="Previous Character">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                                </svg>
                            </button>
                            <p className="nav-character-name">{character.name.split(' ')[0]}</p>
                            <button className="nav-arrow-button" onClick={() => handleNavigation("next")} aria-label="Next Character">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

CharacterDetailModal.propTypes = {
    character: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onNavigateNext: PropTypes.func.isRequired,
    onNavigatePrevious: PropTypes.func.isRequired,
};

StatBar.propTypes = {
    value: PropTypes.number.isRequired,
};

ParsedStory.propTypes = {
    text: PropTypes.string,
};

export default CharacterDetailModal;