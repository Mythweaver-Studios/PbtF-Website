import React from 'react';

// This utility function takes a string and returns an array of React elements
// with specific keywords and numbers wrapped in styled spans.
export const colorizeText = (text) => {
    // A centralized map for all keywords, patterns, and their corresponding CSS classes.
    // MODIFIED: All optional suffix groups are now non-capturing (?:...) to prevent split() duplication.
    const keywordMap = {
        // Phrases (do not need word boundaries)
        'max HP': 'keyword-unit',
        'movement speed': 'keyword-stat',
        'attack speed': 'keyword-stat',
        'crit rate': 'keyword-stat',
        'crit damage': 'keyword-stat',
        'mobility boost': 'keyword-stat',
        'damage reduction': 'keyword-stat',
        'bonus damage': 'keyword-unit',
        // Attributes
        '\\bstrength\\b': 'keyword-stat',
        '\\bdexterity\\b': 'keyword-stat',
        '\\bdex\\b': 'keyword-stat',
        '\\bintelligence\\b': 'keyword-stat',
        '\\bagility\\b': 'keyword-stat',
        '\\bdefense\\b': 'keyword-stat',
        '\\bevasion\\b': 'keyword-stat',
        // Status Effects
        '\\bbleed(?:ing)?\\b': 'keyword-bleed',
        '\\bpoison\\b': 'keyword-poison',
        '\\bburn\\b': 'keyword-burn',
        // Crowd Control / Debuffs
        '\\bslow(?:ing)?\\b': 'keyword-slow',
        '\\bstun(?:ned)?\\b': 'keyword-slow',
        '\\bdazed\\b': 'keyword-slow',
        '\\bsnare(?:s)?\\b': 'keyword-slow',
        '\\broot(?:s)?\\b': 'keyword-slow',
        '\\bCC\\b': 'keyword-slow',
        '\\bcrowd control\\b': 'keyword-slow',
        '\\baggro\\b': 'keyword-slow',
        // Units & Game Terms
        '\\bseconds?\\b': 'keyword-unit',
        '\\bdamage\\b': 'keyword-unit',
        '\\bHP\\b': 'keyword-unit',
        '\\bSP\\b': 'keyword-unit',
        '\\bmana\\b': 'keyword-unit',
        '\\bstamina\\b': 'keyword-unit',
        '\\bcooldown\\b': 'keyword-unit',
        '\\bstack(?:s)?\\b': 'keyword-unit',
        '\\bradius\\b': 'keyword-unit',
        '\\bmeters?\\b': 'keyword-unit',
    };

    // Sort keys by length, descending, to ensure longer phrases are matched first (e.g., "max HP" before "HP").
    const sortedKeywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);

    // Regex to match:
    // 1. Numbers (including decimals and percentages)
    // 2. All sorted keywords/patterns
    const regex = new RegExp(`(\\d*\\.?\\d+%?|${sortedKeywords.join('|')})`, 'gi');
    
    const parts = text.split(regex);

    return parts.map((part, index) => {
        if (!part) return null;

        // With a capturing regex, matched delimiters are at odd indices.
        if (index % 2 === 0) {
            return part; // This is plain text, return as is.
        }

        // This part is a matched delimiter, so we style it.
        const lowerPart = part.toLowerCase();
        
        // Check for number/percentage first
        if (/^\d*\.?\d+%?$/.test(lowerPart)) {
            return <span key={index} className="keyword-number">{part}</span>;
        }

        // Find which keyword pattern was matched to get the correct CSS class
        const matchedKeyword = sortedKeywords.find(keyword => 
            new RegExp(`^${keyword}$`, 'i').test(part)
        );

        if (matchedKeyword) {
            return <span key={index} className={keywordMap[matchedKeyword]}>{part}</span>;
        }
        
        return part; // Fallback
    });
};