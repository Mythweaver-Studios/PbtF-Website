// src/pages/NotFound/NotFound.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import "../../components/Default.css"; // For global styles and theme variables
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

function NotFound() {
    // State for the index of the current message
    const [messageIndex, setMessageIndex] = useState(0);
    // State for managing the fade animation class
    const [animationClass, setAnimationClass] = useState('fade-in');

    useEffect(() => {
        // Set an initial random message
        setMessageIndex(Math.floor(Math.random() * messages.length));

        // Set up the interval to cycle through messages
        const intervalId = setInterval(() => {
            // Start the fade-out animation
            setAnimationClass('fade-out');

            // After the fade-out is complete, change the message and fade back in
            const timeoutId = setTimeout(() => {
                setMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
                setAnimationClass('fade-in');
            }, 1000); // This duration must match the CSS transition time

            // Cleanup function for the timeout if the component unmounts mid-cycle
            return () => clearTimeout(timeoutId);
        }, 5000); // Change text every 5 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <p className={`not-found-message ${animationClass}`}>
                    {messages[messageIndex]}
                </p>
                <Link to="/home" className="btn btn-secondary">
                    Return to Sanctuary
                </Link>
            </div>
        </div>
    );
}

export default NotFound;