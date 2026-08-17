import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BrochureModal from './components/BrochureModal.jsx';
import MobileEnquiryPopup from './components/MobileEnquiryPopup.jsx';
import FloatingCallBtn from './components/FloatingCallBtn.jsx';

import HomePage from './pages/HomePage.jsx';
import VillaPlotsPage from './pages/VillaPlotsPage.jsx';
import ProjectHighlightsPage from './pages/ProjectHighlightsPage.jsx';
import LocationPage from './pages/LocationPage.jsx';
import BookSiteVisitPage from './pages/BookSiteVisitPage.jsx';

function ScrollToTopOrHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id) || document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

const getBasename = () => {
  return window.location.pathname.startsWith('/ernika') ? '/ernika' : '/';
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('');

  const handleOpenBrochure = (source = '') => {
    setModalSource(typeof source === 'string' ? source : '');
    setIsModalOpen(true);
  };
  const handleCloseBrochure = () => setIsModalOpen(false);

  useEffect(() => {
    // Disable right click context menu (preserving text selection)
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
    <Router>
      <ScrollToTopOrHash />
      <div id="er_page">
        <Header onOpenModal={handleOpenBrochure} />

        <Routes>
          {/* Main /ernika/ sitelink routes */}
          <Route path="/ernika/" element={<HomePage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/ernika" element={<HomePage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/ernika/villa-plots" element={<VillaPlotsPage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/ernika/project-highlights" element={<ProjectHighlightsPage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/ernika/location" element={<LocationPage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/ernika/book-site-visit" element={<BookSiteVisitPage onOpenBrochure={handleOpenBrochure} />} />

          {/* New /elegance/ sitelink routes */}
          <Route path="/elegance/" element={<HomePage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/elegance" element={<HomePage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/elegance/villa-plots" element={<VillaPlotsPage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/elegance/project-highlights" element={<ProjectHighlightsPage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/elegance/location" element={<LocationPage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/elegance/book-site-visit" element={<BookSiteVisitPage onOpenBrochure={handleOpenBrochure} />} />

          {/* Fallback routes */}
          <Route path="/" element={<Navigate to="/ernika/" replace />} />
          <Route path="/villa-plots" element={<VillaPlotsPage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/project-highlights" element={<ProjectHighlightsPage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/location" element={<LocationPage onOpenBrochure={handleOpenBrochure} />} />
          <Route path="/book-site-visit" element={<BookSiteVisitPage onOpenBrochure={handleOpenBrochure} />} />

          <Route path="*" element={<Navigate to="/ernika/" replace />} />
        </Routes>

        <Footer />
        <BrochureModal isOpen={isModalOpen} onClose={handleCloseBrochure} sourceComment={modalSource} />
        <MobileEnquiryPopup onOpenBrochure={handleOpenBrochure} />
        <FloatingCallBtn />
      </div>
    </Router>
  );
}
