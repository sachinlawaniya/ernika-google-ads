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
  const { isElegance } = useProjectContext();

  useEffect(() => {
    document.title = isElegance
      ? 'Guru Punvaanii Elegance | Premium Villa Plots in Anekal Bangalore'
      : 'Guru Punvaanii Ernika | Amazon Forest-Themed Villa Plots in Anekal Bengaluru';
    window.scrollTo(0, 0);
  }, [isElegance]);

  return (
    <main>
      <HeroSection heroVidId="VNnsHctRUx0" onOpenBrochure={onOpenBrochure} />
      <div className="er_main-layout-wrap">
        <div className="er_main-content-col">
          <AboutSection onOpenBrochure={onOpenBrochure} />
          <HighlightsSection />
          <GallerySection />
          <AmenitiesSection />
          <PlotSizesSection onOpenBrochure={onOpenBrochure} />
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
