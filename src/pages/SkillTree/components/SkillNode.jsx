// src/pages/SkillTree/components/SkillNode.jsx
import React from 'react';
import { Handle, Position } from 'reactflow';
import PropTypes from 'prop-types';
import { FaKhanda, FaUserNinja, FaStar } from 'react-icons/fa'; 
import './SkillNode.css';

const colorizeText = (text) => {
    const keywords = {
        burn: 'keyword-burn',
        bleed: 'keyword-bleed',
        poison: 'keyword-poison',
    };
    const regex = new RegExp(`\\b(${Object.keys(keywords).join('|')})\\b`, 'gi');
    
    const parts = text.split(regex);

    return parts.map((part, index) => {
        const lowerPart = part.toLowerCase();
        if (keywords[lowerPart]) {
            return <span key={index} className={keywords[lowerPart]}>{part}</span>;
        }
        return part;
    });
};

const archetypeIcons = {
    Warrior: <FaKhanda  />,
    Assassin: <FaUserNinja />,
    Global: <FaStar />,
};

function SkillNode({ data }) {
    const icon = archetypeIcons[data.archetype] || <FaStar />;

    const handleClick = () => {
        if (data.onClick) {
            data.onClick(data);
        }
    };

    return (
        <div className="skill-node" data-archetype={data.archetype} onClick={handleClick}>
            <div className="skill-star-rating">{'★'.repeat(data.star)}</div>
            <Handle type="target" position={Position.Top} style={{ background: 'transparent', border: 'none' }} />
            
            <div className="skill-node-icon">{icon}</div>

            <div className="skill-tooltip">
                <div className="skill-tooltip-header">
                    <span className="skill-tooltip-name">{data.name}</span>
                    <span className="skill-tooltip-type">{data.type}</span>
                </div>
                <p className="skill-tooltip-desc">{colorizeText(data.description)}</p>
            </div>

            <Handle type="source" position={Position.Bottom} style={{ background: 'transparent', border: 'none' }} />
        </div>
    );
}

SkillNode.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        archetype: PropTypes.string.isRequired,
        star: PropTypes.number.isRequired,
        onClick: PropTypes.func,
    }).isRequired,
};

export default SkillNode;