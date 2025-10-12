// src/pages/SkillTree/skillTreeData.js
// ... (Data structure is the same, but now fully populated with all skills and connections)
export const skillTreeData = [
    // --- SHARED / GLOBAL SKILLS ---
    { id: 'combat_sense', name: 'Combat Sense', archetype: 'Global', type: 'Active', description: 'Increase movement speed and attack speed by 15% for 5 seconds for 5 seconds.', position: { x: 0, y: 0 }, connections: ['beginners_swordsmanship', 'swift_blade'] },
    { id: 'low_sweep', name: 'Low Sweep', archetype: 'Global', type: 'Active', description: 'Dash towards the furthest enemy, dealing 3 +20% strength, and slowing the target for 30% movement speed for 3 seconds.', position: { x: 0, y: 150 }, connections: [] },
    { id: 'enhanced_strike', name: 'Enhanced Strike', archetype: 'Global', type: 'Active', description: 'Enhance the next attack, dealing bonus damage based on 20% of the enemy’s missing hp.', position: { x: 0, y: 300 }, connections: [] },
    { id: 'dash', name: 'Dash', archetype: 'Global', type: 'Active', description: 'Teleport 2.5 meters in the facing direction.', position: { x: 0, y: -150 }, connections: [] },
    // Resistances
    { id: 'bleeding_resistance', name: 'Bleeding Resistance', archetype: 'Global', type: 'Passive', description: 'Take 1 less bleed damage.', position: { x: -150, y: -250 }, connections: [] },
    { id: 'burn_resistance', name: 'Burn Resistance', archetype: 'Global', type: 'Passive', description: 'Take 1 less burn damage.', position: { x: 0, y: -250 }, connections: [] },
    { id: 'poison_resistance', name: 'Poison Resistance', archetype: 'Global', type: 'Passive', description: 'Take 1 less poison damage.', position: { x: 150, y: -250 }, connections: [] },
    { id: 'regeneration', name: 'Regeneration', archetype: 'Global', type: 'Passive', description: 'Heal 2.5% of max HP over time.', position: { x: 0, y: -400 }, connections: [] },

    // --- WARRIOR SKILLS ---
    { id: 'beginners_swordsmanship', name: 'Beginner\'s Swordsmanship', archetype: 'Warrior', type: 'Passive', description: 'When using a sword, deal +1 damage.', position: { x: 250, y: -50 }, connections: ['adepts_swordsmanship'] },
    { id: 'sturdy_stance', name: 'Sturdy Stance', archetype: 'Warrior', type: 'Passive', description: 'Take 3 less damage from critical hits.', position: { x: 250, y: 100 }, connections: [] },
    { id: 'poised_blade', name: 'Poised Blade', archetype: 'Warrior', type: 'Passive', description: 'Increases Crit Rate by 5% and Crit Damage by 5%.', position: { x: 250, y: 250 }, connections: [] },
    { id: 'thick_skin', name: 'Thick Skin', archetype: 'Warrior', type: 'Passive', description: 'Reduce 5 damage + 5% Defense.', position: { x: 500, y: 300 }, connections: [] },
    { id: 'tenacity', name: 'Tenacity', archetype: 'Warrior', type: 'Passive', description: 'When equipped with a shield, decreases duration of CC by 15%.', position: { x: 700, y: 250 }, connections: [] },
    { id: 'adepts_swordsmanship', name: 'Adept\'s Swordsmanship', archetype: 'Warrior', type: 'Passive', description: 'Linked from Beginner\'s Swordsmanship.', position: { x: 450, y: -100 }, connections: ['horizontal_slash'] },
    { id: 'horizontal_slash', name: 'Horizontal Slash', archetype: 'Warrior', type: 'Active', description: 'Unleashes a powerful horizontal slash, dealing +40% strength bonus damage.', position: { x: 650, y: -150 }, connections: [] },
    { id: 'block', name: 'Block', archetype: 'Warrior', type: 'Active', description: 'Absorb 20 damage +15% defense for 5 seconds.', position: { x: 450, y: 50 }, connections: [] },
    { id: 'heavy_strike', name: 'Heavy Strike', archetype: 'Warrior', type: 'Active', description: 'Charges up an attack that deals 8 damage + 20% strength.', position: { x: 650, y: 0 }, connections: [] },
    { id: 'cleave', name: 'Cleave', archetype: 'Warrior', type: 'Active', description: 'Attacks in a horizontal line that deals 6 damage + 8% strength with 1 stack of bleeding.', position: { x: 850, y: -50 }, connections: [] },
    { id: 'shout', name: 'Shout', archetype: 'Warrior', type: 'Active', description: 'Aggros nearby enemies for 5 seconds.', position: { x: 850, y: 100 }, connections: [] },

    // --- ASSASSIN SKILLS ---
    { id: 'swift_blade', name: 'Swift Blade', archetype: 'Assassin', type: 'Passive', description: 'Basic attacks now scale with dexterity.', position: { x: -250, y: -50 }, connections: ['swift_assassin'] },
    { id: 'evasive_figure', name: 'Evasive Figure', archetype: 'Assassin', type: 'Passive', description: 'Increase evasion by 15%.', position: { x: -250, y: 100 }, connections: [] },
    { id: 'lucky_shot', name: 'Lucky Shot', archetype: 'Assassin', type: 'Passive', description: '+10% chance of not consuming an arrow on hit.', position: { x: -250, y: 250 }, connections: ['skilled_archer'] },
    { id: 'silent_steps', name: 'Silent Steps', archetype: 'Assassin', type: 'Passive', description: 'When moving and attacking, consume 3 less SP.', position: { x: -500, y: 300 }, connections: ['stealth_i'] },
    { id: 'lightweight_ambusher', name: 'Lightweight Ambusher', archetype: 'Assassin', type: 'Passive', description: 'With dagger/bows, first instance of damage deals 10 bonus damage +25% dex.', position: { x: -700, y: 250 }, connections: [] },
    { id: 'swift_assassin', name: 'Swift Assassin', archetype: 'Assassin', type: 'Passive', description: 'Linked from Swift Blade.', position: { x: -450, y: -100 }, connections: ['stab'] },
    { id: 'skilled_archer', name: 'Skilled Archer', archetype: 'Assassin', type: 'Passive', description: 'Linked from Lucky Shot.', position: { x: -450, y: 200 }, connections: [] },
    { id: 'stealth_i', name: 'Stealth I', archetype: 'Assassin', type: 'Passive', description: 'Linked from Silent Steps.', position: { x: -650, y: 200 }, connections: [] },
    { id: 'throw', name: 'Throw', archetype: 'Assassin', type: 'Active', description: 'Throw a dagger dealing original dagger damage + 10% dex.', position: { x: -450, y: 50 }, connections: [] },
    { id: 'sneak', name: 'Sneak', archetype: 'Assassin', type: 'Active', description: 'Become invisible for 3.5 seconds. Enemies can see you within 8 meters.', position: { x: -650, y: 0 }, connections: [] },
    { id: 'focused_shot', name: 'Focused Shot', archetype: 'Assassin', type: 'Active', description: 'Powerful ranged attack, dealing 7 +15% str +15 % dex, revealing nearby enemies.', position: { x: -850, y: -50 }, connections: [] },
    { id: 'stab', name: 'Stab', archetype: 'Assassin', type: 'Active', description: 'Deal 6 damage. If behind the enemy, deal 6 + 15% dex.', position: { x: -650, y: -150 }, connections: [] },
    { id: 'split_shot', name: 'Split Shot', archetype: 'Assassin', type: 'Active', description: 'Arrow splits into two, each dealing 5 damage + 15% dex.', position: { x: -850, y: 100 }, connections: [] },
];