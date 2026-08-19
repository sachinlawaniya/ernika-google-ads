import React from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function HeroSection({ heroVidId, onOpenBrochure }) {
  const { project } = useProjectContext();
  const vidId = heroVidId || project.heroVideoId;
  const { heroVideoDesktop, heroVideoMobile } = project;

  return (
    <section className="er_hero" aria-label={`${project.shortName} project video`}>
      {heroVideoDesktop ? (
        <>
          <video 
            className="er_hero-video er_hero-desktop" 
            autoPlay muted loop playsInline 
          >
            <source src={heroVideoDesktop} type="video/mp4" />
          </video>
          {heroVideoMobile && (
            <video 
              className="er_hero-video er_hero-mobile" 
              autoPlay muted loop playsInline
            >
              <source src={heroVideoMobile} type="video/mp4" />
            </video>
          )}
          <style>{`
            .er_hero-desktop { display: block; width: 100%; height: 100%; object-fit: cover; }
            .er_hero-mobile { display: none; width: 100%; height: 100%; object-fit: cover; }
            @media (max-width: 768px) {
              .er_hero-desktop { display: ${heroVideoMobile ? 'none' : 'block'}; }
              .er_hero-mobile { display: block; }
            }
          `}</style>
        </>
      ) : (
        <iframe
          className="er_hero-video"
          src={`https://www.youtube.com/embed/${vidId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${vidId}&playsinline=1&rel=0&modestbranding=1`}
          title={`${project.shortName} project walkthrough video`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      {/* Transparent Bottom Bar in Hero Section */}
      <div className="er_hero-bottom-bar">
        <div className="er_hero-bar-text">
          <p>{project.tagline}</p>
          <button
            className="er_hero-bar-btn"
            onClick={() => onOpenBrochure && onOpenBrochure('Hero Section - Download Brochure')}
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
