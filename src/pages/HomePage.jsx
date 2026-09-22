import React, { useEffect } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';
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
import PlotSizesSection from '../components/PlotSizesSection.jsx';

export default function HomePage({ onOpenBrochure }) {
  const { project, projectName } = useProjectContext();

  useEffect(() => {
    document.title = project?.title || `${projectName} | Premium Plots & Villas`;
    window.scrollTo(0, 0);
  }, [project, projectName]);

  return (
    <main>
      <HeroSection onOpenBrochure={onOpenBrochure} />
      <div className="er_main-layout-wrap">
        <div className="er_main-content-col">
          <AboutSection onOpenBrochure={onOpenBrochure} />
          <HighlightsSection />
          <GallerySection />
          <AmenitiesSection />
          <PlotSizesSection onOpenBrochure={onOpenBrochure} />
          <VideoSection />
          <SpecificationsSection />
          <LocationSection />
          <CtaSection onOpenBrochure={onOpenBrochure} />
          <FaqSection />
        </div>

        <aside id="er_enquiry" className="er_sticky-sidebar-col">
          <QuickEnquiryForm onOpenBrochure={onOpenBrochure} formId="er_main_enquiry_form" />
        </aside>
      </div>
    </main>
  );
}
