// src/pages/Home/components/ShowcaseTeaser.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ShowcaseTeaser.css";

// Import images (assuming paths are relative to this new component's location or correctly configured for bundling)
import lordChoshenImg from "../../../assets/showcase/character_lord_choshen.png";
import blueStarImg from "../../../assets/showcase/character_blue_star.png";
import aliceKingstonImg from "../../../assets/showcase/character_alice_kingston.png";

// Data for the showcase teaser section
const showcaseTeaserData = [
  {
    id: "story",
    title: "Story",
    link: "/showcase#story",
    image: lordChoshenImg,
    accentColor: "var(--theme-highlight-gold)",
  },
  {
    id: "characters",
    title: "Characters",
    link: "/showcase#characters",
    image: blueStarImg,
    accentColor: "var(--theme-highlight-red)",
  },
  {
    id: "features",
    title: "Features",
    link: "/showcase#features",
    image: aliceKingstonImg,
    accentColor: "var(--theme-text-titles)",
  },
];

function ShowcaseTeaser({ sectionRef }) {
  return (
    <section
      id="showcase-teaser"
      className="showcase-teaser-section"
      ref={sectionRef}
    >
      <h2 className="section-title">Game Showcase</h2>
      <div className="teaser-panels-container">
        {showcaseTeaserData.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            className="teaser-panel"
            style={{ "--panel-accent-color": item.accentColor }}
          >
            <div className="panel-image-container">
              <img src={item.image} alt={item.title} className="panel-image" />
              <div className="panel-image-overlay"></div>
            </div>
            <div className="panel-title-bar">
              <h3>{item.title}</h3>
            </div>
            <div className="panel-glitch-overlay"></div>
          </Link>
        ))}
      </div>
    </section>
  );
}

ShowcaseTeaser.propTypes = {
  sectionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default ShowcaseTeaser;
