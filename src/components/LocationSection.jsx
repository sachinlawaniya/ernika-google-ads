import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useProjectContext } from '../utils/useProjectContext.js';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function LocationSection() {
  const { isElegance, project } = useProjectContext();
  const [activeTab, setActiveTab] = useState('map');
  const [animateBars, setAnimateBars] = useState(false);
  const containerRef = useRef(null);

  const allCategories = {
    elegance: [
      {
        category: 'Educational Institutions',
        icon: 'fa-graduation-cap',
        items: [
          { name: 'Christ University Kengeri Campus', time: '15 Mins', minutes: 15, itemIcon: 'fa-school' },
          { name: 'Rajarajeswari Engineering College', time: '12 Mins', minutes: 12, itemIcon: 'fa-school' },
          { name: 'Don Bosco Institute of Technology', time: '10 Mins', minutes: 10, itemIcon: 'fa-school' },
          { name: 'St. John\'s School Bidadi', time: '5 Mins', minutes: 5, itemIcon: 'fa-school' },
        ]
      },
      {
        category: 'Healthcare & Hospitals',
        icon: 'fa-hospital-user',
        items: [
          { name: 'Rajarajeswari Medical College & Hospital', time: '15 Mins', minutes: 15, itemIcon: 'fa-user-md' },
          { name: 'Subbaiah Hospital Bidadi', time: '5 Mins', minutes: 5, itemIcon: 'fa-user-md' },
          { name: 'BGS GIMS Hospital', time: '18 Mins', minutes: 18, itemIcon: 'fa-user-md' },
        ]
      },
      {
        category: 'Tech & Industrial Hubs',
        icon: 'fa-laptop-house',
        items: [
          { name: 'Toyota Kirloskar Motor Plant', time: '5 Mins', minutes: 5, itemIcon: 'fa-building' },
          { name: 'Bidadi Industrial Area (KIADB)', time: '5 Mins', minutes: 5, itemIcon: 'fa-building' },
          { name: 'Bosch Bidadi Plant', time: '8 Mins', minutes: 8, itemIcon: 'fa-building' },
          { name: 'Global Tech Park Kengeri', time: '20 Mins', minutes: 20, itemIcon: 'fa-building' },
        ]
      },
      {
        category: 'Shopping & Lifestyle',
        icon: 'fa-shopping-bag',
        items: [
          { name: 'Decathlon Mysore Road', time: '15 Mins', minutes: 15, itemIcon: 'fa-shopping-cart' },
          { name: 'Gopalan Arcade Mall', time: '22 Mins', minutes: 22, itemIcon: 'fa-shopping-cart' },
          { name: 'Wonderla Amusement Park', time: '10 Mins', minutes: 10, itemIcon: 'fa-shopping-cart' },
        ]
      }
    ],
    ernika: [
      {
        category: 'Educational Institutions',
        icon: 'fa-graduation-cap',
        items: [
          { name: 'Alliance University', time: '10 Min', minutes: 10, itemIcon: 'fa-school' },
          { name: 'Vishwa Chetana Degree College', time: '1 Min', minutes: 1, itemIcon: 'fa-school' },
          { name: 'Saraswathi Vidya Mandira', time: '5 Mins', minutes: 5, itemIcon: 'fa-school' },
          { name: 'National Public School', time: '5 Mins', minutes: 5, itemIcon: 'fa-school' },
          { name: 'Akshara College', time: '5 Mins', minutes: 5, itemIcon: 'fa-school' },
          { name: 'New Baldwin International School', time: '5 Mins', minutes: 5, itemIcon: 'fa-school' },
        ]
      },
      {
        category: 'Healthcare & Hospitals',
        icon: 'fa-hospital-user',
        items: [
          { name: 'Narayana Hrudayalaya', time: '20 Mins', minutes: 20, itemIcon: 'fa-user-md' },
          { name: 'Ganga Multi Specialty Hospital', time: '5 Mins', minutes: 5, itemIcon: 'fa-user-md' },
          { name: 'Aditi Hospital', time: '10 Mins', minutes: 10, itemIcon: 'fa-user-md' },
          { name: 'Vijaya Nursing Home', time: '5 Mins', minutes: 5, itemIcon: 'fa-user-md' },
        ]
      },
      {
        category: 'Tech & Industrial Hubs',
        icon: 'fa-laptop-house',
        items: [
          { name: 'Velankani Tech Park', time: '25 Mins', minutes: 25, itemIcon: 'fa-building' },
          { name: 'Electronic City Industrial Township', time: '25 Mins', minutes: 25, itemIcon: 'fa-building' },
          { name: 'HCL Campus', time: '20 Mins', minutes: 20, itemIcon: 'fa-building' },
          { name: 'Jigani-Bommasandra Industrial', time: '15 Mins', minutes: 15, itemIcon: 'fa-building' },
          { name: 'Hosur Industrial Area SIPCOT', time: '20 Mins', minutes: 20, itemIcon: 'fa-building' },
        ]
      },
      {
        category: 'Shopping & Lifestyle',
        icon: 'fa-shopping-bag',
        items: [
          { name: 'M5 Mall', time: '25 Mins', minutes: 25, itemIcon: 'fa-shopping-cart' },
          { name: 'TRENDS', time: '5 Mins', minutes: 5, itemIcon: 'fa-shopping-cart' },
          { name: 'Reliance Smart Store', time: '5 Mins', minutes: 5, itemIcon: 'fa-shopping-cart' },
        ]
      }
    ],
    eka: [
      {
        category: 'Schools',
        icon: 'fa-school',
        items: [
          { name: 'New Baldwin International Residential School', time: '2 Mins', minutes: 2, itemIcon: 'fa-school' },
          { name: 'St. Joseph\'s School', time: '5 Mins', minutes: 5, itemIcon: 'fa-school' },
          { name: 'Swami Vivekananda School', time: '10 Mins', minutes: 10, itemIcon: 'fa-school' },
          { name: 'Oxford English School Anekal', time: '15 Mins', minutes: 15, itemIcon: 'fa-school' },
          { name: 'Lorven Public School', time: '15 Mins', minutes: 15, itemIcon: 'fa-school' },
          { name: 'Green Dot International School', time: '15 Mins', minutes: 15, itemIcon: 'fa-school' },
        ]
      },
      {
        category: 'Colleges',
        icon: 'fa-graduation-cap',
        items: [
          { name: 'Sri Sairam College of Engineering', time: '5 Mins', minutes: 5, itemIcon: 'fa-university' },
          { name: 'Government First Grade College Anekal', time: '10 Mins', minutes: 10, itemIcon: 'fa-university' },
          { name: 'Alliance University', time: '10 Mins', minutes: 10, itemIcon: 'fa-university' },
          { name: 'Oxford College of Engineering', time: '30 Mins', minutes: 30, itemIcon: 'fa-university' },
          { name: 'AMC Engineering College', time: '30 Mins', minutes: 30, itemIcon: 'fa-university' },
          { name: 'Dayananda Sagar University', time: '40 Mins', minutes: 40, itemIcon: 'fa-university' },
        ]
      },
      {
        category: 'Healthcare & Hospitals',
        icon: 'fa-hospital-user',
        items: [
          { name: 'Anekal Government Hospital', time: '5 Mins', minutes: 5, itemIcon: 'fa-user-md' },
          { name: 'Athreya Hospital', time: '15 Mins', minutes: 15, itemIcon: 'fa-user-md' },
          { name: 'Narayana Health City', time: '20 Mins', minutes: 20, itemIcon: 'fa-user-md' },
          { name: 'Mazumdar Shaw Medical Center', time: '20 Mins', minutes: 20, itemIcon: 'fa-user-md' },
        ]
      },
      {
        category: 'Nearby Landmarks',
        icon: 'fa-map-marker-alt',
        items: [
          { name: 'Anekal Town Center', time: '5 Mins', minutes: 5, itemIcon: 'fa-building' },
          { name: 'Anekal Bus Stand', time: '5 Mins', minutes: 5, itemIcon: 'fa-bus' },
          { name: 'Anekal Taluk Office', time: '5 Mins', minutes: 5, itemIcon: 'fa-building' },
          { name: 'Anekal Post Office', time: '5 Mins', minutes: 5, itemIcon: 'fa-envelope' },
          { name: 'Anekal Town Municipal Council', time: '8 Mins', minutes: 8, itemIcon: 'fa-building' },
          { name: 'Anekal Road Railway Station', time: '10 Mins', minutes: 10, itemIcon: 'fa-train' },
        ]
      },
      {
        category: 'Tourist Spot',
        icon: 'fa-camera-retro',
        items: [
          { name: 'Muthyala Maduvu', time: '15 Mins', minutes: 15, itemIcon: 'fa-tree' },
          { name: 'Pearl Valley Forest Area', time: '15 Mins', minutes: 15, itemIcon: 'fa-tree' },
          { name: 'Anekal Hill View Point', time: '15 Mins', minutes: 15, itemIcon: 'fa-mountain' },
          { name: 'Thattekere Lake', time: '30 Mins', minutes: 30, itemIcon: 'fa-water' },
        ]
      },
      {
        category: 'Shopping & Daily Needs',
        icon: 'fa-shopping-bag',
        items: [
          { name: 'Anekal Main Market', time: '5 Mins', minutes: 5, itemIcon: 'fa-shopping-cart' },
          { name: 'More Supermarket Anekal', time: '8 Mins', minutes: 8, itemIcon: 'fa-shopping-cart' },
          { name: 'Anekal Shopping Complex', time: '10 Mins', minutes: 10, itemIcon: 'fa-shopping-cart' },
          { name: 'Local Vegetable & Farmers Market', time: '10 Mins', minutes: 10, itemIcon: 'fa-carrot' },
          { name: 'Reliance Smart Point', time: '12 Mins', minutes: 12, itemIcon: 'fa-shopping-cart' },
        ]
      }
    ],
    shyam_residency: [
      {
        category: 'Educational Institutions',
        icon: 'fa-school',
        items: [
          { name: 'Sidhartha International School', time: '5 Mins', minutes: 5, itemIcon: 'fa-school' },
          { name: 'Jindal Public School', time: '10 Mins', minutes: 10, itemIcon: 'fa-school' },
          { name: 'Chaitanya Techno School', time: '10 Mins', minutes: 10, itemIcon: 'fa-school' },
          { name: 'Arvind International School', time: '15 Mins', minutes: 15, itemIcon: 'fa-school' },
          { name: 'Delhi Public School', time: '20 Mins', minutes: 20, itemIcon: 'fa-school' },
          { name: 'Kendriya Vidyalaya', time: '20 Mins', minutes: 20, itemIcon: 'fa-school' },
        ]
      },
      {
        category: 'Colleges & Institutions',
        icon: 'fa-graduation-cap',
        items: [
          { name: 'Christ University', time: '10 Mins', minutes: 10, itemIcon: 'fa-university' },
          { name: 'National Institute of Design (NID)', time: '10 Mins', minutes: 10, itemIcon: 'fa-university' },
          { name: 'ABBS Autonomous College', time: '15 Mins', minutes: 15, itemIcon: 'fa-university' },
          { name: 'Acharya Institute', time: '20 Mins', minutes: 20, itemIcon: 'fa-university' },
          { name: 'Indian Institute of Science (IISC)', time: '20 Mins', minutes: 20, itemIcon: 'fa-university' },
          { name: 'City College Jayanagar', time: '30 Mins', minutes: 30, itemIcon: 'fa-university' },
        ]
      },
      {
        category: 'Healthcare & Hospitals',
        icon: 'fa-hospital-user',
        items: [
          { name: 'Jindal Nature Cure Institute', time: '5 Mins', minutes: 5, itemIcon: 'fa-user-md' },
          { name: 'Atharv Hospital', time: '5 Mins', minutes: 5, itemIcon: 'fa-user-md' },
          { name: 'People Tree Hospital', time: '10 Mins', minutes: 10, itemIcon: 'fa-user-md' },
          { name: 'Sparsh Hospital', time: '10 Mins', minutes: 10, itemIcon: 'fa-user-md' },
          { name: 'Columbia Asia Hospital', time: '20 Mins', minutes: 20, itemIcon: 'fa-user-md' },
          { name: 'Ramiah Hospital', time: '20 Mins', minutes: 20, itemIcon: 'fa-user-md' },
        ]
      },
      {
        category: 'Nearby Landmarks',
        icon: 'fa-map-marker-alt',
        items: [
          { name: 'Bangalore International Exhibition Centre', time: '10 Mins', minutes: 10, itemIcon: 'fa-building' },
          { name: 'Radha Swamy Satsang Centre', time: '10 Mins', minutes: 10, itemIcon: 'fa-om' },
          { name: 'Hotel Taj Vivanta', time: '20 Mins', minutes: 20, itemIcon: 'fa-hotel' },
          { name: 'Golden Palm Resort', time: '20 Mins', minutes: 20, itemIcon: 'fa-hotel' },
          { name: 'Country Clue Coconut Grove', time: '25 Mins', minutes: 25, itemIcon: 'fa-tree' },
        ]
      },
      {
        category: 'Shopping & Daily Needs',
        icon: 'fa-shopping-bag',
        items: [
          { name: 'IKEA C1', time: '10 Mins', minutes: 10, itemIcon: 'fa-shopping-cart' },
          { name: 'Orion Mall', time: '20 Mins', minutes: 20, itemIcon: 'fa-shopping-cart' },
          { name: 'Vaishnavi Mall', time: '20 Mins', minutes: 20, itemIcon: 'fa-shopping-cart' },
          { name: 'Metro Cash and Carry', time: '20 Mins', minutes: 20, itemIcon: 'fa-shopping-cart' },
          { name: 'Dmart', time: '20 Mins', minutes: 20, itemIcon: 'fa-shopping-cart' },
        ]
      }
    ]
  };

  const rawCategories = allCategories[project.id] || allCategories.ernika;

  const locationContent = {
    elegance: {
      p1: 'While exploring villas and Plots for sale in Bidadi, Bengaluru, you must consider the immense strategic value of the Bengaluru-Mysuru Expressway growth corridor. Bidadi offers quiet suburban serenity combined with rapid urban connectivity.',
      p2: 'With major industrial powerhouses like Toyota, Bosch, and KIADB Industrial hub nearby, plus Challaghatta metro station and Mysuru expressway, Bidadi is fast becoming the premier residential destination.',
      f1_title: 'Strategic Highway Link',
      f1_desc: 'Direct access via 10-Lane Mysuru Expressway',
      f2_title: 'Industrial & Tech Hub',
      f2_desc: 'Near Toyota Kirloskar, Bosch & KIADB',
      f3_title: 'Metro & Express Trains',
      f3_desc: 'Minutes from Challaghatta Metro & Bidadi Railway Station',
    },
    eureka: {
      p1: 'While exploring plots for sale in Bidadi, Bengaluru, you must consider the immense strategic value of the Bengaluru-Mysuru Expressway growth corridor. Bidadi offers quiet suburban serenity combined with rapid urban connectivity.',
      p2: 'With major industrial powerhouses like Toyota, Bosch, and KIADB Industrial hub nearby, plus Challaghatta metro station and Mysuru expressway, Bidadi is fast becoming the premier residential destination.',
      f1_title: 'Strategic Highway Link',
      f1_desc: 'Direct access via 10-Lane Mysuru Expressway',
      f2_title: 'Industrial & Tech Hub',
      f2_desc: 'Near Toyota Kirloskar, Bosch & KIADB',
      f3_title: 'Metro & Express Trains',
      f3_desc: 'Minutes from Challaghatta Metro & Bidadi Railway Station',
    },
    shyam_residency: {
      p1: 'While exploring plots for sale in Magadi Road, Bengaluru, you must consider the value of the location. Magadi Road sits quietly between affordability, accessibility, and infrastructure growth.',
      p2: 'Today, the area is booming with industrial growth. Considering that Peenya Industrial Area is just 3 km away and Bengaluru-Tumkur Expressway is 5 minutes away, it makes up a great investment opportunity.',
      f1_title: 'Strategic Highway Link',
      f1_desc: 'Direct access to Bengaluru-Tumkur Expressway',
      f2_title: 'Industrial & Tech Hub',
      f2_desc: 'Near Peenya Industrial Area',
      f3_title: 'Metro & Express Trains',
      f3_desc: 'Conveniently connected to metro links & railway stations',
    },
    ernika: {
      p1: 'While you explore the Plots for sale in Anekal, Bengaluru, you must consider the value of the location. For years, Anekal sat at the edge of the conversation. It has been close enough to Bengaluru’s bloom, yet far enough for a peaceful life.',
      p2: 'Today, Electronic City, one of Asia\'s largest IT hubs, is located on this road. While thousands seek jobs in this corridor, many also come for the institutions and connectivity of the metros.',
      f1_title: 'Strategic Highway Link',
      f1_desc: 'Located directly on Anekal-Hosur Main Road',
      f2_title: 'Industrial & Tech Hub',
      f2_desc: 'Quick and easy access to Electronic City',
      f3_title: 'Metro & Express Trains',
      f3_desc: 'Conveniently connected to metro links & railway stations',
    },
    eka: {
      p1: 'While you explore the Plots for sale in Anekal, Bengaluru, you must consider the value of the location. For years, Anekal sat at the edge of the conversation. It has been close enough to Bengaluru’s bloom, yet far enough for a peaceful life.',
      p2: 'Today, Electronic City, one of Asia\'s largest IT hubs, is located on this road. While thousands seek jobs in this corridor, many also come for the institutions and connectivity of the metros.',
      f1_title: 'Strategic Highway Link',
      f1_desc: 'Located directly on Anekal-Hosur Main Road',
      f2_title: 'Industrial & Tech Hub',
      f2_desc: 'Quick and easy access to Electronic City',
      f3_title: 'Metro & Express Trains',
      f3_desc: 'Conveniently connected to metro links & railway stations',
    }
  };

  const currentLocContent = locationContent[project.id] || locationContent.ernika;

  // Sort items inside each category in ascending order by minutes
  const nearbyCategories = rawCategories.map(cat => ({
    ...cat,
    items: [...cat.items].sort((a, b) => a.minutes - b.minutes)
  }));

  // Trigger progress bar animation when section is in viewport or tab activates
  useEffect(() => {
    if (activeTab !== 'nearby') {
      setAnimateBars(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateBars(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    const timer = setTimeout(() => {
      setAnimateBars(true);
    }, 150);

    return () => {
      clearTimeout(timer);
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [activeTab]);

  return (
    <section id="er_location" className="er_section er_container er_location-section">
      <div className="er_location-single-col">
        {/* Top Content Column */}
        <div className="er_location-content">
          <span className="er_loc-sublabel">STRATEGIC GROWTH CORRIDOR</span>
          <h2 className="er_loc-title">Why This Location?</h2>
          <div className="er_loc-gold-line"></div>

          <p className="er_loc-desc">
            {currentLocContent.p1}
          </p>

          <p className="er_loc-desc">
            {currentLocContent.p2}
          </p>

          <div className="er_loc-features">
            <div className="er_loc-feature-item">
              <div className="er_loc-icon-box">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="er_loc-feature-text">
                <h4>{currentLocContent.f1_title}</h4>
                <p>{currentLocContent.f1_desc}</p>
              </div>
            </div>

            <div className="er_loc-feature-item">
              <div className="er_loc-icon-box">
                <i className="fas fa-building"></i>
              </div>
              <div className="er_loc-feature-text">
                <h4>{currentLocContent.f2_title}</h4>
                <p>{currentLocContent.f2_desc}</p>
              </div>
            </div>

            <div className="er_loc-feature-item">
              <div className="er_loc-icon-box">
                <i className="fas fa-train"></i>
              </div>
              <div className="er_loc-feature-text">
                <h4>{currentLocContent.f3_title}</h4>
                <p>{currentLocContent.f3_desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Map Column */}
        <div className="er_location-map-column">
          <div className="er_location-map-card-wrapper">
            <div className="er_loc-map-tabs">
              <button
                type="button"
                className={`er_loc-tab-btn ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}
              >
                <i className="fas fa-map-marked-alt"></i> Google Map
              </button>
              <button
                type="button"
                className={`er_loc-tab-btn ${activeTab === 'proximity' ? 'active' : ''}`}
                onClick={() => setActiveTab('proximity')}
              >
                <i className="fas fa-compass"></i> Proximity Map
              </button>
              <button
                type="button"
                className={`er_loc-tab-btn ${activeTab === 'nearby' ? 'active' : ''}`}
                onClick={() => setActiveTab('nearby')}
              >
                <i className="fas fa-location-dot"></i> Nearby Locations
              </button>
            </div>

            <div className="er_loc-map-container" ref={containerRef}>
              {activeTab === 'proximity' && (
                <div
                  className="er_proximity-iframe-wrap"
                  style={{
                    '--margin-desktop': project.proximityMargins?.desktop || '0px',
                    '--margin-tablet': project.proximityMargins?.tablet || '0px',
                    '--margin-mobile': project.proximityMargins?.mobile || '0px'
                  }}
                >
                  <iframe
                    src={project.proximityMapUrl}
                    scrolling="no"
                    allowFullScreen
                    loading="lazy"
                    title={`${project.shortName} Proximity Map`}
                  ></iframe>
                  <a
                    href={project.proximityMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="er_proximity-open-btn"
                    title="Open Interactive Proximity Map"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              )}

              {activeTab === 'nearby' && (
                <div className="er_nearby-swiper-wrap">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={1}
                    spaceBetween={18}
                    watchSlidesProgress={true}
                    navigation={true}
                    pagination={{ clickable: true }}
                    grabCursor={true}
                    breakpoints={{
                      640: { slidesPerView: 2, spaceBetween: 18 },
                      1024: { slidesPerView: 2, spaceBetween: 20 },
                    }}
                    className="er_nearby-slider"
                  >
                    {nearbyCategories.map((cat, cIdx) => (
                      <SwiperSlide key={cIdx}>
                        {({ isVisible }) => (
                          <div className="er_prox-card">
                            <div className="er_prox-card-head">
                              <div className="er_prox-card-icon">
                                <i className={`fas ${cat.icon}`}></i>
                              </div>
                              <h3>{cat.category}</h3>
                            </div>
                            <div className="er_prox-list-items">
                              {cat.items.map((item, idx) => {
                                const pct = Math.min(95, Math.max(15, Math.round((item.minutes / 30) * 100)));
                                const shouldAnimate = animateBars && isVisible;
                                return (
                                  <div key={idx} className="er_prox-progress-item">
                                    <div className="er_prox-progress-info">
                                      <span className="er_prox-loc-name">
                                        <i className={`fas ${item.itemIcon}`}></i> {item.name}
                                      </span>
                                      <span className="er_prox-dist-badge">
                                        <i className="far fa-clock"></i> {item.time}
                                      </span>
                                    </div>
                                    <div className="er_prox-bar-track">
                                      <div
                                        className="er_prox-bar-fill"
                                        style={{
                                          width: shouldAnimate ? `${pct}%` : '0%',
                                          transition: 'width 1s cubic-bezier(0.25, 1, 0.5, 1)',
                                          transitionDelay: shouldAnimate ? `${idx * 120}ms` : '0ms'
                                        }}
                                      >
                                        <span className="er_prox-bar-shimmer"></span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="er_google-iframe-wrap">
                  <iframe
                    src={project.googleMapUrl}
                    allowFullScreen
                    loading="lazy"
                    title={`${project.shortName} Google Map`}
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
