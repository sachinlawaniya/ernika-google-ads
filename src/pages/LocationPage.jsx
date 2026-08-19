import React, { useEffect, useState, useRef } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';
import HeroSection from '../components/HeroSection.jsx';
import LocationSection from '../components/LocationSection.jsx';
import QuickEnquiryForm from '../components/QuickEnquiryForm.jsx';
import CtaSection from '../components/CtaSection.jsx';
import FaqSection from '../components/FaqSection.jsx';

export default function LocationPage({ onOpenBrochure }) {
  const { isElegance, projectName } = useProjectContext();
  const [animateBars, setAnimateBars] = useState(false);
  const directoryRef = useRef(null);

  useEffect(() => {
    document.title = `Location Highlights & Connectivity Map | ${projectName}`;
    window.scrollTo(0, 0);
  }, [isElegance, projectName]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateBars(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentEl = directoryRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    const timer = setTimeout(() => {
      setAnimateBars(true);
    }, 200);

    return () => {
      clearTimeout(timer);
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  return (
    <main>
      <HeroSection onOpenBrochure={onOpenBrochure} />

      <div className="er_main-layout-wrap">
        <div className="er_main-content-col">
          {/* Main Location Section with "Why This Location?" & Dual Maps */}
          <LocationSection />

          <CtaSection onOpenBrochure={onOpenBrochure} />
          <FaqSection />
        </div>

        {/* Sticky Sidebar Form */}
        <aside className="er_sticky-sidebar-col">
          <QuickEnquiryForm onOpenBrochure={onOpenBrochure} />
        </aside>
      </div>
    </main>
  );
}
