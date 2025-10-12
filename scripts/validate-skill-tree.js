/* eslint-env node */
// scripts/validate-skill-tree.js
const { skillTreeData } = require('../src/pages/SkillTree/skillTreeData');

console.log('Validating skill tree data...');

const requiredFields = ['id', 'name', 'archetype', 'type', 'description', 'star'];
const skillIds = new Set();
let hasErrors = false;

skillTreeData.forEach((skill, index) => {
    // 1. Check for duplicate IDs
    if (skillIds.has(skill.id)) {
        console.error(`[ERROR] Duplicate skill ID found: "${skill.id}" at index ${index}.`);
        hasErrors = true;
    }
    skillIds.add(skill.id);

    // 2. Check for missing required fields
    requiredFields.forEach(field => {
        if (skill[field] === undefined || skill[field] === null) {
            console.error(`[ERROR] Skill "${skill.id || 'Unknown'}" is missing required field: "${field}".`);
            hasErrors = true;
        }
    });
});

// 3. Check for broken connections
skillTreeData.forEach(skill => {
    if (skill.connections) {
        skill.connections.forEach(targetId => {
            if (!skillIds.has(targetId)) {
                console.error(`[ERROR] Skill "${skill.id}" has a broken connection to non-existent skill ID: "${targetId}".`);
                hasErrors = true;
            }
        });
    }
});

if (hasErrors) {
    console.error('\nSkill tree validation failed. Please fix the errors above.');
    process.exit(1); // Exit with an error code
}

console.log('✅ Skill tree data is valid!');