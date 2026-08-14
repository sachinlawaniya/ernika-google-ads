import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import HighlightsSection from '../components/HighlightsSection.jsx';
import GallerySection from '../components/GallerySection.jsx';
import AmenitiesSection from '../components/AmenitiesSection.jsx';
import VideoSection from '../components/VideoSection.jsx';
import SpecificationsSection from '../components/SpecificationsSection.jsx';
import LocationSection from '../components/LocationSection.jsx';
import CtaSection from '../components/CtaSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import QuickEnquiryForm from '../components/QuickEnquiryForm.jsx';

export default function HomePage({ onOpenBrochure }) {
  useEffect(() => {
    document.title = 'Guru Punvaanii Ernika | Amazon Forest-Themed Villa Plots in Anekal Bengaluru';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <HeroSection heroVidId="VNnsHctRUx0" onOpenBrochure={onOpenBrochure} />
      <div className="er_main-layout-wrap">
        <div className="er_main-content-col">
          <AboutSection onOpenBrochure={onOpenBrochure} />
          <HighlightsSection />
          <GallerySection />
          <AmenitiesSection />
          <VideoSection sectionVidId="sLBAywF0k44" />
          <SpecificationsSection />
          <LocationSection />
          <CtaSection onOpenBrochure={onOpenBrochure} />
          <FaqSection />
        </div>

        <aside className="er_sticky-sidebar-col">
          <QuickEnquiryForm onOpenBrochure={onOpenBrochure} />
        </aside>
      </div>
    </main>
  );
}
