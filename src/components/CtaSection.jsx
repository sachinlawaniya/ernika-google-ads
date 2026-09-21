import React from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function CtaSection({ onOpenBrochure }) {
  const { project } = useProjectContext();
  const cta = project.cta;

  if (!cta) return null;

  const approvalLabel = project.approvalBadge || 'OFFICIALLY APPROVED';

  const defaultFeatures = [
    {
      icon: 'fas fa-map-marked-alt',
      title: 'Detailed Layout Plan',
      desc: 'See the complete site layout'
    },
    {
      icon: 'fas fa-coins',
      title: 'Phase-wise Pricing',
      desc: 'Latest prices & plot details'
    },
    {
      icon: 'fas fa-file-invoice',
      title: `${approvalLabel.split('&')[0].trim()} Documents`,
      desc: 'Verified & approved'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Direct to Your Inbox',
      desc: 'On your phone and email'
    }
  ];

  return (
    <section className="er_cta-section er_cta-shyam-section">
      <div className="er_container er_cta-shyam-container">
        <div className="er_cta-shyam-card">
          <div className="er_cta-shyam-content">
            <span className="er_cta-shyam-top-badge">
              <i className="fas fa-crown"></i> {approvalLabel}
            </span>

            <h2 className="er_cta-shyam-title">
              {cta.title || `Get the ${project.shortName} Layout & Brochure`}
            </h2>

            <p className="er_cta-shyam-desc">
              {cta.desc || project.brochureDesc || 'Share a few details and we’ll send the full brochure — plot layouts, phase-wise pricing and approval documents — straight to your phone and inbox.'}
            </p>

            {/* 4 Feature Highlights Grid */}
            <div className="er_cta-shyam-features">
              {defaultFeatures.map((item, idx) => (
                <div className="er_cta-shyam-feat-item" key={idx}>
                  <div className="er_cta-shyam-feat-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="er_cta-shyam-feat-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Action Button */}
            <div className="er_cta-shyam-actions">
              <button
                className="er_cta-shyam-btn"
                onClick={() => onOpenBrochure && onOpenBrochure(`${project.shortName} CTA Banner - Download Brochure`)}
                aria-label="Download Official Brochure"
              >
                <span className="er_cta-shyam-btn-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </span>
                <span className="er_cta-shyam-btn-divider"></span>
                <span className="er_cta-shyam-btn-label">Download Brochure</span>
                <i className="fas fa-chevron-right er_cta-shyam-btn-chevron"></i>
              </button>
            </div>

            {/* Trust Badges Footer */}
            <div className="er_cta-shyam-trust">
              {cta.tags && cta.tags.length > 0 ? (
                cta.tags.map((tag, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="er_cta-shyam-trust-divider">|</span>}
                    <span className="er_cta-shyam-trust-item">
                      <i className={tag.icon}></i> {tag.text}
                    </span>
                  </React.Fragment>
                ))
              ) : (
                <>
                  <span className="er_cta-shyam-trust-item">
                    <i className="fas fa-shield-alt"></i> {approvalLabel}
                  </span>
                  <span className="er_cta-shyam-trust-divider">|</span>
                  <span className="er_cta-shyam-trust-item">
                    <i className="fas fa-map"></i> Premium Residential Plots
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
