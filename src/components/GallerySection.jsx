import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function GallerySection() {
  const galleryImages = [
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_9.jpeg', title: 'Ernika villa plots community view 9' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_2.jpg', title: 'Ernika villa plots community view 2' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_3.jpg', title: 'Ernika villa plots community view 3' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_4.jpg', title: 'Ernika villa plots community view 4' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_5.jpg', title: 'Ernika villa plots community view 5' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_6.jpg', title: 'Ernika villa plots community view 6' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_7.jpg', title: 'Ernika villa plots community view 7' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_8.jpg', title: 'Ernika villa plots community view 8' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_10.png', title: 'Ernika villa plots community view 10' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_11.jpg', title: 'Ernika villa plots community view 11' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_12.jpg', title: 'Ernika villa plots community view 12' },
  ];

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="er_gallery" className="er_section er_container">
      <div className="er_section-head">
        <span className="er_section-label">VISUAL SHOWCASE</span>
        <h2 className="er_section-h2">Project Gallery</h2>
        <div className="er_gold-line"></div>
        <p className="er_section-desc">
          Here you can have a closer look at the life we have built around Ernika. These are the spaces that your family will grow up calling home. Take your time to look around and see all the reasons why Ernika is worth it.
        </p>
      </div>

      <div className="er_gallery-container">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={16}
          loop={false}
          grabCursor={true}
          speed={800}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            1024: { slidesPerView: 1, spaceBetween: 24 },
          }}
          className="er_gallery-slider"
        >
          {galleryImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="er_gallery-item" onClick={() => openLightbox(idx)}>
                <div className="er_gallery-img">
                  <img src={img.src} alt={img.title} loading="lazy" decoding="async" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="er_lightbox-modal er_active" onClick={closeLightbox}>
          <button className="er_lightbox-close" onClick={closeLightbox}>
            <i className="fas fa-times"></i>
          </button>

          <button className="er_lightbox-prev" onClick={prevImage}>
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="er_lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[lightboxIndex].src} alt={galleryImages[lightboxIndex].title} />
            <div className="er_lightbox-caption">
              {lightboxIndex + 1} / {galleryImages.length} — {galleryImages[lightboxIndex].title}
            </div>
          </div>

          <button className="er_lightbox-next" onClick={nextImage}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </section>
  );
}
