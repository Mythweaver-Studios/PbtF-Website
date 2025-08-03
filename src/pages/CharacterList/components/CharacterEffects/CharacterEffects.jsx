// src/pages/CharacterList/components/CharacterEffects/CharacterEffects.jsx
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CharacterEffects.css';
import { createFlameEffect } from './effects/flame.js';
import { createHolyEffect } from './effects/holy.js';
import { createShadowEffect } from './effects/shadow.js';
import { createWaterEffect } from './effects/water.js';
import { createHolyFlameEffect } from './effects/holyFlame.js';

const effectMap = {
    flame: createFlameEffect,
    holy: createHolyEffect,
    shadow: createShadowEffect,
    water: createWaterEffect,
    holyFlame: createHolyFlameEffect,
};

function CharacterEffects({ effectType }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Clear previous effect before starting a new one
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Get the context and clear the canvas
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        let cleanup;

        if (effectType && effectMap[effectType]) {
            cleanup = effectMap[effectType](canvas);
        }

        return () => {
            if (cleanup) {
                cleanup();
            }
        };
    }, [effectType]);

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