// src/pages/SkillTree/layout-utils.js

const RADIUS_GLOBAL = 150;
const RADIUS_STAR1 = 450;
const RADIUS_STAR2 = 750;

// Define angular "sectors" for each archetype to occupy on the circle
const SECTORS = {
    // Each sector is [startAngle, endAngle] in degrees
    Warrior: [0, 120],
    Assassin: [120, 240],
    // Add more archetypes here, e.g., Mage: [240, 360]
};

const toRadians = (degrees) => degrees * (Math.PI / 180);

export const getHybridRadialLayoutedElements = (nodes, edges) => {
    const layoutedNodes = [];
    const nodeGroups = {
        Global: nodes.filter(n => n.data.archetype === 'Global'),
        Warrior: {
            star1: nodes.filter(n => n.data.archetype === 'Warrior' && n.data.star === 1),
            star2: nodes.filter(n => n.data.archetype === 'Warrior' && n.data.star === 2),
        },
        Assassin: {
            star1: nodes.filter(n => n.data.archetype === 'Assassin' && n.data.star === 1),
            star2: nodes.filter(n => n.data.archetype === 'Assassin' && n.data.star === 2),
        },
    };

    // 1. Position Global nodes in a central circle
    const globalAngleStep = 360 / nodeGroups.Global.length;
    nodeGroups.Global.forEach((node, i) => {
        const angle = toRadians(globalAngleStep * i);
        node.position = {
            x: RADIUS_GLOBAL * Math.cos(angle),
            y: RADIUS_GLOBAL * Math.sin(angle),
        };
        layoutedNodes.push(node);
    });

    // 2. Position Archetype nodes within their sectors and on their tiered rings
    Object.keys(SECTORS).forEach(archetype => {
        const sector = SECTORS[archetype];
        const sectorStartAngle = sector[0];
        const sectorAngleSpan = sector[1] - sector[0];

        const star1Nodes = nodeGroups[archetype].star1;
        const star2Nodes = nodeGroups[archetype].star2;

        // Position Star 1 nodes for this archetype
        const star1AngleStep = sectorAngleSpan / (star1Nodes.length + 1);
        star1Nodes.forEach((node, i) => {
            const angle = toRadians(sectorStartAngle + star1AngleStep * (i + 1));
            node.position = {
                x: RADIUS_STAR1 * Math.cos(angle),
                y: RADIUS_STAR1 * Math.sin(angle),
            };
            layoutedNodes.push(node);
        });

        // Position Star 2 nodes for this archetype
        const star2AngleStep = sectorAngleSpan / (star2Nodes.length + 1);
        star2Nodes.forEach((node, i) => {
            const angle = toRadians(sectorStartAngle + star2AngleStep * (i + 1));
            node.position = {
                x: RADIUS_STAR2 * Math.cos(angle),
                y: RADIUS_STAR2 * Math.sin(angle),
            };
            layoutedNodes.push(node);
        });
    });

    return { nodes: layoutedNodes, edges };
};