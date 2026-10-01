import React from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function HeroSection({ onOpenBrochure }) {
  const { project } = useProjectContext();

  return (
    <section id="er_hero" className="er_hero" aria-label={`${project.shortName} hero banner`}>
      {/* ── HERO BANNER IMAGE (FIRST SECTION) ── */}
      <div className="er_hero-media-wrap">
        <picture className="er_hero-picture">
          {project.elevationMobileImg && (
            <source
              media="(max-width: 991px)"
              srcSet={project.elevationMobileImg}
            />
          )}
          <img
            src={project.elevationDayImg}
            alt={`${project.shortName} Overview Banner`}
            className="er_hero-media-img"
          />
        </picture>
      </div>

      {/* Transparent Bottom Bar in Hero Section */}
      <div className="er_hero-bottom-bar">
        <div className="er_hero-bar-text">
          <p>{project.tagline}</p>
          <button
            className="er_hero-bar-btn"
            onClick={() => onOpenBrochure && onOpenBrochure('Hero Section - Download Brochure')}
            aria-label="Download Brochure"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span style={{ color: 'white' }}>Download Brochure</span>
          </button>
        </div>
      </div>
    </section>
  );
}
