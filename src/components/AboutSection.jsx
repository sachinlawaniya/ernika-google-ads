import React from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';
import shyamOverviewDesktop from '../assets/shyam_overview_desktop.png';
import shyamOverviewMobile from '../assets/shyam_overview_mobile.png';
import ernikaOverview from '../assets/ernika_overview.png';

export default function AboutSection({ onOpenBrochure }) {
  const { project } = useProjectContext();
  const isShyam = project.id === 'shyam_residency';
  const isErnika = project.id === 'ernika';

  return (
    <section id="er_about" className="er_intro er_section">
      <div className="er_container er_intro-grid">
        <div className="er_intro-text">
          <h2>{project.shortName}: {project.tagline}</h2>

          {project.about?.paragraphs?.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}

          <ul className="er_feature-bullets">
            {(project.featureBullets || [
              project.approvalText,
              project.badge,
              'A to Z Amenities & Clubhouse',
              'Concrete Roads & Underground Utilities',
              `Prime Location in ${project.location}`
            ]).filter(Boolean).map((bullet, idx) => (
              <li key={idx}>
                <i className="fas fa-check-circle"></i> {bullet}
              </li>
            ))}
          </ul>
          <div>
            <button className="er_btn-sm" type="button" onClick={() => onOpenBrochure && onOpenBrochure('About Section - Download Brochure')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              <span>Download Brochure</span>
            </button>
          </div>
        </div>
        <div
          className="er_intro-image er_clickable-intro-image"
          onClick={() => onOpenBrochure && onOpenBrochure(`${project.shortName} Overview Image - Download Brochure`)}
          title="Click to Download Brochure / Enquiry"
        >
          {isShyam ? (
            <picture>
              <source media="(max-width: 768px)" srcSet={shyamOverviewMobile} />
              <img
                src={shyamOverviewDesktop}
                alt="Shyam Residency Overview"
                loading="lazy"
                decoding="async"
                className="er_shyam-about-banner"
              />
            </picture>
          ) : isErnika ? (
            <img
              src={ernikaOverview}
              alt="Guru Punvaanii Ernika Amazon Theme Villa Plots"
              loading="lazy"
              decoding="async"
              className="er_ernika-about-banner"
            />
          ) : (
            <img
              src={project.entranceArch || project.elevationDayImg}
              alt={`${project.shortName} overview`}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      </div>
    </section>
  );
}
