// src/pages/SkillTree/SkillTree.jsx
import React, { useEffect } from 'react';
import './SkillTree.css';
import '../../Showcase/Showcase.css'; // Re-using showcase styles for consistency

function SkillTree() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="showcase-section skill-tree-page">
            <div className="section-title-container">
                <h1 className="section-title">Skill Tree</h1>
            </div>
            <div className="placeholder-content">
                <p>The skill tree planner is currently under development.</p>
                <p>Return soon to forge your hero&apos;s path.</p>
            </div>
        </div>
    );
}

export default SkillTree;