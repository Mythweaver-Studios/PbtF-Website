// src/components/VoiceActorCredit/VoiceActorCredit.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './VoiceActorCredit.css';

function VoiceActorCredit({ name, url, className = '' }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000); // 3-second delay

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    if (!name || !url) {
        return null;
    }

    return (
        <p className={`voice-actor-credit ${className} ${isVisible ? 'visible' : ''}`}>
            Voice Actor:{' '}
            <a href={url} target="_blank" rel="noopener noreferrer">
                {name}
            </a>
        </p>
    );
}

VoiceActorCredit.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    className: PropTypes.string,
};

export default VoiceActorCredit;