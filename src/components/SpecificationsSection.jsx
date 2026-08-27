import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useProjectContext } from '../utils/useProjectContext';
import 'swiper/css';
import 'swiper/css/navigation';

export default function SpecificationsSection() {
  const { project } = useProjectContext();

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

  const descriptions = {
    ernika: 'Here, every specification from road width, drainage, sustainable systems, etc., was developed with the long term in mind. Across our projects, we make sure that what goes into the ground gets the same attention as what rises above it.',
    elegance: 'Every specification at Elegance, from wide roads to premium drainage and sustainable systems, is crafted with the highest quality standards to ensure a modern luxury lifestyle.',
    eka: 'With our properties at Guru Punvaanii, you never have to second-guess the quality. At these plots in Anekal, Bangalore, the infrastructure is not a promise we make, but what you get. Across our three phases, we believe that a plot is only as valuable as the foundation it sits on. ',
    eureka: 'Eureka offers top-tier specifications, thoughtfully planned infrastructure, and sustainable systems to ensure your investment stands the test of time in a tranquil environment.',
    shyam_residency: 'Shyam Residency is equipped with BDA-approved specifications, featuring 30 to 50 feet wide roads, underground utilities, and premium infrastructure for a peaceful life.',
  };

  const currentDesc = descriptions[project.id] || descriptions.ernika;

  return (
    <section id="er_specification" className="er_section er_specification">
      <div className="er_container">
        <div className="er_section-head">
          <span className="er_section-label">QUALITY STANDARDS</span>
          <h2 className="er_section-h2">Specifications</h2>
          <div className="er_gold-line"></div>
          <p className="er_section-desc">
            {currentDesc}
          </p>
        </div>

        <div className="er_spec-container">
          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={2}
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
