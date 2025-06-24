// src/pages/CharacterList/components/CharacterGridCard.jsx
import React from "react";
import PropTypes from "prop-types";
import "./CharacterGridCard.css";

function CharacterGridCard({ character, onClick }) {
    return (
        <div className="grid-card-container" onClick={onClick}>
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
                    <div className="grid-card-info-bar">
                        <div className="grid-card-stars">
                            {Array.from({ length: character.stars }, (_, i) => (
                                <span key={i}>◆</span>
                            ))}
                        </div>
                    </div>
                    <div className="grid-card-corner"></div>
                </div>
            </div>
            <p className="grid-card-name">{character.name}</p>
        </div>
    );
}

CharacterGridCard.propTypes = {
    character: PropTypes.shape({
        thumbnail: PropTypes.string,
        name: PropTypes.string.isRequired,
        stars: PropTypes.number.isRequired,
        showcaseStyles: PropTypes.object,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default CharacterGridCard;