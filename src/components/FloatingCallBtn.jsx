import React from 'react';

export default function FloatingCallBtn() {
  return (
    <a
      href="tel:8546854600"
      className="er_floating-call-btn"
      aria-label="Call 8546854600"
      title="Call Us: 8546854600"
    >
      <span className="er_call-pulse-ring er_ring-1"></span>
      <span className="er_call-pulse-ring er_ring-2"></span>
      <span className="er_call-shimmer"></span>
      <i className="fas fa-phone-alt er_call-icon"></i>
    </a>
  );
}
