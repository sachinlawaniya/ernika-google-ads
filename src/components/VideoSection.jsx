import React, { useRef, useEffect } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function VideoSection({ sectionVidId }) {
  const { project } = useProjectContext();
  const vidId = sectionVidId || project.heroVideoId || project.walkthroughVideoId;
  const { heroVideoDesktop, heroVideoMobile } = project;

  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const containerRef = useRef(null);

  // Play automatically when scrolled into viewport, pause when out of view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isMobile = window.innerWidth <= 768;
          const targetVideo = isMobile ? (mobileVideoRef.current || desktopVideoRef.current) : (desktopVideoRef.current || mobileVideoRef.current);
          
          if (targetVideo) {
            if (entry.isIntersecting) {
              targetVideo.play().catch(() => {
                // Ignore autoplay policy restriction if any
              });
            } else {
              targetVideo.pause();
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [heroVideoDesktop, heroVideoMobile]);

  return (
    <section id="er_videos" className="er_section er_container">
      <div className="er_section-head">
        <span className="er_section-label">PROJECT VIDEO</span>
        <h2 className="er_section-h2">See It For Yourself</h2>
        <div className="er_gold-line"></div>
      </div>

      <div className="er_video-wrap">
        <div className="er_video-frame" ref={containerRef}>
          {heroVideoDesktop || heroVideoMobile ? (
            <>
              {/* Desktop Video (hidden on <= 768px) */}
              <video
                ref={desktopVideoRef}
                className="er_section-video-player er_video_desktop_only exo_hero-video exo_hero-desktop"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls
              >
                <source src={heroVideoDesktop || heroVideoMobile} type="video/mp4" />
              </video>

              {/* Mobile Video (shown on <= 768px) */}
              <video
                ref={mobileVideoRef}
                className="er_section-video-player er_video_mobile_only exo_hero-video exo_hero-mobile"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls
              >
                <source src={heroVideoMobile || heroVideoDesktop} type="video/mp4" />
              </video>
            </>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${vidId}?mute=1&rel=0`}
              title={`${project.shortName} Project Walkthrough`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
}
