// src/pages/SkillTree/components/SkillDetailModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { colorizeText } from '../utils/text-utils'; // MODIFIED: Import and use colorizeText
import './SkillDetailModal.css';

const panelVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 }
};

function SkillDetailModal({ skill, onClose }) {
    if (!skill) return null;

    return (
        <motion.div
            className="skill-detail-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
            <div className="detail-header">
                <div className="detail-title-group">
                    <h2 className="detail-name">{skill.name}</h2>
                    <p className="detail-archetype">{skill.archetype} / {skill.type}</p>
                </div>
                <button onClick={onClose} className="detail-close-btn" aria-label="Close">&times;</button>
            </div>
            <div className="detail-body">
                <p>{colorizeText(skill.description)}</p>
            </div>
        </motion.div>
    );
}

SkillDetailModal.propTypes = {
    skill: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};

export default SkillDetailModal;