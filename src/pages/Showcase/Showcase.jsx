// src/pages/Showcase/Showcase.jsx
import React, { useEffect, useRef, useState } from "react";
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

const showcaseNavItems = [
  { id: "story", title: "Story" },
  { id: "characters", title: "Characters" },
  { id: "features", title: "Features" },
];

function Showcase() {
  const internalNavRef = useRef(false); // Track internal navigation
  const location = useLocation(); // Access current URL location
  const [activeSection, setActiveSection] = useState("story"); // For side navigation active state

  // Refs for each section to get their positions
  const sectionRefs = {
    story: useRef(null),
    characters: useRef(null),
    features: useRef(null),
  };

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    // Initial check for active section based on hash, if any
    if (location.hash) {
      setActiveSection(location.hash.substring(1));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Smoothly scrolls to a given element ID.
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      internalNavRef.current = true; // Mark as internal navigation
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL hash on click
      if (window.history.pushState) {
        window.history.pushState(null, null, `#${elementId}`);
      } else {
        window.location.hash = elementId;
      }
      setActiveSection(elementId); // Manually set active section on click
      setTimeout(() => {
        internalNavRef.current = false; // Allow time for scroll to finish before re-enabling scroll spy
      }, 1000);
    }
  };

  // Handles scrolling to section based on URL hash (e.g., from external link).
  useEffect(() => {
    if (location.hash && !internalNavRef.current) {
      const id = location.hash.substring(1);
      setActiveSection(id); // Update active section for side nav
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  // Handles clicks on showcase navigation links from NavBar or SideNav.
  const handleShowcaseNavClick = (e, sectionId) => {
    if (e) e.preventDefault(); // Prevent default if event is passed
    smoothScrollTo(sectionId);
  };

  // Scroll spy for side navigation
  useEffect(() => {
    const handleScroll = () => {
      if (internalNavRef.current) return; // Don't update if internally navigating

      let currentSection = "";
      const scrollPosition = window.scrollY + window.innerHeight / 2.5; // Adjusted threshold

      showcaseNavItems.forEach((item) => {
        const sectionElement = sectionRefs[item.id].current;
        if (sectionElement) {
          if (
            sectionElement.offsetTop <= scrollPosition &&
            sectionElement.offsetTop + sectionElement.offsetHeight >
              scrollPosition
          ) {
            currentSection = item.id;
          }
        }
      });

      // Fallback if no section is perfectly matched (e.g., at the very top/bottom)
      if (!currentSection) {
        if (
          window.scrollY <
          sectionRefs.characters.current?.offsetTop - window.innerHeight / 3
        ) {
          currentSection = "story";
        } else if (
          window.scrollY >
          sectionRefs.features.current?.offsetTop - window.innerHeight / 1.5
        ) {
          currentSection = "features";
        } else if (
          sectionRefs.characters.current &&
          window.scrollY >=
            sectionRefs.characters.current?.offsetTop - window.innerHeight / 3
        ) {
          currentSection = "characters";
        }
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
        // Update URL hash to reflect the current active section due to scrolling
        if (window.history.replaceState) {
          window.history.replaceState(null, null, `#${currentSection}`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]); // Re-run if activeSection changes (primarily driven by scroll itself)

  return (
    <div className="page-container showcase-page">
      <header className="showcase-header">
        <NavBar onShowcaseLinkClick={handleShowcaseNavClick} />
        <MediaLinks />
      </header>
      {/* Side Navigation */}
      <nav className="showcase-side-nav">
        <div className="side-nav-line"></div>
        <ul>
          {showcaseNavItems.map((item) => (
            <li
              key={item.id}
              className={`side-nav-item ${
                activeSection === item.id ? "active" : ""
              }`}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleShowcaseNavClick(e, item.id)}
                className="side-nav-link"
              >
                <span className="side-nav-indicator"></span>
                <span className="side-nav-text">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <main className="showcase-content">
        <section
          id="story"
          className="showcase-section story-section"
          ref={sectionRefs.story}
        >
          <div className="section-title-container">
            <h2 className="section-title">Story</h2>
          </div>
          <StoryScroller storyText={storyText} />
        </section>

        <section
          id="characters"
          className="showcase-section characters-section"
          ref={sectionRefs.characters}
        >
          <div className="section-title-container">
            <h2 className="section-title">Characters</h2>
          </div>
          <CharactersDisplay charactersData={charactersData} />
        </section>

        <section
          id="features"
          className="showcase-section features-section"
          ref={sectionRefs.features}
        >
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
