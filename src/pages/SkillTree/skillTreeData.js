// src/pages/SkillTree/skillTreeData.js

export const skillTreeData = [
    // --- STAR 1 SHARED / GLOBAL SKILLS ---
    { id: 'combat_sense', name: 'Combat Sense', archetype: 'Global', type: 'Active', star: 1, description: 'Increase movement speed and attack speed by 15% for 5 seconds.', connections: ['beginners_swordsmanship', 'swift_blade'] },
    { id: 'low_sweep', name: 'Low Sweep', archetype: 'Global', type: 'Active', star: 1, description: 'Dash towards the furthest enemy, dealing 3 damage +20% strength, and slowing the target by 30% movement speed for 3 seconds.', connections: [] },
    { id: 'enhanced_strike', name: 'Enhanced Strike', archetype: 'Global', type: 'Active', star: 1, description: 'Enhance the next attack, dealing bonus damage based on 20% of the enemy’s missing HP.', connections: [] },
    { id: 'dash', name: 'Dash', archetype: 'Global', type: 'Active', star: 1, description: 'Teleport 2.5 meters in the facing direction.', connections: [] },
    { id: 'bleeding_resistance', name: 'Bleeding Resistance', archetype: 'Global', type: 'Passive', star: 1, description: 'Take 1 less bleed damage.', connections: [] },
    { id: 'burn_resistance', name: 'Burn Resistance', archetype: 'Global', type: 'Passive', star: 1, description: 'Take 1 less burn damage.', connections: [] },
    { id: 'poison_resistance', name: 'Poison Resistance', archetype: 'Global', type: 'Passive', star: 1, description: 'Take 1 less poison damage.', connections: [] },
    { id: 'regeneration', name: 'Regeneration', archetype: 'Global', type: 'Passive', star: 1, description: 'Heal 2.5% of max HP over time.', connections: [] },

    // --- STAR 1 WARRIOR SKILLS ---
    { id: 'beginners_swordsmanship', name: 'Beginner\'s Swordsmanship', archetype: 'Warrior', type: 'Passive', star: 1, description: 'When using a sword, deal +1 damage.', connections: ['adept_swordsmanship'] },
    { id: 'sturdy_stance', name: 'Sturdy Stance', archetype: 'Warrior', type: 'Passive', star: 1, description: 'Take 3 less damage from critical hits.', connections: [] },
    { id: 'poised_blade', name: 'Poised Blade', archetype: 'Warrior', type: 'Passive', star: 1, description: 'Increases Crit Rate by 5% and Crit Damage by 5%.', connections: [] },
    { id: 'thick_skin', name: 'Thick Skin', archetype: 'Warrior', type: 'Passive', star: 1, description: 'Reduce incoming damage by 5 and increase Defense by 5%.', connections: ['feast_of_weakness'] },
    { id: 'tenacity', name: 'Tenacity', archetype: 'Warrior', type: 'Passive', star: 1, description: 'When equipped with a shield, decreases duration of CC by 15%.', connections: ['protectors_presence'] },
    { id: 'horizontal_slash', name: 'Horizontal Slash', archetype: 'Warrior', type: 'Active', star: 1, description: 'Unleash a powerful horizontal slash, dealing +40% strength bonus damage.', connections: ['horizontal_slash_ii'] },
    { id: 'block', name: 'Block', archetype: 'Warrior', type: 'Active', star: 1, description: 'Absorb 20 damage +15% defense for up to 5 seconds.', connections: [] },
    { id: 'heavy_strike', name: 'Heavy Strike', archetype: 'Warrior', type: 'Active', star: 1, description: 'Charge up an attack that deals 8 damage + 20% strength.', connections: ['impaling_thrust'] },
    { id: 'cleave', name: 'Cleave', archetype: 'Warrior', type: 'Active', star: 1, description: 'Attack in a horizontal line that deals 6 damage + 8% strength and applies 1 stack of bleeding.', connections: [] },
    { id: 'shout', name: 'Shout', archetype: 'Warrior', type: 'Active', star: 1, description: 'Aggro nearby enemies for 5 seconds.', connections: [] },

    // --- STAR 1 ASSASSIN SKILLS ---
    { id: 'swift_blade', name: 'Swift Blade', archetype: 'Assassin', type: 'Passive', star: 1, description: 'Basic attacks now scale with dexterity.', connections: ['swift_assassin'] },
    { id: 'evasive_figure', name: 'Evasive Figure', archetype: 'Assassin', type: 'Passive', star: 1, description: 'Increase evasion by 15%.', connections: ['slippery'] },
    { id: 'lucky_shot', name: 'Lucky Shot', archetype: 'Assassin', type: 'Passive', star: 1, description: '+10% chance of not consuming an arrow on hit.', connections: ['novice_archer'] },
    { id: 'silent_steps', name: 'Silent Steps', archetype: 'Assassin', type: 'Passive', star: 1, description: 'When moving and attacking, consume 3 less SP.', connections: ['stealth_i'] },
    { id: 'lightweight_ambusher', name: 'Lightweight Ambusher', archetype: 'Assassin', type: 'Passive', star: 1, description: 'With a dagger or bow, the first instance of damage dealt to an enemy deals 10 bonus damage +25% dexterity.', connections: [] },
    { id: 'throw', name: 'Throw', archetype: 'Assassin', type: 'Active', star: 1, description: 'Throw a dagger, dealing its damage + 10% dexterity.', connections: ['fan_of_daggers'] },
    { id: 'sneak', name: 'Sneak', archetype: 'Assassin', type: 'Active', star: 1, description: 'Become invisible for 3.5 seconds. Enemies can see you within a radius of 8 meters.', connections: ['ambush'] },
    { id: 'stab', name: 'Stab', archetype: 'Assassin', type: 'Active', star: 1, description: 'Deal 6 damage. If behind the enemy, deal 6 damage + 15% dexterity.', connections: ['opportunist'] },
    { id: 'split_shot', name: 'Split Shot', archetype: 'Assassin', type: 'Active', star: 1, description: 'Fire an arrow that splits into two, each dealing 5 damage + 15% dexterity.', connections: ['multiple_shot'] },
    { id: 'focused_shot', name: 'Focused Shot', archetype: 'Assassin', type: 'Active', star: 1, description: 'A powerful ranged attack dealing 7 damage +15% strength +15% dexterity, revealing nearby enemies.', connections: ['bouncing_arrows'] },

    // --- STAR 2 WARRIOR SKILLS ---
    { id: 'adept_swordsmanship', name: 'Adept Swordsmanship', archetype: 'Warrior', type: 'Passive', star: 2, description: 'On takedown, restore 8 SP.', connections: [] },
    { id: 'group_fighter', name: 'Group Fighter', archetype: 'Warrior', type: 'Passive', star: 2, description: 'Deal 10% more strength damage when surrounded by 3 or more enemies.', connections: [] },
    { id: 'predatory_instincts', name: 'Predatory Instincts', archetype: 'Warrior', type: 'Passive', star: 2, description: 'On takedown, temporarily raise strength by 3. This effect stacks up to 5 times, with each stack lasting 6 seconds.', connections: [] },
    { id: 'adrenaline', name: 'Adrenaline', archetype: 'Warrior', type: 'Passive', star: 2, description: 'Below 30% HP, deal +3 bonus damage and gain 10% attack speed. This effect lasts 7 seconds with a 30 second cooldown.', connections: [] },
    { id: 'killing_intent', name: 'Killing Intent', archetype: 'Warrior', type: 'Passive', star: 2, description: 'After 5 rapid takedowns, nearby enemies deal 5 less damage to you.', connections: [] },
    { id: 'feast_of_weakness', name: 'Feast of Weakness', archetype: 'Warrior', type: 'Passive', star: 2, description: 'Heal 2% of max HP for every enemy with a status effect within a radius of 8 meters.', connections: [] },
    { id: 'elegant_stance', name: 'Elegant Stance', archetype: 'Warrior', type: 'Passive', star: 2, description: 'Gain +10% intelligence for all magic skills.', connections: [] },
    { id: 'swift_joints', name: 'Swift Joints', archetype: 'Warrior', type: 'Passive', star: 2, description: 'Increase attack speed by 5% + 5% of agility.', connections: [] },
    { id: 'protectors_presence', name: 'Protector\'s Presence', archetype: 'Warrior', type: 'Passive', star: 2, description: 'Allies within 5 meters take 5% less damage.', connections: [] },
    { id: 'horizontal_slash_ii', name: 'Horizontal Slash II', archetype: 'Warrior', type: 'Active', star: 2, description: 'Unleash 2 powerful horizontal slashes. The first deals +40% strength and the second deals +5% strength as bonus damage.', connections: [] },
    { id: 'spinning_strike', name: 'Spinning Strike', archetype: 'Warrior', type: 'Active', star: 2, description: 'Spin your sword, dealing 10 damage +40% strength to all surrounding targets.', connections: [] },
    { id: 'together_forever', name: 'Together Forever', archetype: 'Warrior', type: 'Active', star: 2, description: 'Link 2 characters, giving them 35% damage reduction for 6 seconds.', connections: [] },
    { id: 'brave', name: 'Brave', archetype: 'Warrior', type: 'Active', star: 2, description: 'Regenerate 30% of max HP over 6 seconds. You cannot use other skills during this time.', connections: [] },
    { id: 'impaling_thrust', name: 'Impaling Thrust', archetype: 'Warrior', type: 'Active', star: 2, description: 'Thrust forward, dealing 11 damage +60% strength and stunning a single enemy for 1.5s.', connections: [] },

    // --- STAR 2 ASSASSIN SKILLS ---
    { id: 'swift_assassin', name: 'Swift Assassin', archetype: 'Assassin', type: 'Passive', star: 2, description: 'Linked from Swift Blade. (Details TBD)', connections: [] },
    { id: 'novice_archer', name: 'Novice Archer', archetype: 'Assassin', type: 'Passive', star: 2, description: 'Reload 15% faster. On kill or assist, gain 15% mobility for 3 seconds.', connections: [] },
    { id: 'opportunist', name: 'Opportunist', archetype: 'Assassin', type: 'Passive', star: 2, description: 'Gain a 25% strength damage bonus against enemies who are stunned, dazed, or when attacking from behind.', connections: [] },
    { id: 'slippery', name: 'Slippery', archetype: 'Assassin', type: 'Passive', star: 2, description: 'The duration of snares, slows, and roots on you last 1 second less.', connections: [] },
    { id: 'beginners_daggers_skill', name: 'Beginner\'s Dagger Skill', archetype: 'Assassin', type: 'Passive', star: 2, description: 'When using a skill while equipping a dagger, deal +5 damage.', connections: [] },
    { id: 'successful_assassination', name: 'Successful Assassination', archetype: 'Assassin', type: 'Passive', star: 2, description: 'On takedown, refund 2 seconds of cooldown on all skills.', connections: [] },
    { id: 'scavenger', name: 'Scavenger', archetype: 'Assassin', type: 'Passive', star: 2, description: 'Enemies you kill have a higher chance of dropping more loot.', connections: [] },
    { id: 'fan_of_daggers', name: 'Fan of Daggers', archetype: 'Assassin', type: 'Active', star: 2, description: 'Throw 5 daggers in a cone, with a 30% chance to apply bleed. Consumes 1 dagger.', connections: [] },
    { id: 'ambush', name: 'Ambush', archetype: 'Assassin', type: 'Active', star: 2, description: 'After getting a kill, become invisible and gain a 10% mobility boost for 3 seconds.', connections: [] },
    { id: 'stealth_i', name: 'Stealth I', archetype: 'Assassin', type: 'Active', star: 2, description: 'Turn invisible for 5 seconds.', connections: [] },
    { id: 'multiple_shot', name: 'Multiple Shot', archetype: 'Assassin', type: 'Active', star: 2, description: 'Fire 3 arrows at the nearest targets, each dealing 9 damage +30% dexterity.', connections: [] },
    { id: 'bouncing_arrows', name: 'Bouncing Arrows', archetype: 'Assassin', type: 'Active', star: 2, description: 'Your next ranged skill will bounce to a nearby enemy, dealing 30% reduced damage.', connections: [] },
];