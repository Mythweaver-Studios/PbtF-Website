// src/pages/FAQ/FAQ.jsx
import React from 'react';
import { faqData } from './faqData'; // Import data from the new file
import './FAQ.css';

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