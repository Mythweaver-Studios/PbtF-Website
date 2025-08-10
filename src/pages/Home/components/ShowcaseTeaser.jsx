// src/pages/Home/components/ShowcaseTeaser.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GiScrollQuill } from "react-icons/gi";
import { FaUsers, FaCogs } from "react-icons/fa";
import "./ShowcaseTeaser.css";

// The deprecated motion() factory function removed.

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

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
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
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {showcaseTeaserData.map((item) => (
                    // motion.div with the polymorphic 'as' prop.
                    // This renders a Link component with motion capabilities.
                    <motion.div
                        key={item.id}
                        as={Link}
                        variants={itemVariants}
                        to={item.link}
                        className="teaser-panel"
                        style={{ "--panel-accent-color": item.accentColor }}
                    >
                        <div className="panel-icon">{item.icon}</div>
                        <h3 className="panel-title">{item.title}</h3>
                        <p className="panel-description">{item.description}</p>
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