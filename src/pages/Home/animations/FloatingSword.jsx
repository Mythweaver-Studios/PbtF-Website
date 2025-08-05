// src/pages/Home/animations/FloatingSword.jsx
import React from 'react';
import { motion } from 'framer-motion';
import HeroSword from '../../../assets/images/animations/Demonic_Blade.png';
import './FloatingSword.css';

function FloatingSword() {
    return (
        <motion.div
            className="floating-sword-container"
            // Define the new, multi-stage keyframe animation sequence
            animate={{
                // Y-axis (Vertical Movement)
                y: [
                    "-15px", // 0% - Start levitation up
                    "15px",  // 20% - Levitation bottom
                    "-15px", // 40% - Levitation top
                    "0px",   // 50% - Settle at center before slash
                    "-30px", // 60% - Top of circular slash path
                    "50px",  // 70% - Bottom of circular slash path
                    "-30px", // 80% - Top of circular slash path again
                    "0px",   // 90% - Return to center for spin
                    "-15px", // 100% - Begin next levitation loop seamlessly
                ],
                // X-axis (Horizontal Movement)
                x: [
                    "0px",   // Levitation is purely vertical
                    "0px",
                    "0px",
                    "0px",   // Settle
                    "50px",  // 60% - Right side of circular slash
                    "0px",   // 70% - Bottom center of circular slash
                    "-50px", // 80% - Left side of circular slash
                    "0px",   // 90% - Return to center
                    "0px",
                ],
                // Z-axis Rotation (Blade Orientation)
                rotate: [
                    0,       // Levitation
                    0,
                    0,
                    0,       // Settle
                    45,      // 60% - Blade points down-right as it moves right
                    180,     // 70% - Blade points up as it hits the bottom
                    315,     // 80% - Blade points down-left as it moves left
                    360,     // 90% - Completes the spin back at center
                    360,     // 100% - Hold rotation for a seamless loop
                ],
            }}
            // Configure the transition properties for the entire sequence
            transition={{
                duration: 12, // Total duration for one full loop
                ease: "easeInOut",
                repeat: Infinity,
                // The `times` array maps each value above to a point in the duration.
                times: [0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            }}
        >
            <img src={HeroSword} alt="Floating Sword" className="hero-sword-image" />
        </motion.div>
    );
}

export default FloatingSword;