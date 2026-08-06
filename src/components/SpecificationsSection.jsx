import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function SpecificationsSection() {
  const specs = [
    { icon: 'fa-shield-alt', title: '24/7 Security' },
    { icon: 'fa-road', title: '30 Feet Concrete Road With Plantation' },
    { icon: 'fa-water', title: 'Overhead Water Tank' },
    { icon: 'fa-faucet', title: 'Under Ground Water Pipe Lines' },
    { icon: 'fa-bolt', title: 'Under Ground Electrification' },
    { icon: 'fa-lightbulb', title: 'LED Street Light' },
    { icon: 'fa-recycle', title: 'STP' },
  ];

  const slides = [...specs, ...specs];

  return (
    <section id="er_specification" className="er_section er_specification">
      <div className="er_container">
        <div className="er_section-head">
          <span className="er_section-label">QUALITY STANDARDS</span>
          <h2 className="er_section-h2">Specifications</h2>
          <div className="er_gold-line"></div>
          <p className="er_section-desc">
            Here, every specification from road width, drainage, sustainable systems, etc., was developed with the long term in mind. Across our projects, we make sure that what goes into the ground gets the same attention as what rises above it.
          </p>
        </div>

        <div className="er_spec-container">
          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            grabCursor={true}
            speed={800}
            autoplay={{ delay: 2800, disableOnInteraction: false }}
            navigation={true}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              // 1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="er_specification-slider"
          >
            {slides.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="er_spec-item">
                  <span className="er_spec-icon">
                    <i className={`fas ${item.icon}`}></i>
                  </span>
                  {item.title}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
