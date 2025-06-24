// src/pages/CharacterList/components/CharacterDetailModal.jsx
import React, { useEffect } from "react";
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

function CharacterDetailModal({ character, onClose }) {
    // Effect for closing modal with Escape key
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    // Gender icon renderer
    const renderGenderIcon = (gender) => {
        if (gender === 'Male') return <span className="gender-icon male">♂</span>;
        if (gender === 'Female') return <span className="gender-icon female">♀</span>;
        return null;
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>×</button>
                <div className="modal-left">
                    <img
                        src={character.image || "../../../assets/placeholders/character_large.png"}
                        alt={character.name}
                        className="modal-char-image"
                        style={character.styles || {}}
                    />
                </div>
                <div className="modal-right">
                    <h2 className="modal-char-name">{character.name} {renderGenderIcon(character.gender)}</h2>
                    <h3 className="modal-char-title">{character.title}</h3>
                    <div className="modal-divider"></div>

                    <div className="modal-char-details">
                        <p><strong>Full Name:</strong> <span className={character.fullName.includes("??") ? "blurred-text" : ""}>{character.fullName}</span></p>
                        <p><strong>Species:</strong> {character.species}</p>
                        <p><strong>Class:</strong> {character.class}</p>
                    </div>

                    <div className="modal-char-story">
                        <p>{character.longDescription}</p>
                    </div>

                    <div className="modal-stats-section">
                        <h4 className="modal-section-title">Base Stats</h4>
                        <div className="modal-stats-grid">
                            {Object.entries(character.stats).map(([statName, statValue]) => (
                                <div key={statName} className="stat-item">
                                    <span className="stat-name">{statName}</span>
                                    <StatBar value={statValue} />
                                </div>
                            ))}
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
};

StatBar.propTypes = {
    value: PropTypes.number.isRequired,
};

export default CharacterDetailModal;