import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import HeroSection from '../components/HeroSection.jsx';
import LocationSection from '../components/LocationSection.jsx';
import QuickEnquiryForm from '../components/QuickEnquiryForm.jsx';
import CtaSection from '../components/CtaSection.jsx';
import FaqSection from '../components/FaqSection.jsx';

export default function LocationPage({ onOpenBrochure }) {
  const [animateBars, setAnimateBars] = useState(false);
  const directoryRef = useRef(null);

  useEffect(() => {
    document.title = 'Location Highlights & Connectivity Map | Guru Punvaanii Ernika';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateBars(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentEl = directoryRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    const timer = setTimeout(() => {
      setAnimateBars(true);
    }, 200);

    return () => {
      clearTimeout(timer);
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  const rawCategories = [
    {
      category: 'Educational Institutions',
      icon: 'fa-graduation-cap',
      items: [
        { name: 'Alliance University', time: '10 Mins', minutes: 10, itemIcon: 'fa-school' },
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
  ];

  // Ascending order sorting
  const locationCategories = rawCategories.map(cat => ({
    ...cat,
    items: [...cat.items].sort((a, b) => a.minutes - b.minutes)
  }));

  return (
    <main>
      <HeroSection heroVidId="VNnsHctRUx0" onOpenBrochure={onOpenBrochure} />

      <div className="er_main-layout-wrap">
        <div className="er_main-content-col">
          {/* Main Location Section with "Why This Location?" & Dual Maps */}
          <LocationSection />

          {/* Proximity Directory Swiper Slider Cards */}
          {/* <section className="er_section er_container" ref={directoryRef}>
            <div className="er_section-head">
              <span className="er_section-label">NEAREST LANDMARKS &amp; TRAVEL TIME</span>
              <h2 className="er_section-h2">Proximity Directory</h2>
              <div className="er_gold-line"></div>
              <p className="er_section-desc">
                At Ernika by Guru Punvaanii, we believe you should not have to choose between calm and convenience. You stay surrounded by greenery while remaining close to all essential facilities.
              </p>
            </div>

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
                {locationCategories.map((cat, cIdx) => (
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
          </section> */}

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
