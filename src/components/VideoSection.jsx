import React from 'react';

export default function VideoSection({ sectionVidId = 'sLBAywF0k44' }) {
  return (
    <section id="er_videos" className="er_section er_container">
      <div className="er_section-head">
        <span className="er_section-label">PROJECT VIDEO</span>
        <h2 className="er_section-h2">See It For Yourself</h2>
        <div className="er_gold-line"></div>
      </div>

      <div className="er_video-wrap">
        <div className="er_video-frame">
          <iframe
            src={`https://www.youtube.com/embed/${sectionVidId}?mute=1`}
            title="Ernika Project Walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
