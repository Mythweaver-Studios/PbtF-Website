// src/pages/SkillTree/components/SkillTreeControls.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './SkillTreeControls.css';

const archetypes = ['All', 'Warrior', 'Assassin'];

function SkillTreeControls({ activeArchetype, setActiveArchetype }) {
    return (
        <div className="skill-tree-controls">
            {archetypes.map(arch => (
                <button
                    key={arch}
                    className={activeArchetype === arch ? 'active' : ''}
                    onClick={() => setActiveArchetype(arch)}
                >
                    {arch}
                </button>
            ))}
        </div>
    );
}

SkillTreeControls.propTypes = {
    activeArchetype: PropTypes.string.isRequired,
    setActiveArchetype: PropTypes.func.isRequired,
};

export default SkillTreeControls;