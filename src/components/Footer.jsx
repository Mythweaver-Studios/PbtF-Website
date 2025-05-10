// src/components/Footer.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Footer.css"; // Import Footer specific styles

function Footer() {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

  // Scrolls the window to the top of the page smoothly.
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This property ensures the scrolling animation is smooth
    });
  };

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen((prev) => !prev);
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

  const selectLanguage = (lang) => {
    console.log("Language selected:", lang);
    setIsLangDropdownOpen(false);
  };

  return (
    <footer className="site-footer">
      <div className="footer-top-row">
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/cookies">Cookie Policy</a>
          <a href="/cookie-settings">Cookie Settings</a>
        </div>
        <button type="button" className="back-to-top" onClick={scrollToTop}>
          <span className="arrow-up-icon">↑</span> Back to Top
        </button>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom-row">
        <div className="footer-copyright">
          <p>
            Crownless © {new Date().getFullYear()} PMU Project. All rights
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
            <span>English</span>
            <span
              className={`arrow-down-icon ${isLangDropdownOpen ? "open" : ""}`}
            >
              ▼
            </span>
          </button>
          {isLangDropdownOpen && (
            <ul className="language-dropdown">
              <li onClick={() => selectLanguage("en")}>English</li>
              <li onClick={() => selectLanguage("es")}>Español</li>
              <li onClick={() => selectLanguage("fr")}>Français</li>
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
