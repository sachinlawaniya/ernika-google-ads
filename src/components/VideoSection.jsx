import React from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function VideoSection({ sectionVidId }) {
  const { project } = useProjectContext();
  const vidId = sectionVidId || project.heroVideoId || project.walkthroughVideoId;
  const { heroVideoDesktop, heroVideoMobile } = project;

  return (
    <section id="er_videos" className="er_section er_container">
      <div className="er_section-head">
        <span className="er_section-label">PROJECT VIDEO</span>
        <h2 className="er_section-h2">See It For Yourself</h2>
        <div className="er_gold-line"></div>
      </div>

      <div className="er_video-wrap">
        <div className="er_video-frame">
          {heroVideoDesktop ? (
            <video
              className="er_section-video-player"
              autoPlay
              muted
              loop
              playsInline
              controls
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
            >
              <source src={heroVideoDesktop} type="video/mp4" />
            </video>
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
