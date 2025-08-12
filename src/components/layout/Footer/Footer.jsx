import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link for internal navigation
import PropTypes from "prop-types";
import "./Footer.css";

// Define supported languages outside the component
const supportedLanguages = [
    { code: "en", name: "English" },
];

function Footer({ onOpenCookieSettings }) { // Accept the function as a prop
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    // Removed local state for cookie modal: const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(supportedLanguages[0]);
    const langDropdownRef = useRef(null);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const toggleLangDropdown = () => {
        setIsLangDropdownOpen((prev) => !prev);
    };

    const handleCookieSettingsClick = (e) => {
        e.preventDefault();
        onOpenCookieSettings(); // Call the function passed down from App.jsx
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                langDropdownRef.current &&
                !langDropdownRef.current.contains(event.target)
            ) {
                setIsLangDropdownOpen(false);
            }
        };
        if (isLangDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isLangDropdownOpen]);

    const selectLanguage = (langCode) => {
        const newLang = supportedLanguages.find((l) => l.code === langCode);
        if (newLang) {
            setCurrentLanguage(newLang);
        }
        setIsLangDropdownOpen(false);
    };

    const availableLanguages = supportedLanguages.filter(
        (lang) => lang.code !== currentLanguage.code
    );

    return (
        <footer className="site-footer">
            <div className="footer-top-row">
                <div className="footer-links">
                    {/* Use Link component for internal routes */}
                    <Link to="/terms-of-service">Terms of Service</Link>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/cookie-policy">Cookie Policy</Link>
                    <a href="#" onClick={handleCookieSettingsClick}>Cookie Settings</a>
                </div>
                <button type="button" className="back-to-top" onClick={scrollToTop}>
                    <span className="arrow-up-icon">↑</span> Back to Top
                </button>
            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom-row">
                <div className="footer-copyright">
                    <p>
                        Paved by the Fallen © {new Date().getFullYear()} Mythweaver Inc. All rights
                        reserved.
                    </p>
                    <p className="footer-trademarks">
                        PlayStation, PS5, and Xbox are trademarks or registered trademarks
                        of their respective owners. Steam logo is a trademark of Valve
                        Corporation. NVIDIA, the NVIDIA logo, and GeForce Now are trademarks
                        and/or registered trademarks of NVIDIA Corporation in the U.S.
                        and/or other countries. Other company and product names may be
                        trademarks of their respective owners.
                    </p>
                </div>

                <div className="language-selector-container" ref={langDropdownRef}>
                    <button
                        type="button"
                        className="language-selector-toggle"
                        onClick={toggleLangDropdown}
                    >
                        <span>{currentLanguage.name}</span>
                        <span
                            className={`arrow-down-icon ${isLangDropdownOpen ? "open" : ""}`}
                        >
                            ▼
                        </span>
                    </button>
                    {isLangDropdownOpen && (
                        <ul className="language-dropdown">
                            {availableLanguages.length > 0 ? (
                                availableLanguages.map((lang) => (
                                    <li key={lang.code} onClick={() => selectLanguage(lang.code)}>
                                        {lang.name}
                                    </li>
                                ))
                            ) : (
                                <li className="lang-dropdown-info">
                                    More languages coming soon.
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
            {/* The modal is no longer rendered here, it's handled by App.jsx */}
        </footer>
    );
}

Footer.propTypes = {
  onOpenCookieSettings: PropTypes.func.isRequired,
};

export default Footer;