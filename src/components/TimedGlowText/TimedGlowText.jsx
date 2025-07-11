// src/components/TimedGlowText/TimedGlowText.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TimedGlowText.css';

function TimedGlowText({ timedQuote, isPlaying, accentColor }) {
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    useEffect(() => {
        let timeoutId;
        // Only run the effect if this specific line is playing
        if (isPlaying && timedQuote) {
            let cumulativeDelay = 0;
            timedQuote.forEach((word, index) => {
                cumulativeDelay += word.duration;
                timeoutId = setTimeout(() => {
                    setHighlightedIndex(index);
                }, cumulativeDelay - word.duration); // Set highlight at the start of the word's duration
            });
        }

        // When isPlaying becomes false or component unmounts, reset the highlight
        if (!isPlaying) {
            setHighlightedIndex(-1);
        }

        // Cleanup function to clear timeouts if the component unmounts or isPlaying changes
        return () => clearTimeout(timeoutId);

    }, [isPlaying, timedQuote]);

    return (
        <p className="glowing-quote" style={{ '--accent-color': accentColor }}>
            &quot;
            {timedQuote.map((item, index) => (
                <span key={index} className={index <= highlightedIndex ? 'glow' : ''}>
                    {item.word}{' '}
                </span>
            ))}
            &quot;
        </p>
    );
}

TimedGlowText.propTypes = {
    timedQuote: PropTypes.arrayOf(PropTypes.shape({
        word: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
    })).isRequired,
    isPlaying: PropTypes.bool.isRequired,
    accentColor: PropTypes.string.isRequired,
};

export default TimedGlowText;