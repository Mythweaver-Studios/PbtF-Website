// src/pages/SkillTree/components/SkillTreeGraph.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import PropTypes from 'prop-types';
import 'reactflow/dist/style.css';
import { skillTreeData } from '../skillTreeData';
import SkillNode from './SkillNode';
import { getHybridRadialLayoutedElements } from '../layout-utils'; // MODIFIED: Import new hybrid function

const nodeTypes = { skillNode: SkillNode };

const baseNodes = skillTreeData.map(skill => ({
    id: skill.id,
    type: 'skillNode',
    data: {
        name: skill.name,
        type: skill.type,
        description: skill.description,
        archetype: skill.archetype,
        star: skill.star || 1,
    },
}));

const baseEdges = [];
skillTreeData.forEach(skill => {
    if (skill.connections && skill.connections.length > 0) {
        skill.connections.forEach(targetId => {
            if (skillTreeData.some(s => s.id === targetId)) {
                baseEdges.push({
                    id: `${skill.id}-${targetId}`,
                    source: skill.id,
                    target: targetId,
                    animated: true,
                    style: { stroke: 'var(--theme-border-gold)', strokeWidth: 2 },
                });
            }
        });
    }
});

function SkillTreeGraph({ activeArchetype, onNodeClick, searchTerm }) {
    const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
        () => getHybridRadialLayoutedElements(baseNodes, baseEdges), // MODIFIED: Call new layout function
        []
    );
    
    const [nodes, setNodes] = useState(layoutedNodes);
    const [edges, setEdges] = useState(layoutedEdges);

    useEffect(() => {
        const isVisible = (skill) => {
            const archetypeMatch = activeArchetype === 'All' || skill.archetype === 'Global' || skill.archetype === activeArchetype;
            const searchMatch = !searchTerm || skill.name.toLowerCase().includes(searchTerm.toLowerCase());
            return archetypeMatch && searchMatch;
        };

        setNodes(layoutedNodes.map(node => ({
            ...node,
            style: { ...node.style, opacity: isVisible(node.data) ? 1 : 0.25, transition: 'opacity 0.3s ease' },
            data: { ...node.data, onClick: onNodeClick }
        })));

        setEdges(layoutedEdges.map(edge => {
            const sourceNode = layoutedNodes.find(n => n.id === edge.source);
            const targetNode = layoutedNodes.find(n => n.id === edge.target);
            const sourceVisible = isVisible(sourceNode.data);
            const targetVisible = isVisible(targetNode.data);

            return {
                ...edge,
                style: { ...edge.style, opacity: (sourceVisible && targetVisible) ? 1 : 0.1, transition: 'opacity 0.3s ease' },
            };
        }));
    }, [activeArchetype, onNodeClick, layoutedNodes, layoutedEdges, searchTerm]);

    return (
        <div style={{ flexGrow: 1, height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                minZoom={0.2}
                className="react-flow-themed"
                proOptions={{ hideAttribution: true }}
                nodesDraggable={false}
                zoomOnScroll={true}
                preventScrolling={true}
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
}

SkillTreeGraph.propTypes = {
    activeArchetype: PropTypes.string.isRequired,
    onNodeClick: PropTypes.func,
    searchTerm: PropTypes.string,
};

SkillTreeGraph.defaultProps = {
    onNodeClick: () => {},
    searchTerm: '',
};

export default SkillTreeGraph;