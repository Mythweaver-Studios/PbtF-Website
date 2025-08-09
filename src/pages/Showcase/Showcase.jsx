// src/pages/Showcase/Showcase.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import StoryScroller from "./components/Story";
import FeaturesSlideshow from "./components/Features";
import CharactersSection from "./components/Characters";
import { storyText } from "./data/storyText";
import { featuresData } from "./data/featuresData";
import { charactersData } from "./data/charactersData";
import "./Showcase.css";

const showcaseNavItems = [
    { id: "story", title: "Story" },
    { id: "characters", title: "Characters" },
    { id: "features", title: "Features" },
];

function Showcase() {
    const internalNavRef = useRef(false);
    const location = useLocation();
    const [activeSection, setActiveSection] = useState("story");

    const sectionRefs = {
        story: useRef(null),
        characters: useRef(null),
        features: useRef(null),
    };

    // Corrected mount effect: Only scroll to top if NO hash is present.
    useEffect(() => {
        if (!location.hash) {
            window.scrollTo(0, 0);
        }
        if (location.hash) {
            setActiveSection(location.hash.substring(1));
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    // This effect now correctly handles scrolling when a hash is present on navigation.
    useEffect(() => {
        if (location.hash && !internalNavRef.current) {
            const id = location.hash.substring(1);
            const timer = setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100); // Small delay to ensure the element is rendered
            return () => clearTimeout(timer);
        }
    }, [location.hash]);

    const handleShowcaseNavClick = (e, sectionId) => {
        if (e) e.preventDefault();
        internalNavRef.current = true;
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            if (window.history.pushState) {
                window.history.pushState(null, null, `#${sectionId}`);
            } else {
                window.location.hash = sectionId;
            }
            setActiveSection(sectionId);
            setTimeout(() => {
                internalNavRef.current = false;
            }, 1000);
        }
    };

    // Scroll spy for side navigation remains unchanged
    useEffect(() => {
        const handleScroll = () => {
            if (internalNavRef.current) return;
            let currentSection = "";
            const scrollPosition = window.scrollY + window.innerHeight / 2.5;
            showcaseNavItems.forEach((item) => {
                const sectionElement = sectionRefs[item.id].current;
                if (sectionElement && sectionElement.offsetTop <= scrollPosition && sectionElement.offsetTop + sectionElement.offsetHeight > scrollPosition) {
                    currentSection = item.id;
                }
            });
            if (currentSection && currentSection !== activeSection) {
                setActiveSection(currentSection);
                if (window.history.replaceState) {
                    window.history.replaceState(null, null, `#${currentSection}`);
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeSection, sectionRefs]);

    return (
        <>
            <nav className="showcase-side-nav">
                <div className="side-nav-line"></div>
                <ul>
                    {showcaseNavItems.map((item) => (
                        <li key={item.id} className={`side-nav-item ${activeSection === item.id ? "active" : ""}`}>
                            <a href={`#${item.id}`} onClick={(e) => handleShowcaseNavClick(e, item.id)} className="side-nav-link">
                                <span className="side-nav-indicator"></span>
                                <span className="side-nav-text">{item.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <section id="story" className="showcase-section story-section" ref={sectionRefs.story}>
                <div className="section-title-container">
                    <h2 className="section-title">Story</h2>
                </div>
                <StoryScroller storyText={storyText} />
            </section>

            <section id="characters" className="showcase-section characters-section" ref={sectionRefs.characters}>
                <div className="section-title-container">
                    <h2 className="section-title">Characters</h2>
                </div>
                <CharactersSection charactersData={charactersData} />
            </section>

            <section id="features" className="showcase-section features-section" ref={sectionRefs.features}>
                <div className="section-title-container">
                    <h2 className="section-title">Features</h2>
                </div>
                <FeaturesSlideshow featuresData={featuresData} />
            </section>
        </>
    );
}

export default Showcase;