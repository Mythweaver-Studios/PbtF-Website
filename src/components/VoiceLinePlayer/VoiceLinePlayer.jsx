// src/components/VoiceLinePlayer/VoiceLinePlayer.jsx
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TimedGlowText from '../TimedGlowText/TimedGlowText';
import './VoiceLinePlayer.css';

function VoiceLinePlayer({ voiceLines, accentColor, mode = 'full' }) {
    const [currentlyPlaying, setCurrentlyPlaying] = useState({ audio: null, quote: '' });
    const audioRef = useRef(null); // Use a ref to hold the audio object

    // Cleanup function to stop audio when the component unmounts
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const handlePlay = (line) => {
        // If there's an audio playing, stop it first
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.onended = null; // Important: clear the previous onended handler
        }

        // If the user clicks the same line that is playing, treat it as a stop button
        if (currentlyPlaying.quote === line.quote) {
            setCurrentlyPlaying({ audio: null, quote: '' });
            return;
        }

        // Create and play the new audio
        const newAudio = new Audio(line.audioSrc);
        audioRef.current = newAudio;
        setCurrentlyPlaying({ audio: newAudio, quote: line.quote });
        newAudio.play();

        // When the audio finishes, reset the state
        newAudio.onended = () => {
            setCurrentlyPlaying({ audio: null, quote: '' });
        };
    };

    if (mode === 'simple') {
        const firstLine = voiceLines[0];
        const isPlaying = currentlyPlaying.quote === firstLine.quote;

        return (
            <div className="voiceline-simple-wrapper" style={{ '--accent-color': accentColor }}>
                <button className={`voiceline-simple-play-btn ${isPlaying ? 'playing' : ''}`} onClick={() => handlePlay(firstLine)} aria-label={`Play quote: ${firstLine.quote}`}>
                    <svg className="play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                    <svg className="stop-icon" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"></path></svg>
                </button>
                <TimedGlowText
                    timedQuote={firstLine.timedQuote}
                    isPlaying={isPlaying}
                    accentColor={accentColor}
                />
            </div>
        );
    }

    // Full Mode (for Character Detail Modal)
    return (
        <div className="voicelines-panel">
            <ul className="voicelines-list">
                {voiceLines.map((line, index) => {
                    const isPlaying = currentlyPlaying.quote === line.quote;
                    return (
                        <li key={index} className={`voiceline-item ${isPlaying ? 'active' : ''}`} style={{ '--accent-color': accentColor }}>
                            <button className="voiceline-play-button" onClick={() => handlePlay(line)} aria-label={`Play quote: ${line.quote}`}>
                                <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path></svg>
                                <div className="speaker-icon">
                                    <span></span><span></span><span></span>
                                </div>
                            </button>
                            <div className="voiceline-quote-wrapper">
                                <TimedGlowText
                                    timedQuote={line.timedQuote}
                                    isPlaying={isPlaying}
                                    accentColor={accentColor}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

VoiceLinePlayer.propTypes = {
    voiceLines: PropTypes.arrayOf(PropTypes.shape({
        quote: PropTypes.string.isRequired,
        audioSrc: PropTypes.string.isRequired,
        timedQuote: PropTypes.array.isRequired, // Added prop type
    })).isRequired,
    accentColor: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['simple', 'full']),
};

export default VoiceLinePlayer;