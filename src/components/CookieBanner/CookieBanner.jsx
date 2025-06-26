// src/components/CookieBanner/CookieBanner.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './CookieBanner.css';

function CookieBanner({ onAccept, onDecline, onOpenSettings }) {
    return (
        <div className="cookie-banner-container">
            <div className="cookie-banner-content">
                <div className="cookie-banner-text">
                    <p>
                        We require consent from our site visitors to store data in the form
                        of cookies and make your experience on our site smoother. If you
                        would like to change it, please use ‘Cookie Settings’ at the bottom.
                        For more information, please see our{' '}
                        <a href="/cookie-policy" target="_blank" rel="noopener noreferrer">
                            cookies policy page (Privacy Policy).
                        </a>
                    </p>
                    <button className="cookie-settings-link" onClick={onOpenSettings}>
                        <span className="settings-icon">⚙️</span>
                        Cookie Settings
                    </button>
                </div>
                <div className="cookie-banner-actions">
                    <button className="cookie-btn-primary" onClick={onAccept}>
                        Accept All
                    </button>
                    <button className="cookie-btn-secondary" onClick={onDecline}>
                        Decline All
                    </button>
                </div>
            </div>
        </div>
    );
}

CookieBanner.propTypes = {
    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired,
    onOpenSettings: PropTypes.func.isRequired,
};

export default CookieBanner;