import React from 'react';

export default function FloatingCta({ onOpenBrochure }) {
  return (
    <div className="er_floating-cta">
      <div className="er_floating-text">
        <span>Ernika Villa Plots </span> — Amazon Forest Theme in Anekal, Bengaluru
      </div>
      <button className="er_floating-btn" onClick={() => onOpenBrochure && onOpenBrochure('Floating Bottom Banner - Download Brochure')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span>Download Brochure & Pricing</span>
      </button>
    </div>
  );
}
