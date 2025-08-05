// src/pages/NotFound/NotFound.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import "../../styles/Theme.css"; // GLOBAL :D
import "../../pages/Home/Home.css"; // For button styles

// Expanded array of possible messages
const messages = [
    "You have strayed from the path, seeker.",
    "This pathless road leads to nothing.",
    "The way is lost. Turn back before you are consumed.",
    "Beyond this point, only echoes remain.",
    "This page is a forgotten memory.",
    "The threads of fate do not lead here.",
    "You have wandered into the void seeker.",
    "This is a realm untouched by time, return back to reality seeker.",
    "The sanctuary is not here, return to the known.",
    "This page is a mirage, an illusion of the mind.",
];

// Configuration for particle system
const PARTICLE_COUNT = 50;
const MOUSE_REPEL_RADIUS = 100; // The distance from the mouse where embers react
const MOUSE_REPEL_STRENGTH = 2;  // How strongly the embers are pushed away

function NotFound() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('fade-in');
    const [parallax, setParallax] = useState({ x: 0, y: 0 });
    const pageRef = useRef(null);

    // Refs for animation to avoid re-renders
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const animationFrameId = useRef();

    // Effect for the cycling text message
    useEffect(() => {
        setMessageIndex(Math.floor(Math.random() * messages.length));
        const intervalId = setInterval(() => {
            setAnimationClass('fade-out');
            const timeoutId = setTimeout(() => {
                setMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
                setAnimationClass('fade-in');
            }, 1000);
            return () => clearTimeout(timeoutId);
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    // Effect for handling mouse movement for both parallax and interactive embers
    useEffect(() => {
        const handleMouseMove = (e) => {
            // For parallax effect
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setParallax({ x, y });

            // For interactive embers
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 }; // Move mouse off-screen virtually
        }

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // Effect for initializing and running the particle animation loop
    useEffect(() => {
        const pageElement = pageRef.current;
        const screenHeight = pageElement.clientHeight;

        // Initialize particles with random properties
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particlesRef.current.push({
                x: Math.random() * pageElement.clientWidth,
                y: Math.random() * screenHeight,
                vx: (Math.random() - 0.5) * 0.2, // slight horizontal drift
                vy: -Math.random() * 0.5 - 0.2, // upward velocity
                size: Math.random() * 2 + 1,
                element: null, // will be assigned on first render
            });
        }

        const animate = () => {
            particlesRef.current.forEach(p => {
                // Apply velocity
                p.x += p.vx;
                p.y += p.vy;

                // Mouse repulsion logic
                const dx = p.x - mouseRef.current.x;
                const dy = p.y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_REPEL_RADIUS) {
                    const force = (MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS;
                    p.x += (dx / dist) * force * MOUSE_REPEL_STRENGTH;
                    p.y += (dy / dist) * force * MOUSE_REPEL_STRENGTH;
                }

                // Reset particle if it goes off-screen
                if (p.y < -10) {
                    p.y = screenHeight + 10;
                    p.x = Math.random() * pageElement.clientWidth;
                }

                // Apply styles to the DOM element
                if (p.element) {
                    p.element.style.transform = `translate(${p.x}px, ${p.y}px)`;
                }
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);


    return (
        <div className="not-found-page" ref={pageRef}>
            <div className="particle-container">
                {particlesRef.current.map((p, i) => (
                    <div
                        key={i}
                        className="ember"
                        ref={el => p.element = el} // DOM element to particle object
                        style={{
                            width: `${p.size}px`,
                            height: `${p.size}px`
                        }}
                    ></div>
                ))}
            </div>

            <div className="not-found-content">
                <div
                    className="parallax-layer"
                    style={{ transform: `translate(${parallax.x * -10}px, ${parallax.y * -10}px)` }}
                >
                    <h1 className="not-found-title">404</h1>
                </div>
                <div
                    className="parallax-layer"
                    style={{ transform: `translate(${parallax.x * -25}px, ${parallax.y * -25}px)` }}
                >
                    <p className={`not-found-message ${animationClass}`}>
                        {messages[messageIndex]}
                    </p>
                    <Link to="/home" className="btn btn-secondary">
                        Return to Sanctuary
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;