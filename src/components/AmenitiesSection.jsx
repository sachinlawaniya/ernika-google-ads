import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useProjectContext } from '../utils/useProjectContext.js';

export default function AmenitiesSection() {
  const { project } = useProjectContext();
  const amenities = project.amenities || [];

  return (
    <section id="er_amenities" className="er_section er_amenities">
      <div className="er_container">
        <div className="er_section-head">
          <span className="er_section-label">WHAT WE OFFER</span>
          <h2 className="er_section-h2">Amenities</h2>
          <div className="er_gold-line"></div>
          <p className="er_section-desc">
            {project.amenitiesDesc}
          </p>
        </div>

        <div className="er_amenities-container">
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
              // 1024: { slidesPerView: 4, spaceBetween: 20 },
              // 1280: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="er_amenities-slider"
          >
            {amenities.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="er_amenity-item">
                  <span className="er_amenity-icon">
                    <i className={item.icon}></i>
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
