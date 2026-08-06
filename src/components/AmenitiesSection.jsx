import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function AmenitiesSection() {
  const amenities = [
    { icon: 'fas fa-tree', title: 'Aerobics' },
    { icon: 'fas fa-baseball-ball', title: 'Baseball Court' },
    { icon: 'fas fa-chess', title: 'Chess | Carrom | Cafeteria' },
    { icon: 'fas fa-bullseye', title: 'Dart' },
    { icon: 'fas fa-briefcase-medical', title: 'Emergency Medical Room' },
    { icon: 'far fa-futbol', title: 'Foosball' },
    { icon: 'fas fa-umbrella-beach', title: 'Gazebo' },
    { icon: 'fas fa-dumbbell', title: 'Health & Fitness Space (Gym)' },
    { icon: 'fas fa-laptop-house', title: 'Innovation Incubator (Co-working Space)' },
    { icon: 'fas fa-running', title: 'Jenga | Jogging' },
    { icon: 'fas fa-child', title: 'Kids Play Area' },
    { icon: 'fas fa-book', title: 'Library' },
    { icon: 'fas fa-tree', title: 'Miyawaki Forest (Amazon Forest)' },
    { icon: 'fas fa-leaf', title: 'Nature Trail' },
    { icon: 'fas fa-bicycle', title: 'Outdoor Gym' },
    { icon: 'fas fa-glass-cheers', title: 'Party Hall | Playing Cards' },
    { icon: 'fas fa-ring', title: 'Quoits' },
    { icon: 'fas fa-football-ball', title: 'Rugby Court' },
    { icon: 'fas fa-swimmer', title: 'Swimming Pool | Skating Rink' },
    { icon: 'fas fa-table-tennis', title: 'Table Tennis' },
    { icon: 'fas fa-clone', title: 'Uno' },
    { icon: 'fas fa-gamepad', title: 'Video Game' },
    { icon: 'fas fa-weight-hanging', title: 'Weight Lifting' },
    { icon: 'fas fa-chess', title: 'Xianqi' },
    { icon: 'fas fa-spa', title: 'Yoga' },
    { icon: 'fas fa-fist-raised', title: 'Zourkhaneh' },
  ];

  return (
    <section id="er_amenities" className="er_section er_amenities">
      <div className="er_container">
        <div className="er_section-head">
          <span className="er_section-label">WHAT WE OFFER</span>
          <h2 className="er_section-h2">Amenities</h2>
          <div className="er_gold-line"></div>
          <p className="er_section-desc">
            From A to Z, every amenity at Ernika is designed with your family in mind. It covers a range of amenities like spaces to be active, areas to gather, and corners for the quiet. Each element is intentionally put to make your daily life, your dream life.
          </p>
        </div>

        <div className="er_amenities-container">
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
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1280: { slidesPerView: 5, spaceBetween: 20 },
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
