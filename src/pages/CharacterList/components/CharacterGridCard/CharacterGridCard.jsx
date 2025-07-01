// src/pages/CharacterList/components/CharacterGridCard/CharacterGridCard.jsx
import React from "react";
import PropTypes from "prop-types";
import "./CharacterGridCard.css";

function CharacterGridCard({ character, onClick, className = '' }) {

    // Get only the first name for display on the card
    const firstName = character.name.split(' ')[0];

    return (
        <div
            className={`grid-card-container ${className}`}
            onClick={onClick}
            style={{ '--char-accent-color': character.accentColor }}
        >
            <div className="grid-card-border">
                <div className="grid-card-inner">
                    {character.thumbnail ? (
                        <img
                            src={character.thumbnail}
                            alt={character.name}
                            className="grid-card-image"
                        />
                    ) : (
                        <div className="grid-card-unknown">
                            <span className="unknown-char-icon">?</span>
                        </div>
                    )}
                </div>
            </div>
            <p className="grid-card-name">{firstName}</p>
        </div>
    );
}

CharacterGridCard.propTypes = {
    character: PropTypes.shape({
        thumbnail: PropTypes.string,
        name: PropTypes.string.isRequired,
        tier: PropTypes.number.isRequired,
        accentColor: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default CharacterGridCard;