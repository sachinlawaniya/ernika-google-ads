import React, { useState } from 'react';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import HighlightsSection from './components/HighlightsSection.jsx';
import GallerySection from './components/GallerySection.jsx';
import AmenitiesSection from './components/AmenitiesSection.jsx';
import VideoSection from './components/VideoSection.jsx';
import SpecificationsSection from './components/SpecificationsSection.jsx';
import LocationSection from './components/LocationSection.jsx';
import CtaSection from './components/CtaSection.jsx';
import FaqSection from './components/FaqSection.jsx';
import Footer from './components/Footer.jsx';
import BrochureModal from './components/BrochureModal.jsx';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenBrochure = () => setIsModalOpen(true);
  const handleCloseBrochure = () => setIsModalOpen(false);

  return (
    <div id="er_page">
      <Header onOpenModal={handleOpenBrochure} />
      <HeroSection heroVidId="p8lf1kNTEJI" onOpenBrochure={handleOpenBrochure} />
      <AboutSection onOpenBrochure={handleOpenBrochure} />
      <HighlightsSection />
      <GallerySection />
      <AmenitiesSection />
      <VideoSection sectionVidId="sLBAywF0k44" />
      <SpecificationsSection />
      <LocationSection />
      <CtaSection onOpenBrochure={handleOpenBrochure} />
      <FaqSection />
      <Footer />

      <BrochureModal isOpen={isModalOpen} onClose={handleCloseBrochure} />
      {/* <FloatingCta onOpenBrochure={handleOpenBrochure} /> */}
    </div>
  );
}

