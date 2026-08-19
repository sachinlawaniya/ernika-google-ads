import React, { useState } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const { project } = useProjectContext();
  const faqs = project.faqs || [];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (faqs.length === 0) return null;

  return (
    <section id="er_faq" className="er_section er_faq">
      <div className="er_container">
        <div className="er_section-head">
          <span className="er_section-label">QUESTIONS & ANSWERS</span>
          <h2 className="er_section-h2">Frequently Asked Questions</h2>
          <div className="er_gold-line"></div>
        </div>

        <div className="er_faq-container">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`er_faq-item ${openIndex === idx ? 'er_active' : ''}`}
            >
              <div className="er_faq-question" onClick={() => toggleFaq(idx)}>
                <span>{faq.q}</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="er_faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
