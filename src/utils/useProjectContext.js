import { useLocation } from 'react-router-dom';

export const PROJECTS_DATA = {
  ernika: {
    id: 'ernika',
    shortName: 'Ernika',
    projectName: 'Guru Punvaanii Ernika',
    title: 'Ernika Villa plots | Amazon Forest-Themed in Anekal, Bengaluru',
    location: 'Anekal, Netaji Road',
    tagline: 'Amazon Forest-Themed Villa plots at Ernika, Anekal, Bengaluru',
    badge: 'AMAZON THEMED VILLA Plots ',
    formHeading: 'Ernika Villa Plots - Anekal',
    formSubHeading: '220 BMRDA & RERA Approved plots across 12.5 Acres',
    heroVideoId: 'VNnsHctRUx0',
    walkthroughVideoId: 'sLBAywF0k44',
    approvalText: '220 BMRDA & RERA Approved plots across 12.5 Acres',
    approvalBadge: 'BMRDA  & RERA APPROVED',
    elevationDayImg: 'https://gurupunvaanii.com/wp-content/uploads/2026/05/ErnikaArch-scaled.jpeg',
    elevationNightImg: 'https://gurupunvaanii.com/wp-content/uploads/2026/05/ErnikaArch-scaled.jpeg',
    proximityMapUrl: 'https://ernika-proximities.gurupunvaanii.com/',
    proximityMargins: {
      desktop: '-0px',
      tablet: '-20px',
      mobile: '-20px'
    },
    googleMapUrl: 'https://maps.google.com/maps?q=Guru%20Punvaanii%20Ernika%20Anekal&t=&z=15&ie=UTF8&iwloc=&output=embed',
    brochureUrl: 'https://gurupunvaanii.com/wp-content/uploads/2026/07/Ernika-Brochure-compressed-1.pdf',
    brochureDesc: 'Share a few details and we’ll send the full brochure — plot layouts, phase-wise pricing and BMRDA & RERA documents — straight to your phone.',
    trustBadges: ['RERA APPROVED', 'BMRDA LAYOUT'],
    basePath: '/ernika',
    about: {
      paragraphs: [
        'Guru Punvaanii brings you Bengaluru\'s first Amazon Forest-themed premium villa plots in Anekal, Bengaluru. With 220 BMRDA & REAR approved plots across 12.5 acres, the layout here was designed around trees and open corridors, so you can share the same air as the forest.',
        'At Ernika by Guru Punvaanii, we believe that you should not have to choose between calm and convenience. Keeping that in mind, this neighbourhood keeps you close to schools, hospitals, and everyday city life.'
      ]
    },
    amenitiesDesc: 'From A to Z, every amenity at Ernika is designed with your family in mind. It covers a range of amenities like spaces to be active, areas to gather, and corners for the quiet. Each element is intentionally put to make your daily life, your dream life.',
    amenities: [
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
    ],
    cta: {
      title: 'Ready to Own Bengaluru’s 1st Amazon-Themed Villa Plot?',
      desc: 'Explore 12.5 acres of green corridors, 26+ world-class amenities, and prime connectivity in Anekal. Get instant access to plot layouts, phase pricing, and site visit assistance.',
      tags: [
        { icon: 'fas fa-shield-alt', text: '100% Clear Title & Approved' },
        { icon: 'fas fa-tree', text: '26+ World Class Amenities' },
        { icon: 'fas fa-hand-holding-usd', text: 'High Appreciation Growth' }
      ]
    },
    faqs: [
      {
        q: 'What is Ernika by Guru Punvaanii?',
        a: "Ernika is a BMRDA & RERA approved, Bengaluru's first Amazon-themed premium community of villa plots in Anekal, Bengaluru. It has 220 plots across 12.5 acres, designed for families who want peaceful living without compromising on connectivity.",
      },
      {
        q: 'Where is Ernika located, and how well is it connected?',
        a: 'Ernika is located in one of the fastest-growing corridors in Bengaluru, Anekal. You will get excellent connectivity to Electronic City, Hosur Road, schools, IT hubs, hospitals, and your everyday essentials.',
      },
      {
        q: 'What makes Ernika different from other villa plot projects in Bengaluru?',
        a: "Ernika is Bengaluru's first Amazon forest-themed premium villa plot community. It is designed to keep you close to nature, greenery, and in touch with the theme, while not compromising on the modern lifestyle.",
      },
      {
        q: 'What plot sizes are available?',
        a: 'Ernika offers three sizes: 30×30 ft, 30×50 ft, and 40×40 ft, giving you the flexibility to build your dream home.',
      },
      {
        q: 'Is Ernika a good investment?',
        a: "Anekal is one of Bengaluru's fastest-growing corridors. Backed by Guru Punvaanii's track record of 12 completed projects, your investment is in trustworthy hands!",
      },
      {
        q: 'Why should I trust Guru Punvaanii?',
        a: 'Guru Punvaanii has 12 completed projects, 3000+ happy families, and 38+ lakh sqft delivered across Bengaluru. We believe in Fair Policy and Fair Property — a promise we have always kept.',
      }
    ],
    plots: {
      description: 'Ernika offers multiple plot dimensions — 30×40 ft, 30×50 ft, 40×40 ft, 40×50 ft, and ODD dimensions, giving you full flexibility to build your dream home.',
      type: 'grid',
      list: [
        {
          size: '30 × 40 ft & 30 × 50 ft',
          sqft: '1,200 – 1,500 SqFt.',
          desc: 'Ideal for modern 3BHK duplex family villas. Compact luxury layout surrounded by Amazon-themed green corridors.',
          badge: 'Popular Choice',
          icon: 'fa-vector-square'
        },
        {
          size: '40 × 40 ft & 40 × 50 ft',
          sqft: '1,600 – 2,000 SqFt.',
          desc: 'Executive villa plots for grand homes with private lawn, terrace garden, and spacious floor plans.',
          badge: 'Premium Luxury',
          icon: 'fa-crown'
        },
        {
          size: 'Unique Plots ',
          sqft: 'Custom Dimensions',
          desc: 'Corner and unique dimension plots tailored for custom architectural projects and high-value investments.',
          badge: 'Exclusive',
          icon: 'fa-chess-king'
        }
      ]
    }
  },
  elegance: {
    id: 'elegance',
    shortName: 'Elegance',
    projectName: 'Guru Punvaanii Elegance',
    title: 'Elegance Villas | Crafted for Modern Luxury in Bidadi, Bengaluru',
    location: 'Bidadi, Bengaluru',
    tagline: 'Experience Premium 4 BHK Villas & plots in Bidadi, Bengaluru',
    badge: 'PREMIUM 4 BHK VILLAS & Plots ',
    formHeading: 'Elegance - Greater Bengaluru',
    formSubHeading: 'RERA & BMICAPA Approved Luxury Villas & Plots Community in Bidadi',
    heroVideoId: 'OfP_mLfh4kE',
    walkthroughVideoId: 'OfP_mLfh4kE',
    approvalText: 'RERA & BMICAPA Approved Luxury Plots Community in Bidadi',
    approvalBadge: 'RERA & BMICAPA APPROVED',
    entranceArch: "https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Villa-Entrance-Arch-Night-View-2048x938.webp",
    elevationDayImg: 'https://gurupunvaanii.com/wp-content/uploads/elementor/thumbs/Elegance-villa-Elevation-Day-view-rrp67svjk3l1axj8xw8ej31pv7enpmk6wh4nlyt43k.webp',
    elevationNightImg: 'https://gurupunvaanii.com/wp-content/uploads/elementor/thumbs/Elegance-Villa-Elevation-Night-View-rrp67ttdqxmbmjhvsen13kt6gla0xbnx8ls538rpxc.webp',
    proximityMapUrl: 'https://elegance-proximities.gurupunvaanii.com/',
    proximityMargins: {
      desktop: '-36px',
      tablet: '-36px',
      mobile: '-36px'
    },
    googleMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.6080368158828!2d77.4137762!3d12.8174973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae47006e0dd711%3A0x95167fb4ac2dcc87!2sGuru%20Punvaanii%20Elegance%20%7C%20Villas%20near%20Bangalore!5e1!3m2!1sen!2sin!4v1787056664100!5m2!1sen!2sin',
    brochureUrl: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Elegance-Brochure.pdf',
    brochureDesc: 'Share a few details and we’ll send the full brochure — plot layouts, phase-wise pricing and RERA & BMICAPA documents — straight to your phone.',
    trustBadges: ['RERA APPROVED', 'BMICAPA LAYOUT'],
    basePath: '/elegance',
    about: {
      paragraphs: [
        'Guru Punvaanii brings you Elegance Villas & Villa plots in Bidadi, Bengaluru. Featuring RERA & BMICAPA approved luxury 4 BHK villas and Plots , crafted for modern lifestyle with lush green landscapes and seamless connectivity.',
        'At Elegance by Guru Punvaanii, we believe that you should not have to choose between calm and convenience. Keeping that in mind, this neighbourhood keeps you close to schools, hospitals, and everyday city life.'
      ]
    },
    amenitiesDesc: 'Experience luxury and comfort at Elegance with our top-of-the-line amenities designed for a modern lifestyle.',
    amenities: [
      { icon: 'fas fa-swimmer', title: 'Swimming Pool' },
      { icon: 'fas fa-dumbbell', title: 'Gymnasium' },
      { icon: 'fas fa-child', title: 'Kids Play Area' },
      { icon: 'fas fa-tree', title: 'Landscaped Gardens' },
      { icon: 'fas fa-running', title: 'Jogging Track' }
    ],
    cta: {
      title: 'Ready to Own a Premium Villa in Bidadi?',
      desc: 'Discover luxury living with RERA & BMICAPA approved 4 BHK villas and Plots . Enjoy world-class amenities and seamless connectivity to Bengaluru.',
      tags: [
        { icon: 'fas fa-shield-alt', text: 'RERA & BMICAPA Approved' },
        { icon: 'fas fa-tree', text: 'Lush Green Landscapes' },
        { icon: 'fas fa-hand-holding-usd', text: 'Excellent Resale Value' }
      ]
    },
    faqs: [
      {
        q: 'Will these villas have good resale value?',
        a: 'Yes! When there is a limited villa supply but steady growth in demand, the future resale potential will be good!'
      },
      {
        q: 'Is daily commuting to Bengaluru feasible?',
        a: 'Yes. You will be close to the expressway, and the upcoming metro connectivity will also make daily travel from villas in Bidadi near Bengaluru convenient.'
      },
      {
        q: 'How does this location compare to city-based villa projects?',
        a: 'Villas near Bidadi offer larger homes, better pricing, and a calmer living environment, far better than city developments.'
      },
      {
        q: 'Who should consider buying a villa here?',
        a: 'Families and professionals who are seeking space, peace, and long-term value in a Bidadi Villa community.'
      },
      {
        q: 'Is buying a villa in Mysore Road a good investment?',
        a: 'Yes. Especially the infrastructure growth and rising demand for luxury villas are making Mysore Road a strong long-term investment choice.'
      }
    ],
    plots: {
      description: 'Guru Punvaanii Elegance offers premium 4 BHK villas and plots in Bidadi with RERA & BMICAPA approval, giving you full flexibility to build your dream home.',
      type: 'premium-card',
      imageNight: 'https://gurupunvaanii.com/wp-content/uploads/elementor/thumbs/Elegance-Villa-Elevation-Night-View-rrp67ttdqxmbmjhvsen13kt6gla0xbnx8ls538rpxc.webp',
      imageDay: 'https://gurupunvaanii.com/wp-content/uploads/elementor/thumbs/Elegance-villa-Elevation-Day-view-rrp67svjk3l1axj8xw8ej31pv7enpmk6wh4nlyt43k.webp',
      cardTitle: 'Exclusive 4 BHK Luxury Villas',
      cardDesc: 'Experience the ultimate luxury with our meticulously designed 4 BHK villas. Enjoy expansive living spaces, private lawns, and premium architecture tailored for a modern lifestyle.',
      badge: 'Premium Edition',
      icon: 'fa-crown'
    }
  },
  eka: {
    id: 'eka',
    shortName: 'EKA',
    projectName: 'Guru Punvaanii EKA',
    title: 'EKA: Premium plots for Sale in Anekal, Bangalore',
    location: 'Anekal, Hosur Road',
    tagline: 'Premium plots for Sale in Anekal, Bangalore',
    badge: 'PREMIUM LAYOUT',
    formHeading: 'EKA Premium Plots - Anekal',
    formSubHeading: '656 BMRDA & RERA Approved Plots across 48 Acres',
    heroVideoDesktop: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Website-Eka-3.mp4',
    heroVideoMobile: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Mobile-Version-3.mp4',
    walkthroughVideoId: 'ARZu54DqhVM',
    approvalText: '656 BMRDA & RERA Approved Plots across 48 Acres',
    approvalBadge: 'BMRDA & RERA APPROVED',
    elevationDayImg: 'https://gurupunvaanii.com/wp-content/uploads/2026/07/Entrance-Arch.png',
    elevationNightImg: 'https://gurupunvaanii.com/wp-content/uploads/2026/07/Entrance-Arch.png',
    proximityMapUrl: 'https://eka-proximities.gurupunvaanii.com/',
    googleMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3522.346747484302!2d77.7166015!3d12.692526599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae65bd20f41b95%3A0xc7061951b8d0aeb0!2sGuru%20Punvaanii%20EKA!5e1!3m2!1sen!2sin!4v1787041561165!5m2!1sen!2sin',
    brochureUrl: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/EKA-Brochure.pdf',
    brochureDesc: 'Share a few details and we’ll send the full brochure — plot layouts, phase-wise pricing and BMRDA & RERA documents — straight to your phone.',
    trustBadges: ['RERA APPROVED', 'BMRDA LAYOUT'],
    basePath: '/eka',
    proximityMargins: {
      desktop: '-24px',
      tablet: '-20px',
      mobile: '-20px'
    },
    about: {
      paragraphs: [
        'EKA means One, and that is exactly what this project stands for: One Vision, one promise, and one address that changes the way you live.',
        'Eka is the flagship project by Guru Punvaanii, which has a vision to make transparency, timely delivery and genuine value a norm in the city of Bengaluru. The landmark has three phases on the Anekal-Hosur road, which would not have been possible without the kind of trust we have built within our community.',
        'These BMRDA & RERA approved layouts in Anekal sit on one of the fastest-appreciating corridors in Greater Bengaluru. With Electronic City just up the road, this is a neighborhood that is quietly becoming one of the most desired communities in the city. There is a reason why this flagship project has now risen to three phases.'
      ]
    },
    amenitiesDesc: 'There are some things you notice the day you move in, while others reveal themselves slowly. At Eka, we make sure your Sunday morning walks or evening jams can always find a place. That’s what good amenities do. They make your life feel just right.',
    amenities: [
      { icon: 'fas fa-eye', title: 'Sensory Park' },
      { icon: 'fas fa-umbrella-beach', title: 'Raised Gazebos' },
      { icon: 'fas fa-tree', title: 'Treehouse Gazebos' },
      { icon: 'fas fa-leaf', title: 'Green Belts' },
      { icon: 'fas fa-peace', title: 'Meditation Park' },
      { icon: 'fas fa-building', title: 'Clubhouse' },
      { icon: 'fas fa-water', title: 'Lakeview Park' },
      { icon: 'fas fa-landmark', title: 'Green Auditorium Overlooking the Lake' },
      { icon: 'fas fa-road', title: 'Central Boulevard With Spacious Vehicular and Pedestrian Transit-ways' },
      { icon: 'fas fa-seedling', title: 'Organic Gardens' },
      { icon: 'fas fa-child', title: 'Childrens Play Area' },
      { icon: 'fas fa-dumbbell', title: 'Outdoor Fitness' },
      { icon: 'fas fa-utensils', title: 'Greenmaze and Picnic Spots' },
    ],
    cta: {
      title: 'Get the EKA layout & brochure',
      desc: 'Share a few details and we’ll send the full brochure — plot layouts, phase-wise pricing and RERA documents — straight to your phone and inbox.',
      tags: [
        { icon: 'fas fa-shield-alt', text: 'RERA APPROVED' },
        { icon: 'fas fa-map', text: 'BMRDA LAYOUT' }
      ]
    },
    faqs: [
      {
        q: 'Where exactly is EKA located?',
        a: 'Eka is located on the Anekal-Hosur Main Road in Bengaluru. Here, you will be staying close to the Electronic City while being well-connected to the Silk Board and right in the middle of one of South Bengaluru’s most promising corridors.'
      },
      {
        q: 'Is EKA RERA registered?',
        a: 'Yes! Eka is a RERA-approved villa project. All three phases are legally cleared, so you can invest peacefully.'
      },
      {
        q: 'Are these BMRDA-approved layouts in Anekal?',
        a: 'EKA meets all the applicable layout approvals that are required. We understand how buyers look for BMRDA-approved layouts in Anekal, and so, we make sure you never have to worry about it.'
      },
      {
        q: 'How close is EKA to my daily essentials?',
        a: 'Eka is built for people who want convenience. Schools like Alliance University and New Baldwin International, hospitals like Narayana Hrudayalaya and Sparsh, supermarkets, restaurants—all of these and more things that you need day-to-day are within a comfortable reach.'
      },
      {
        q: 'What infrastructure is already in place?',
        a: 'White-topped concrete roads, underground electrical lines, individual water and sewage connections per plot, advanced drainage systems, and precise site marking. These are ready to build from day one, so no waiting period, no surprises!'
      },
      {
        q: 'Why should I invest in EKA?',
        a: 'plots in Anekal, Bangalore are in the right location and are backed by a developer who actually delivers what was promised. EKA lies in a growing corridor with a solid community. So, you will never second-guess your decision five years from now.'
      },
      {
        q: 'Does EKA offer clear legal titles?',
        a: 'Yes! Every plot at EKA comes with clear, clean legal titles. There is no space for disputes, surprises, or legal issues. What you buy is exactly what you own, and we have proved it since Phase I.'
      }
    ],
    plots: {
      description: 'EKA offers meticulously planned plots in Anekal, Bangalore, providing you the perfect canvas to build your dream home.',
      type: 'grid',
      list: [
        {
          size: 'Premium Plots ',
          sqft: 'Various Sizes',
          desc: 'Build your dream home in a secure, green, and well-planned community at EKA.',
          badge: 'Popular Choice',
          icon: 'fa-vector-square'
        }
      ]
    }
  },
  eureka: {
    id: 'eureka',
    shortName: 'Eureka',
    projectName: 'Guru Punvaanii Eureka',
    title: 'Eureka - Premium plots in Bidadi for Smart Living',
    location: 'Dharapura, Bidadi',
    tagline: 'Premium plots in Bidadi for Smart Living',
    badge: 'BMRDA APPROVED Plots ',
    formHeading: 'Eureka Premium Plots - Bidadi, Bengaluru',
    formSubHeading: '243 BMRDA Approved Plots across 17.5 Acres in Bidadi',
    heroVideoDesktop: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Eureka-Desktop-Version.mp4',
    heroVideoMobile: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Eureka-Mobile-Version.mp4',
    walkthroughVideoId: 'WpViK4OocY0',
    approvalText: '243 BMRDA-approved plots across 17.5 acres',
    approvalBadge: 'BMRDA APPROVED',
    elevationDayImg: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/Entrance-Arch-scaled.jpg',
    elevationNightImg: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/Entrance-Arch-scaled.jpg',
    proximityMapUrl: 'https://eureka-proximities.gurupunvaanii.com/',
    googleMapUrl: 'https://maps.google.com/maps?q=Gurupunvaanii%20Eureka&t=m&z=10&output=embed&iwloc=near',
    brochureUrl: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Eureka.pdf',
    brochureDesc: 'Share a few details and we’ll send the full brochure — plot layouts, phase-wise pricing and BMRDA & RERA documents — straight to your phone.',
    trustBadges: ['RERA APPROVED', 'BMRDA LAYOUT'],
    basePath: '/eureka',
    proximityMargins: {
      desktop: '-36px',
      tablet: '-36px',
      mobile: '-36px'
    },
    about: {
      paragraphs: [
        'Between the city\'s relentless pace and the quiet of open skies lies Eureka. This is 17.5 acres of thoughtfully planned living in Bidadi, Greater Bengaluru. Here, you will find 243 BMRDA-approved plots that are designed for those who believe that their home should feel peaceful.',
        'It is for families, working professionals, and investors who are seeking plots in Bidadi that offer the perfect balance between connectivity and tranquility. You will live close enough to the city\'s industrial and IT hubs, yet far enough from the chaos. This is a living, planned with intention and approved with trust.',
        'Our Plots community plots in Bidadi check the boxes for comfort, thoughtful design, and future-proofing. Eureka by Guru Punvaanii was built with you in mind, so you can live with confidence.'
      ]
    },
    amenitiesDesc: 'At Eureka, amenities are at the heartbeat of the community. From open parks to active sports areas, every space is designed to bring families together.',
    amenities: [
      { icon: 'fas fa-child', title: 'Kids Play Equipment' },
      { icon: 'fas fa-water', title: 'Lily Pond' },
      { icon: 'fas fa-basketball-ball', title: 'Cricket, Skating & Basket Ball' },
      { icon: 'fas fa-dumbbell', title: 'Outdoor GYM' },
      { icon: 'fas fa-theater-masks', title: 'Amphitheatre' },
      { icon: 'fas fa-road', title: 'Bridge' },
      { icon: 'fas fa-umbrella-beach', title: 'Gazebo' },
      { icon: 'fas fa-bug', title: 'Butterfly Garden' },
      { icon: 'fas fa-fire', title: 'Barbeque' },
      { icon: 'fas fa-leaf', title: 'Organic Garden' },
      { icon: 'fas fa-moon', title: 'Moonlit Garden' },
      { icon: 'fas fa-sun', title: 'Sunset View Point' }
    ],
    cta: {
      title: 'Get the Eureka layout & brochure',
      desc: 'Share a few details and we\'ll send the full brochure — plot layouts, phase-wise pricing and RERA documents — straight to your phone and inbox.',
      tags: [
        { icon: 'fas fa-shield-alt', text: 'RERA REGISTERED' },
        { icon: 'fas fa-map', text: 'BMRDA APPROVED' }
      ]
    },
    faqs: [
      {
        q: 'Is Eureka RERA registered?',
        a: 'Yes! Eureka is a RERA-registered project based in Bidadi, Greater Bengaluru. It is also BMRDA approved, which means your investment will be in safe hands.'
      },
      {
        q: 'How many plots are available and what are the sizes?',
        a: 'Eureka offers 243 plots community plots in Bidadi across multiple size options: 30x40, 30x50, 40x50, and 40x60 feet.'
      },
      {
        q: 'How well are plots in Bidadi connected to Bengaluru city?',
        a: 'Living in Bidadi, you will be well connected to the main city via Bengaluru-Mysuru Expressway, STRR, and suburban railways.'
      },
      {
        q: 'What kind of amenities are at Eureka?',
        a: 'This place has been designed for a complete lifestyle, so you don\'t miss out on anything. You can enjoy the parks, your kids can play in a dedicated area, and there are sports zones for those who like an active lifestyle. Plus, there are landscape green spaces which simply add value to daily life.'
      },
      {
        q: 'Why Is Bidadi a smart location to invest in right now?',
        a: 'The reason that the Bidadi makes a great investment opportunity is that the Mysuru Expressway corridor is around the corner. Due to this, Bengaluru is witnessing infrastructure growth and appreciation in the area.'
      }
    ],
    plots: {
      description: 'Eureka offers 243 thoughtfully planned plots in Bidadi across multiple size options, giving you the perfect balance between connectivity and tranquility.',
      type: 'grid',
      list: [
        {
          size: '30 × 40 ft & 30 × 50 ft',
          sqft: '1,200 – 1,500 SqFt.',
          desc: 'Ideal for building a spacious and comfortable family home in a peaceful, secure community.',
          badge: 'Popular Choice',
          icon: 'fa-vector-square'
        },
        {
          size: '40 × 50 ft & 40 × 60 ft',
          sqft: '2,000 – 2,400 SqFt.',
          desc: 'Premium plot dimensions for expansive luxury homes with large gardens and outdoor spaces.',
          badge: 'Premium Luxury',
          icon: 'fa-crown'
        },
        {
          size: 'Unique Dimensions',
          sqft: 'Unique Sizes',
          desc: 'Odd-dimensional and corner plots offering unique architectural possibilities.',
          badge: 'Exclusive',
          icon: 'fa-chess-king'
        }
      ]
    }
  },
  shyam_residency: {
    id: 'shyam_residency',
    shortName: 'Shyam Residency',
    projectName: 'Guru Punvaanii Shyam Residency',
    title: 'Shyam Residency: Premium Sites in Magadi Road',
    location: 'Off Andhrahalli, Magadi Road',
    tagline: 'Premium Sites in Magadi Road',
    badge: 'BDA APPROVED',
    formHeading: 'Shyam Residency - Magadi Road',
    formSubHeading: '115 plots spread across 7.5 acres. BDA Approved.',
    heroVideoDesktop: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Shyam-Residency-Desktop-1.mp4',
    heroVideoMobile: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Shyam-Residency-Mobile-1.mp4',
    walkthroughVideoId: 'W6vr7qiTabo',
    approvalText: 'BDA-approved project with 115 plots across 7.5 acres',
    approvalBadge: 'BDA APPROVED',
    elevationDayImg: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/Street-View-scaled.jpg',
    elevationNightImg: 'https://gurupunvaanii.com/wp-content/uploads/2026/06/Street-View-scaled.jpg',
    proximityMapUrl: '',
    googleMapUrl: 'https://maps.google.com/maps?q=13.0231875,77.4785625&t=&z=15&ie=UTF8&iwloc=&output=embed',
    brochureUrl: 'https://gurupunvaanii.com/wp-content/uploads/2026/08/Shyam-Residency-brochure.pdf',
    brochureDesc: 'Share a few details and we’ll send the full brochure — plot layouts, phase-wise pricing and BDA documents — straight to your phone and inbox.',
    trustBadges: ['BDA APPROVED'],
    basePath: '/shyam-residency',
    proximityMargins: {
      desktop: '-24px',
      tablet: '-20px',
      mobile: '-20px'
    },
    about: {
      paragraphs: [
        'Amidst the hustle and bustle of Bengaluru city, Shyam Residency brings 115 plots spread across peaceful and carefully planned 7 acres and 20 guntas of land. This is a BDA-approved project that comes with wide roads, lush parks, walking paths, and a kind of community that makes your life enjoyable beyond the four walls.',
        'There is no denying that Magadi Road has become one of Bengaluru’s most sought-after residential corridors. These sites in Magadi Road sit quietly between affordability, accessibility, and infrastructure growth. This way, you get what most crowded neighbourhoods don’t: room to breathe, build, and grow.',
        'Shyam Residency is a natural extension of the legacy at Guru Punvaanii, and now we bring it to you in the city’s most promising growth corridors of Bengaluru.'
      ]
    },
    amenitiesDesc: 'Our clients trust us because we understand the lifestyle one needs for a good quality of life. Below, you can explore how the amenities we bring are planned to make your everyday moments feel special and unique.',
    amenities: [
      { icon: 'fas fa-tree', title: 'Lush Parks' },
      { icon: 'fas fa-walking', title: 'Walking Paths' },
      { icon: 'fas fa-road', title: '30 to 50 Feet Wide Roads' },
      { icon: 'fas fa-bolt', title: 'Underground Utilities' },
      { icon: 'fas fa-leaf', title: 'Landscaped Gardens' }
    ],
    cta: {
      title: 'Get the Shyam Residency layout & brochure',
      desc: 'Share a few details and we’ll send the full brochure — plot layouts, phase-wise pricing and BDA documents — straight to your phone and inbox.',
      tags: [
        { icon: 'fas fa-shield-alt', text: 'BDA APPROVED' },
        { icon: 'fas fa-map', text: 'Premium Sites' }
      ]
    },
    faqs: [
      {
        q: 'What plot sizes are available at Shyam Residency?',
        a: 'Shyam Residency brings 115 plots spread across peaceful and carefully planned 7 acres and 20 guntas of land.'
      },
      {
        q: 'Is Shyam Residency a BDA-approved project?',
        a: 'Yes, it is BDA-approved, meaning every plot you see is built as per the regulatory standards. So, when you invest in your future, you can get hassle-free ownership.'
      },
      {
        q: 'What amenities are available at Shyam Residency?',
        a: 'The project features wide roads (30 to 50 feet), underground utilities, lush parks, walking paths, and a thoughtfully designed community.'
      },
      {
        q: 'What makes Shyam Residency different from other plotted projects?',
        a: 'It is the foundation of legal clarity and quality infrastructure. BDA-approved with roads ranging from 30 to 50 feet in width and underground utilities.'
      },
      {
        q: 'Can I buy a plot at Shyam Residency as an investment?',
        a: 'Yes, considering that Peenya Industrial Area is just 3 km away and Bengaluru-Tumkur Expressway is 5 minutes away, it makes up a great investment opportunity.'
      }
    ],
    plots: {
      description: 'Build your dream home in a carefully planned BDA-approved community. Featuring premium plots spread across 7+ acres, surrounded by lush gardens, wide roads, and superior infrastructure.',
      type: 'grid',
      list: [
        {
          size: 'Premium Plots',
          sqft: 'Various Sizes',
          desc: 'Ideal for building a spacious and comfortable family home in a peaceful, secure community.',
          badge: 'Popular Choice',
          icon: 'fa-vector-square'
        }
      ]
    }
  },
  exotica: {
    id: 'exotica',
    shortName: 'Exotica',
    projectName: 'Guru Punvaanii Exotica',
    title: 'Exotica entrance with premium plots in Attibele',
    location: 'Off Anekal, Attibele Road',
    tagline: 'Residential Plots',
    formHeading: 'Exotica - Attibele Road',
    formSubHeading: '266 Plots across 16.75 Acres',
    approvalText: '266 Plots across 16.75 Acres',
    basePath: '/exotica',
    about: { paragraphs: [] },
    amenities: [],
    faqs: [],
    plots: { type: 'grid', list: [] }
  },
  etasha: {
    id: 'etasha',
    shortName: 'Etasha',
    projectName: 'Guru Punvaanii Etasha',
    title: 'Etasha entrance arch of a premium residential sites in tumkur',
    location: 'Sondekoppa, Off Tumkur Road',
    tagline: 'Residential Plots',
    formHeading: 'Etasha - Tumkur Road',
    formSubHeading: '191 Plots across 13.5 Acres',
    approvalText: '191 Plots across 13.5 Acres',
    basePath: '/etasha',
    about: { paragraphs: [] },
    amenities: [],
    faqs: [],
    plots: { type: 'grid', list: [] }
  },
  spn: {
    id: 'spn',
    shortName: 'SPN',
    projectName: 'Guru Punvaanii Shyam Residency',
    title: 'Sankeshwar Padmavathi Nagar residential project entrance of plots for sale in Kolar',
    location: 'Mulbagal, Kolar',
    tagline: 'Residential Plots',
    formHeading: 'SPN - Kolar',
    formSubHeading: '165 Plots across 14.75 Acres',
    approvalText: '165 Plots across 14.75 Acres',
    basePath: '/spn',
    about: { paragraphs: [] },
    amenities: [],
    faqs: [],
    plots: { type: 'grid', list: [] }
  },
  ekansh: {
    id: 'ekansh',
    shortName: 'Ekansh',
    projectName: 'Guru Punvaanii Ekansh',
    title: 'Ekansh entrance arch – residential plots in Mysore',
    location: 'Off Hunsur Road, Mysuru',
    tagline: 'Residential Plots',
    formHeading: 'Ekansh - Mysuru',
    formSubHeading: '79 Plots across 5 Acres',
    approvalText: '79 Plots across 5 Acres',
    basePath: '/ekansh',
    about: { paragraphs: [] },
    amenities: [],
    faqs: [],
    plots: { type: 'grid', list: [] }
  }
};

export function useProjectContext() {
  const { pathname } = useLocation();

  let projectKey = 'ernika';
  for (const key of Object.keys(PROJECTS_DATA)) {
    if (pathname.startsWith(PROJECTS_DATA[key].basePath)) {
      projectKey = key;
      break;
    }
  }

  const project = PROJECTS_DATA[projectKey];

  return {
    isElegance: project.id === 'elegance',
    isErnika: project.id === 'ernika',
    project,
    shortName: project.shortName,
    projectName: project.projectName,
    basePath: project.basePath,
  };
}
