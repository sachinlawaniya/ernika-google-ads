import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gpHeroBg from '../assets/Sunlit Luxury Real Estate Showcase.png';
import ernikaHeroDesktop from '../assets/ernika_hero.jpg';
import ekaHeroDesktop from '../assets/EKA Landscape.jpg.jpeg';
import shyamHeroDesktop from '../assets/shyam_overview_desktop.png';

export default function MainLandingPage({ onOpenBrochure, onOpenSiteVisit }) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  // Contact form state
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    project: 'Ernika',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [contactError, setContactError] = useState('');

  // Promo quick form state
  const [promoData, setPromoData] = useState({
    name: '',
    phone: '',
    project: 'Ernika',
  });
  const [promoStatus, setPromoStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    document.title = 'Guru Punvaanii Properties | BDA & BMRDA Approved Plots & Villas in Bengaluru';
    window.scrollTo(0, 0);
  }, []);

  const featuredProjects = [
    {
      id: 'ernika',
      name: 'Ernika',
      slug: '/ernika/',
      badge: 'AMAZON THEMED VILLA PLOTS',
      approval: 'BMRDA & RERA APPROVED',
      location: 'Anekal, Netaji Road, South Bengaluru',
      category: 'anekal',
      image: ernikaHeroDesktop,
      price: '₹4,200 / sq.ft* Onwards',
      features: [
        '220 BMRDA Approved Plots Across 12.5 Acres',
        'Bengaluru’s 1st Amazon Forest-Themed Community',
        '26+ Curated Amenities & Grand Clubhouse',
        'Miyawaki Forest & Green Corridors',
      ],
      reraNo: 'PRM/KA/RERA/1251/308/PR/270125/007446',
    },
    {
      id: 'eka',
      name: 'EKA',
      slug: '/eka/',
      badge: 'FLAGSHIP 50-ACRE TOWNSHIP',
      approval: 'BMRDA & RERA APPROVED',
      location: 'Anekal, Hosur Road, South Bengaluru',
      category: 'anekal',
      image: ekaHeroDesktop,
      price: '₹4,225 / sq.ft* Onwards',
      features: [
        '657 BMRDA Approved Plots Across 50 Acres',
        'Lakeview Park & Green Auditorium',
        'Sensory Park, Raised Gazebos & Boulevard',
        '100% Ready Concrete Roads & Infrastructure',
      ],
      reraNo: 'RERA Approved Layout',
    },
    {
      id: 'eureka',
      name: 'Eureka',
      slug: '/eureka/',
      badge: 'BMRDA APPROVED PLOTS',
      approval: 'BMRDA & RERA REGISTERED',
      location: 'Dharapura, Bidadi (Near Mysuru Expressway)',
      category: 'bidadi',
      image: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/Entrance-Arch-scaled.jpg',
      price: '₹3,100 / sq.ft* Onwards',
      features: [
        '243 BMRDA Approved Plots Across 17.5 Acres',
        '12+ Themed Parks, Sports Zones & Gazebos',
        'Just Minutes from Bengaluru-Mysuru Expressway',
        'High ROI Growth Belt in Greater Bengaluru',
      ],
      reraNo: 'RERA Registered Project',
    },
    {
      id: 'shyam_residency',
      name: 'Shyam Residency',
      slug: '/shyam-residency/',
      badge: 'BDA APPROVED SITES',
      approval: 'BDA APPROVED',
      location: 'Off Andhrahalli, Magadi Road, Bengaluru',
      category: 'magadi',
      image: shyamHeroDesktop,
      price: '₹8,850 / sq.ft* Onwards',
      features: [
        '115 BDA Approved Plots Across 7.5 Acres',
        '30 to 50 Ft Wide Asphalted Concrete Roads',
        'Miyawaki Forest, Mini Amphitheatre & Pet Park',
        '5 Mins from Bengaluru-Tumkur Expressway',
      ],
      reraNo: 'PRM/KA/RERA/1251/309/PR/271023/006355',
    },
    {
      id: 'elegance',
      name: 'Elegance',
      slug: '/elegance/',
      badge: '4 BHK LUXURY VILLAS & PLOTS',
      approval: 'RERA & BMICAPA APPROVED',
      location: 'Bheemenahalli, Bidadi (Mysuru Road)',
      category: 'bidadi',
      image: 'https://gurupunvaanii.com/wp-content/uploads/elementor/thumbs/Elegance-villa-Elevation-Day-view-rrp67svjk3l1axj8xw8ej31pv7enpmk6wh4nlyt43k.webp',
      price: '₹7,000 / sq.ft* Onwards',
      features: [
        '101 Luxury 4 BHK Villas & Plots Across 6.25 Acres',
        '45% Lush Green Open Space',
        'Swimming Pool, Gymnasium & Clubhouse',
        'Seamless Connectivity via Mysuru Expressway',
      ],
      reraNo: 'RERA & BMICAPA Approved',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? featuredProjects
    : featuredProjects.filter((p) => p.category === activeFilter);

  const stats = [
    { number: '12+', label: 'Landmark Projects Delivered' },
    { number: '3,000+', label: 'Delighted Homeowners' },
    { number: '38+ Lakh', label: 'Sq.Ft. Developed Land' },
    { number: '100%', label: 'Clear Titles & Approvals' },
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
      name: 'Rajesh Kumar & Deepa',
      location: 'Bengaluru',
      project: 'Ernika Villa Plot Owner',
      rating: 5,
      comment:
        'Guru Punvaanii Ernika is a one-of-a-kind project in Anekal! The Amazon forest theme is beautifully integrated, and the team provided all legal documents proactively. Registration was completed seamlessly.',
    },
    {
      name: 'Senthil Murugan',
      location: 'Electronic City, Bengaluru',
      project: 'EKA Phase 2 Investor',
      rating: 5,
      comment:
        'I invested in Eka 2 years ago, and seeing the infrastructure come alive with wide concrete roads and green parks gave me immense confidence. Guru Punvaanii delivers exactly what they promise on time.',
    },
    {
      name: 'Ramesh & Sunitha Rao',
      location: 'Bengaluru',
      project: 'Shyam Residency Plot Owner',
      rating: 5,
      comment:
        'Finding a 100% BDA approved layout on Magadi Road with 40-ft roads and lush parks felt impossible until we visited Shyam Residency. The complimentary site visit cab service made our decision super easy!',
    },
    {
      name: 'Dr. Ananya Deshmukh',
      location: 'Bengaluru',
      project: 'Eureka Bidadi Buyer',
      rating: 5,
      comment:
        'The location near the Mysuru Expressway is fantastic. Eureka has great sports zones and open parks. The legal transparency and support from the sales team were top-notch.',
    },
  ];

  // Lead Submission Handler for Contact Form
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactData.name.trim()) {
      setContactError('Please enter your full name');
      return;
    }
    const cleanPhone = contactData.phone.replace(/\D/g, '').slice(-10);
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setContactError('Please enter a valid 10-digit mobile number');
      return;
    }
    setContactStatus('loading');
    setContactError('');

    try {
      // 1. Submit to StrategicERP API
      const erpUrl = `https://strategicerp.cloud/api/v1/lead_creation.php?Name=${encodeURIComponent(contactData.name.trim())}&Email=${encodeURIComponent(contactData.email.trim() || '')}&MobileNo=${encodeURIComponent(cleanPhone)}&Comments=${encodeURIComponent(contactData.message || 'Main Page Contact Form')}&ProjectName=${encodeURIComponent(contactData.project)}&Source=GoogleAds_MainLandingPage`;
      fetch(erpUrl, { mode: 'no-cors' }).catch(() => { });

      // 2. Fire StrategicERP Image Pixel
      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const nowStr = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
      const pixelUrl = `https://24.strategicerpcloud.com/strategicerp/SaveFormField.do?actn=SaveData&id=873&globalvar=0&cloudcode=gurupunvaanii&idselected=0&idhidden=0&mobileform=yes&editids=15715/15800/31227/15730/state//31228/31229/31230/33937/15713/30754/34785/15716/37710/37710/&field15715=${encodeURIComponent(cleanPhone)}&field15713=${encodeURIComponent(contactData.name.trim())}&field33937=${encodeURIComponent(contactData.email.trim())}&field15730=${encodeURIComponent(contactData.project)}&field15800=${encodeURIComponent(nowStr)}&field31227=${encodeURIComponent(nowStr)}&field31228=${encodeURIComponent('Digital Marketing')}&field31229=${encodeURIComponent('Google Ads')}&field31230=${encodeURIComponent('/ Main Landing /')}&field37710=${encodeURIComponent('+91')}&field15716=${encodeURIComponent('Main Page Contact Form')}&field34785=`;
      const erpImg = new Image();
      erpImg.src = pixelUrl;

      // 3. Google Ads conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        });
      }

      setContactStatus('success');
    } catch (err) {
      setContactStatus('success');
    }
  };

  // Lead Submission Handler for Promo Card
  const handlePromoSubmit = async (e) => {
    e.preventDefault();
    if (!promoData.name.trim()) {
      setPromoError('Please enter your full name');
      return;
    }
    const cleanPhone = promoData.phone.replace(/\D/g, '').slice(-10);
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setPromoError('Please enter a valid 10-digit mobile number');
      return;
    }
    setPromoStatus('loading');
    setPromoError('');

    try {
      const erpUrl = `https://strategicerp.cloud/api/v1/lead_creation.php?Name=${encodeURIComponent(promoData.name.trim())}&Email=&MobileNo=${encodeURIComponent(cleanPhone)}&Comments=${encodeURIComponent('Promo Card Free VIP Site Visit Booking')}&ProjectName=${encodeURIComponent(promoData.project)}&Source=GoogleAds_PromoBanner`;
      fetch(erpUrl, { mode: 'no-cors' }).catch(() => { });

      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const nowStr = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
      const pixelUrl = `https://24.strategicerpcloud.com/strategicerp/SaveFormField.do?actn=SaveData&id=873&globalvar=0&cloudcode=gurupunvaanii&idselected=0&idhidden=0&mobileform=yes&editids=15715/15800/31227/15730/state//31228/31229/31230/33937/15713/30754/34785/15716/37710/37710/&field15715=${encodeURIComponent(cleanPhone)}&field15713=${encodeURIComponent(promoData.name.trim())}&field33937=&field15730=${encodeURIComponent(promoData.project)}&field15800=${encodeURIComponent(nowStr)}&field31227=${encodeURIComponent(nowStr)}&field31228=${encodeURIComponent('Digital Marketing')}&field31229=${encodeURIComponent('Google Ads')}&field31230=${encodeURIComponent('/ Promo Card /')}&field37710=${encodeURIComponent('+91')}&field15716=${encodeURIComponent('Promo Card VIP Site Visit')}&field34785=`;
      const erpImg = new Image();
      erpImg.src = pixelUrl;

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        });
      }

      setPromoStatus('success');
    } catch (err) {
      setPromoStatus('success');
    }
  };

  return (
    <div className="gp_main_landing">
      {/* ── 1. HERO SECTION (CLEAN SPLIT & PANORAMIC SHOWCASE) ── */}
      <section id="gp_hero" className="gp_hero_section_v2">
        <div className="gp_container">
          {/* Top Split Layout: Content + Instant Lead Form */}
          <div className="gp_hero_split_layout">
            {/* Left Content Column */}
            <div className="gp_hero_left_col">
              <div className="gp_hero_badge_pill">
                <span className="gp_live_pulse"></span>
                <span className="gp_gold_sparkle">★</span>
                <span>BENGALURU’S TRUSTED PLOTTED DEVELOPER</span>
                <span className="gp_gold_sparkle">★</span>
              </div>

              <h1 className="gp_hero_main_title">
                Build Your Dream Villa in Bengaluru’s Prime Locations <br />
                <span className="gp_highlight_text">100% BDA &amp; BMRDA Approved</span> Plots
              </h1>

              <p className="gp_hero_sub_text">
                Explore handpicked plotted developments in <strong>Anekal, Bidadi, Magadi Road &amp; Mysuru Road</strong> by Guru Punvaanii Properties. 100% legal clarity, ready concrete roads &amp; immediate registration.
              </p>

              {/* Quick USP Highlights */}
              <div className="gp_hero_usp_pills">
                <div className="gp_usp_pill">
                  <i className="fas fa-shield-alt"></i>
                  <span>BDA &amp; BMRDA Approved</span>
                </div>
                <div className="gp_usp_pill">
                  <i className="fas fa-file-contract"></i>
                  <span>100% Clear Titles</span>
                </div>
                <div className="gp_usp_pill">
                  <i className="fas fa-university"></i>
                  <span>SBI &amp; HDFC Approved</span>
                </div>
                <div className="gp_usp_pill">
                  <i className="fas fa-road"></i>
                  <span>Ready Concrete Roads</span>
                </div>
              </div>

              <div className="gp_hero_cta_row">
                <a
                  href="#gp_projects"
                  className="gp_btn_primary gp_btn_glow"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('gp_projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <i className="fas fa-th-large"></i>
                  <span>Explore 5 Projects &amp; Pricing</span>
                </a>

                <button
                  type="button"
                  className="gp_btn_secondary gp_btn_vip"
                  onClick={() => {
                    if (typeof onOpenSiteVisit === 'function') {
                      onOpenSiteVisit('Main Hero - Book Free VIP Site Visit');
                    }
                  }}
                >
                  <i className="fas fa-car-side"></i>
                  <span>Book Free Site Visit</span>
                </button>
              </div>
            </div>

            {/* Right Column: Instant High-Converting Lead Capture Card */}
            <div className="gp_hero_right_col">
              <div className="gp_hero_quick_form_card">
                <div className="gp_form_card_header">
                  <span className="gp_form_badge">
                    <i className="fas fa-bolt"></i> FAST CALLBACK
                  </span>
                  <h3 className="gp_form_card_title">Get Instant Price Sheet &amp; Brochure</h3>
                  <p className="gp_form_card_sub">Receive layout plans, phase-wise pricing &amp; site visit assistance.</p>
                </div>

                {contactStatus === 'success' ? (
                  <div className="gp_hero_form_success">
                    <i className="fas fa-check-circle"></i>
                    <h4>Enquiry Received!</h4>
                    <p>Our senior property advisor will connect with you shortly with the layout details.</p>
                    <button
                      type="button"
                      className="gp_btn_primary"
                      onClick={() => {
                        setContactData({ name: '', phone: '', email: '', project: 'Ernika', message: '' });
                        setContactStatus('idle');
                      }}
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="gp_hero_mini_form">
                    {contactError && (
                      <div className="gp_promo_error_box">
                        <i className="fas fa-exclamation-circle"></i> {contactError}
                      </div>
                    )}
                    <div className="gp_mini_field">
                      <label htmlFor="gp_h_name">Your Name *</label>
                      <div className="gp_mini_input">
                        <i className="fas fa-user"></i>
                        <input
                          id="gp_h_name"
                          type="text"
                          placeholder="Full Name"
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="gp_mini_field">
                      <label htmlFor="gp_h_phone">Mobile Number *</label>
                      <div className="gp_mini_input">
                        <i className="fas fa-phone-alt"></i>
                        <input
                          id="gp_h_phone"
                          type="tel"
                          maxLength="10"
                          placeholder="10-digit Mobile No."
                          value={contactData.phone}
                          onChange={(e) =>
                            setContactData({ ...contactData, phone: e.target.value.replace(/\D/g, '') })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="gp_mini_field">
                      <label htmlFor="gp_h_project">Select Project of Interest *</label>
                      <div className="gp_mini_input">
                        <i className="fas fa-map-marker-alt"></i>
                        <select
                          id="gp_h_project"
                          value={contactData.project}
                          onChange={(e) => setContactData({ ...contactData, project: e.target.value })}
                        >
                          <option value="Ernika">Guru Punvaanii Ernika (Anekal - Amazon Theme)</option>
                          <option value="EKA">Guru Punvaanii EKA (Anekal - 50 Acres)</option>
                          <option value="Shyam Residency">Guru Punvaanii Shyam Residency (Magadi Road - BDA)</option>
                          <option value="Eureka">Guru Punvaanii Eureka (Bidadi - Mysuru Road)</option>
                          <option value="Elegance">Guru Punvaanii Elegance (Bidadi - 4 BHK Villas)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="gp_btn_primary gp_hero_form_btn"
                      disabled={contactStatus === 'loading'}
                    >
                      {contactStatus === 'loading' ? (
                        <span><i className="fas fa-spinner fa-spin"></i> Submitting...</span>
                      ) : (
                        <>
                          <span>Download Brochure &amp; Price List</span>
                          <i className="fas fa-arrow-right"></i>
                        </>
                      )}
                    </button>
                    <span className="gp_form_lock_note">
                      <i className="fas fa-lock"></i> 100% Confidential. Instant response on WhatsApp.
                    </span>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Panoramic Multi-Project Visual Showcase Frame */}
          <div className="gp_hero_panoramic_showcase">
            <div className="gp_showcase_header">
              <div className="gp_showcase_title_group">
                <span className="gp_showcase_badge">OUR 5 SIGNATURE COMMUNITIES</span>
                <h3 className="gp_showcase_title">Explore Bengaluru’s Top Plotted Developments</h3>
              </div>
              <div className="gp_showcase_chips">
                <button type="button" className="gp_showcase_chip" onClick={() => navigate('/ernika/')}>
                  <i className="fas fa-tree"></i> Ernika
                </button>
                <button type="button" className="gp_showcase_chip" onClick={() => navigate('/eka/')}>
                  <i className="fas fa-city"></i> EKA (50 Acres)
                </button>
                <button type="button" className="gp_showcase_chip" onClick={() => navigate('/shyam-residency/')}>
                  <i className="fas fa-landmark"></i> Shyam Residency (BDA)
                </button>
                <button type="button" className="gp_showcase_chip" onClick={() => navigate('/eureka/')}>
                  <i className="fas fa-compass"></i> Eureka (Bidadi)
                </button>
                <button type="button" className="gp_showcase_chip" onClick={() => navigate('/elegance/')}>
                  <i className="fas fa-crown"></i> Elegance
                </button>
              </div>
            </div>

            <div className="gp_panoramic_frame">
              <img
                src={gpHeroBg}
                alt="Guru Punvaanii Projects Showcase - Ernika, EKA, Shyam Residency, Eureka, Elegance"
                className="gp_panoramic_img"
              />
            </div>
          </div>

          {/* Full-Width Stats Strip */}
          <div className="gp_hero_stats_strip">
            {stats.map((s, idx) => (
              <div key={idx} className="gp_hero_stat_box">
                <h3 className="gp_stat_num">{s.number}</h3>
                <p className="gp_stat_label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED PROJECTS SECTION ── */}
      <section id="gp_projects" className="gp_section gp_projects_section">
        <div className="gp_container">
          <div className="gp_section_header">
            <span className="gp_section_badge">
              <i className="fas fa-layer-group"></i> OUR SIGNATURE DEVELOPMENTS
            </span>
            <h2 className="gp_section_title">
              Featured Villa Plots &amp; Plotted Communities
            </h2>
            <p className="gp_section_desc">
              Explore our master-planned communities across Bengaluru’s top investment hotspots. Click on any project to view full floor plans, pricing &amp; layout details.
            </p>

            {/* Category Filter Pills */}
            <div className="gp_project_filters">
              <button
                className={`gp_filter_btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Projects ({featuredProjects.length})
              </button>
              <button
                className={`gp_filter_btn ${activeFilter === 'anekal' ? 'active' : ''}`}
                onClick={() => setActiveFilter('anekal')}
              >
                Anekal Corridors (Eka &amp; Ernika)
              </button>
              <button
                className={`gp_filter_btn ${activeFilter === 'bidadi' ? 'active' : ''}`}
                onClick={() => setActiveFilter('bidadi')}
              >
                Bidadi / Mysuru Rd (Eureka &amp; Elegance)
              </button>
              <button
                className={`gp_filter_btn ${activeFilter === 'magadi' ? 'active' : ''}`}
                onClick={() => setActiveFilter('magadi')}
              >
                Magadi Road (BDA Approved)
              </button>
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="gp_projects_grid">
            {filteredProjects.map((p) => (
              <div key={p.id} className="gp_project_card">
                <div className="gp_project_media">
                  <img src={p.image} alt={p.name} loading="lazy" />

                </div>

                <div className="gp_project_body">
                  <div className="gp_project_head">
                    <h3 className="gp_project_name">{p.name}</h3>
                    <div className="gp_project_location">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{p.location}</span>
                    </div>
                  </div>

                  <div className="gp_project_price_strip">
                    <span className="gp_price_label">Price:</span>
                    <span className="gp_price_val">{p.price}</span>
                  </div>

                  <ul className="gp_project_highlights">
                    {p.features.map((feat, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="gp_project_actions">
                    <button
                      type="button"
                      className="gp_btn_project_view"
                      onClick={() => navigate(p.slug)}
                    >
                      <span>Explore {p.name.replace('Guru Punvaanii ', '')}</span>
                      <i className="fas fa-arrow-right"></i>
                    </button>

                    <button
                      type="button"
                      className="gp_btn_project_enquire"
                      onClick={() => {
                        if (typeof onOpenBrochure === 'function') {
                          onOpenBrochure(`Main Page Project Card - ${p.name}`, p.id);
                        } else if (typeof onOpenSiteVisit === 'function') {
                          onOpenSiteVisit(`Main Page Project Card - ${p.name}`, p.id);
                        }
                      }}
                    >
                      <i className="fas fa-file-download"></i>
                      <span>Get Brochure</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── 6. PROJECT PROMO CARD / QUICK LEAD GENERATOR BANNER ── */}
      <section id="gp_promo" className="gp_section gp_promo_section">
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
                  <div className="gp_promo_success">
                    <i className="fas fa-check-circle"></i>
                    <h3>VIP Site Visit Booked!</h3>
                    <p>Our dedicated relationship manager will call you shortly to confirm your preferred date and pickup location.</p>
                    <button
                      type="button"
                      className="gp_btn_primary"
                      onClick={() => setPromoStatus('idle')}
                    >
                      Book Another Site Visit
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePromoSubmit} className="gp_promo_form">
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
                        <span><i className="fas fa-spinner fa-spin"></i> Booking...</span>
                      ) : (
                        <>
                          <span>Book Free VIP Site Visit</span>
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
      </section>
      {/* ── 3. ABOUT COMPANY SECTION ── */}
      <section id="gp_about" className="gp_section gp_about_company_section">
        <div className="gp_container">
          <div className="gp_about_split_grid">
            {/* Left Content */}
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

            {/* Right Visual Card */}
            <div className="gp_about_visual_col">
              <div className="gp_about_image_frame">
                <img
                  src={ernikaHeroDesktop}
                  alt="Guru Punvaanii Plotted Communities"
                  className="gp_about_main_img"
                />
                {/* <div className="gp_experience_badge">
                  <span className="gp_exp_num">10+</span>
                  <span className="gp_exp_txt">Years of Excellence &amp; Delivery</span>
                </div> */}
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
      </section>

      {/* ── 4. WHY CHOOSE US SECTION ── */}
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

          <div className="gp_why_grid">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="gp_why_card">
                <div className="gp_why_icon_wrap">
                  <i className={item.icon}></i>
                </div>
                <h3 className="gp_why_card_title">{item.title}</h3>
                <p className="gp_why_card_desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. REVIEWS / TESTIMONIALS SECTION ── */}
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

          <div className="gp_reviews_grid">
            {reviews.map((r, idx) => (
              <div key={idx} className="gp_review_card">
                <div className="gp_review_stars">
                  {[...Array(r.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
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
            ))}
          </div>
        </div>
      </section>



      {/* ── 7. CONTACT US SECTION ── */}
      <section id="gp_contact" className="gp_section gp_contact_section">
        <div className="gp_container">
          <div className="gp_section_header">
            <span className="gp_section_badge">
              <i className="fas fa-envelope"></i> REACH OUT TO US
            </span>
            <h2 className="gp_section_title">
              Contact Guru Punvaanii Properties
            </h2>
            <p className="gp_section_desc">
              Have questions about approvals, plot dimensions, or site visit scheduling? Our dedicated property consultants are here to help.
            </p>
          </div>

          <div className="gp_contact_split_grid">
            {/* Contact Details Column */}
            <div className="gp_contact_info_col">
              <div className="gp_contact_card">
                <div className="gp_contact_item">
                  <div className="gp_contact_icon">
                    <i className="fas fa-building"></i>
                  </div>
                  <div>
                    <h4>Head Office Location</h4>
                    <p>9th Avenue, #14, 3rd Cross, 1st Floor, N S Iyengar Road, Kumara Park West, Seshadripuram, Bengaluru, Karnataka 560020</p>
                  </div>
                </div>

                <div className="gp_contact_item">
                  <div className="gp_contact_icon">
                    <i className="fas fa-map-marked-alt"></i>
                  </div>
                  <div>
                    <h4>Branch Office Location</h4>
                    <p>2nd floor, Guru Punvaanii Pvt Ltd, No 2, Kaushal Emerald, Opposite Gandhi Bhavan, Kumara Park West, Bengaluru, Karnataka 560001</p>
                  </div>
                </div>

                <div className="gp_contact_item">
                  <div className="gp_contact_icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4>Direct Phone Inquiries</h4>
                    <p>
                      <a href="tel:9008347898">+91 90083 47898</a> &nbsp;|&nbsp; <a href="tel:7676000909">+91 76760 00909</a>
                    </p>
                  </div>
                </div>

                <div className="gp_contact_item">
                  <div className="gp_contact_icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4>Working Hours</h4>
                    <p>Monday – Saturday : 10:00 AM – 06:00 PM<br />(Site Visits Open All 7 Days by Appointment)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="gp_contact_form_col">
              <div className="gp_contact_form_card">
                <h3 className="gp_contact_form_heading">Send Us an Enquiry</h3>
                <p className="gp_contact_form_sub">Fill in your details and we will get back to you within 15 minutes.</p>

                {contactError && (
                  <div className="gp_promo_error_box">
                    <i className="fas fa-exclamation-circle"></i> {contactError}
                  </div>
                )}

                {contactStatus === 'success' ? (
                  <div className="gp_promo_success">
                    <i className="fas fa-check-circle"></i>
                    <h3>Enquiry Submitted Successfully!</h3>
                    <p>Thank you for reaching out. Our property specialist will connect with you shortly.</p>
                    <button
                      type="button"
                      className="gp_btn_primary"
                      onClick={() => {
                        setContactData({ name: '', phone: '', email: '', project: 'Ernika', message: '' });
                        setContactStatus('idle');
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="gp_contact_form">
                    <div className="gp_form_group">
                      <label htmlFor="gp_c_name">Full Name *</label>
                      <div className="gp_input_with_icon">
                        <i className="fas fa-user"></i>
                        <input
                          id="gp_c_name"
                          type="text"
                          placeholder="Your Full Name"
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="gp_form_group">
                      <label htmlFor="gp_c_phone">Mobile Number *</label>
                      <div className="gp_input_with_icon">
                        <i className="fas fa-phone-alt"></i>
                        <input
                          id="gp_c_phone"
                          type="tel"
                          maxLength="10"
                          placeholder="10-digit Mobile No."
                          value={contactData.phone}
                          onChange={(e) =>
                            setContactData({ ...contactData, phone: e.target.value.replace(/\D/g, '') })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="gp_form_group">
                      <label htmlFor="gp_c_email">Email Address (Optional)</label>
                      <div className="gp_input_with_icon">
                        <i className="fas fa-envelope"></i>
                        <input
                          id="gp_c_email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="gp_form_group">
                      <label htmlFor="gp_c_project">Select Project of Interest *</label>
                      <div className="gp_input_with_icon">
                        <i className="fas fa-map-pin"></i>
                        <select
                          id="gp_c_project"
                          value={contactData.project}
                          onChange={(e) => setContactData({ ...contactData, project: e.target.value })}
                        >
                          <option value="Ernika">Guru Punvaanii Ernika (Anekal - Amazon Theme)</option>
                          <option value="EKA">Guru Punvaanii EKA (Anekal - Hosur Road)</option>
                          <option value="Eureka">Guru Punvaanii Eureka (Bidadi - Mysuru Road)</option>
                          <option value="Shyam Residency">Guru Punvaanii Shyam Residency (Magadi Road - BDA)</option>
                          <option value="Elegance">Guru Punvaanii Elegance (Bidadi - 4 BHK Villas)</option>
                        </select>
                      </div>
                    </div>

                    <div className="gp_form_group">
                      <label htmlFor="gp_c_message">Message / Questions</label>
                      <div className="gp_input_with_icon gp_input_textarea">
                        <i className="fas fa-comment-dots"></i>
                        <textarea
                          id="gp_c_message"
                          rows="3"
                          placeholder="E.g., Looking for 30x40 plot, preferred visit date, pricing details..."
                          value={contactData.message}
                          onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="gp_btn_primary gp_submit_btn_block"
                      disabled={contactStatus === 'loading'}
                    >
                      {contactStatus === 'loading' ? (
                        <span><i className="fas fa-spinner fa-spin"></i> Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Property Enquiry</span>
                          <i className="fas fa-paper-plane"></i>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
