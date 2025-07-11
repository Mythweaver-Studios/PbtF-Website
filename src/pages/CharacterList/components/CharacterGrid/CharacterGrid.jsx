// src/pages/CharacterList/components/CharacterGrid/CharacterGrid.jsx
import React from 'react';
import PropTypes from 'prop-types';
import CharacterGridCard from '../CharacterGridCard/CharacterGridCard';
import './CharacterGrid.css';

function CharacterGrid({ characters, isAnimating, onCardClick }) {
    return (
        <div className={`character-grid ${isAnimating ? 'grid-animating' : ''}`}>
            {characters.map((character) => (
                <CharacterGridCard
                    key={character.id}
                    character={character}
                    onClick={() => onCardClick(character)}
                />
            ))}
        </div>
    );
}

CharacterGrid.propTypes = {
    characters: PropTypes.array.isRequired,
    isAnimating: PropTypes.bool.isRequired,
    onCardClick: PropTypes.func.isRequired,
};

export default CharacterGrid;