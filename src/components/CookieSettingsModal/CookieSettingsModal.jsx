// src/components/CookieSettingsModal/CookieSettingsModal.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CookieSettingsModal.css';

function CookieSettingsModal({ onClose }) {
    const [optionalCookies, setOptionalCookies] = useState(true);

    return (
        <div className="cookie-modal-backdrop" onClick={onClose}>
            <div className="cookie-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="cookie-modal-header">
                    <h2>Cookie Settings</h2>
                    <button className="cookie-modal-close-btn" onClick={onClose}>×</button>
                </div>
                <div className="cookie-modal-body">
                    <p>
                        Information from every website you visit may be stored or
                        collected by your browser in the form of cookies. This
                        information is about you, your preferences, and your
                        device, and is used to make the site behave according to
                        your preferences. This information does not directly
                        identify you, but is used to provide you with a more
                        personalized web experience. However, you can refuse
                        some cookies, and blocking some cookies may affect your
                        experience on the Site and the services we provide.
                    </p>
                    <p>
                        For more information, see our{' '}
                        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                            cookies policy page (Privacy Policy).
                        </a>
                    </p>

                    <div className="cookie-option">
                        <span className="cookie-option-label">Necessary cookies</span>
                        <span className="cookie-option-status">Always Active</span>
                    </div>

                    <div className="cookie-option">
                        <span className="cookie-option-label">Optional cookies</span>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={optionalCookies}
                                onChange={() => setOptionalCookies(!optionalCookies)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <div className="cookie-modal-footer">
                    <button className="cookie-btn-primary" onClick={onClose}>Save</button>
                    <button className="cookie-btn-secondary" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

CookieSettingsModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default CookieSettingsModal;