import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useProjectContext } from '../utils/useProjectContext.js';
import 'swiper/css';
import 'swiper/css/navigation';

export default function HighlightsSection() {
  const { isElegance, project } = useProjectContext();

  const allHighlights = {
    elegance: [
      { icon: 'fas fa-map-marked-alt', title: '6.12 Acres', desc: 'Land Area' },
      { icon: 'fas fa-home', title: '101', desc: 'Villas' },
      { icon: 'fas fa-bed', title: '4 BHK', desc: 'Villa' },
      { icon: 'fas fa-file-signature', title: 'RERA', desc: 'Approved' },
      { icon: 'fas fa-award', title: 'BMICAPA', desc: 'Approved' },
      { icon: 'fas fa-swimming-pool', title: '45+', desc: 'Amenities' },
      { icon: 'fas fa-location-dot', title: 'Bidadi', desc: 'Bengaluru' },
    ],
    ernika: [
      { icon: 'fas fa-map-marked-alt', title: '12.5 Acres', desc: 'Land Area' },
      { icon: 'fas fa-border-all', title: '220', desc: 'Villa Plots' },
      { icon: 'fas fa-swimming-pool', title: '26+', desc: 'Amenities' },
      { icon: 'fas fa-file-signature', title: 'BMRDA', desc: 'Approved' },
      { icon: 'fas fa-file-signature', title: 'RERA', desc: 'Approved' },
      { icon: 'fas fa-location-dot', title: 'Anekal', desc: 'Bengaluru' },
    ],
    eka: [
      { icon: 'fas fa-map-marked-alt', title: '50 Acres', desc: 'Land Area' },
      { icon: 'fas fa-border-all', title: '657', desc: 'Plots' },
      { icon: 'fas fa-swimming-pool', title: '13+', desc: 'Amenities' },
      { icon: 'fas fa-file-signature', title: 'BMRDA', desc: 'Approved' },
      { icon: 'fas fa-file-signature', title: 'RERA', desc: 'Approved' },
      { icon: 'fas fa-location-dot', title: 'Anekal', desc: 'Bengaluru' },
    ],
    eureka: [
      { icon: 'fas fa-map-marked-alt', title: '17.5 Acres', desc: 'Land Area' },
      { icon: 'fas fa-border-all', title: '243', desc: 'Plots' },
      { icon: 'fas fa-swimming-pool', title: '12+', desc: 'Amenities' },
      { icon: 'fas fa-file-signature', title: 'BMRDA', desc: 'Approved' },
      { icon: 'fas fa-location-dot', title: 'Bidadi', desc: 'Bengaluru' },
    ],
    shyam_residency: [
      { icon: 'fas fa-map-marked-alt', title: '7.5 Acres', desc: 'Land Area' },
      { icon: 'fas fa-border-all', title: '115', desc: 'Plots' },
      { icon: 'fas fa-swimming-pool', title: '12+', desc: 'Amenities' },
      { icon: 'fas fa-file-signature', title: 'BDA', desc: 'Approved' },
      { icon: 'fas fa-location-dot', title: 'Magadi Road', desc: 'Bengaluru' },
    ]
  };

  const highlights = allHighlights[project.id] || allHighlights.ernika;

  const slides = [...highlights, ...highlights];

  return (
    <section id="er_highlights" className="er_section">
      <div className="er_container">
        <div className="er_section-head">
          <span className="er_section-label">PROJECT AT A GLANCE</span>
          <h2 className="er_section-h2">Highlights</h2>
          <div className="er_gold-line"></div>
        </div>

        <div className="er_highlights-container">
          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={2}
            spaceBetween={12}
            loop={true}
            grabCursor={true}
            speed={800}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={true}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
            }}
            className="er_highlights-slider"
          >
            {slides.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="er_highlight-card">
                  <i className={item.icon}></i>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
