// src/pages/FAQ/FAQ.jsx
import React from 'react';
import './FAQ.css';

const faqData = [
    {
        question: 'How will the combat system work?',
        answer: 'TBD'
    },
    {
        question: 'Will this game be pay-to-win?',
        answer: 'TBD'
    },
    {
        question: 'Will you implement Perma-death?',
        answer: 'TBD'
    },
    {
        question: 'When will the game be released?',
        answer: 'TBD'
    },
    {
        question: 'How can I support you guys?',
        answer: 'TBD'
    },
    {
        question: 'How can I help with the development?',
        answer: 'TBD'
    },
];

function FAQ() {
    return (
        <div className="faq-page">
            <h1 className="faq-page-title">Frequently Asked Questions</h1>
            <div className="faq-list">
                {faqData.map((item, index) => (
                    <div key={index} className="faq-item">
                        <h2 className="faq-question">{item.question}</h2>
                        <p className="faq-answer">{item.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FAQ;