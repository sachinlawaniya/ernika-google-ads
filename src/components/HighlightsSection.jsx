import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HighlightsSection() {
  const highlights = [
    { icon: 'fas fa-map-marked-alt', title: '12.5 Acres', desc: 'Land Area' },
    { icon: 'fas fa-border-all', title: '220', desc: 'Villa Plots' },
    { icon: 'fas fa-swimming-pool', title: '26+', desc: 'Amenities' },
    { icon: 'fas fa-file-signature', title: 'BMRDA', desc: 'Approved' },
    { icon: 'fas fa-file-signature', title: 'RERA', desc: 'Approved' },
    { icon: 'fas fa-location-dot', title: 'Anekal', desc: 'Bengaluru' },
  ];

  // Repeat for smooth infinite loop
  const slides = [...highlights, ...highlights];

  return (
    <section id="er_highlights" className="er_section">
      <div className="er_container">
        <div className="er_section-head">
          <span className="er_section-label">PROJECT AT A GLANCE</span>
          <h2 className="er_section-h2">Project Highlights</h2>
          <div className="er_gold-line"></div>
        </div>

        <div className="er_highlights-container">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            grabCursor={true}
            speed={800}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            // pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
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
