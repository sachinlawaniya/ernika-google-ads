import React from 'react';

export default function HeroSection({ heroVidId = 'VNnsHctRUx0', onOpenBrochure }) {
  return (
    <section className="er_hero" aria-label="Ernika project video">
      <iframe
        className="er_hero-video"
        src={`https://www.youtube.com/embed/${heroVidId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroVidId}&playsinline=1&rel=0&modestbranding=1`}
        title="Ernika project walkthrough video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>

      {/* Transparent Bottom Bar in Hero Section */}
      <div className="er_hero-bottom-bar">
        <div className="er_hero-bar-text">
          <span>Ernika Villa Plots</span> — Amazon Forest Theme in Anekal, Bengaluru
        </div>
        <button className="er_hero-bar-btn" onClick={onOpenBrochure}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download Brochure</span>
        </button>
      </div>
    </section>
  );
}
