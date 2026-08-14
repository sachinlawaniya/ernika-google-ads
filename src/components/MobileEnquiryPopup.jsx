import React, { useState, useEffect } from 'react';
import QuickEnquiryForm from './QuickEnquiryForm.jsx';

export default function MobileEnquiryPopup({ onOpenBrochure }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only auto-trigger on mobile screens (width <= 768px)
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    // Auto-open after 5 seconds on initial load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating Circular Bottom-Right Toggle Button (Mobile Only) */}
      <button
        type="button"
        className="er_mobile-floating-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Enquire Now"
        title="Enquire Now"
      >
        <span className="er_mobile-btn-pulse"></span>
        <i className="fas fa-paper-plane"></i>
      </button>

      {/* Mobile Popup Modal Overlay */}
      {isOpen && (
        <div className="er_mobile-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="er_mobile-modal-content" onClick={(e) => e.stopPropagation()}>
            <QuickEnquiryForm
              onOpenBrochure={onOpenBrochure}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

