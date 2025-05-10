// src/pages/Showcase/Showcase.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";
import MediaLinks from "../../components/MiniMediaLinks";
import Footer from "../../components/Footer"; // Import the Footer component
import "./Showcase.scss"; // Import Showcase page specific styles

// --- Import images from src/assets ---
import lordChoshenImg from "../../assets/showcase/character_lord_choshen.png";
import lordChoshenThumb from "../../assets/showcase/thumb_lord_choshen.png";
import blueStarImg from "../../assets/showcase/character_blue_star.png";
import blueStarThumb from "../../assets/showcase/thumb_blue_star.png";
import aliceKingstonImg from "../../assets/showcase/character_alice_kingston.png";
import aliceKingstonThumb from "../../assets/showcase/thumb_alice_kingston.png";

import featureCombatImg from "../../assets/showcase/feature_combat.jpg";
import featureWorldImg from "../../assets/showcase/feature_world.jpg";
import featureProgressionImg from "../../assets/showcase/feature_progression.jpg";

// Narrative content for the story section
const storyText = `In the ruins of a shattered Earth consumed by nightmares, humanity fights not just for survival—but for the very right to dream. The world is divided between the waking realm and the Dream Realm, a place where monsters born of fear and madness roam freely. Only a few, chosen by fate or misfortune, can enter this twisted dimension: Awakened.

Sunless, or Sunny as he’s mockingly named, is a slave. Born without status, purpose, or hope, he lives a life of hardship in the bottom rungs of a caste-ridden society ruled by Awakened elites. With no family, no power, and no future, his fate seems sealed—until the day he is forcibly inducted into the Dream Realm by an ancient spell.

Thrown into a grotesque world of shifting shadows, deadly creatures, and cryptic ruins, Sunny discovers that the Dream Realm is not merely a battlefield—but a crucible that will either break or reshape him. He is cursed with a strange and nearly useless Aspect, no mentor, no resources, and no understanding of the terrifying reality he's trapped in. Unlike others, he has no heroic path laid before him—only desperation and the bitter will to survive.

But Sunny has something else: cunning. Ruthless, paranoid, and more observant than most, he begins to unravel the logic of the Dream Realm. With every deadly encounter, he grows not through strength alone, but by learning its hidden rules, exploiting its systems, and mastering its ancient magic. He befriends—or manipulates—those stronger than him. He steals power from those who underestimate him. In a world ruled by raw force, he sharpens his mind into a weapon.

Yet even as he claws his way up from nothing, deeper mysteries take shape. What is the true nature of the Spell that governs this realm? What secrets lie in the ancient city beneath the dreamscape? And what is the cost of ascending to greatness in a place built on death and forgotten gods?

Shadow Slave is not a tale of heroes, but of survivors. It is a story about fear, obsession, sacrifice, and the thin line between darkness and control. Sunny's path is drenched in blood and shadow—not because he seeks power, but because he refuses to die weak and forgotten.

In the Dream Realm, your nightmares define you. And Sunny… Sunny is learning to control his.`;

// Data for character showcase
const charactersData = [
  {
    id: 1,
    name: "Lord Choshen",
    title: "Afraid of Women",
    description:
      "A once-feared lord, now a reluctant hero. Choshen's journey is one of redemption, courage, and the unexpected strength found in vulnerability.",
    image: lordChoshenImg,
    thumbnail: lordChoshenThumb,
    accentColor: "rgba(148, 88, 143, 0.8)", // Unique accent for Choshen
  },
  {
    id: 2,
    name: "Mr.BlueStar",
    title: "Lazy Typer",
    description:
      "A mysterious figure with a penchant for laziness, Mr. BlueStar is a master of strategy and manipulation, often using his wit to outsmart opponents.",
    image: blueStarImg,
    thumbnail: blueStarThumb,
    accentColor: "rgba(0, 255, 34, 0.8)", // Unique accent for BlueStar
  },
  {
    id: 3,
    name: "Alice Kingston",
    title: "The Flame Lotus",
    description:
      "A fierce warrior with a fiery spirit, Alice is known for her unmatched combat skills and her ability to harness the power of fire in battle.",
    image: aliceKingstonImg,
    thumbnail: aliceKingstonThumb,
    accentColor: "rgb(255, 30, 0)", // Red/Orange accent for Alice
  },
];

// Data for game features showcase
const featuresData = [
  {
    id: 1,
    title: "Dynamic Combat System",
    description:
      "Master unique skills and abilities for each hero. Engage in strategic, turn-based battles or fast-paced action sequences where every decision counts.",
    image: featureCombatImg,
  },
  {
    id: 2,
    title: "Epic Story & World",
    description:
      "Immerse yourself in a rich narrative, explore vast landscapes, and uncover ancient mysteries that shape the fate of the world.",
    image: featureWorldImg,
  },
  {
    id: 3,
    title: "Character Progression",
    description:
      "Level up your heroes, unlock powerful new abilities, and customize their equipment to build the ultimate team.",
    image: featureProgressionImg,
  },
];

function Showcase() {
  const storyScrollerRef = useRef(null);
  const internalNavRef = useRef(false); // Track internal navigation to prevent redundant scrolls
  const [isStoryResetting, setIsStoryResetting] = useState(false);
  const location = useLocation(); // Access current URL location, including hash

  // Smoothly scrolls to a given element ID and updates URL hash.
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL hash without a full page reload, if supported
      if (window.history.pushState) {
        window.history.pushState(null, null, `#${elementId}`);
      } else {
        window.location.hash = elementId; // Fallback for older browsers
      }
    }
  };

  // Handles scrolling to section based on URL hash on load or hash change.
  useEffect(() => {
    if (location.hash && !internalNavRef.current) {
      // Only scroll if not from internal click
      const id = location.hash.substring(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100); // Delay to ensure DOM readiness for scrolling
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  // Manages automatic scrolling and reset for the story section.
  useEffect(() => {
    const scroller = storyScrollerRef.current;
    if (!scroller) return;

    let scrollInterval;
    const scrollSpeed = 1;
    const scrollIntervalTime = 40; // Milliseconds between scroll steps

    // Prevents manual mouse wheel scrolling during auto-scroll.
    const handleWheel = (event) => {
      event.preventDefault();
    };

    const startScrolling = () => {
      if (isStoryResetting) return; // Don't scroll if currently resetting

      scroller.addEventListener("wheel", handleWheel, { passive: false });

      scrollInterval = setInterval(() => {
        if (
          scroller.scrollTop <
          scroller.scrollHeight - scroller.clientHeight - 1 // Check if not at bottom
        ) {
          scroller.scrollTop += scrollSpeed;
        } else {
          // Reached the end of the story text
          clearInterval(scrollInterval);
          setIsStoryResetting(true); // Initiate reset sequence
          setTimeout(() => {
            // Fade out
            if (storyScrollerRef.current) {
              storyScrollerRef.current.style.opacity = "0";
            }
            setTimeout(() => {
              // Reset scroll and fade in
              if (storyScrollerRef.current) {
                storyScrollerRef.current.scrollTop = 0;
                storyScrollerRef.current.style.opacity = "1";
              }
              setIsStoryResetting(false); // End reset sequence
            }, 500); // Duration of fade out
          }, 1000); // Pause at end before reset
        }
      }, scrollIntervalTime);
    };

    if (!isStoryResetting) {
      startScrolling(); // Start or resume scrolling
    }

    return () => {
      // Cleanup on component unmount or re-render
      clearInterval(scrollInterval);
      if (scroller) {
        scroller.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isStoryResetting]); // Re-run effect if story reset state changes

  // Manages character display and automatic cycling.
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [isCharacterFading, setIsCharacterFading] = useState(false); // For fade transition
  const characterTimeoutRef = useRef(null); // Stores timeout for auto-cycling

  // Selects a character by index with a fade transition.
  const selectCharacter = (index) => {
    if (index === currentCharacterIndex) return; // No change if same character
    setIsCharacterFading(true);
    clearTimeout(characterTimeoutRef.current); // Stop auto-cycle on manual selection
    setTimeout(() => {
      setCurrentCharacterIndex(index);
      setIsCharacterFading(false);
      // Restart auto-cycle timer after manual selection
      characterTimeoutRef.current = setTimeout(nextCharacter, 30000); // 30s display
    }, 300); // Fade duration
  };

  // Cycles to the next character with a fade transition.
  const nextCharacter = () => {
    setIsCharacterFading(true);
    setTimeout(() => {
      setCurrentCharacterIndex(
        (prevIndex) => (prevIndex + 1) % charactersData.length // Loop through characters
      );
      setIsCharacterFading(false);
    }, 300); // Fade duration
  };

  // Sets up and clears the automatic character cycling timer.
  useEffect(() => {
    characterTimeoutRef.current = setTimeout(nextCharacter, 30000); // Initial auto-cycle
    return () => clearTimeout(characterTimeoutRef.current); // Cleanup timer
  }, [currentCharacterIndex]); // Reset timer if currentCharacterIndex changes (e.g., manual select)

  // Manages feature display and automatic cycling.
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const featureTimeoutRef = useRef(null); // Stores timeout for auto-cycling

  // Cycles to the next feature.
  const nextFeature = () => {
    setCurrentFeatureIndex(
      (prevIndex) => (prevIndex + 1) % featuresData.length // Loop through features
    );
  };

  // Sets up and clears the automatic feature cycling timer.
  useEffect(() => {
    featureTimeoutRef.current = setTimeout(nextFeature, 10000); // 10s display per feature
    return () => clearTimeout(featureTimeoutRef.current); // Cleanup timer
  }, [currentFeatureIndex]); // Reset timer if currentFeatureIndex changes

  const currentCharacter = charactersData[currentCharacterIndex]; // Current character object

  // Handles clicks on showcase navigation links (e.g., from NavBar dropdown).
  const handleShowcaseNavClick = (e, sectionId) => {
    e.preventDefault(); // Prevent default link behavior
    internalNavRef.current = true; // Mark as internal navigation
    smoothScrollTo(sectionId);
    // Reset internal navigation flag shortly after to allow external hash changes
    setTimeout(() => {
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
          <div className="story-box">
            <div
              className="story-text-scroller"
              ref={storyScrollerRef}
              style={{ touchAction: "none" }} // Disable touch scroll for auto-scroll behavior
            >
              {storyText.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section
          id="characters"
          className="showcase-section characters-section"
        >
          <div className="section-title-container">
            <h2 className="section-title">Characters</h2>
          </div>
          <div className="characters-content">
            <div
              className={`character-display ${
                isCharacterFading ? "fading" : ""
              }`}
              style={{
                "--character-accent-color": currentCharacter.accentColor, // Apply dynamic accent color
              }}
            >
              <img
                src={
                  currentCharacter.image ||
                  "/path/to/placeholder_character_large.png" // Fallback image
                }
                alt={currentCharacter.name}
                className="character-main-image"
              />
              <div className="character-info">
                <h3>{currentCharacter.name}</h3>
                <h4>{currentCharacter.title}</h4>
                <p>{currentCharacter.description}</p>
              </div>
            </div>
            <div className="character-thumbnails">
              {charactersData.map((char, index) => (
                <div
                  key={char.id}
                  className={`thumbnail-item ${
                    index === currentCharacterIndex ? "active" : ""
                  }`}
                  onClick={() => selectCharacter(index)}
                  // Pause auto-cycle on hover, resume on leave
                  onMouseEnter={() => clearTimeout(characterTimeoutRef.current)}
                  onMouseLeave={() =>
                    (characterTimeoutRef.current = setTimeout(
                      nextCharacter,
                      15000 // Shorter delay after hover
                    ))
                  }
                >
                  <img
                    src={char.thumbnail || "/path/to/placeholder_thumb.png"} // Fallback thumbnail
                    alt={char.name}
                  />
                  <span>{char.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="showcase-section features-section">
          <div className="section-title-container">
            <h2 className="section-title">Features</h2>
          </div>
          <div className="features-slideshow">
            {featuresData.map((feature, index) => (
              <div
                key={feature.id}
                className={`feature-slide ${
                  index === currentFeatureIndex ? "active" : ""
                }`}
              >
                <img
                  src={feature.image || "/path/to/placeholder_feature.png"} // Fallback feature image
                  alt={feature.title}
                  className="feature-image"
                />
                <div className="feature-info">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="feature-dots">
            {featuresData.map((_, index) => (
              <span
                key={index}
                className={`dot ${
                  index === currentFeatureIndex ? "active" : ""
                }`}
                onClick={() => {
                  // Manual selection of feature slide
                  clearTimeout(featureTimeoutRef.current);
                  setCurrentFeatureIndex(index);
                  // Restart auto-cycle timer
                  featureTimeoutRef.current = setTimeout(nextFeature, 10000);
                }}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer /> {/* Site-wide footer */}
    </div>
  );
}

export default Showcase;
