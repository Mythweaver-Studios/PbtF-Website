// src/pages/CharacterList/components/effects/RainEffect.jsx
import React from 'react';
import './RainEffect.css';

const RainEffect = () => {
    return (
        <div className="effect-container">
            {/* Render 30 particles for the effect */}
            {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="rain-drop" style={{ '--i': i }}></div>
            ))}
        </div>
    );
};

export default RainEffect;