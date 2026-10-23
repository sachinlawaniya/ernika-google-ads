import React, { useRef, useEffect } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';
import shyamOverviewDesktop from '../assets/shyam_overview_desktop.png';
import shyamOverviewMobile from '../assets/shyam_overview_mobile.png';
import ernikaOverview from '../assets/ernika_overview.png';

export default function AboutSection({ onOpenBrochure }) {
  const { project } = useProjectContext();
  const isShyam = project.id === 'shyam_residency';
  const isErnika = project.id === 'ernika';

  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const videoBoxRef = useRef(null);

  // Play automatically when in viewport, pause when scrolled away
  useEffect(() => {
    const videoBox = videoBoxRef.current;
    if (!videoBox) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isMobile = window.innerWidth <= 768;
          const targetVideo = isMobile
            ? (mobileVideoRef.current || desktopVideoRef.current)
            : (desktopVideoRef.current || mobileVideoRef.current);

          if (targetVideo) {
            if (entry.isIntersecting) {
              targetVideo.play().catch(() => {});
            } else {
              targetVideo.pause();
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(videoBox);
    return () => observer.disconnect();
  }, [project.heroVideoDesktop, project.heroVideoMobile]);

  return (
    <section id="er_about" className="er_intro er_section">
      <div className="er_container er_intro-grid">
        <div className="er_intro-text">
          <h1 className="er_intro-title">{project.shortName}: {project.tagline}</h1>

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
        <div className="er_intro-image er_intro-video-frame-box" ref={videoBoxRef}>
          {project.heroVideoDesktop || project.heroVideoMobile ? (
            <>
              {/* Desktop Video */}
              <video
                ref={desktopVideoRef}
                className="er_intro-video-element er_video_desktop_only exo_hero-video exo_hero-desktop"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls
              >
                <source src={project.heroVideoDesktop || project.heroVideoMobile} type="video/mp4" />
              </video>

              {/* Mobile Video */}
              <video
                ref={mobileVideoRef}
                className="er_intro-video-element er_video_mobile_only exo_hero-video exo_hero-mobile"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls
              >
                <source src={project.heroVideoMobile || project.heroVideoDesktop} type="video/mp4" />
              </video>
            </>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${project.heroVideoId || project.walkthroughVideoId}?autoplay=1&mute=1&controls=1&loop=1&playlist=${project.heroVideoId || project.walkthroughVideoId}&playsinline=1&rel=0`}
              title={`${project.shortName} Project Video`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
}
