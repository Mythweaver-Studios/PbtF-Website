// src/pages/CharacterList/components/CharacterGrid/CharacterGrid.jsx
import React from 'react';
import PropTypes from 'prop-types';
import CharacterGridCard from '../CharacterGridCard/CharacterGridCard';
import { TIER_DATA } from '../../../../utils/tierData';
import './CharacterGrid.css';

function CharacterGrid({ characters, tierFilter, isAnimating, onCardClick, onClearFilters }) {
    return (
        <div className={`character-grid ${isAnimating ? 'grid-animating' : ''}`}>
            {characters.map((character) => {
                // Determine if the card matches the current filter
                const isMatch = !tierFilter || TIER_DATA[character.tier]?.name === tierFilter.value;
                const cardClassName = tierFilter ? (isMatch ? 'highlighted' : 'dimmed') : '';

                // Define the click handler based on whether the card is a match
                const handleClick = () => {
                    if (isMatch) {
                        onCardClick(character);
                    } else {
                        onClearFilters();
                    }
                };

                return (
                    <CharacterGridCard
                        key={character.id}
                        character={character}
                        className={cardClassName}
                        onClick={handleClick}
                    />
                );
            })}
        </div>
    );
}

CharacterGrid.propTypes = {
    characters: PropTypes.array.isRequired,
    tierFilter: PropTypes.object,
    isAnimating: PropTypes.bool.isRequired,
    onCardClick: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired,
};

export default CharacterGrid;