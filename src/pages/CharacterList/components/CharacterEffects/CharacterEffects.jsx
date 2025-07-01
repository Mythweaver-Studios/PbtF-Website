// src/pages/CharacterList/components/CharacterEffects/CharacterEffects.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './CharacterEffects.css';

// A component to render a specific number of particles for an effect
const Particles = ({ count, className }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className={className} style={{ '--i': i }}></div>
        ))}
    </>
);

Particles.propTypes = {
    count: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired,
};

function CharacterEffects({ effectType }) {
    // If no effect type is specified for the character, render nothing.
    if (!effectType) {
        return null;
    }

    return (
        <div className="effects-container">
            {/* Conditionally render the correct particle effect */}
            {effectType === 'shadow' && <Particles count={20} className="shadow-dot" />}
            {/* Add other effects here in the future, e.g., {effectType === 'fire' && <FireEffect />} */}
        </div>
    );
}

CharacterEffects.propTypes = {
    effectType: PropTypes.string,
};

export default CharacterEffects;