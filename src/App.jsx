import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Disable right click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable keyboard shortcuts for DevTools & View Source
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I, J, C
        (e.metaKey && e.altKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Cmd+Alt+I, J, C
        (e.ctrlKey && e.keyCode === 85) || // Ctrl+U (View Source)
        (e.metaKey && e.keyCode === 85) || // Cmd+U
        (e.ctrlKey && e.keyCode === 83) || // Ctrl+S (Save Page)
        (e.metaKey && e.keyCode === 83)    // Cmd+S
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
    </div>
  );
}
