// src/pages/SkillTree/layout-utils.js

const STAR1_RADIUS = 350;
const STAR2_RADIUS = 700;

export const getRadialLayoutedElements = (nodes, edges) => {
    const star1Nodes = nodes.filter(n => n.data.star === 1 && n.data.archetype !== 'Global');
    const star2Nodes = nodes.filter(n => n.data.star === 2);
    const globalNodes = nodes.filter(n => n.data.archetype === 'Global');

    // Position global nodes vertically in the center
    globalNodes.forEach((node, i) => {
        node.position = { x: 0, y: i * 180 - 180 };
    });

    // Position Star 1 nodes on the inner circle
    const angleStep1 = 360 / star1Nodes.length;
    star1Nodes.forEach((node, i) => {
        const angle = (angleStep1 * i) * (Math.PI / 180); // Convert to radians
        node.position = {
            x: STAR1_RADIUS * Math.cos(angle),
            y: STAR1_RADIUS * Math.sin(angle),
        };
    });

    // Position Star 2 nodes on the outer circle
    const angleStep2 = 360 / star2Nodes.length;
    star2Nodes.forEach((node, i) => {
        const angle = (angleStep2 * i) * (Math.PI / 180); // Convert to radians
        node.position = {
            x: STAR2_RADIUS * Math.cos(angle),
            y: STAR2_RADIUS * Math.sin(angle),
        };
    });

    return { nodes: [...globalNodes, ...star1Nodes, ...star2Nodes], edges };
};