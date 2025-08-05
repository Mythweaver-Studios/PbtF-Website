// src/pages/Home/components/ShowcaseTeaser.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GiScrollQuill } from "react-icons/gi"; // Icon for Story
import { FaUsers, FaCogs } from "react-icons/fa"; // Icons for Characters & Features
import "./ShowcaseTeaser.css";

// Updated data structure for the new card design
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
        id: "features",
        title: "Features",
        description: "Explore the unique mechanics that define your journey.",
        link: "/showcase#features",
        icon: <FaCogs />,
        accentColor: "var(--theme-text-titles)",
    },
];

// Framer Motion variants for staggered animation
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2, // Each card animates 0.2s after the previous one
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
            <h2 className="section-title">Game Showcase</h2>
            <motion.div
                className="teaser-panels-container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible" // Animate when the container scrolls into view
                viewport={{ once: true, amount: 0.3 }} // Trigger animation once 30% is visible
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