import React from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function AboutSection({ onOpenBrochure }) {
  const { project } = useProjectContext();

  return (
    <section id="er_about" className="er_intro er_section">
      <div className="er_container er_intro-grid">
        <div className="er_intro-text">
          <h2>{project.shortName}: {project.tagline}</h2>
          
          {project.about?.paragraphs?.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}

          <ul className="er_feature-bullets">
            <li><i className="fas fa-check-circle"></i> {project.approvalText}</li>
            <li><i className="fas fa-check-circle"></i> {project.badge}</li>
            <li><i className="fas fa-check-circle"></i> A to Z Amenities &amp; Clubhouse</li>
            <li><i className="fas fa-check-circle"></i> Concrete Roads &amp; Underground Utilities</li>
            <li><i className="fas fa-check-circle"></i> Prime Location in {project.location}</li>
          </ul>
          <div>
            <button className="er_btn-sm" type="button" onClick={() => onOpenBrochure && onOpenBrochure('About Section - Download Brochure')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              <span>Download Brochure</span>
            </button>
          </div>
        </div>
        <div className="er_intro-image">
          <img
            src={project.entranceArch || project.elevationDayImg}
            alt={`${project.shortName} elevation`}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
