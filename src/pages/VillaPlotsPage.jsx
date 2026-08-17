import React, { useEffect } from 'react';
import { useProjectContext } from '../utils/useProjectContext.js';
import HeroSection from '../components/HeroSection.jsx';
import PlotSizesSection from '../components/PlotSizesSection.jsx';
import SpecificationsSection from '../components/SpecificationsSection.jsx';
import QuickEnquiryForm from '../components/QuickEnquiryForm.jsx';
import CtaSection from '../components/CtaSection.jsx';
import FaqSection from '../components/FaqSection.jsx';

export default function VillaPlotsPage({ onOpenBrochure }) {
  const { isElegance, projectName } = useProjectContext();

  useEffect(() => {
    document.title = `Premium Villa Plots in Anekal Bangalore | ${projectName}`;
    window.scrollTo(0, 0);
  }, [isElegance, projectName]);

  return (
    <main>
      <HeroSection heroVidId="VNnsHctRUx0" onOpenBrochure={onOpenBrochure} />

      <div className="er_main-layout-wrap">
        <div className="er_main-content-col">
          {/* Plot Sizes Section */}
          <PlotSizesSection onOpenBrochure={onOpenBrochure} />

          {/* Infrastructure Specifications */}
          <SpecificationsSection />

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
