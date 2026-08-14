import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import imgEntrance from '../assets/gallery/ernika_img_12_13_11zon_51_11zon.webp';
import imgStreetView from '../assets/gallery/ernika_street_view.webp';
import imgSkatingRink from '../assets/gallery/ernika_skating_rink.webp';
import imgRugbyCourt from '../assets/gallery/ernika_rugby_court.webp';
import imgNatureTrail from '../assets/gallery/ernika_nature_trail.webp';
import imgJoggingPark from '../assets/gallery/ernika_jogging_park.webp';
import imgButterflyGarden from '../assets/gallery/ernika_butterfly garden.webp';
import imgBaseballCourt from '../assets/gallery/ernika_baseball_court.webp';
import imgAmphitheater from '../assets/gallery/ernika_amphitheater.webp';
import imgAerialView from '../assets/gallery/ernika_aerial_view.webp';
import imgModernVilla from '../assets/gallery/ernika_modern_villa.webp';
import imgAerialViewAlt from '../assets/gallery/ernika_Aerial-View.webp';
import imgOverview from '../assets/gallery/ernika_img.webp';

export default function GallerySection() {
  const galleryImages = [
    { src: imgEntrance, title: 'Ernika Amazon-themed entrance & layout' },
    { src: imgStreetView, title: 'Ernika 30ft concrete street view & tree lines' },
    { src: imgSkatingRink, title: 'Ernika community skating rink' },
    { src: imgRugbyCourt, title: 'Ernika sports & rugby court' },
    { src: imgNatureTrail, title: 'Ernika Amazon forest nature trail' },
    { src: imgJoggingPark, title: 'Ernika jogging park & greenery' },
    { src: imgButterflyGarden, title: 'Ernika butterfly garden & open space' },
    { src: imgBaseballCourt, title: 'Ernika baseball & outdoor sports court' },
    { src: imgAmphitheater, title: 'Ernika open air amphitheater' },
    { src: imgAerialView, title: 'Ernika 12.5-acre aerial view layout' },
    { src: imgModernVilla, title: 'Ernika modern luxury villa architecture' },
    { src: imgAerialViewAlt, title: 'Ernika masterplan aerial perspective' },
    { src: imgOverview, title: 'Ernika villa plots community layout' },
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
