// src/components/Footer.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Footer.css"; // Import Footer specific styles
import CookieSettingsModal from "./CookieSettingsModal/CookieSettingsModal";

// Define supported languages outside the component
const supportedLanguages = [
    { code: "en", name: "English" },
];

function Footer() {
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
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
        setIsCookieModalOpen(true);
    };

    useEffect(() => {
        if (isCookieModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isCookieModalOpen]);

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
        <>
            <footer className="site-footer">
                <div className="footer-top-row">
                    <div className="footer-links">
                        <a href="/terms-of-service">Terms of Service</a>
                        <a href="/privacy-policy">Privacy Policy</a>
                        <a href="/cookie-policy">Cookie Policy</a>
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
            </footer>
            {isCookieModalOpen && <CookieSettingsModal onClose={() => setIsCookieModalOpen(false)} />}
        </>
    );
}

export default Footer;