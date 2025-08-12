import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TimedGlowText.css';

function TimedGlowText({ fullQuote, timedQuote, isPlaying, accentColor }) {
    const [highlightedLength, setHighlightedLength] = useState(0);

    useEffect(() => {
        // Create a list of timeouts to manage the glow effect
        const timeouts = [];

        if (isPlaying && timedQuote) {
            let cumulativeDelay = 0;
            let charCount = 0;

            timedQuote.forEach((item) => {
                // Set a timeout to update the highlighted length
                timeouts.push(
                    setTimeout(() => {
                        // We find the next occurrence of the word to ensure punctuation is included.
                        const nextIndex = fullQuote.indexOf(item.word, charCount);
                        if (nextIndex !== -1) {
                            charCount = nextIndex + item.word.length;
                            setHighlightedLength(charCount);
                        }

                    }, cumulativeDelay)
                );
                cumulativeDelay += item.duration;
            });
        }

        // When isPlaying becomes false or component unmounts, reset the highlight
        if (!isPlaying) {
            setHighlightedLength(0);
        }

        // Cleanup: clear all scheduled timeouts
        return () => timeouts.forEach(clearTimeout);

    }, [isPlaying, timedQuote, fullQuote]);

    const glowingPart = fullQuote.substring(0, highlightedLength);
    const normalPart = fullQuote.substring(highlightedLength);

    return (
        <p className="glowing-quote" style={{ '--accent-color': accentColor }}>
            {/* **FIX:** Use {'"'} to escape the quote marks for React */}
            {'"'}
            <span className="glow">{glowingPart}</span>
            <span>{normalPart}</span>
            {'"'}
        </p>
    );
}

TimedGlowText.propTypes = {
    fullQuote: PropTypes.string.isRequired,
    timedQuote: PropTypes.arrayOf(PropTypes.shape({
        word: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
    })).isRequired,
    isPlaying: PropTypes.bool.isRequired,
    accentColor: PropTypes.string.isRequired,
};

export default TimedGlowText;