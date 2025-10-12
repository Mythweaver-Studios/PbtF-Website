// src/pages/SkillTree/components/SkillDetailModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './SkillDetailModal.css';

function SkillDetailModal({ skill, onClose }) {
    if (!skill) return null;

    return (
        <div className="skill-detail-modal">
            <div className="detail-header">
                <div>
                    <h2 className="detail-name">{skill.name}</h2>
                    <p className="detail-archetype">{skill.archetype} / {skill.type}</p>
                </div>
                <button onClick={onClose} className="detail-close-btn" aria-label="Close">&times;</button>
            </div>
            <div className="detail-body">
                <p>{skill.description}</p>
            </div>
        </div>
    );
}

SkillDetailModal.propTypes = {
    skill: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};

export default SkillDetailModal;