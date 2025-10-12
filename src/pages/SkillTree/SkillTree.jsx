// src/pages/SkillTree/SkillTree.jsx
import React, { useEffect, useState } from 'react';
import SkillTreeGraph from './components/SkillTreeGraph';
import SkillTreeControls from './components/SkillTreeControls';
// import SkillDetailModal from './components/SkillDetailModal'; // Commented out
import './SkillTree.css';
import '../Showcase/Showcase.css';

function SkillTree() {
    const [activeArchetype, setActiveArchetype] = useState('All');
    // const [selectedSkill, setSelectedSkill] = useState(null); // Commented out

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="showcase-section skill-tree-page">
            <div className="section-title-container">
                <h1 className="section-title">Skill Tree</h1>
            </div>
            <SkillTreeControls activeArchetype={activeArchetype} setActiveArchetype={setActiveArchetype} />
            <div className="skill-tree-container">
                <SkillTreeGraph activeArchetype={activeArchetype} />
                {/* <SkillTreeGraph activeArchetype={activeArchetype} onNodeClick={setSelectedSkill} /> // Original line */}
            </div>
            {/* <SkillDetailModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} /> // Commented out */}
        </div>
    );
}

export default SkillTree;