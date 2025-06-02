// src/pages/Home/Home.jsx
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import MediaLinks from "../../components/MiniMediaLinks";
import Footer from "../../components/Footer";
import NewsTeaser from "./components/NewsTeaser";
import ShowcaseTeaser from "./components/ShowcaseTeaser";
import "../../components/Default.css";
import "./Home.css";

// Kept for scroll spy logic orchestration
const homeSections = [
    { id: "hero", title: "Top" },
    { id: "news-teaser", title: "News" },
    { id: "showcase-teaser", title: "Showcase" },
];

function Home() {
    const location = useLocation();
    const navigate = useNavigate();

    const spyNavigatingRef = useRef(false);
    const initialLoadScrollRef = useRef(true);

    const sectionRefs = {
        hero: useRef(null),
        "news-teaser": useRef(null),
        "showcase-teaser": useRef(null),
    };

    // Effect for scrolling when hash changes
    useEffect(() => {
        if (spyNavigatingRef.current) {
            spyNavigatingRef.current = false;
            return;
        }

        const id = location.hash.substring(1);
        if (id && sectionRefs[id]?.current) {
            const element = sectionRefs[id].current;
            const headerOffset = 80;
            const elementPosition =
                element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: initialLoadScrollRef.current ? "auto" : "smooth",
            });
        } else if (
            !id &&
            initialLoadScrollRef.current &&
            location.pathname === "/home"
        ) {
            window.scrollTo(0, 0);
        }
        initialLoadScrollRef.current = false;
    }, [location.hash, location.pathname]);

    // Scroll spy effect to update URL hash
    useEffect(() => {
        const handleScroll = () => {
            if (location.pathname !== "/home") {
                return;
            }

            let currentSectionId = homeSections[0].id;
            const headerOffset = 120;
            const scrollPosition = window.scrollY + headerOffset;

            for (const section of homeSections) {
                if (section.id === "hero") continue;
                const element = sectionRefs[section.id]?.current;
                if (element) {
                    if (
                        element.offsetTop <= scrollPosition &&
                        element.offsetTop + element.offsetHeight > scrollPosition
                    ) {
                        currentSectionId = section.id;
                        break;
                    }
                }
            }
            if (
                sectionRefs["news-teaser"].current && // Ensure ref is available
                window.scrollY <
                sectionRefs["news-teaser"].current.offsetTop - headerOffset &&
                window.scrollY < 200
            ) {
                currentSectionId = homeSections[0].id;
            }

            const newHashBasedPath =
                currentSectionId === homeSections[0].id
                    ? "/home"
                    : `/home#${currentSectionId}`;
            const currentPathWithHash = location.hash
                ? `/home${location.hash}`
                : "/home";

            if (newHashBasedPath !== currentPathWithHash) {
                spyNavigatingRef.current = true;
                navigate(newHashBasedPath, { replace: true });
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        const timer = setTimeout(() => {
            if (location.pathname === "/home") {
                handleScroll();
            }
        }, 150);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        };
    }, [location.pathname, location.hash, navigate, sectionRefs]); // Added sectionRefs to dependency array

    return (
        <div className="page-container home-page">
            <header className="home-header">
                <NavBar />
                <MediaLinks />
            </header>
            <main className="home-content-wrapper">
                {/* Hero Section (remains directly in Home.jsx) */}
                <section id="hero" className="home-main-content" ref={sectionRefs.hero}>
                    <div className="content-left">
                        <h1>Crownless</h1>
                        <p className="game-pitch">
                            <strong>
                                Crownless: The Beginning is a tactical survival game where you
                                control the fate of summoned heroes battling through a ruthless
                                tower of trials. No retries. No revives. Just consequences.
                            </strong>
                        </p>
                        <div className="action-buttons">
                            <div className="button-row-top">
                                <button className="btn btn-primary btn-disabled">Beta Signup</button>
                                <button className="btn btn-secondary btn-disabled">Watch Trailer</button>
                            </div>
                            <button className="btn btn-tertiary btn-disabled">Add to Wishlist</button>
                        </div>
                    </div>
                    <div className="content-right"></div>
                </section>

                {/* News Teaser Section Component */}
                <NewsTeaser sectionRef={sectionRefs["news-teaser"]} />

                {/* Showcase Teaser Section Component */}
                <ShowcaseTeaser sectionRef={sectionRefs["showcase-teaser"]} />
            </main>
            <Footer />
        </div>
    );
}

export default Home;