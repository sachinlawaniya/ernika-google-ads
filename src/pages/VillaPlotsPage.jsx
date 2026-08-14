import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import SpecificationsSection from '../components/SpecificationsSection.jsx';
import QuickEnquiryForm from '../components/QuickEnquiryForm.jsx';
import CtaSection from '../components/CtaSection.jsx';
import FaqSection from '../components/FaqSection.jsx';

export default function VillaPlotsPage({ onOpenBrochure }) {
  useEffect(() => {
    document.title = 'Premium Villa Plots in Anekal Bangalore | Guru Punvaanii Ernika';
    window.scrollTo(0, 0);
  }, []);

  const plotDimensions = [
    {
      size: '30 × 40 ft & 30 × 50 ft',
      sqft: '1,200 – 1,500 Sq.Ft.',
      desc: 'Ideal for modern 3BHK duplex family villas. Compact luxury layout surrounded by Amazon-themed green corridors.',
      badge: 'Popular Choice',
      icon: 'fa-vector-square'
    },
    {
      size: '40 × 40 ft & 40 × 50 ft',
      sqft: '1,600 – 2,000 Sq.Ft.',
      desc: 'Executive villa plots for grand homes with private lawn, terrace garden, and spacious floor plans.',
      badge: 'Premium Luxury',
      icon: 'fa-crown'
    },
    {
      size: 'Unique Plots',
      sqft: 'Custom Dimensions',
      desc: 'Corner and unique dimension plots tailored for custom architectural projects and high-value investments.',
      badge: 'Exclusive',
      icon: 'fa-chess-king'
    }
  ];



  return (
    <main>
      <HeroSection heroVidId="VNnsHctRUx0" onOpenBrochure={onOpenBrochure} />

      <div className="er_main-layout-wrap">
        <div className="er_main-content-col">
          {/* Plot Sizes Section */}
          <section className="er_section er_container">
            <div className="er_section-head">
              <span className="er_section-label">AVAILABLE PLOT DIMENSIONS</span>
              <h2 className="er_section-h2">Ernika Villa Plot Sizes</h2>
              <div className="er_gold-line"></div>
              <p className="er_section-desc">
                Ernika offers multiple plot dimensions — 30×40 ft, 30×50 ft, 40×40 ft, 40×50 ft, and ODD dimensions, giving you full flexibility to build your dream home.
              </p>
            </div>

            <div className="er_plots-grid">
              {plotDimensions.map((plot, idx) => (
                <div key={idx} className="er_plot-card">
                  <div className="er_plot-header">
                    <span className="er_plot-badge">{plot.badge}</span>
                    <i className={`fas ${plot.icon} er_plot-icon`}></i>
                  </div>
                  <h3 className="er_plot-size">{plot.size}</h3>
                  <span className="er_plot-sqft">{plot.sqft}</span>
                  <p className="er_plot-desc">{plot.desc}</p>
                  <ul className="er_plot-features">
                    <li><i className="fas fa-check-circle"></i> BMRDA &amp; RERA Approved</li>
                    <li><i className="fas fa-check-circle"></i> Ready for Immediate Registration</li>
                    <li><i className="fas fa-check-circle"></i> Individual Water &amp; Power Points</li>
                  </ul>
                  <button className="er_plot-btn" onClick={() => onOpenBrochure(`Villa Plot Size: ${plot.size} (${plot.sqft})`)}>
                    <span>Request Price List</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              ))}
            </div>
          </section>

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
