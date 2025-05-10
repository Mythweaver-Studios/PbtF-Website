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

const storyText = `In the ruins of a shattered Earth consumed by nightmares, humanity fights not just for survival—but for the very right to dream. The world is divided between the waking realm and the Dream Realm, a place where monsters born of fear and madness roam freely. Only a few, chosen by fate or misfortune, can enter this twisted dimension: Awakened.

Sunless, or Sunny as he’s mockingly named, is a slave. Born without status, purpose, or hope, he lives a life of hardship in the bottom rungs of a caste-ridden society ruled by Awakened elites. With no family, no power, and no future, his fate seems sealed—until the day he is forcibly inducted into the Dream Realm by an ancient spell.

Thrown into a grotesque world of shifting shadows, deadly creatures, and cryptic ruins, Sunny discovers that the Dream Realm is not merely a battlefield—but a crucible that will either break or reshape him. He is cursed with a strange and nearly useless Aspect, no mentor, no resources, and no understanding of the terrifying reality he's trapped in. Unlike others, he has no heroic path laid before him—only desperation and the bitter will to survive.

But Sunny has something else: cunning. Ruthless, paranoid, and more observant than most, he begins to unravel the logic of the Dream Realm. With every deadly encounter, he grows not through strength alone, but by learning its hidden rules, exploiting its systems, and mastering its ancient magic. He befriends—or manipulates—those stronger than him. He steals power from those who underestimate him. In a world ruled by raw force, he sharpens his mind into a weapon.

Yet even as he claws his way up from nothing, deeper mysteries take shape. What is the true nature of the Spell that governs this realm? What secrets lie in the ancient city beneath the dreamscape? And what is the cost of ascending to greatness in a place built on death and forgotten gods?

Shadow Slave is not a tale of heroes, but of survivors. It is a story about fear, obsession, sacrifice, and the thin line between darkness and control. Sunny's path is drenched in blood and shadow—not because he seeks power, but because he refuses to die weak and forgotten.

In the Dream Realm, your nightmares define you. And Sunny… Sunny is learning to control his.`;

const charactersData = [
  {
    id: 1,
    name: "Lord Choshen",
    title: "Afraid of Women",
    description:
      "A once-feared lord, now a reluctant hero. Choshen's journey is one of redemption, courage, and the unexpected strength found in vulnerability.",
    image: lordChoshenImg,
    thumbnail: lordChoshenThumb,
    accentColor: "rgba(200, 160, 100, 0.8)", // Gold accent for new theme
  },
  {
    id: 2,
    name: "Mr.BlueStar",
    title: "Lazy Typer",
    description:
      "A mysterious figure with a penchant for laziness, Mr. BlueStar is a master of strategy and manipulation, often using his wit to outsmart opponents.",
    image: blueStarImg,
    thumbnail: blueStarThumb,
    accentColor: "rgba(180, 50, 50, 0.8)", // Red accent for new theme
  },
  {
    id: 3,
    name: "Alice Kingston",
    title: "The Flame Lotus",
    description:
      "A fierce warrior with a fiery spirit, Alice is known for her unmatched combat skills and her ability to harness the power of fire in battle.",
    image: aliceKingstonImg,
    thumbnail: aliceKingstonThumb,
    accentColor: "rgba(220, 60, 40, 0.8)", // Red/Orange accent
  },
];

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
  const [isStoryResetting, setIsStoryResetting] = useState(false);
  const location = useLocation(); // For checking hash

  // Function for smooth scrolling to a section
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.history.pushState) {
        window.history.pushState(null, null, `#${elementId}`);
      } else {
        window.location.hash = elementId; // Fallback for older browsers
      }
    }
  };

  // Handle initial scroll based on hash and subsequent hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const timer = setTimeout(() => {
        smoothScrollTo(id);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  // Story section scroll
  useEffect(() => {
    const scroller = storyScrollerRef.current;
    if (!scroller) return;

    let scrollInterval;
    const scrollSpeed = 1; // Increased scroll speed slightly for better visibility
    const scrollIntervalTime = 40;

    const startScrolling = () => {
      if (isStoryResetting) return;

      scrollInterval = setInterval(() => {
        if (
          scroller.scrollTop <
          scroller.scrollHeight - scroller.clientHeight - 1
        ) {
          scroller.scrollTop += scrollSpeed;
        } else {
          clearInterval(scrollInterval);
          setIsStoryResetting(true);
          setTimeout(() => {
            if (storyScrollerRef.current) {
              storyScrollerRef.current.style.opacity = "0";
            }
            setTimeout(() => {
              if (storyScrollerRef.current) {
                storyScrollerRef.current.scrollTop = 0;
                storyScrollerRef.current.style.opacity = "1";
              }
              setIsStoryResetting(false);
            }, 500);
          }, 1000);
        }
      }, scrollIntervalTime);
    };

    if (!isStoryResetting) {
      startScrolling();
    }

    return () => clearInterval(scrollInterval);
  }, [isStoryResetting]);

  // Characters section
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [isCharacterFading, setIsCharacterFading] = useState(false);
  const characterTimeoutRef = useRef(null);

  const selectCharacter = (index) => {
    if (index === currentCharacterIndex) return;
    setIsCharacterFading(true);
    clearTimeout(characterTimeoutRef.current);
    setTimeout(() => {
      setCurrentCharacterIndex(index);
      setIsCharacterFading(false);
      characterTimeoutRef.current = setTimeout(nextCharacter, 30000);
    }, 300);
  };

  const nextCharacter = () => {
    setIsCharacterFading(true);
    setTimeout(() => {
      setCurrentCharacterIndex(
        (prevIndex) => (prevIndex + 1) % charactersData.length
      );
      setIsCharacterFading(false);
    }, 300);
  };

  useEffect(() => {
    characterTimeoutRef.current = setTimeout(nextCharacter, 30000);
    return () => clearTimeout(characterTimeoutRef.current);
  }, [currentCharacterIndex]);

  // Features section
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const featureTimeoutRef = useRef(null);

  const nextFeature = () => {
    setCurrentFeatureIndex(
      (prevIndex) => (prevIndex + 1) % featuresData.length
    );
  };

  useEffect(() => {
    featureTimeoutRef.current = setTimeout(nextFeature, 10000);
    return () => clearTimeout(featureTimeoutRef.current);
  }, [currentFeatureIndex]);

  const currentCharacter = charactersData[currentCharacterIndex];

  const handleShowcaseNavClick = (e, sectionId) => {
    e.preventDefault();
    smoothScrollTo(sectionId);
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
              style={{ touchAction: "none" }} // Removed overflowY: 'hidden'
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
                "--character-accent-color": currentCharacter.accentColor,
              }}
            >
              <img
                src={
                  currentCharacter.image ||
                  "/path/to/placeholder_character_large.png"
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
                  onMouseEnter={() => clearTimeout(characterTimeoutRef.current)}
                  onMouseLeave={() =>
                    (characterTimeoutRef.current = setTimeout(
                      nextCharacter,
                      15000
                    ))
                  }
                >
                  <img
                    src={char.thumbnail || "/path/to/placeholder_thumb.png"}
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
                  src={feature.image || "/path/to/placeholder_feature.png"}
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
                  clearTimeout(featureTimeoutRef.current);
                  setCurrentFeatureIndex(index);
                  featureTimeoutRef.current = setTimeout(nextFeature, 10000);
                }}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer /> {/* Add Footer component here */}
    </div>
  );
}

export default Showcase;
