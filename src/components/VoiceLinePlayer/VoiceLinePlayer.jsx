// src/components/VoiceLinePlayer/VoiceLinePlayer.jsx
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TimedGlowText from '../TimedGlowText/TimedGlowText';
import './VoiceLinePlayer.css';

function VoiceLinePlayer({ voiceLines, accentColor, mode = 'full' }) {
    const [currentLine, setCurrentLine] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const audioRef = useRef(null);

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const playRandomLine = () => {
        if (!voiceLines || voiceLines.length === 0) {
            console.error("VoiceLinePlayer Error: No voice lines available to play for this character.");
            return;
        }
        if (isPlaying) return;

        const availableLines = voiceLines.filter(line => line.quote !== currentLine?.quote);
        const linesToChooseFrom = availableLines.length > 0 ? availableLines : voiceLines;
        const randomLine = linesToChooseFrom[Math.floor(Math.random() * linesToChooseFrom.length)];

        setIsFading(true);

        setTimeout(() => {
            setCurrentLine(randomLine);
            setIsPlaying(true);
            setIsFading(false);

            if (randomLine && randomLine.audioSrc) {
                const newAudio = new Audio(randomLine.audioSrc);
                audioRef.current = newAudio;
                newAudio.play().catch(err => {
                    console.error("Audio playback error:", err);
                    setIsPlaying(false);
                });

                newAudio.onended = () => {
                    setIsPlaying(false);
                };
            } else {
                console.error("Could not play voiceline, invalid data:", randomLine);
                setIsPlaying(false);
            }
        }, 300);
    };

    // This mode is for the main showcase page
    if (mode === 'simple') {
        return (
            <div className="voiceline-simple-wrapper" style={{ '--accent-color': accentColor }}>
                <button className={`voiceline-simple-play-btn ${isPlaying ? 'playing' : ''}`} onClick={playRandomLine} aria-label="Play a random voice line">
                    <svg className="play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                    <div className="speaker-icon simple-speaker">
                        <span></span><span></span><span></span>
                    </div>
                </button>
                <div className={`voiceline-simple-quote-wrapper ${isFading ? 'fading' : ''}`}>
                    {currentLine && (
                        <TimedGlowText
                            fullQuote={currentLine.quote}
                            timedQuote={currentLine.timedQuote}
                            isPlaying={isPlaying}
                            accentColor={accentColor}
                        />
                    )}
                </div>
            </div>
        );
    }

    // This mode is for the character detail modal
    return (
        <div className="voicelines-panel" style={{ '--accent-color': accentColor }}>
            <div className={`voiceline-full-quote-display ${isFading ? 'fading' : ''}`}>
                {currentLine ? (
                    <TimedGlowText
                        fullQuote={currentLine.quote}
                        timedQuote={currentLine.timedQuote}
                        isPlaying={isPlaying}
                        accentColor={accentColor}
                    />
                ) : (
                    <span className="voiceline-prompt">Click to hear a voice line</span>
                )}
            </div>
            <button className={`voiceline-main-play-btn ${isPlaying ? 'playing' : ''}`} onClick={playRandomLine} aria-label="Play a random voice line">
                <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path></svg>
                <div className="speaker-icon">
                    <span></span><span></span><span></span>
                </div>
            </button>
        </div>
    );
}

VoiceLinePlayer.propTypes = {
    voiceLines: PropTypes.arrayOf(PropTypes.shape({
        quote: PropTypes.string.isRequired,
        audioSrc: PropTypes.string.isRequired,
        timedQuote: PropTypes.array.isRequired,
    })).isRequired,
    accentColor: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['simple', 'full']),
};

export default VoiceLinePlayer;