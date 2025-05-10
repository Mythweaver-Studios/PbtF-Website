// src/pages/Home/Home.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // For linking to showcase sections
import NavBar from "../../components/NavBar";
import MediaLinks from "../../components/MiniMediaLinks";
import Footer from "../../components/Footer";
import "../../components/Default.css";
import "./Home.scss";

// Import images for the new showcase teaser section (same as Showcase.jsx)
import lordChoshenImg from "../../assets/showcase/character_lord_choshen.png"; // Assuming this is a representative image for Story
import blueStarImg from "../../assets/showcase/character_blue_star.png"; // For Characters
import aliceKingstonImg from "../../assets/showcase/character_alice_kingston.png"; // For Features

const showcaseTeaserData = [
  {
    id: "story",
    title: "Story",
    link: "/showcase#story",
    image: lordChoshenImg, // Example image
    accentColor: "var(--theme-highlight-gold)", // Gold for story
  },
  {
    id: "characters",
    title: "Characters",
    link: "/showcase#characters",
    image: blueStarImg, // Example image
    accentColor: "var(--theme-highlight-red)", // Red for characters
  },
  {
    id: "features",
    title: "Features",
    link: "/showcase#features",
    image: aliceKingstonImg, // Example image
    accentColor: "var(--theme-text-titles)", // Brighter gold for features
  },
];

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container home-page">
      <header className="home-header">
        <NavBar />
        <MediaLinks />
      </header>
      <main className="home-content-wrapper">
        {" "}
        {/* Wrapper for main content and new section */}
        <section className="home-main-content">
          {" "}
          {/* Renamed for clarity */}
          <div className="content-left">
            <h1>Crownless</h1>
            <p className="game-pitch">
              <strong>
                Crownless: The Beginning is a tactical survival game where you
                control the fate of summoned heroes battling through a ruthless
                tower of trials. No retries. No revives. Just consequences
              </strong>
            </p>
            <div className="action-buttons">
              <div className="button-row-top">
                <button className="btn btn-primary">Beta Signup</button>
                <button className="btn btn-secondary">Watch Trailer</button>
              </div>
              <button className="btn btn-tertiary">Add to Wishlist</button>
            </div>
          </div>
          <div className="content-right">
            {/* Optional: Could have a subtle image or graphic here */}
          </div>
        </section>
        {/* New Showcase Teaser Section */}
        <section className="showcase-teaser-section">
          {/* <h2 className="teaser-title">Explore the World</h2> You can add a title if desired */}
          <div className="teaser-panels-container">
            {showcaseTeaserData.map((item) => (
              <Link
                to={item.link}
                key={item.id}
                className="teaser-panel"
                style={{ "--panel-accent-color": item.accentColor }}
              >
                <div className="panel-image-container">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="panel-image"
                  />
                  <div className="panel-image-overlay"></div>{" "}
                  {/* For gradient or effects */}
                </div>
                <div className="panel-title-bar">
                  <h3>{item.title}</h3>
                </div>
                <div className="panel-glitch-overlay"></div>{" "}
                {/* For glitch effect on hover */}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
