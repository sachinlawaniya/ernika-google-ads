import React from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function FloatingCallBtn() {
  const { isElegance } = useProjectContext();
  const phoneNumber = isElegance ? '7676000909' : '9008347898';
  const displayPhone = isElegance ? '7676 000 909' : '9008 3478 98';

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="er_floating-call-btn"
      aria-label={`Call ${displayPhone}`}
      title={`Call Us: ${displayPhone}`}
    >
      <span className="er_call-pulse-ring er_ring-1"></span>
      <span className="er_call-pulse-ring er_ring-2"></span>
      <span className="er_call-shimmer"></span>
      <i className="fas fa-phone-alt er_call-icon"></i>
    </a>
  );
}
