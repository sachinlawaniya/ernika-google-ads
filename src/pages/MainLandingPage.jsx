import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import gpHeroBg from '../assets/Sunlit Luxury Real Estate Showcase.png';
import heroBgDesktop from '../assets/hero_bg_desktop.jpg';
import heroLotusMobile from '../assets/hero_lotus_mobile.jpg';
import ernikaHeroDesktop from '../assets/ernika_hero.jpg';
import ekaHeroDesktop from '../assets/eka_hero.jpg';
import eleganceHeroDesktop from '../assets/elegance_hero.jpg';
import shyamHeroDesktop from '../assets/shyam_overview_desktop.png';
import shyamHeroMobile from '../assets/shyam_overview_mobile.png';
import eurekaCardBanner from '../assets/eureka_card_banner.jpg';
import exoticaCardBanner from '../assets/exotica_card_banner.jpg';
import shyamCardBanner from '../assets/shyam_card_banner.jpeg';
import OtpVerificationView from '../components/OtpVerificationView.jsx';
import QuickEnquiryModal from '../components/QuickEnquiryModal.jsx';
import { sendOtp, submitLeadToERP, isValidIndianPhone, cleanPhoneNumber } from '../utils/otpService.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const PROJECT_BROCHURES = {
  Ernika: 'https://gurupunvaanii.com/wp-content/uploads/2026/07/Ernika-Brochure-compressed-1.pdf',
  EKA: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/EKA-Brochure.pdf',
  'Shyam Residency': 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Shyam-Residency-brochure.pdf',
  Eureka: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Eureka.pdf',
  Elegance: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Brochure.pdf',
};

function StatCounterItem({ target, prefix = '', suffix = '', label, formatLocale = false, isStarted = false, duration = 1800 }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isStarted) {
      setCurrent(0);
      return;
    }

    let startTimestamp = null;
    let animId = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(ease * target);

      setCurrent(val);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    };

    animId = requestAnimationFrame(step);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isStarted, target, duration]);

  const displayVal = formatLocale ? current.toLocaleString('en-IN') : current;

  return (
    <div className="gp_hero_stat_box">
      <h3 className="gp_stat_num">
        {prefix}{displayVal}{suffix}
      </h3>
      <p className="gp_stat_label">{label}</p>
    </div>
  );
}

function LocationProjectsSwiper({ projects, locKey, renderCard }) {
  const swiperRef = useRef(null);

  // Duplicate slides when fewer than 6 items so Swiper has enough buffer to loop infinitely in BOTH directions
  const loopedProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    if (projects.length >= 6) return projects;
    if (projects.length === 2) {
      // Replicate 2 projects to 6 items: [0, 1, 0, 1, 0, 1]
      return [
        { ...projects[0], _loopUid: `${locKey}-p0-1` },
        { ...projects[1], _loopUid: `${locKey}-p1-1` },
        { ...projects[0], _loopUid: `${locKey}-p0-2` },
        { ...projects[1], _loopUid: `${locKey}-p1-2` },
        { ...projects[0], _loopUid: `${locKey}-p0-3` },
        { ...projects[1], _loopUid: `${locKey}-p1-3` },
      ];
    }
    if (projects.length === 3) {
      // Replicate 3 projects to 6 items: [0, 1, 2, 0, 1, 2]
      return [
        { ...projects[0], _loopUid: `${locKey}-p0-1` },
        { ...projects[1], _loopUid: `${locKey}-p1-1` },
        { ...projects[2], _loopUid: `${locKey}-p2-1` },
        { ...projects[0], _loopUid: `${locKey}-p0-2` },
        { ...projects[1], _loopUid: `${locKey}-p1-2` },
        { ...projects[2], _loopUid: `${locKey}-p2-2` },
      ];
    }
    return [
      ...projects.map((p, i) => ({ ...p, _loopUid: `${locKey}-${p.id || i}-1` })),
      ...projects.map((p, i) => ({ ...p, _loopUid: `${locKey}-${p.id || i}-2` })),
    ];
  }, [projects, locKey]);

  const hasMultiple = projects && projects.length >= 2;

  return (
    <div className="gp_carousel_wrapper gp_loc_carousel_wrapper">
      {hasMultiple && (
        <button
          type="button"
          className="gp_carousel_side_btn gp_carousel_side_prev"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous project"
          title="Previous"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      )}

      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={2}
        spaceBetween={24}
        loop={hasMultiple}
        loopAdditionalSlides={2}
        grabCursor={true}
        speed={600}
        autoplay={hasMultiple ? { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
        pagination={hasMultiple ? { clickable: true } : false}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 2, spaceBetween: 24 },
          1280: { slidesPerView: 2, spaceBetween: 28 },
        }}
        className="gp_loc_swiper"
      >
        {loopedProjects.map((p, idx) => (
          <SwiperSlide key={p._loopUid || `${locKey}-slide-${p.id}-${idx}`} className="gp_carousel_slide">
            {renderCard(p, locKey, false)}
          </SwiperSlide>
        ))}
      </Swiper>

      {hasMultiple && (
        <button
          type="button"
          className="gp_carousel_side_btn gp_carousel_side_next"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next project"
          title="Next"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      )}
    </div>
  );
}

export default function MainLandingPage({ onOpenBrochure, onOpenSiteVisit, onOpenQuickEnquiry }) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? -1 : index));
  };

  // Quick Enquiry Modal State
  const [quickEnquiryModal, setQuickEnquiryModal] = useState({
    isOpen: false,
    project: null,
  });

  const handleOpenQuickEnquiry = (project) => {
    if (typeof onOpenQuickEnquiry === 'function') {
      onOpenQuickEnquiry(project, `Portal Card Quick Enquiry - ${project?.name || ''}`);
    } else {
      setQuickEnquiryModal({
        isOpen: true,
        project,
      });
    }
  };

  const handleCloseQuickEnquiry = () => {
    setQuickEnquiryModal({
      isOpen: false,
      project: null,
    });
  };

  // Stats Counter Animation State & Observer
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setStatsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        } else {
          // Reset when scrolled out of view so it animates again on scroll
          setStatsVisible(false);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Carousel Swiper Refs
  const whySwiperRef = useRef(null);
  const reviewsSwiperRef = useRef(null);

  // Hero Brochure Form State (Brochure Download Form)
  const [heroData, setHeroData] = useState({
    name: '',
    phone: '',
    project: 'Ernika',
  });
  const [heroStatus, setHeroStatus] = useState('idle'); // 'idle' | 'loading' | 'otp' | 'success'
  const [heroError, setHeroError] = useState('');

  // Promo quick form state (Normal Enquiry Form - Site Tour)
  const [promoData, setPromoData] = useState({
    name: '',
    phone: '',
    project: 'Ernika',
  });
  const [promoStatus, setPromoStatus] = useState('idle'); // 'idle' | 'loading' | 'otp' | 'success'
  const [promoError, setPromoError] = useState('');

  // Contact form state (Normal Enquiry Form)
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    project: 'Ernika',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState('idle'); // 'idle' | 'loading' | 'otp' | 'success'
  const [contactError, setContactError] = useState('');

  useEffect(() => {
    document.title = 'Guru Punvaanii Properties | BDA & BMRDA Approved Plots & Villas in Bengaluru';
    window.scrollTo(0, 0);
  }, []);

  const featuredProjects = [
    {
      id: 'ernika',
      name: 'Ernika',
      slug: '/ernika/',
      badge: 'AMAZON THEME VILLA PLOTS',
      approval: 'BMRDA & RERA Approved',
      location: 'Anekal, Netaji Road, South Bengaluru',
      corridor: 'Anekal Corridor',
      categories: ['anekal'],
      category: 'anekal',
      image: ernikaHeroDesktop,
      price: '₹4,200 / sq.ft*',
      startingPackage: '₹50.4 Lakhs* Onwards',
      acres: '12.5 Acres',
      units: '220 Villa Plots',
      plotSizes: '1,200 - 2,400 sq.ft',
      amenitiesCount: '26+ Amenities & Clubhouse',
      highlight: 'Bengaluru’s 1st Amazon Forest-Themed Plotted Community',
      reraNo: 'PRM/KA/RERA/1251/308/PR/270125/007446',
      bankLoan: 'All Major Banks Approved',
      features: [
        '220 BMRDA Approved Plots Across 12.5 Acres',
        'Bengaluru’s 1st Amazon Forest-Themed Community',
        '26+ Curated Amenities & Grand Clubhouse',
        'Miyawaki Forest & Green Corridors',
      ],
    },
    {
      id: 'eka',
      name: 'EKA',
      slug: '/eka/',
      badge: 'FLAGSHIP 50-ACRE TOWNSHIP',
      approval: 'BMRDA & RERA Approved',
      location: 'Anekal, Hosur Road, South Bengaluru',
      corridor: 'Anekal - Hosur Belt',
      categories: ['anekal'],
      category: 'anekal',
      image: ekaHeroDesktop,
      price: '₹4,225 / sq.ft*',
      startingPackage: '₹50.7 Lakhs* Onwards',
      acres: '50 Acres',
      units: '657 Villa Plots',
      plotSizes: '1,200 - 2,400 sq.ft',
      amenitiesCount: 'Lakeview & Sensory Parks',
      highlight: 'Mega 50-Acre Master Planned Integrated Township',
      reraNo: 'RERA Approved Layout',
      bankLoan: 'All Major Banks Approved',
      features: [
        '657 BMRDA Approved Plots Across 50 Acres',
        'Lakeview Park & Green Auditorium',
        'Sensory Park, Raised Gazebos & Boulevard',
        '100% Ready Concrete Roads & Infrastructure',
      ],
    },
    {
      id: 'eureka',
      name: 'Eureka',
      slug: '/eureka/',
      badge: 'BMRDA APPROVED PLOTS',
      approval: 'BMRDA & RERA Registered',
      location: 'Dharapura, Bidadi (Near Mysuru Expressway)',
      corridor: 'Bidadi / Mysuru Expressway',
      categories: ['bidadi', 'mysuru'],
      category: 'bidadi',
      image: eurekaCardBanner,
      price: '₹3,100 / sq.ft*',
      startingPackage: '₹37.2 Lakhs* Onwards',
      acres: '17.5 Acres',
      units: '243 Villa Plots',
      plotSizes: '1,200 - 2,400 sq.ft',
      amenitiesCount: '12+ Themed Parks',
      highlight: 'High ROI Growth Belt near Bengaluru-Mysuru Expressway',
      reraNo: 'RERA Registered Project',
      bankLoan: 'All Major Banks Approved',
      features: [
        '243 BMRDA Approved Plots Across 17.5 Acres',
        '12+ Themed Parks, Sports Zones & Gazebos',
        'Just Minutes from Bengaluru-Mysuru Expressway',
        'High ROI Growth Belt in Greater Bengaluru',
      ],
    },
    {
      id: 'shyam_residency',
      name: 'Shyam Residency',
      slug: '/shyam-residency/',
      badge: 'BDA APPROVED SITES',
      approval: 'BDA APPROVED',
      location: 'Off Andhrahalli, Magadi Road, Bengaluru',
      corridor: 'Magadi Road (BDA Approved)',
      categories: ['magadi'],
      category: 'magadi',
      image: shyamCardBanner,
      price: '₹8,850 / sq.ft*',
      startingPackage: '₹1.06 Cr* Onwards',
      acres: '7.5 Acres',
      units: '115 BDA Plots',
      plotSizes: '1,200 - 2,000 sq.ft',
      amenitiesCount: 'Miyawaki Forest & Parks',
      highlight: 'Rare BDA Approved Plots 5 Mins from Tumkur Road Expressway',
      reraNo: 'PRM/KA/RERA/1251/309/PR/271023/006355',
      bankLoan: 'All Major Banks Approved',
      features: [
        '115 BDA Approved Plots Across 7.5 Acres',
        '30 to 50 Ft Wide Asphalted Concrete Roads',
        'Miyawaki Forest, Mini Amphitheatre & Pet Park',
        '5 Mins from Bengaluru-Tumkur Expressway',
      ],
    },
    {
      id: 'elegance',
      name: 'Elegance',
      slug: '/elegance/',
      badge: '4 BHK CLIMATE-CONTROLLED VILLAS',
      approval: 'RERA & BMICAPA Approved',
      location: 'Bheemenahalli, Bidadi (Mysuru Road)',
      corridor: 'Bidadi / Mysuru Road',
      categories: ['bidadi', 'mysuru'],
      category: 'bidadi',
      image: eleganceHeroDesktop,
      price: '₹7,000 / sq.ft*',
      startingPackage: '₹1.50 Cr* Onwards',
      acres: '6.12 Acres',
      units: '101 Luxury Villas',
      plotSizes: '4 BHK Luxury Villas',
      amenitiesCount: '10,000 SQFT Clubhouse & 45+ Amenities',
      highlight: 'Exclusive 4 BHK Climate-Controlled Luxury Villas',
      reraNo: 'PRM/KA/RERA/1270/302/PR/300924/007104',
      bankLoan: 'All Major Banks Approved',
      features: [
        '101 Luxury 4 BHK Villas Across 6.12 Acres',
        '45% Lush Green Open Space',
        '10,000 SQFT Clubhouse & 45+ Amenities',
        '1 KM from Bengaluru-Mysuru Expressway',
      ],
    },
    {
      id: 'exotica',
      name: 'Exotica',
      slug: '/exotica/',
      badge: 'MEDITERRANEAN THEMED VILLA PLOTS',
      approval: 'STRR & BMRDA Approved',
      location: 'Anekal - Attibele Road, Bengaluru',
      corridor: 'Attibele - Anekal Corridor',
      categories: ['anekal', 'attibele'],
      category: 'anekal',
      image: exoticaCardBanner,
      price: '₹3,750 / sq.ft*',
      startingPackage: '₹45 Lakhs* Onwards',
      acres: '16.75 Acres',
      units: '266 Villa Plots',
      plotSizes: '1,200 - 2,400 sq.ft',
      amenitiesCount: '30+ Curated Amenities & Club',
      highlight: 'Bengaluru’s 1st Mediterranean-Themed Plotted Community',
      reraNo: 'PRM/KA/RERA/1251/308/PR/181223/006496',
      bankLoan: 'All Major Banks Approved',
      features: [
        'STRR & BMRDA Approved Layout Across 16.75 Acres',
        'Bangalore’s 1st Mediterranean-Themed Plotted Community',
        '30+ Curated Lifestyle Amenities & Grand Clubhouse',
        'Just 15-20 Mins from Electronic City & Bommasandra Metro',
      ],
    },
  ];

  const locationSections = [
    {
      id: 'gp_loc_anekal',
      key: 'anekal',
      badge: 'SOUTH BENGALURU | FASTEST APPRECIATING BELT',
      badgeIcon: 'fas fa-map-marker-alt',
      title: 'Plots in Anekal',
      desc: 'Prime master-planned villa communities located just 15-20 minutes from Electronic City, Bommasandra Metro & Jigani Industrial corridor with complete BMRDA approvals.',
      projects: featuredProjects.filter((p) => p.categories?.includes('anekal')),
    },
    {
      id: 'gp_loc_bidadi',
      key: 'bidadi',
      badge: 'GREATER BENGALURU | 10-LANE EXPRESSWAY',
      badgeIcon: 'fas fa-road',
      title: 'Plots in Bidadi',
      desc: 'Master-planned developments situated directly on the high-speed Bengaluru-Mysuru Expressway, adjacent to Toyota Kirloskar and expanding industrial corridors.',
      projects: featuredProjects.filter((p) => p.categories?.includes('bidadi')),
    },
    {
      id: 'gp_loc_magadi',
      key: 'magadi',
      badge: 'WEST BENGALURU | BDA APPROVED',
      badgeIcon: 'fas fa-stamp',
      title: 'Plots in Magadi Road',
      desc: 'Premium BDA layout off Andhrahalli with clear marketable ‘A’ Khata titles, ready asphalted wide roads, just 5 minutes from Bengaluru-Tumkur Expressway.',
      projects: featuredProjects.filter((p) => p.categories?.includes('magadi')),
    },
    {
      id: 'gp_loc_mysuru',
      key: 'mysuru',
      badge: 'ARTERIAL EXPRESSWAY CORRIDOR',
      badgeIcon: 'fas fa-tachometer-alt',
      title: 'Plots in Mysuru Road',
      desc: 'Strategic high-connectivity corridor enjoying seamless connectivity to Kengeri Metro Station, NICE Road junction, prominent universities & hospitals.',
      projects: featuredProjects.filter((p) => p.categories?.includes('mysuru')),
    },
    // {
    //   id: 'gp_loc_attibele',
    //   key: 'attibele',
    //   badge: 'SOUTH-EAST BENGALURU | ELECTRONIC CITY & HOSUR BELT',
    //   badgeIcon: 'fas fa-city',
    //   title: 'Plots in Attibele',
    //   desc: 'Prime master-planned villa communities located just 15-20 minutes from Electronic City, Bommasandra Metro & Jigani Industrial corridor with complete BMRDA approvals.',
    //   projects: featuredProjects.filter((p) => p.categories?.includes('attibele')),
    // },
  ];

  const stats = [
    { target: 12, suffix: '+', number: '12+', label: 'Landmark Projects Delivered', formatLocale: false },
    { target: 3000, suffix: '+', number: '3,000+', label: 'Delighted Homeowners', formatLocale: true },
    { target: 38, suffix: '+ Lakh', number: '38+ Lakh', label: 'Sq.Ft. Developed Land', formatLocale: false },
    { target: 4.4, suffix: '★', number: '4.4★', label: 'Google Customer Rating', formatLocale: false },
  ];

  const growthStats = [
    { value: '12+', label: 'Completed Projects', icon: 'fas fa-check-circle' },
    { value: '8+', label: 'Ongoing Projects', icon: 'fas fa-hard-hat' },
    { value: '18+', label: 'Upcoming Projects', icon: 'fas fa-map-marked-alt' },
    { value: '26+', label: 'Strategic Locations', icon: 'fas fa-compass' },
    { value: '46+ L', label: 'Lakhs SQFT Available', icon: 'fas fa-vector-square' },
    { value: '38+ L', label: 'Lakhs SQFT Delivered', icon: 'fas fa-layer-group' },
    { value: '3,000+', label: 'Happy Customers', icon: 'fas fa-users' },
    { value: '4.4★', label: 'Google Rating', icon: 'fas fa-star' },
  ];

  const corePillars = [
    {
      title: 'Proven & Trusted',
      desc: 'With 12 completed projects, 8 ongoing, and 18+ upcoming in Karnataka, you are putting your trust in the best real estate company in Bangalore.',
      icon: 'fas fa-shield-alt',
      badge: '12+ Completed',
    },
    {
      title: 'Support After Sale',
      desc: "Your journey with us doesn't end at purchase. Whenever you decide to resell, rent, construct, or make changes, we are here to support you at every milestone.",
      icon: 'fas fa-headset',
      badge: 'Lifetime CRM',
    },
    {
      title: 'Grow With Us',
      desc: 'Being an early investor means that as our company grows across Karnataka, so will the value and appreciation of every plot you own.',
      icon: 'fas fa-chart-line',
      badge: 'High Appreciation',
    },
  ];

  const offerings = [
    {
      title: 'Residential Plots',
      desc: 'Comfortable homes designed for everyday life, bringing you ease, connectivity, and a sense of belonging you can grow with.',
      icon: 'fas fa-home',
      tag: 'BMRDA & BDA',
    },
    {
      title: 'Luxury Villas',
      desc: 'Spacious climate-controlled 4 BHK villas built for privacy, calm surroundings, and a lifestyle that feels like a blend of modern life and peaceful living.',
      icon: 'fas fa-gem',
      tag: '4 BHK Villas',
    },
    {
      title: 'Industrial Plots',
      desc: 'Well-located industrial and commercial properties that are designed for smooth operations, accessibility and the kind of environment businesses grow in.',
      icon: 'fas fa-industry',
      tag: 'Strategic Corridors',
    },
    {
      title: 'Modern Apartments',
      desc: 'Modern apartments with smart layouts, essential amenities, and vibrant community living in well-connected neighborhoods.',
      icon: 'fas fa-building',
      tag: 'Urban Living',
    },
  ];

  const whyChooseUs = [
    {
      icon: 'fas fa-shield-alt',
      title: '100% Legal Transparency',
      desc: 'All our layouts have complete BDA, BMRDA, RERA, and BMICAPA approvals with clear marketable titles and hassle-free registration.',
    },
    {
      icon: 'fas fa-chart-line',
      title: 'High-Growth Corridors',
      desc: 'Strategically located in Bengaluru’s fastest appreciating corridors like Anekal, Bidadi, and Magadi Road near major IT and Expressway hubs.',
    },
    {
      icon: 'fas fa-road',
      title: 'Ready Infrastructure',
      desc: 'Wide concrete roads (30 to 50 ft), underground electrical cabling, individual water connections, storm drains, and sewage treatment systems.',
    },
    {
      icon: 'fas fa-tree',
      title: '25+ Themed Amenities',
      desc: 'From Amazon-themed forests and Miyawaki green corridors to modern clubhouses, sports arenas, amphitheatres, and parks.',
    },
    {
      icon: 'fas fa-university',
      title: 'Approved by Leading Banks',
      desc: 'Pre-approved plot and construction loans by SBI, HDFC, ICICI, Axis Bank, and all major nationalized financial institutions.',
    },
    {
      icon: 'fas fa-handshake',
      title: 'Direct Developer Trust',
      desc: 'Over a decade of unwavering customer satisfaction. Fair Property, Fair Policy promise with zero brokerage and transparent terms.',
    },
  ];

  const reviews = [
    {
      name: 'Jerry Kurian',
      location: 'Bengaluru',
      project: 'Exotica (Attibele Road)',
      rating: 5,
      comment:
        'We were one of the first to book a property at Exotica last year and so far we are very happy with the decision. Over the past many months we have happily noted the progress and post sales interaction has been great so far.',
    },
    {
      name: 'Sharad Patel',
      location: 'Bengaluru',
      project: 'Elegance (Bidadi - Mysuru Road)',
      rating: 5,
      comment:
        'I recently booked a villa in Guru Punvaanii Elegance and had an excellent experience. The spacious design, well-maintained amenities, and solid construction create a premium, peaceful living environment.',
    },
    {
      name: 'Raghavendra Rao',
      location: 'Bengaluru',
      project: 'EKA (Anekal - Hosur Road)',
      rating: 5,
      comment:
        'Today I got registered my site no.522 in EKA project, and got great support from your team till my registration and all formalities went very smoothly. Really got 100% satisfaction in all effort and support by your great team. Thank you.',
    },
    {
      name: 'Murali C J',
      location: 'Bengaluru',
      project: 'Shyam Residency (Magadi Road)',
      rating: 5,
      comment:
        'I have purchased a plot at Shyam Residency project by Guru Punvaanii Properties Pvt Ltd. CRM team and legal team extended excellent support and process was well coordinated.',
    },
    {
      name: 'Pradeep R',
      location: 'Bengaluru',
      project: 'Eureka (Bidadi - Ramanagar)',
      rating: 5,
      comment:
        'Pleasant experience booking and buying the plot. Bought 1500 sqft in Eureka project at Ramanagar. Everything happened pretty quick, timely response from the relationship manager. All good!!',
    },
    {
      name: 'Dileep',
      location: 'Bengaluru',
      project: 'Etasha (Sondekoppa, Tumkur Road)',
      rating: 5,
      comment:
        'I visited with my friend. I felt its too good upcoming project in Nelamangala location. Thejas Reddy has explained well about project and company. Felt happy about good relationship and detailing about project.',
    },
  ];

  const officialFaqs = [
    {
      q: 'Are Guru Punvaanii’s projects legally approved?',
      a: 'Yes, absolutely! We are one of the few real estate companies in Bangalore with all projects carrying full RERA approval along with every other government clearance you need (BDA, BMRDA, BMICAPA), so you are not just buying land but also complete peace of mind.',
    },
    {
      q: "Where are Guru Punvaanii's projects located?",
      a: 'Across Karnataka’s fastest growing corridors — Anekal, Attibele, Bidadi, Magadi Road, Tumkur Road, and Mysuru Road. We have chosen locations carefully, keeping in mind their high infrastructure growth and future connectivity.',
    },
    {
      q: 'How do I book a plot?',
      a: 'You can simply reach out or click "Book a Free Site Visit", and we will arrange a complimentary AC cab pickup and site tour for you. You can come see the land, take a walk, and inspect the infrastructure before you make any decision.',
    },
    {
      q: 'Can I get a bank loan for my plot?',
      a: 'Yes! Being one of the trustworthy real estate companies in Bangalore, our projects are approved by SBI, HDFC, ICICI, Axis Bank, and the Central Bank. This makes your loan sanctioning process reliable and stress-free.',
    },
    {
      q: 'Who are the founders of Guru Punvaanii?',
      a: 'Guru Punvaanii was founded in 2019 by Mr. Baid and Mr. Vikas Bohra. With over 20 years of collective industry experience, they started with one shared mission: to make real estate honest, accessible, and transparent.',
    },
    {
      q: 'How do I know Guru Punvaanii is a developer I can trust?',
      a: 'Trust is built over time. Our 12 completed projects, 8 ongoing, 18+ upcoming developments, 100% legal approvals, and 3,000+ happy customers across Karnataka show why buyers consider us the most dependable real estate company in Bangalore.',
    },
  ];

  // 1. Hero Brochure Request & Verify Handlers
  const handleHeroRequestOtp = async (e) => {
    e.preventDefault();
    if (!heroData.name.trim()) {
      setHeroError('Please enter your full name');
      return;
    }
    const cleanPhone = cleanPhoneNumber(heroData.phone);
    if (!isValidIndianPhone(cleanPhone)) {
      setHeroError('Please enter a valid 10-digit mobile number');
      return;
    }
    setHeroStatus('loading');
    setHeroError('');

    const res = await sendOtp(cleanPhone);
    setHeroStatus('idle');

    if (res.success) {
      setHeroStatus('otp');
    } else {
      setHeroError(res.message || 'Failed to send OTP. Please try again.');
    }
  };

  const handleHeroOtpVerified = () => {
    const cleanPhone = cleanPhoneNumber(heroData.phone);
    submitLeadToERP({
      name: heroData.name,
      phone: cleanPhone,
      email: '',
      projectName: `Guru Punvaanii ${heroData.project}`,
      comments: `Hero Brochure Download (OTP Verified) - ${heroData.project}`,
      source: 'Google Ads Main Landing Hero Form',
    });
    setHeroStatus('success');
  };

  // 2. Promo Site Tour Request & Verify Handlers
  const handlePromoRequestOtp = async (e) => {
    e.preventDefault();
    if (!promoData.name.trim()) {
      setPromoError('Please enter your full name');
      return;
    }
    const cleanPhone = cleanPhoneNumber(promoData.phone);
    if (!isValidIndianPhone(cleanPhone)) {
      setPromoError('Please enter a valid 10-digit mobile number');
      return;
    }
    setPromoStatus('loading');
    setPromoError('');

    const res = await sendOtp(cleanPhone);
    setPromoStatus('idle');

    if (res.success) {
      setPromoStatus('otp');
    } else {
      setPromoError(res.message || 'Failed to send OTP. Please try again.');
    }
  };

  const handlePromoOtpVerified = () => {
    const cleanPhone = cleanPhoneNumber(promoData.phone);
    submitLeadToERP({
      name: promoData.name,
      phone: cleanPhone,
      email: '',
      projectName: `Guru Punvaanii ${promoData.project}`,
      comments: `Promo Tour Booking (OTP Verified) - ${promoData.project}`,
      source: 'Google Ads Main Landing Promo Form',
    });
    setPromoStatus('success');
  };

  // 3. Lead Submission Handler for Contact Form
  const handleContactRequestOtp = async (e) => {
    e.preventDefault();
    if (!contactData.name.trim()) {
      setContactError('Please enter your full name');
      return;
    }
    const cleanPhone = cleanPhoneNumber(contactData.phone);
    if (!isValidIndianPhone(cleanPhone)) {
      setContactError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (contactData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactData.email.trim())) {
        setContactError('Please enter a valid email address');
        return;
      }
    }
    setContactStatus('loading');
    setContactError('');

    const res = await sendOtp(cleanPhone);
    setContactStatus('idle');

    if (res.success) {
      setContactStatus('otp');
    } else {
      setContactError(res.message || 'Failed to send OTP. Please try again.');
    }
  };

  const handleContactOtpVerified = () => {
    const cleanPhone = cleanPhoneNumber(contactData.phone);
    submitLeadToERP({
      name: contactData.name,
      phone: cleanPhone,
      email: contactData.email,
      projectName: `Guru Punvaanii ${contactData.project}`,
      comments: `${contactData.message || 'Main Page Contact Form'} (OTP Verified) - ${contactData.project}`,
      source: 'Google Ads Main Landing Page Contact Form',
    });
    setContactStatus('success');
  };

  const handleLocationClick = (locKey) => {
    setActiveFilter(locKey || 'all');
    const targetId = locKey === 'all' ? 'gp_projects' : `gp_loc_${locKey}`;
    const targetElem = document.getElementById(targetId) || document.getElementById('gp_projects');
    if (targetElem) {
      const navOffset = 90;
      const elementPosition = targetElem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const renderPortalCard = (p, locKey) => (
    <div key={`${locKey}-${p.id}`} className="gp_portal_card">
      {/* 1. 16:9 Banner Media Stage */}
      <div className="gp_portal_media">
        <img src={p.image} alt={p.name} loading="lazy" style={{ cursor: 'pointer' }} onClick={() => navigate(p.slug)} />
      </div>

      {/* 2. Portal Card Body */}
      <div className="gp_portal_body">
        {/* High-Contrast Action CTAs */}
        <div className="gp_portal_actions">
          <div className="gp_portal_actions_row">
            <button
              type="button"
              className="gp_portal_btn_enquiry"
              onClick={() => handleOpenQuickEnquiry(p)}
              title={`Quick Enquiry for ${p.name}`}
            >
              <i className="fas fa-bolt"></i>
              <span>Quick Enquiry</span>
            </button>

            <button
              type="button"
              className="gp_portal_btn_secondary"
              onClick={() => {
                if (typeof onOpenBrochure === 'function') {
                  onOpenBrochure(`Portal Card - ${p.name}`, p.id);
                } else if (typeof onOpenSiteVisit === 'function') {
                  onOpenSiteVisit(`Portal Card - ${p.name}`, p.id);
                } else if (PROJECT_BROCHURES[p.name]) {
                  window.open(PROJECT_BROCHURES[p.name], '_blank', 'noopener,noreferrer');
                }
              }}
              title={`Download ${p.name} Brochure`}
            >
              <i className="fas fa-file-download"></i>
              <span>Get Brochure</span>
            </button>
          </div>

          <button
            type="button"
            className="gp_portal_btn_primary"
            onClick={() => navigate(p.slug)}
            title={`Explore ${p.name} Details`}
          >
            <span>Explore {p.name.replace('Guru Punvaanii ', '')}</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSingleHeroBanner = (p, locKey) => {
    const bannerImg = p.id === 'shyam_residency' ? shyamCardBanner : p.image;

    return (
      <div key={`${locKey}-${p.id}`} className="gp_single_luxury_banner">
        {/* 1. Media Stage (Clean Poster without top badges) */}
        <div className="gp_slb_media_stage">
          <picture
            className="gp_slb_picture"
            onClick={() => navigate(p.slug)}
            style={{ cursor: 'pointer' }}
            title={`Explore ${p.name} Details`}
          >
            <img
              src={bannerImg}
              alt={p.name}
              loading="lazy"
              className="gp_slb_banner_img"
            />
          </picture>
        </div>

        {/* 2. Key Specs & Value Proposition Matrix Bar */}
        {/* <div className="gp_slb_specs_bar">
          <div className="gp_slb_spec_item">
            <div className="gp_slb_spec_icon">
              <i className="fas fa-vector-square"></i>
            </div>
            <div className="gp_slb_spec_text">
              <span className="gp_slb_spec_val">{p.acres || '7.5 Acres'}</span>
              <span className="gp_slb_spec_lbl">Township Area</span>
            </div>
          </div>

          <div className="gp_slb_spec_divider"></div>

          <div className="gp_slb_spec_item">
            <div className="gp_slb_spec_icon">
              <i className="fas fa-border-all"></i>
            </div>
            <div className="gp_slb_spec_text">
              <span className="gp_slb_spec_val">{p.units || '115 BDA Plots'}</span>
              <span className="gp_slb_spec_lbl">Exclusive Inventory</span>
            </div>
          </div>

          <div className="gp_slb_spec_divider"></div>

          <div className="gp_slb_spec_item">
            <div className="gp_slb_spec_icon">
              <i className="fas fa-ruler-combined"></i>
            </div>
            <div className="gp_slb_spec_text">
              <span className="gp_slb_spec_val">{p.plotSizes || '1,200 - 2,000 sq.ft'}</span>
              <span className="gp_slb_spec_lbl">Plot Configurations</span>
            </div>
          </div>

          <div className="gp_slb_spec_divider"></div>

          <div className="gp_slb_spec_item">
            <div className="gp_slb_spec_icon">
              <i className="fas fa-road"></i>
            </div>
            <div className="gp_slb_spec_text">
              <span className="gp_slb_spec_val">30 to 50 Ft Wide</span>
              <span className="gp_slb_spec_lbl">Asphalted Concrete Roads</span>
            </div>
          </div>

          <div className="gp_slb_spec_divider"></div>

          <div className="gp_slb_spec_item gp_slb_spec_rate">
            <div className="gp_slb_spec_icon">
              <i className="fas fa-tag"></i>
            </div>
            <div className="gp_slb_spec_text">
              <span className="gp_slb_spec_val gp_slb_rate_highlight">{p.price || '₹8,850 / sq.ft*'}</span>
              <span className="gp_slb_spec_lbl">{p.startingPackage || '₹1.06 Cr* Onwards'}</span>
            </div>
          </div>
        </div> */}

        {/* 3. Sleek Bottom Action Bar */}
        <div className="gp_slb_action_bar">
          <div className="gp_slb_action_left">
            <div className="gp_slb_location_info">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <strong>{p.name} — Magadi Road, Bengaluru</strong>
                <p>Off Andhrahalli, near Outer Ring Road &amp; NICE Road Corridor • Clear Titles</p>
              </div>
            </div>
          </div>

          <div className="gp_slb_action_right">
            <button
              type="button"
              className="gp_slb_btn_enquiry"
              onClick={() => handleOpenQuickEnquiry(p)}
              title={`Quick Enquiry for ${p.name}`}
            >
              <i className="fas fa-bolt"></i>
              <span>Quick Enquiry</span>
            </button>

            <button
              type="button"
              className="gp_slb_btn_brochure"
              onClick={() => {
                if (typeof onOpenBrochure === 'function') {
                  onOpenBrochure(`Single Banner - ${p.name}`, p.id);
                } else if (typeof onOpenSiteVisit === 'function') {
                  onOpenSiteVisit(`Single Banner - ${p.name}`, p.id);
                } else if (PROJECT_BROCHURES[p.name]) {
                  window.open(PROJECT_BROCHURES[p.name], '_blank', 'noopener,noreferrer');
                }
              }}
              title={`Download ${p.name} BDA Brochure`}
            >
              <i className="fas fa-file-download"></i>
              <span>Get Brochure</span>
            </button>

            <button
              type="button"
              className="gp_slb_btn_explore"
              onClick={() => navigate(p.slug)}
              title={`Explore ${p.name} Details`}
            >
              <span>Explore {p.name.replace('Guru Punvaanii ', '')}</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="gp_main_landing">
      {/* ── 1. SIGNATURE HERO SECTION (DESKTOP & MOBILE UI) ── */}
      <section id="gp_hero" className="gp_signature_hero_section">
        <div className="gp_hero_master_container">
          <div className="gp_hero_content_grid">

            {/* Left Content Column */}
            <div className="gp_hero_text_column">
              {/* Eyebrow with gold accent lines */}
              <div className="gp_hero_eyebrow">
                <span className="gp_eyebrow_line"></span>
                <span className="gp_eyebrow_text">BENGALURU’S TRUSTED PLOTTED DEVELOPER</span>
                <span className="gp_eyebrow_line"></span>
              </div>

              {/* Main Headline */}
              <h1 className="gp_hero_heading">
                <span className="gp_heading_dark">Build Your Dream</span>
                <br />
                <span className="gp_heading_gold">in Bengaluru’s Prime Locations</span>
              </h1>

              {/* Sub-headline */}
              <p className="gp_hero_subtitle">
                Explore handpicked plotted developments across key growth corridors with 100% legal clarity, ready infrastructure and a better tomorrow.
              </p>

              {/* Mobile Lotus Showcase (Shown on Mobile between text and pills) */}
              <div className="gp_hero_mobile_lotus_wrap">
                <div className="gp_mobile_lotus_box">
                  <img
                    src={heroLotusMobile}
                    alt="Bengaluru Locations Lotus - Anekal, Bidadi, Magadi Road, Mysuru Road, Attibele"
                    className="gp_mobile_lotus_img"
                  />
                  {/* Interactive Tap Hotspots over each Petal */}
                  <div className="gp_mobile_hotspots">
                    <button
                      type="button"
                      className="gp_m_hotspot gp_m_hs_anekal"
                      onClick={() => handleLocationClick('anekal')}
                      aria-label="Anekal Projects"
                    />
                    <button
                      type="button"
                      className="gp_m_hotspot gp_m_hs_bidadi"
                      onClick={() => handleLocationClick('bidadi')}
                      aria-label="Bidadi Projects"
                    />
                    <button
                      type="button"
                      className="gp_m_hotspot gp_m_hs_magadi"
                      onClick={() => handleLocationClick('magadi')}
                      aria-label="Magadi Road Projects"
                    />
                    <button
                      type="button"
                      className="gp_m_hotspot gp_m_hs_mysuru"
                      onClick={() => handleLocationClick('mysuru')}
                      aria-label="Mysuru Road Projects"
                    />
                    <button
                      type="button"
                      className="gp_m_hotspot gp_m_hs_attibele"
                      onClick={() => handleLocationClick('attibele')}
                      aria-label="Attibele Projects"
                    />
                  </div>
                </div>
              </div>

              {/* Location Navigation Pills (2 Rows) */}
              <div className="gp_hero_location_pills">
                <div className="gp_pills_row gp_pills_row_1">
                  <button
                    type="button"
                    className={`gp_loc_pill ${activeFilter === 'anekal' ? 'active' : ''}`}
                    onClick={() => handleLocationClick('anekal')}
                  >
                    <span className="gp_loc_pin"><i className="fas fa-map-marker-alt"></i></span>
                    <span className="gp_loc_label">Anekal</span>
                    <span className="gp_loc_arrow"><i className="fas fa-chevron-right"></i></span>
                  </button>
                  <button
                    type="button"
                    className={`gp_loc_pill ${activeFilter === 'bidadi' ? 'active' : ''}`}
                    onClick={() => handleLocationClick('bidadi')}
                  >
                    <span className="gp_loc_pin"><i className="fas fa-map-marker-alt"></i></span>
                    <span className="gp_loc_label">Bidadi</span>
                    <span className="gp_loc_arrow"><i className="fas fa-chevron-right"></i></span>
                  </button>
                  <button
                    type="button"
                    className={`gp_loc_pill ${activeFilter === 'magadi' ? 'active' : ''}`}
                    onClick={() => handleLocationClick('magadi')}
                  >
                    <span className="gp_loc_pin"><i className="fas fa-map-marker-alt"></i></span>
                    <span className="gp_loc_label">Magadi Road</span>
                    <span className="gp_loc_arrow"><i className="fas fa-chevron-right"></i></span>
                  </button>
                </div>
                <div className="gp_pills_row gp_pills_row_2">
                  <button
                    type="button"
                    className={`gp_loc_pill ${activeFilter === 'mysuru' ? 'active' : ''}`}
                    onClick={() => handleLocationClick('mysuru')}
                  >
                    <span className="gp_loc_pin"><i className="fas fa-map-marker-alt"></i></span>
                    <span className="gp_loc_label">Mysuru Road</span>
                    <span className="gp_loc_arrow"><i className="fas fa-chevron-right"></i></span>
                  </button>
                  <button
                    type="button"
                    className={`gp_loc_pill ${activeFilter === 'attibele' ? 'active' : ''}`}
                    onClick={() => handleLocationClick('attibele')}
                  >
                    <span className="gp_loc_pin"><i className="fas fa-map-marker-alt"></i></span>
                    <span className="gp_loc_label">Attibele</span>
                    <span className="gp_loc_arrow"><i className="fas fa-chevron-right"></i></span>
                  </button>
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="gp_hero_cta_buttons">
                <a
                  href="#gp_projects"
                  className="gp_cta_btn_primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('gp_projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <i className="fas fa-th-large"></i>
                  <span>Explore Projects by Location</span>
                  <i className="fas fa-arrow-right gp_cta_arrow"></i>
                </a>

                <button
                  type="button"
                  className="gp_cta_btn_secondary"
                  onClick={() => {
                    if (typeof onOpenSiteVisit === 'function') {
                      onOpenSiteVisit('Main Hero - Book Free Site Visit');
                    }
                  }}
                >
                  <i className="fas fa-car-side"></i>
                  <span>Book a Free Site Visit</span>
                  <i className="fas fa-arrow-right gp_mobile_only_arrow"></i>
                </button>
              </div>

              {/* Mobile Trust Badges Card */}
              {/* <div className="gp_hero_trust_card_mobile">
                <div className="gp_trust_item_m">
                  <div className="gp_trust_icon_m">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <span className="gp_trust_text_m">BDA &amp; BMRDA Approved</span>
                </div>
                <div className="gp_trust_divider_m"></div>
                <div className="gp_trust_item_m">
                  <div className="gp_trust_icon_m">
                    <i className="fas fa-file-contract"></i>
                  </div>
                  <span className="gp_trust_text_m">100% Clear Titles</span>
                </div>
                <div className="gp_trust_divider_m"></div>
                <div className="gp_trust_item_m">
                  <div className="gp_trust_icon_m">
                    <i className="fas fa-university"></i>
                  </div>
                  <span className="gp_trust_text_m">SBI &amp; HDFC Approved</span>
                </div>
                <div className="gp_trust_divider_m"></div>
                <div className="gp_trust_item_m">
                  <div className="gp_trust_icon_m">
                    <i className="fas fa-road"></i>
                  </div>
                  <span className="gp_trust_text_m">Ready Concrete Roads</span>
                </div>
              </div> */}
            </div>

            {/* Right Column: Desktop Lotus Stage with Interactive Hotspots */}
            <div className="gp_hero_desktop_lotus_col">
              <div className="gp_desktop_lotus_stage">
                <div className="gp_desktop_lotus_hotspots">
                  {/* Interactive Hotspots over each Petal on Desktop */}
                  <button
                    type="button"
                    className={`gp_d_hotspot gp_d_hs_anekal ${activeFilter === 'anekal' ? 'active' : ''}`}
                    onClick={() => handleLocationClick('anekal')}
                    title="Explore Anekal Projects (Ernika & EKA)"
                    aria-label="Anekal Projects"
                  />
                  <button
                    type="button"
                    className={`gp_d_hotspot gp_d_hs_bidadi ${activeFilter === 'bidadi' ? 'active' : ''}`}
                    onClick={() => handleLocationClick('bidadi')}
                    title="Explore Bidadi Projects (Eureka & Elegance)"
                    aria-label="Bidadi Projects"
                  />
                  <button
                    type="button"
                    className={`gp_d_hotspot gp_d_hs_magadi ${activeFilter === 'magadi' ? 'active' : ''}`}
                    onClick={() => handleLocationClick('magadi')}
                    title="Explore Magadi Road Projects (Shyam Residency BDA)"
                    aria-label="Magadi Road Projects"
                  />
                  <button
                    type="button"
                    className={`gp_d_hotspot gp_d_hs_mysuru ${activeFilter === 'mysuru' ? 'active' : ''}`}
                    onClick={() => handleLocationClick('mysuru')}
                    title="Explore Mysuru Road Projects (Eureka & Elegance)"
                    aria-label="Mysuru Road Projects"
                  />
                  <button
                    type="button"
                    className={`gp_d_hotspot gp_d_hs_attibele ${activeFilter === 'attibele' ? 'active' : ''}`}
                    onClick={() => handleLocationClick('attibele')}
                    title="Explore Attibele Corridor Projects"
                    aria-label="Attibele Projects"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>


      </section>
      {/* Full-Width Desktop Trust Strip (Dedicated transition bar below hero) */}
      {/* <div className="gp_hero_trust_strip_desktop">
          <div className="gp_desktop_trust_item">
            <i className="fas fa-shield-alt"></i>
            <span>BDA &amp; BMRDA Approved</span>
          </div>
          <div className="gp_desktop_trust_divider"></div>
          <div className="gp_desktop_trust_item">
            <i className="fas fa-file-contract"></i>
            <span>100% Clear Titles</span>
          </div>
          <div className="gp_desktop_trust_divider"></div>
          <div className="gp_desktop_trust_item">
            <i className="fas fa-university"></i>
            <span>SBI &amp; HDFC Approved</span>
          </div>
          <div className="gp_desktop_trust_divider"></div>
          <div className="gp_desktop_trust_item">
            <i className="fas fa-road"></i>
            <span>Ready Concrete Roads</span>
          </div>
        </div> */}

      {/* Full-Width Stats Strip with Animated Counters */}
      <div ref={statsRef} className="gp_hero_stats_strip">
        {stats.map((s, idx) => (
          <StatCounterItem
            key={idx}
            target={s.target}
            prefix={s.prefix || ''}
            suffix={s.suffix || ''}
            label={s.label}
            formatLocale={s.formatLocale}
            isStarted={statsVisible}
            duration={2000}
          />
        ))}
      </div>
      {/* ── 2. LOCATION-WISE PROJECTS SECTION ── */}
      <section id="gp_projects" className="gp_section gp_projects_section">
        <div className="gp_container">
          <div className="gp_section_header">
            <h2 className="gp_section_title">
              Signature Villa &amp; Plots by Location
            </h2>
            <p className="gp_section_desc">
              Explore our BDA &amp; BMRDA master-planned plotted developments across Bengaluru’s fastest appreciating corridors. Select any location below or from the hero map to jump directly to projects.
            </p>
          </div>

          {/* Location-Wise Blocks */}
          <div className="gp_location_blocks_container">
            {locationSections.map((loc) => (
              <div
                id={loc.id}
                key={loc.id}
                className={`gp_location_block ${activeFilter === loc.key ? 'gp_loc_highlighted' : ''}`}
              >
                <div className="gp_location_block_header">
                  <div className="gp_loc_header_left">
                    <span className="gp_loc_badge">
                      <i className={loc.badgeIcon}></i> {loc.badge}
                    </span>
                    <h3 className="gp_loc_title">{loc.title}</h3>
                    <p className="gp_loc_subtitle">{loc.desc}</p>
                  </div>
                </div>

                {loc.projects.length === 1 ? (
                  <div className="gp_portal_grid_single">
                    {renderSingleHeroBanner(loc.projects[0], loc.key)}
                  </div>
                ) : (
                  <>
                    {/* Desktop & Tablet: 2-Card Carousel Slider */}
                    <div className="gp_loc_carousel_desktop">
                      <LocationProjectsSwiper
                        projects={loc.projects}
                        locKey={loc.key}
                        renderCard={renderPortalCard}
                      />
                    </div>

                    {/* Mobile: Original Stacked Grid */}
                    <div className="gp_loc_grid_mobile">
                      <div className="gp_portal_grid">
                        {loc.projects.map((p) => renderPortalCard(p, loc.key, false))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── 6. PROJECT PROMO CARD / QUICK LEAD GENERATOR BANNER ── */}
      {/* <section id="gp_promo" className="gp_section gp_promo_section">
        <div className="gp_container">
          <div className="gp_promo_banner_card">
            <div className="gp_promo_left">
              <span className="gp_promo_tag">
                <i className="fas fa-bolt"></i> SPECIAL INVITATION
              </span>
              <h2 className="gp_promo_headline">
                Book a Free VIP Site Visit with Complimentary AC Cab Pickup &amp; Drop
              </h2>
              <p className="gp_promo_subtext">
                Experience the location, amenities, and development progress in person. We provide hassle-free doorstep cab pickup, site walk-around, and instant brochure delivery on WhatsApp.
              </p>
              <div className="gp_promo_perks">
                <div className="gp_promo_perk_item">
                  <i className="fas fa-taxi"></i>
                  <span>Zero-Cost Doorstep Pickup &amp; Drop</span>
                </div>
                <div className="gp_promo_perk_item">
                  <i className="fas fa-file-invoice"></i>
                  <span>Transparent Price &amp; Legal Sheets</span>
                </div>
                <div className="gp_promo_perk_item">
                  <i className="fas fa-user-shield"></i>
                  <span>1-on-1 Senior Advisor Support</span>
                </div>
              </div>
            </div>

            <div className="gp_promo_right">
              <div className="gp_promo_form_box">
                {promoStatus === 'success' ? (
                  <div className="gp_promo_success" style={{ textAlign: 'center', padding: '16px' }}>
                    <div style={{ width: '44px', height: '44px', background: '#22c55e', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px', fontWeight: 700 }}>
                      ✓
                    </div>
                    <h3>VIP Site Visit Booked!</h3>
                    <p>
                      Thank you <strong>{promoData.name}</strong>! Your mobile number <strong>+91 {cleanPhoneNumber(promoData.phone)}</strong> has been verified. Our dedicated relationship manager will call you shortly to confirm your preferred date and free AC cab pickup for {promoData.project}.
                    </p>
                    <button
                      type="button"
                      className="gp_btn_primary"
                      onClick={() => {
                        setPromoData({ name: '', phone: '', project: 'Ernika' });
                        setPromoStatus('idle');
                      }}
                    >
                      Book Another Site Visit
                    </button>
                  </div>
                ) : promoStatus === 'otp' ? (
                  <OtpVerificationView
                    phone={cleanPhoneNumber(promoData.phone)}
                    buttonText={`Verify OTP & Confirm ${promoData.project} Tour`}
                    theme="dark"
                    onChangePhone={() => setPromoStatus('idle')}
                    onVerified={handlePromoOtpVerified}
                  />
                ) : (
                  <form onSubmit={handlePromoRequestOtp} className="gp_promo_form">
                    <h3 className="gp_promo_form_title">Quick Site Visit Booking</h3>
                    {promoError && (
                      <div className="gp_promo_error_box">
                        <i className="fas fa-exclamation-circle"></i> {promoError}
                      </div>
                    )}

                    <div className="gp_promo_field">
                      <label htmlFor="gp_p_name">Your Name *</label>
                      <input
                        id="gp_p_name"
                        type="text"
                        placeholder="Full Name"
                        value={promoData.name}
                        onChange={(e) => setPromoData({ ...promoData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="gp_promo_field">
                      <label htmlFor="gp_p_phone">Mobile Number *</label>
                      <input
                        id="gp_p_phone"
                        type="tel"
                        maxLength="10"
                        placeholder="10-digit Mobile No."
                        value={promoData.phone}
                        onChange={(e) =>
                          setPromoData({ ...promoData, phone: e.target.value.replace(/\D/g, '') })
                        }
                        required
                      />
                    </div>

                    <div className="gp_promo_field">
                      <label htmlFor="gp_p_project">Interested Project *</label>
                      <select
                        id="gp_p_project"
                        value={promoData.project}
                        onChange={(e) => setPromoData({ ...promoData, project: e.target.value })}
                      >
                        <option value="Ernika">Guru Punvaanii Ernika (Anekal)</option>
                        <option value="EKA">Guru Punvaanii EKA (Anekal - Hosur Rd)</option>
                        <option value="Exotica">Guru Punvaanii Exotica (Attibele Road)</option>
                        <option value="Eureka">Guru Punvaanii Eureka (Bidadi)</option>
                        <option value="Shyam Residency">Guru Punvaanii Shyam Residency (Magadi Rd)</option>
                        <option value="Elegance">Guru Punvaanii Elegance (Bidadi)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="gp_btn_primary gp_promo_submit_btn"
                      disabled={promoStatus === 'loading'}
                    >
                      {promoStatus === 'loading' ? (
                        <span><i className="fas fa-spinner fa-spin"></i> Sending OTP...</span>
                      ) : (
                        <>
                          <span>Book Free Site Visit</span>
                          <i className="fas fa-arrow-right"></i>
                        </>
                      )}
                    </button>
                    <p className="gp_promo_privacy">
                      <i className="fas fa-lock"></i> Your information is 100% confidential. No spam.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* ── 3. ABOUT COMPANY SECTION ── */}
      {/* <section id="gp_about" className="gp_section gp_about_company_section">
        <div className="gp_container">
          <div className="gp_about_split_grid">
            Left Content
            <div className="gp_about_content_col">
              <span className="gp_section_badge">
                <i className="fas fa-landmark"></i> ABOUT GURU PUNVAANII
              </span>
              <h2 className="gp_section_title">
                Fair Property, Fair Policy — Over a Decade of Trust &amp; Excellence
              </h2>
              <p className="gp_about_lead">
                At Guru Punvaanii Properties, we believe real estate isn’t just about square feet — it is about the peace of mind that comes with transparent land ownership, clear government approvals, and thoughtfully curated living environments.
              </p>
              <p className="gp_about_text">
                With <strong>12+ successfully delivered landmark projects</strong> and over <strong>3,000 satisfied families</strong> across Bengaluru, we have built a reputation for uncompromising legal diligence, on-time infrastructure delivery, and customer-first service.
              </p>

              <div className="gp_about_core_values">
                <div className="gp_value_box">
                  <div className="gp_value_icon"><i className="fas fa-balance-scale"></i></div>
                  <div>
                    <h4>100% Legal Rigor</h4>
                    <p>Every layout is strictly compliant with BDA, BMRDA, RERA &amp; BMICAPA norms.</p>
                  </div>
                </div>
                <div className="gp_value_box">
                  <div className="gp_value_icon"><i className="fas fa-hard-hat"></i></div>
                  <div>
                    <h4>Ready Infrastructure</h4>
                    <p>Concrete roads, underground cabling, water connections &amp; STP delivered on day one.</p>
                  </div>
                </div>
                <div className="gp_value_box">
                  <div className="gp_value_icon"><i className="fas fa-hand-holding-usd"></i></div>
                  <div>
                    <h4>Exponential Appreciation</h4>
                    <p>Handpicked growth corridors with proven track record of strong capital returns.</p>
                  </div>
                </div>
              </div>

              <div className="gp_about_cta_wrap">
                <button
                  type="button"
                  className="gp_btn_primary"
                  onClick={() => {
                    if (typeof onOpenSiteVisit === 'function') {
                      onOpenSiteVisit('About Section - Schedule Consultation');
                    }
                  }}
                >
                  <span>Connect with Our Property Advisors</span>
                  <i className="fas fa-phone-alt"></i>
                </button>
              </div>
            </div>

            <div className="gp_about_visual_col">
              <div className="gp_about_image_frame">
                <img
                  src={ernikaHeroDesktop}
                  alt="Guru Punvaanii Plotted Communities"
                  className="gp_about_main_img"
                />
                <div className="gp_experience_badge">
                  <span className="gp_exp_num">10+</span>
                  <span className="gp_exp_txt">Years of Excellence &amp; Delivery</span>
                </div>
                <div className="gp_floating_badge_card">
                  <i className="fas fa-users"></i>
                  <div>
                    <strong>3,000+ Happy Families</strong>
                    <span>Living in Secure Plotted Layouts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── 3.5. MORE THAN JUST A BUILDER & OUR GROWTH JOURNEY ── */}
      {/* <section id="gp_growth" className="gp_section gp_growth_section">
        <div className="gp_container">
          <div className="gp_section_header">
            <span className="gp_section_badge">
              <i className="fas fa-shield-alt"></i> A NAME YOU CAN ALWAYS TRUST
            </span>
            <h2 className="gp_section_title">
              More Than Just a Builder and Developer in Bangalore
            </h2>
            <p className="gp_section_desc">
              Our growth over the years shows steady progress, strong presence, and the unshakeable trust we have built with every project we deliver across Karnataka.
            </p>
          </div>

          Core 3 Pillars Cards
          <div className="gp_pillars_grid">
            {corePillars.map((pillar, idx) => (
              <div key={idx} className="gp_pillar_card">
                <div className="gp_pillar_card_header">
                  <div className="gp_pillar_icon">
                    <i className={pillar.icon}></i>
                  </div>
                  <span className="gp_pillar_badge">{pillar.badge}</span>
                </div>
                <h3 className="gp_pillar_title">{pillar.title}</h3>
                <p className="gp_pillar_desc">{pillar.desc}</p>
              </div>
            ))}
          </div>

          Our Growth Journey (8 Official Verified Stats Grid)
          <div className="gp_growth_stats_card">
            <div className="gp_growth_stats_header">
              <span className="gp_growth_badge">
                <i className="fas fa-chart-pie"></i> VERIFIED TRACK RECORD
              </span>
              <h3 className="gp_growth_headline">Our Growth Journey Across Karnataka</h3>
              <p className="gp_growth_sub">
                Reflecting why 3,000+ happy families consider us one of the most reliable plotted developers in Bengaluru.
              </p>
            </div>

            <div className="gp_growth_stats_grid">
              {growthStats.map((item, idx) => (
                <div key={idx} className="gp_growth_stat_item">
                  <div className="gp_growth_stat_icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="gp_growth_stat_content">
                    <span className="gp_growth_stat_val">{item.value}</span>
                    <span className="gp_growth_stat_lbl">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          Our Offerings Grid
          <div className="gp_offerings_block">
            <div className="gp_offerings_title_wrap">
              <h3 className="gp_offerings_headline">Our Diverse Real Estate Offerings</h3>
              <p className="gp_offerings_sub">
                Whether you are buying your first plot, a luxury villa for your family, or an industrial plot for business expansion — every option is built around your aspirations.
              </p>
            </div>

            <div className="gp_offerings_grid">
              {offerings.map((off, idx) => (
                <div key={idx} className="gp_offering_card">
                  <div className="gp_offering_top">
                    <div className="gp_offering_icon">
                      <i className={off.icon}></i>
                    </div>
                    <span className="gp_offering_tag">{off.tag}</span>
                  </div>
                  <h4 className="gp_offering_name">{off.title}</h4>
                  <p className="gp_offering_text">{off.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section> */}

      {/* ── 4. WHY CHOOSE US SECTION (CAROUSEL) ── */}
      <section id="gp_why_us" className="gp_section gp_why_section">
        <div className="gp_container">
          <div className="gp_section_header">
            <span className="gp_section_badge">
              <i className="fas fa-star"></i> THE GURU PUNVAANII ADVANTAGE
            </span>
            <h2 className="gp_section_title">
              Why 3,000+ Families Choose Our Communities
            </h2>
            <p className="gp_section_desc">
              We eliminate the stress of land buying with bulletproof legal approvals, transparent pricing, and world-class amenities built before you move in.
            </p>
          </div>

          <div className="gp_carousel_wrapper">
            <button
              type="button"
              className="gp_carousel_side_btn gp_carousel_side_prev"
              onClick={() => whySwiperRef.current?.slidePrev()}
              aria-label="Previous advantage"
              title="Previous"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <Swiper
              onBeforeInit={(swiper) => {
                whySwiperRef.current = swiper;
              }}
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView={1.12}
              spaceBetween={16}
              loop={true}
              loopAdditionalSlides={2}
              grabCursor={true}
              speed={600}
              autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 3, spaceBetween: 28 },
              }}
              className="gp_why_swiper"
            >
              {[...whyChooseUs, ...whyChooseUs].map((item, idx) => (
                <SwiperSlide key={`why-${idx}`} className="gp_carousel_slide">
                  <div className="gp_why_card">
                    <div className="gp_why_icon_wrap">
                      <i className={item.icon}></i>
                    </div>
                    <h3 className="gp_why_card_title">{item.title}</h3>
                    <p className="gp_why_card_desc">{item.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className="gp_carousel_side_btn gp_carousel_side_next"
              onClick={() => whySwiperRef.current?.slideNext()}
              aria-label="Next advantage"
              title="Next"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* ── 5. REVIEWS / TESTIMONIALS SECTION (CAROUSEL) ── */}
      <section id="gp_reviews" className="gp_section gp_reviews_section">
        <div className="gp_container">
          <div className="gp_section_header">
            <span className="gp_section_badge">
              <i className="fas fa-heart"></i> CLIENT TESTIMONIALS
            </span>
            <h2 className="gp_section_title">
              Trusted by Homeowners &amp; Smart Investors
            </h2>
            <p className="gp_section_desc">
              Read real stories from families who bought their dream plots with Guru Punvaanii Properties.
            </p>
          </div>

          <div className="gp_carousel_wrapper">
            <button
              type="button"
              className="gp_carousel_side_btn gp_carousel_side_prev"
              onClick={() => reviewsSwiperRef.current?.slidePrev()}
              aria-label="Previous testimonial"
              title="Previous"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <Swiper
              onBeforeInit={(swiper) => {
                reviewsSwiperRef.current = swiper;
              }}
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView={1.12}
              spaceBetween={16}
              loop={true}
              loopAdditionalSlides={2}
              grabCursor={true}
              speed={600}
              autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 3, spaceBetween: 28 },
              }}
              className="gp_reviews_swiper"
            >
              {[...reviews, ...reviews].map((r, idx) => (
                <SwiperSlide key={`rev-${idx}`} className="gp_carousel_slide">
                  <div className="gp_review_card">
                    <div className="gp_review_header_row">
                      <div className="gp_review_stars">
                        {[...Array(r.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                      <span className="gp_review_verified_badge">
                        <i className="fas fa-check-circle"></i> Verified Buyer
                      </span>
                    </div>
                    <p className="gp_review_text">"{r.comment}"</p>
                    <div className="gp_review_footer">
                      <div className="gp_review_avatar">
                        <i className="fas fa-user-circle"></i>
                      </div>
                      <div className="gp_review_info">
                        <h4 className="gp_reviewer_name">{r.name}</h4>
                        <span className="gp_reviewer_tag">{r.project}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className="gp_carousel_side_btn gp_carousel_side_next"
              onClick={() => reviewsSwiperRef.current?.slideNext()}
              aria-label="Next testimonial"
              title="Next"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. OFFICIAL COMPANY FAQS SECTION ── */}
      <section id="gp_faqs" className="gp_section gp_faqs_section">
        <div className="gp_container">
          <div className="gp_section_header">
            <span className="gp_section_badge">
              <i className="fas fa-question-circle"></i> FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="gp_section_title">
              FAQ'S — Transparent Answers to What Matters Most
            </h2>
            <p className="gp_section_desc">
              Get clear, honest information about our government approvals, bank financing, project locations, and visiting procedures.
            </p>
          </div>

          <div className="gp_faqs_wrapper">
            {officialFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`gp_faq_item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="gp_faq_question"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="gp_faq_q_text">{faq.q}</span>
                    <span className="gp_faq_icon">
                      <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="gp_faq_answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="gp_faq_cta_banner">
            <div className="gp_faq_cta_text">
              <h4>Have more specific questions about our projects?</h4>
              <p>Our senior real estate advisors are ready to walk you through layout plans, legal documents, and bank loan approvals.</p>
            </div>
            <button
              type="button"
              className="gp_btn_primary"
              onClick={() => {
                if (typeof onOpenSiteVisit === 'function') {
                  onOpenSiteVisit('FAQ Section - Consult Advisor');
                }
              }}
            >
              <span>Speak with an Advisor</span>
              <i className="fas fa-phone-alt"></i>
            </button>
          </div>
        </div>
      </section>

     

      {/* Dedicated Quick Enquiry Modal for Project Cards */}
      <QuickEnquiryModal
        isOpen={quickEnquiryModal.isOpen}
        onClose={handleCloseQuickEnquiry}
        project={quickEnquiryModal.project}
        sourceComment="Main Landing Page Project Card"
      />
    </div>
  );
}
