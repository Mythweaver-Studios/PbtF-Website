// src/pages/FAQ/faqData.js
import React from 'react'; // ADDED: To support JSX in the data file

export const faqData = [
    {
        question: 'How will the combat system work?',
        answer: 'The combat system is one of our core focuses, designed to be a deep and tactical experience. We are keeping the specifics under wraps for now to ensure a great reveal, but expect great things.'
    },
    {
        question: 'Will this game be pay-to-win?',
        answer: 'No. The game will not be pay-to-win. Our primary goal is a fair and balanced player experience. We may introduce cosmetic items in the future to support ongoing development, but these will not provide any gameplay advantage.'
    },
    {
        question: 'Will you implement perma-death?',
        answer: 'Perma-death is a feature we are strongly considering for the future, as it aligns with the game\'s high-stakes theme. It will likely be an optional mode for players seeking the ultimate challenge, offering unique rewards. However, it will not be present in the initial release builds.'
    },
    {
        question: 'When will the game be released?',
        answer: 'We do not have a specific release date yet. Our current focus is on delivering a high-quality, polished experience. We are targeting a playable release sometime between 2026 and 2027.'
    },
    {
        question: 'How can I support you guys?',
        answer: 'Currently, we are not accepting monetary donations. The best way to support us is by spreading the word! Share our project with your friends and invite them to our community Discord server.'
    },
    {
        question: 'How can I help with the development?',
        answer: (
            <>
                We are always looking for passionate individuals to contribute. If you have skills in development, art, design, or community management, please join our Discord server at <a href="https://discord.gg/pmu" target="_blank" rel="noopener noreferrer">https://discord.gg/pmu</a> and open a support ticket. One of our team members will get in touch with you.
            </>
        )
    },
];