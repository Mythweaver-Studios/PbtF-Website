// src/pages/SkillTree/components/SkillNode.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import SkillNode from './SkillNode';

describe('SkillNode', () => {
    const warriorData = {
        name: 'Test Warrior Skill',
        type: 'Passive',
        description: 'A test description.',
        archetype: 'Warrior',
        star: 1,
        onClick: () => {},
    };

    it('renders the skill name and description in the tooltip', () => {
        render(<SkillNode data={warriorData} />);
        
        // Check for the name and description within the tooltip
        expect(screen.getByText('Test Warrior Skill')).toBeInTheDocument();
        expect(screen.getByText('A test description.')).toBeInTheDocument();
    });

    it('applies the correct data-archetype attribute', () => {
        const { container } = render(<SkillNode data={warriorData} />);
        const nodeElement = container.querySelector('.skill-node');
        expect(nodeElement).toHaveAttribute('data-archetype', 'Warrior');
    });

    it('renders the correct star level', () => {
        render(<SkillNode data={{...warriorData, star: 2}} />);
        expect(screen.getByText('★★')).toBeInTheDocument();
    });
});