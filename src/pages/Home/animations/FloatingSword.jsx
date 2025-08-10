// src/pages/Home/animations/FloatingSword.jsx
import React from 'react';
import { motion } from 'framer-motion';
import HeroSword from '../../../assets/images/animations/Demonic_Blade.png';
import './FloatingSword.css';

function FloatingSword() {
    return (
        <motion.div
            className="floating-sword-container"
            animate={{
                // Vertical Levitation (y-axis)
                y: [
                    "0px",   // Start at center
                    "-20px", // Float up
                    "0px",   // Return to center for spin
                    "0px",   // Hold center during spin
                    "0px",   // Hold center during spin
                    "0px",   // Hold center during spin
                    "20px",  // Float down
                    "0px",   // Return to center to loop
                ],
                
                // Z-axis Spin (rotate)
                rotate: [
                    0,       // Start, no rotation
                    0,       // No rotation during levitation
                    0,       // Spin begins
                    90,      // Easing In: First 90 degrees are slow
                    990,     // The "Whip": Next 900 degrees are extremely fast
                    1080,    // Easing Out: Final 90 degrees are slow (3 full rotations)
                    1080,    // Hold rotation during levitation
                    1080,    // End of loop (1080 is a multiple of 360, so it loops seamlessly with 0)
                ],
            }}
            transition={{
                duration: 10, // A 10-second loop feels substantial
                ease: "easeInOut",
                repeat: Infinity,
                // The 'times' array is the key to the custom pacing.
                // Note how the spin (from 0.4 to 0.6) is broken into three distinct phases.
                times: [0, 0.2, 0.4, 0.45, 0.55, 0.6, 0.8, 1],
            }}
        >
            <img src={HeroSword} alt="Floating Sword" className="hero-sword-image" />
        </motion.div>
    );
}

export default FloatingSword;