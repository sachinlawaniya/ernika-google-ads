import React, { useEffect } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';
import HeroSection from '../components/HeroSection.jsx';
import HighlightsSection from '../components/HighlightsSection.jsx';
import AmenitiesSection from '../components/AmenitiesSection.jsx';
import GallerySection from '../components/GallerySection.jsx';
import VideoSection from '../components/VideoSection.jsx';
import QuickEnquiryForm from '../components/QuickEnquiryForm.jsx';
import CtaSection from '../components/CtaSection.jsx';
import FaqSection from '../components/FaqSection.jsx';

export default function ProjectHighlightsPage({ onOpenBrochure }) {
  const { isElegance, projectName } = useProjectContext();

  useEffect(() => {
    document.title = `Project Highlights & Amenities | ${projectName}`;
    window.scrollTo(0, 0);
  }, [isElegance, projectName]);

  return (
    <main>
      <HeroSection onOpenBrochure={onOpenBrochure} />

      <div className="er_main-layout-wrap">
        <div className="er_main-content-col">
          {/* Key Highlights Component */}
          <HighlightsSection />

          {/* Amenities Component */}
          <AmenitiesSection />

          {/* Video Walkthrough */}
          <VideoSection />

          {/* Visual Gallery Showcase */}
          <GallerySection />

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
