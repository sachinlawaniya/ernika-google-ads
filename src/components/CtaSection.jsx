import React from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function CtaSection({ onOpenBrochure }) {
  const { project } = useProjectContext();
  const cta = project.cta;

  if (!cta) return null;

  return (
    <section className="er_cta-section">
      <div className="er_cta-bg-pattern"></div>
      <div className="er_container er_cta-container">
        <div className="er_cta-content">
          <span className="er_cta-badge">
            <i className="fas fa-crown"></i> {project.approvalBadge}
          </span>
          <h2 className="er_cta-title">
            {cta.title}
          </h2>
          <p className="er_cta-desc">
            {cta.desc}
          </p>

          <div className="er_cta-actions">
            <button className="er_cta-btn-primary" onClick={() => onOpenBrochure && onOpenBrochure('Mid Page CTA Banner - Download Brochure')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Brochure</span>
            </button>
          </div>

          <div className="er_cta-trust-tags">
            {cta.tags && cta.tags.map((tag, idx) => (
              <div className="er_cta-tag" key={idx}>
                <i className={tag.icon}></i> {tag.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
