import React from 'react';

export default function FloatingCallBtn() {
  return (
    <a
      href="tel:9008347898"
      className="er_floating-call-btn"
      aria-label="Call 9008347898"
      title="Call Us: 9008347898"
    >
      <span className="er_call-pulse-ring er_ring-1"></span>
      <span className="er_call-pulse-ring er_ring-2"></span>
      <span className="er_call-shimmer"></span>
      <i className="fas fa-phone-alt er_call-icon"></i>
    </a>
  );
}
