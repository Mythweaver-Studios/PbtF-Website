// src/pages/SkillTree/components/SkillTreeGraph.jsx
import React, { useState, useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import PropTypes from 'prop-types';
import 'reactflow/dist/style.css';
import { skillTreeData } from '../skillTreeData';
import SkillNode from './SkillNode';

const nodeTypes = { skillNode: SkillNode };

const baseNodes = skillTreeData.map(skill => ({
    id: skill.id,
    type: 'skillNode',
    position: skill.position,
    draggable: false,
    data: {
        name: skill.name,
        type: skill.type,
        description: skill.description,
        archetype: skill.archetype,
    },
}));

const baseEdges = [];
skillTreeData.forEach(skill => {
    if (skill.connections && skill.connections.length > 0) {
        skill.connections.forEach(targetId => {
            baseEdges.push({
                id: `${skill.id}-${targetId}`,
                source: skill.id,
                target: targetId,
                animated: true,
                style: { stroke: 'var(--theme-border-gold)', strokeWidth: 2 },
            });
        });
    }
});

function SkillTreeGraph({ activeArchetype, onNodeClick }) { // onNodeClick is now optional
    const [nodes, setNodes] = useState(baseNodes);
    const [edges, setEdges] = useState(baseEdges);

    useEffect(() => {
        const isVisible = (skill) => {
            if (activeArchetype === 'All' || skill.archetype === 'Global') {
                return true;
            }
            return skill.archetype === activeArchetype;
        };

        setNodes(baseNodes.map(node => ({
            ...node,
            style: { ...node.style, opacity: isVisible(node.data) ? 1 : 0.25, transition: 'opacity 0.3s ease' },
            data: {
                ...node.data,
                onClick: onNodeClick, 
            }
        })));

        setEdges(baseEdges.map(edge => {
            const sourceNode = baseNodes.find(n => n.id === edge.source);
            return {
                ...edge,
                style: {
                    ...edge.style,
                    opacity: isVisible(sourceNode.data) ? 1 : 0.1,
                    transition: 'opacity 0.3s ease',
                },
            };
        }));
    }, [activeArchetype, onNodeClick]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.2}
            className="react-flow-themed"
            proOptions={{ hideAttribution: true }}
            nodesDraggable={false}
            zoomOnScroll={false}
            preventScrolling={false} // ADDED: Allows page to scroll over the component
        >
            <Background />
            <Controls />
            <MiniMap />
        </ReactFlow>
    );
}

SkillTreeGraph.propTypes = {
    activeArchetype: PropTypes.string.isRequired,
    onNodeClick: PropTypes.func, // MODIFIED: No longer required
};

// ADDED: Default prop for when onNodeClick is not provided
SkillTreeGraph.defaultProps = {
    onNodeClick: () => {},
};

export default SkillTreeGraph;