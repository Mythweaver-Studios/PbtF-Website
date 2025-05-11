// src/pages/Showcase/Showcase.jsx
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";
import MediaLinks from "../../components/MiniMediaLinks";
import Footer from "../../components/Footer";
// Corrected import paths to match the actual filenames
import StoryScroller from "./components/Story";
import CharactersDisplay from "./components/Characters";
import FeaturesSlideshow from "./components/Features";

import { storyText } from "./data/storyText";
import { charactersData } from "./data/charactersData";
import { featuresData } from "./data/featuresData";

import "./Showcase.scss"; // Import Showcase page specific styles

function Showcase() {
  const internalNavRef = useRef(false); // Track internal navigation
  const location = useLocation(); // Access current URL location

  // Smoothly scrolls to a given element ID.
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.history.pushState) {
        window.history.pushState(null, null, `#${elementId}`);
      } else {
        window.location.hash = elementId; // Fallback
      }
    }
  };

  // Handles scrolling to section based on URL hash.
  useEffect(() => {
    if (location.hash && !internalNavRef.current) {
      const id = location.hash.substring(1);
      const timer = setTimeout(() => {
        // Delay for DOM readiness
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  // Handles clicks on showcase navigation links.
  const handleShowcaseNavClick = (e, sectionId) => {
    e.preventDefault();
    internalNavRef.current = true; // Mark as internal navigation
    smoothScrollTo(sectionId);
    setTimeout(() => {
      // Reset internal nav flag
      internalNavRef.current = false;
    }, 50);
  };

  return (
    <div className="page-container showcase-page">
      <header className="showcase-header">
        <NavBar onShowcaseLinkClick={handleShowcaseNavClick} />
        <MediaLinks />
      </header>
      <main className="showcase-content">
        <section id="story" className="showcase-section story-section">
          <div className="section-title-container">
            <h2 className="section-title">Story</h2>
          </div>
          <StoryScroller storyText={storyText} />
        </section>

        <section
          id="characters"
          className="showcase-section characters-section"
        >
          <div className="section-title-container">
            <h2 className="section-title">Characters</h2>
          </div>
          <CharactersDisplay charactersData={charactersData} />
        </section>

        <section id="features" className="showcase-section features-section">
          <div className="section-title-container">
            <h2 className="section-title">Features</h2>
          </div>
          <FeaturesSlideshow featuresData={featuresData} />
        </section>
      </main>
      <Footer /> {/* Site-wide footer */}
    </div>
  );
}

export default Showcase;
