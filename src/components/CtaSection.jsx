import React from 'react';

export default function CtaSection({ onOpenBrochure }) {
  return (
    <section className="er_cta-section">
      <div className="er_cta-bg-pattern"></div>
      <div className="er_container er_cta-container">
        <div className="er_cta-content">
          <span className="er_cta-badge">
            <i className="fas fa-crown"></i> BMRDA &amp; RERA APPROVED VILLA PLOTS
          </span>
          <h2 className="er_cta-title">
            Ready to Own Bengaluru’s 1<sup>st</sup> Amazon-Themed Villa Plot?
          </h2>
          <p className="er_cta-desc">
            Explore 12.5 acres of green corridors, 26+ world-class amenities, and prime connectivity in Anekal. Get instant access to plot layouts, phase pricing, and site visit assistance.
          </p>

          <div className="er_cta-actions">
            <button className="er_cta-btn-primary" onClick={onOpenBrochure}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Brochure</span>
            </button>

            <button className="er_cta-btn-secondary" onClick={onOpenBrochure}>
              <i className="fas fa-calendar-alt"></i>
              <span>Schedule Free Site Visit</span>
            </button>
          </div>

          <div className="er_cta-trust-tags">
            <div className="er_cta-tag">
              <i className="fas fa-shield-alt"></i> 100% Clear Title &amp; Approved
            </div>
            <div className="er_cta-tag">
              <i className="fas fa-tree"></i> 26+ World Class Amenities
            </div>
            <div className="er_cta-tag">
              <i className="fas fa-hand-holding-usd"></i> High Appreciation Growth
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
