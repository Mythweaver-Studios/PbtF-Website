// src/pages/CharacterList/components/CharacterDetailModal.jsx
import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import "./CharacterDetailModal.css";

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
    const parts = text.split(/(\[\[.*?\]\])/g); // Split by [[...]]

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
                // Handle newlines in the non-blurred parts
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

function CharacterDetailModal({ character, onClose }) {
    const [isClosing, setIsClosing] = useState(false);

    // This function triggers the closing animation
    const handleClose = () => {
        setIsClosing(true);
        // Wait for animation to finish before calling parent's onClose
        setTimeout(() => {
            onClose();
        }, 300); // Duration should match CSS animation
    };

    // Effect for closing modal with Escape key
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
    }, []); // Empty dependency array means this effect runs once on mount

    // Gender icon renderer
    const renderGenderIcon = (gender) => {
        if (gender === 'Male') return <span className="gender-icon male">♂</span>;
        if (gender === 'Female') return <span className="gender-icon female">♀</span>;
        return null;
    };

    // Star renderer
    const renderStars = (current, max, isHidden) => {
        const stars = [];
        for (let i = 0; i < max; i++) {
            let className = 'star-empty';
            if (i < current) {
                className = 'star-filled';
            } else if (isHidden) {
                className += ' blurred';
            }
            stars.push(<span key={i} className={className}>★</span>);
        }
        return <div className="modal-char-stars">{stars}</div>;
    };

    return (
        <div className={`modal-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={handleClose}>×</button>
                <div className="modal-left">
                    {character.image ? (
                        <img
                            src={character.image}
                            alt={character.name}
                            className="modal-char-image"
                            style={character.showcaseStyles || {}}
                        />
                    ) : (
                        <div className="modal-char-appearance">
                            <h4 className="modal-section-title">Appearance</h4>
                            <p>{character.appearanceDescription}</p>
                        </div>
                    )}
                </div>
                <div className="modal-right">
                    <h2 className="modal-char-name">{character.name} {renderGenderIcon(character.gender)}</h2>
                    <h3 className={`modal-char-title ${character.title.includes("?") ? "blurred-text" : ""}`}>{character.title}</h3>
                    {renderStars(character.stars, character.maxStars, character.maxStarsHidden)}
                    <div className="modal-divider"></div>

                    <div className="modal-char-details">
                        <p><strong>Full Name:</strong> <span className={character.fullName.includes("Unknown") ? "blurred-text" : ""}>{character.fullName}</span></p>
                        <p><strong>Species:</strong> <span className={character.species.includes("Unknown") ? "blurred-text" : ""}>{character.species}</span></p>
                        <p><strong>Class:</strong> <span className={character.class.includes("Unknown") ? "blurred-text" : ""}>{character.class}</span></p>
                        <p><strong>World:</strong> <span className={character.world.includes("Unknown") ? "blurred-text" : ""}>{character.world}</span></p>
                    </div>

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
                </div>
            </div>
        </div>
    );
}

CharacterDetailModal.propTypes = {
    character: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

StatBar.propTypes = {
    value: PropTypes.number.isRequired,
};

ParsedStory.propTypes = {
    text: PropTypes.string,
};

export default CharacterDetailModal;