import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useProjectContext } from '../utils/useProjectContext.js';
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
  const { isElegance, project } = useProjectContext();

  const ernikaImages = [
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

  const eleganceImages = [
    // { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Villa-Entrance-Arch-Night-View.webp', title: 'Elegance Villa Entrance Arch' },
    // { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-villa-Elevation-Day-view.webp', title: 'Elegance Villa Elevation Day View' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Villa-Elevation-Night-View.webp', title: 'Elegance Villa Elevation Night View' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Entrance-Hall.webp', title: 'Elegance Entrance Hall' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/balcony-space-scaled-1.webp', title: 'Elegance Balcony Space' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Living-Room-Second-Floor-1.webp', title: 'Elegance Living Room' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Living-Room-Third.webp', title: 'Elegance Living Room Upper Level' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Kitchen-1.webp', title: 'Elegance Modular Kitchen' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Dinning.webp', title: 'Elegance Dining Hall' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Bedroom-1.webp', title: 'Elegance Master Bedroom' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Work-Space-1.webp', title: 'Elegance Home Office / Work Space' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Bedroom-Room-2.webp', title: 'Elegance Premium Bedroom' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Co-Working-Space.webp', title: 'Elegance Co-Working Space' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Rooftop.webp', title: 'Elegance Rooftop Terrace' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Private-Garden.webp', title: 'Elegance Private Villa Garden' },
  ];
  const ekaImages = [
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Entrance-Arch-1.webp', title: 'EKA Entrance Arch' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Aerial-View.webp', title: 'EKA Aerial View' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Gazebo.webp', title: 'EKA Gazebo' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Jogging-Track.webp', title: 'EKA Jogging Track' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Kids-Play-Area.webp', title: 'EKA Kids Play Area' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Street-View.webp', title: 'EKA Street View' },
  ];

  const eurekaImages = [
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Entrance-Arch-2.webp', title: 'Eureka Entrance Arch' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Amphitheatre.webp', title: 'Eureka Amphitheatre' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Aerial-Amphitheatre.webp', title: 'Eureka Aerial Amphitheatre' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Aerial-View-1.webp', title: 'Eureka Aerial View' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Basket-Ball-Court.webp', title: 'Eureka Basket Ball Court' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Kids-Play-Area-1.webp', title: 'Eureka Kids Play Area' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Peaceful-Environment.webp', title: 'Eureka Peaceful Environment' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Sunset-View-Point.webp', title: 'Eureka Sunset View Point' },
  ];

  const shyamResidencyImages = [
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/Arial-View.jpeg', title: 'Shyam Residency Aerial View' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/Arial-View-2.jpeg', title: 'Shyam Residency Aerial View 2' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/Park-Stone-Pathway-scaled.jpg', title: 'Shyam Residency Park Stone Pathway' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/Street-View-scaled.jpg', title: 'Shyam Residency Street View' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/Drone-Arial-View-Garden-scaled.jpg', title: 'Shyam Residency Drone Aerial Garden View' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/Drone-Arial-View-Garden-2.png', title: 'Shyam Residency Drone Aerial Garden View 2' },
    { src: 'https://gurupunvaanii.com/wp-content/uploads/elementor/thumbs/DSC02347-1-scaled-rkhq2zqkwzro01c4ttvhyjw8mxae7zekhnn6dn8flo.jpg', title: 'Shyam Residency Entrance' }
  ];

  const galleryImages = isElegance ? eleganceImages : project.id === 'eka' ? ekaImages : project.id === 'eureka' ? eurekaImages : project.id === 'shyam_residency' ? shyamResidencyImages : ernikaImages;


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
        <h2 className="er_section-h2">{project.shortName} Gallery</h2>
        <div className="er_gold-line"></div>
        <p className="er_section-desc">
          {isElegance
            ? 'Take a visual tour of Elegance Villas & plots in Bidadi. Explore the entrance arch, elevation views, entrance hall, living spaces, dining, bedrooms, rooftop, and private gardens.'
            : 'Here you can have a closer look at the life we have built around Ernika. These are the spaces that your family will grow up calling home. Take your time to look around and see all the reasons why Ernika is worth it.'
          }
        </p>
      </div>

      <div className="er_gallery-container">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={16}
          loop={true}
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
