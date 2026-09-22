import React, { useState } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';
import QuickEnquiryForm from './QuickEnquiryForm.jsx';

export default function HeroSection({ heroVidId, onOpenBrochure }) {
  const { project } = useProjectContext();
  const vidId = heroVidId || project.heroVideoId;
  const { heroVideoDesktop, heroVideoMobile } = project;
  const [isHeroFormOpen, setIsHeroFormOpen] = useState(true);

  return (
    <section id="er_hero" className="er_hero" aria-label={`${project.shortName} project video`}>
      {heroVideoDesktop ? (
        <>
          <video
            className="er_hero-video er_hero-desktop"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
            tabIndex={-1}
          >
            <source src={heroVideoDesktop} type="video/mp4" />
          </video>
          {heroVideoMobile && (
            <video
              className="er_hero-video er_hero-mobile"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
              tabIndex={-1}
            >
              <source src={heroVideoMobile} type="video/mp4" />
            </video>
          )}
          <style>{`
            .er_hero-video {
              pointer-events: none !important;
              user-select: none !important;
            }
            .er_hero-video::-webkit-media-controls,
            .er_hero-video::-webkit-media-controls-enclosure,
            .er_hero-video::-webkit-media-controls-panel,
            .er_hero-video::-webkit-media-controls-overlay-play-button {
              display: none !important;
              -webkit-appearance: none !important;
              opacity: 0 !important;
            }
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

      {/* ── DESKTOP HERO FLOATING ENQUIRY FORM (SCROLLS WITH HERO & SEMI-TRANSPARENT) ── */}
      <div className="er_hero_desktop_form_container">
        {/* Side Tab Trigger when closed */}
        <button
          type="button"
          className={`er_hero_side_tab_trigger ${!isHeroFormOpen ? 'visible' : ''}`}
          onClick={() => setIsHeroFormOpen(true)}
          aria-label="Enquire Now"
          title="Open Enquiry Form"
        >
          {/* <i className="fas fa-edit"></i> */}
          <span>Enquire Now</span>
        </button>

        {/* Hero Form Wrapper with Slide Animation */}
        <div className={`er_hero_floating_wrap ${isHeroFormOpen ? 'active' : 'slid-out'}`}>
          <div className="er_hero_floating_card er_hero_glass_card">
            <QuickEnquiryForm
              onOpenBrochure={onOpenBrochure}
              onClose={() => setIsHeroFormOpen(false)}
              formId="er_hero_enquiry"
            />
          </div>
        </div>
      </div>

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
