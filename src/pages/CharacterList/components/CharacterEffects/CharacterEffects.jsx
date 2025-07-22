// src/pages/CharacterList/components/CharacterEffects/CharacterEffects.jsx
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CharacterEffects.css';
import { createFlameEffect } from './effects/Flame';
import { createHolyEffect } from './effects/Holy';
import { createShadowEffect } from './effects/Shadow';
import { createWaterEffect } from './effects/Water';

const effectMap = {
    flame: createFlameEffect,
    holy: createHolyEffect,
    shadow: createShadowEffect,
    water: createWaterEffect,
};

function CharacterEffects({ effectType }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!effectType || !effectMap[effectType] || !canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const cleanup = effectMap[effectType](canvas);

        // Return the cleanup function to be called on component unmount or effectType change
        return () => {
            if (cleanup) {
                cleanup();
            }
        };
    }, [effectType]);

    // If no effect type is specified for the character, render nothing.
    if (!effectType) {
        return null;
    }

    return (
        <div className="effects-container">
            <canvas ref={canvasRef} className="effect-canvas"></canvas>
        </div>
    );
}

CharacterEffects.propTypes = {
    effectType: PropTypes.string,
};

export default CharacterEffects;