// src/pages/Home/components/ShowcaseTeaser/ShowcaseTeaser.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GiScrollQuill, GiCompass } from "react-icons/gi"; // MODIFIED: GiCompass for Map
import { FaUsers, FaSitemap } from "react-icons/fa"; // MODIFIED: FaSitemap for Skill Tree
import "./ShowcaseTeaser.css";

const showcaseTeaserData = [
    {
        id: "story",
        title: "Story",
        description: "Unravel the dark narrative and the secrets of the Tower.",
        link: "/showcase#story",
        icon: <GiScrollQuill />,
        accentColor: "var(--theme-highlight-gold)",
    },
    {
        id: "characters",
        title: "Characters",
        description: "Meet the heroes summoned to face the trials within.",
        link: "/showcase#characters",
        icon: <FaUsers />,
        accentColor: "var(--theme-highlight-red)",
    },
    {
        id: "skill-tree",
        title: "Skill Tree",
        description: "Forge your path with a vast, branching skill system.",
        link: "/skill-tree",
        icon: <FaSitemap />,
        accentColor: "#4db6ac", // Teal
    },
    {
        id: "interactive-map",
        title: "Interactive Map",
        description: "Discover the world, its regions, and hidden lore.",
        link: "/interactive-map",
        icon: <GiCompass />,
        accentColor: "#42a5f5", // Blue
    },
    {
        id: "features",
        title: "Features",
        description: "Explore the unique mechanics that define your journey.",
        link: "/showcase#features",
        icon: <FaSitemap />, // Using a generic icon, can be updated
        accentColor: "var(--theme-text-titles)",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15, // Adjusted stagger for more items
        },
    },
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

function ShowcaseTeaser({ sectionRef }) {
    return (
        <section
            id="showcase-teaser"
            className="showcase-teaser-section"
            ref={sectionRef}
        >
            <h2 className="section-title">Explore the Game</h2>
            <motion.div
                className="teaser-panels-container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Adjusted amount for a larger container
            >
                {showcaseTeaserData.map((item) => (
                    <motion.div key={item.id} variants={itemVariants}>
                        <Link
                            to={item.link}
                            className="teaser-panel"
                            style={{ "--panel-accent-color": item.accentColor }}
                        >
                            <div className="panel-icon">{item.icon}</div>
                            <h3 className="panel-title">{item.title}</h3>
                            <p className="panel-description">{item.description}</p>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
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