// src/pages/AuthCallback/AuthCallback.jsx
import React, { useState, useEffect } from "react";
import "./AuthCallback.css";
import "../../styles/Theme.css";

function AuthCallback() {
    const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error', 'no_token'
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // This effect runs once when the component mounts
        const fragment = window.location.hash.substring(1);
        const params = new URLSearchParams(fragment);
        const token = params.get("access_token");

        if (token) {
            // We found a token, now try to send it to the game's local listener
            fetch(`http://localhost:4567/token?access_token=${encodeURIComponent(token)}`)
                .then(response => {
                    if (response.ok) {
                        setStatus("success");
                    } else {
                        // The game listener responded, but with an error status
                        setStatus("error");
                        setErrorMessage("The game reported an error. Please try again.");
                    }
                })
                .catch(error => {
                    // This error means we couldn't connect to the game's listener at all
                    console.error("Error sending token to Unity listener:", error);
                    setStatus("error");
                    setErrorMessage("Could not connect to the game. Please ensure the game is running and try logging in again.");
                });
        } else {
            // No token was found in the URL hash
            setStatus("no_token");
        }
    }, []); // The empty array ensures this effect runs only once

    const renderContent = () => {
        switch (status) {
            case "success":
                return (
                    <>
                        <h1 className="callback-title success">Success!</h1>
                        <p className="callback-message">
                            Your account has been authenticated. You can now close this window and return to the game.
                        </p>
                    </>
                );
            case "error":
                return (
                    <>
                        <h1 className="callback-title error">Connection Failed</h1>
                        <p className="callback-message">{errorMessage}</p>
                    </>
                );
            case "no_token":
                return (
                    <>
                        <h1 className="callback-title error">Authentication Error</h1>
                        <p className="callback-message">
                            No authentication token was found. Please close this window and try again.
                        </p>
                    </>
                );
            case "loading":
            default:
                return (
                    <>
                        <div className="spinner"></div>
                        <h1 className="callback-title">Authenticating...</h1>
                        <p className="callback-message">
                            Please wait while we connect to your game.
                        </p>
                    </>
                );
        }
    };

    return (
        <div className="auth-callback-page">
            <div className="auth-callback-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default AuthCallback;