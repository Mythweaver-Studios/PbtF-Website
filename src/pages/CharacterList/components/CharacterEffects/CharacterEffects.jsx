// src/pages/CharacterList/components/CharacterEffects/CharacterEffects.jsx
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CharacterEffects.css';
import { createFlameEffect } from './effects/flame';
import { createHolyEffect } from './effects/holy';
import { createShadowEffect } from './effects/shadow';
import { createWaterEffect } from './effects/water';
import { createHolyFlameEffect } from './effects/holyFlame';

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
        if (!effectType || !effectMap[effectType] || !canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const cleanup = effectMap[effectType](canvas);

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