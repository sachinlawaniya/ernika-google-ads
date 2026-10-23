import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BrochureModal from './components/BrochureModal.jsx';
import SiteVisitModal from './components/SiteVisitModal.jsx';
import QuickEnquiryModal from './components/QuickEnquiryModal.jsx';
import MobileEnquiryPopup from './components/MobileEnquiryPopup.jsx';
import FloatingCallBtn from './components/FloatingCallBtn.jsx';

import MainLandingPage from './pages/MainLandingPage.jsx';
import HomePage from './pages/HomePage.jsx';
import VillaPlotsPage from './pages/VillaPlotsPage.jsx';
import ProjectHighlightsPage from './pages/ProjectHighlightsPage.jsx';
import LocationPage from './pages/LocationPage.jsx';
import BookSiteVisitPage from './pages/BookSiteVisitPage.jsx';
import { PROJECTS_DATA } from './utils/useProjectContext.js';

function ScrollToTopOrHash() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect uppercase/capital URLs to clean lowercase slugs
    if (/[A-Z]/.test(pathname)) {
      navigate(pathname.toLowerCase() + (search || '') + (hash || ''), { replace: true });
      return;
    }

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
  }, [pathname, search, hash, navigate]);

  return null;
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('');
  const [modalProjectKey, setModalProjectKey] = useState('');

  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [siteVisitSource, setSiteVisitSource] = useState('');
  const [siteVisitProjectKey, setSiteVisitProjectKey] = useState('');

  const [isQuickEnquiryOpen, setIsQuickEnquiryOpen] = useState(false);
  const [quickEnquiryProject, setQuickEnquiryProject] = useState(null);
  const [quickEnquirySource, setQuickEnquirySource] = useState('');

  const handleOpenBrochure = (source = '', projectKey = '') => {
    setModalSource(typeof source === 'string' ? source : '');
    setModalProjectKey(typeof projectKey === 'string' ? projectKey : '');
    setIsModalOpen(true);
  };
  const handleCloseBrochure = () => {
    setIsModalOpen(false);
    setModalProjectKey('');
  };

  const handleOpenSiteVisit = (source = '', projectKey = '') => {
    setSiteVisitSource(typeof source === 'string' ? source : '');
    setSiteVisitProjectKey(typeof projectKey === 'string' ? projectKey : '');
    setIsSiteVisitOpen(true);
  };
  const handleCloseSiteVisit = () => {
    setIsSiteVisitOpen(false);
    setSiteVisitProjectKey('');
  };

  const handleOpenQuickEnquiry = (project = null, source = '') => {
    setQuickEnquiryProject(project);
    setQuickEnquirySource(typeof source === 'string' ? source : 'Project Card Quick Enquiry');
    setIsQuickEnquiryOpen(true);
  };
  const handleCloseQuickEnquiry = () => {
    setIsQuickEnquiryOpen(false);
    setQuickEnquiryProject(null);
  };

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

  // Generate dynamic routes for all projects in PROJECTS_DATA
  const renderProjectRoutes = () => {
    return Object.values(PROJECTS_DATA).map((project) => (
      <React.Fragment key={project.id}>
        <Route path={`${project.basePath}/`} element={<HomePage onOpenBrochure={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} />} />
        <Route path={`${project.basePath}`} element={<HomePage onOpenBrochure={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} />} />
        <Route path={`${project.basePath}/villa-plots`} element={<VillaPlotsPage onOpenBrochure={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} />} />
        <Route path={`${project.basePath}/project-highlights`} element={<ProjectHighlightsPage onOpenBrochure={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} />} />
        <Route path={`${project.basePath}/location`} element={<LocationPage onOpenBrochure={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} />} />
        <Route path={`${project.basePath}/book-site-visit`} element={<BookSiteVisitPage onOpenBrochure={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} />} />
      </React.Fragment>
    ));
  };

  return (
    <Router>
      <ScrollToTopOrHash />
      <div id="er_page">
        <Header onOpenModal={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} />

        <Routes>
          {renderProjectRoutes()}

          {/* Default Developer Landing Page */}
          <Route path="/" element={<MainLandingPage onOpenBrochure={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} onOpenQuickEnquiry={handleOpenQuickEnquiry} />} />
          <Route path="/home" element={<MainLandingPage onOpenBrochure={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} onOpenQuickEnquiry={handleOpenQuickEnquiry} />} />

          {/* Fallback routes */}
          <Route path="/villa-plots" element={<VillaPlotsPage onOpenBrochure={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} />} />
          <Route path="/project-highlights" element={<ProjectHighlightsPage onOpenBrochure={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} />} />
          <Route path="/location" element={<LocationPage onOpenBrochure={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} />} />
          <Route path="/book-site-visit" element={<BookSiteVisitPage onOpenBrochure={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer onOpenModal={handleOpenBrochure} onOpenSiteVisit={handleOpenSiteVisit} />
        <BrochureModal isOpen={isModalOpen} onClose={handleCloseBrochure} sourceComment={modalSource} projectKey={modalProjectKey} />
        <SiteVisitModal isOpen={isSiteVisitOpen} onClose={handleCloseSiteVisit} sourceComment={siteVisitSource} projectKey={siteVisitProjectKey} />
        <QuickEnquiryModal isOpen={isQuickEnquiryOpen} onClose={handleCloseQuickEnquiry} project={quickEnquiryProject} sourceComment={quickEnquirySource} />
        <MobileEnquiryPopup onOpenBrochure={handleOpenBrochure} />
        <FloatingCallBtn />
      </div>
    </Router>
  );
}
