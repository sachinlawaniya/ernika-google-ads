import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import HighlightsSection from '../components/HighlightsSection.jsx';
import AmenitiesSection from '../components/AmenitiesSection.jsx';
import GallerySection from '../components/GallerySection.jsx';
import VideoSection from '../components/VideoSection.jsx';
import QuickEnquiryForm from '../components/QuickEnquiryForm.jsx';
import CtaSection from '../components/CtaSection.jsx';
import FaqSection from '../components/FaqSection.jsx';

export default function ProjectHighlightsPage({ onOpenBrochure }) {
  useEffect(() => {
    document.title = 'Project Highlights & 26+ Amenities | Guru Punvaanii Ernika';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <HeroSection heroVidId="VNnsHctRUx0" onOpenBrochure={onOpenBrochure} />

      <div className="er_main-layout-wrap">
        <div className="er_main-content-col">
          {/* Key Highlights Component */}
          <HighlightsSection />

          {/* 26+ Amenities Component */}
          <AmenitiesSection />

          {/* Video Walkthrough */}
          <VideoSection sectionVidId="sLBAywF0k44" />

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
