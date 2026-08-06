import React, { useState } from 'react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is Ernika by Guru Punvaanii?',
      a: "Ernika is a BMRDA-approved, Bengaluru's first Amazon-themed premium community of villa plots in Anekal, Bengaluru. It has 220 plots across 12.5 acres, designed for families who want peaceful living without compromising on connectivity.",
    },
    {
      q: 'Where is Ernika located, and how well is it connected?',
      a: 'Ernika is located in one of the fastest-growing corridors in Bengaluru, Anekal. You will get excellent connectivity to Electronic City, Hosur Road, schools, IT hubs, hospitals, and your everyday essentials.',
    },
    {
      q: 'What makes Ernika different from other villa plot projects in Bengaluru?',
      a: "Ernika is Bengaluru's first Amazon forest-themed premium villa plot community. It is designed to keep you close to nature, greenery, and in touch with the theme, while not compromising on the modern lifestyle.",
    },
    {
      q: 'What plot sizes are available?',
      a: 'Ernika offers three sizes: 30×30 ft, 30×50 ft, and 40×40 ft, giving you the flexibility to build your dream home.',
    },
    {
      q: 'Is Ernika a good investment?',
      a: "Anekal is one of Bengaluru's fastest-growing corridors. Backed by Guru Punvaanii's track record of 12 completed projects, your investment is in trustworthy hands!",
    },
    {
      q: 'Why should I trust Guru Punvaanii?',
      a: 'Guru Punvaanii has 12 completed projects, 3000+ happy families, and 38+ lakh sqft delivered across Bengaluru. We believe in Fair Policy and Fair Property — a promise we have always kept.',
    },
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

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
