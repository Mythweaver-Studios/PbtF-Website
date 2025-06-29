// src/pages/CharacterList/components/CharacterEffects.jsx
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
    if (!effectType) {
        return null;
    }

    return (
        <div className="effects-container">
            {effectType === 'shadow' && <Particles count={15} className="shadow-particle" />}
            {effectType === 'rain' && <Particles count={30} className="rain-drop" />}
        </div>
    );
}

CharacterEffects.propTypes = {
    effectType: PropTypes.string,
};

export default CharacterEffects;