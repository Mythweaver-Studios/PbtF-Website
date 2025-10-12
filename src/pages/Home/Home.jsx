// src/pages/Home/Home.jsx
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShowcaseTeaser from "./components/ShowcaseTeaser";
/* import FloatingSword from "./animations/FloatingSword"; */
import "./Home.css";

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

    // All the scroll-spy and navigation logic is preserved as it's
    // unique to the Home page's functionality.
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
    }, [location.hash, location.pathname, sectionRefs]);

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
                sectionRefs["news-teaser"].current &&
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
    }, [location.pathname, location.hash, navigate, sectionRefs]);

    return (
        <>
            {/* Hero Section */}
            <section id="hero" className="home-main-content" ref={sectionRefs.hero}>
                <h1>Paved by the Fallen</h1>
                <p className="game-pitch">
                    <strong>
                        A tactical survival game where you
                        control the fate of summoned heroes battling through a ruthless
                        tower of trials. No retries. No revives. Just hardships.
                    </strong>
                </p>
                <div className="action-buttons">
                    <div className="button-row-top">
                        <button className="btn btn-primary btn-disabled">Beta Signup</button>
                        <button className="btn btn-secondary btn-disabled">Watch Trailer</button>
                    </div>
                    <button className="btn btn-tertiary btn-disabled">Add to Wishlist</button>
                </div>
            </section>

            {/* Showcase Teaser Section Component */}
            <ShowcaseTeaser sectionRef={sectionRefs["showcase-teaser"]} />
        </>
    );
}

export default Home;