// src\pages\CharacterList\components\CharacterDetailModal\effects\ShadowEffect.jsx
import React from 'react';
import './ShadowEffect.css';

const ShadowEffect = () => {
    return (
        <div className="effect-container">
            {/* Render 20 particles for the effect */}
            {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="shadow-dot" style={{ '--i': i }}></div>
            ))}
        </div>
    );
};

export default ShadowEffect;