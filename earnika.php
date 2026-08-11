<?php
/**
 * Template Name: Ernika Product Page
 * Template Post Type: page
 *
 * ──────────────────────────────────────────────────────────────
 *  SEO EDITABLE FIELDS  (WordPress Dashboard → Pages → Edit → 
 *  scroll down to "Custom Fields" panel)
 * ──────────────────────────────────────────────────────────────
 *  er_meta_description     – <meta name="description"> content
 *  er_about_heading        – About section H2
 *  er_about_p1             – About paragraph 1
 *  er_about_p2             – About paragraph 2
 *  er_about_p3             – About paragraph 3 (12.5 acres line)
 *  er_highlight_acres      – e.g. 12.5 Acres
 *  er_highlight_plots      – e.g. 220
 *  er_highlight_approval   – e.g. BMRDA & RERA
 *  er_highlight_sizes      – e.g. 30×40, 30×50 …
 *  er_video_id             – YouTube video ID for Videos section
 *  er_hero_video_id        – YouTube video ID for hero background
 *  er_faq_1_q / er_faq_1_a … er_faq_4_q / er_faq_4_a  – FAQ
 *  er_prox_edu_*           – Proximity: educational (1-6)
 *  er_prox_hosp_*          – Proximity: hospitals (1-4)
 *  er_prox_shop_*          – Proximity: shopping (1-3)
 *  er_prox_it_*            – Proximity: IT parks (1-5)
 *  er_brochure_url         – Direct URL to brochure PDF
 * ──────────────────────────────────────────────────────────────
 *
 *  HOW TO ENABLE CUSTOM FIELDS PANEL IN WORDPRESS:
 *  Dashboard → Screen Options (top right) → tick "Custom Fields"
 * ──────────────────────────────────────────────────────────────
 */
defined('ABSPATH') || exit;

while ( ob_get_level() ) { ob_end_clean(); }
do_action( 'get_header' );

$astra_header = get_template_directory() . '/template-parts/header/header.php';
$astra_footer = get_template_directory() . '/template-parts/footer/footer.php';
if ( ! file_exists( $astra_header ) ) $astra_header = get_template_directory() . '/header.php';
if ( ! file_exists( $astra_footer ) ) $astra_footer = get_template_directory() . '/footer.php';

/* ── Helper: get meta with fallback ── */
/* Strip WP-added slashes (\' \") and any stray quote chars wrapping the value */
function er_clean( $val ) {
    $val = wp_unslash( $val );                 // \' → '  and  \" → "
    $val = trim( $val );
    $val = trim( $val, "'\"" );                // drop a leading/trailing ' or "
    return trim( $val );
}
function er_meta( $key, $fallback = '' ) {
    $val = get_post_meta( get_the_ID(), $key, true );
    $val = ( $val !== '' && $val !== false ) ? $val : $fallback;
    return esc_html( er_clean( $val ) );
}
function er_meta_url( $key, $fallback = '' ) {
    $val = get_post_meta( get_the_ID(), $key, true );
    return ( $val !== '' && $val !== false ) ? esc_url( $val ) : esc_url( $fallback );
}
/* ── Helper: get meta as safe rich-text (allows <b>, <a>, <br> …) ── */
function er_meta_html( $key, $fallback = '' ) {
    $val = get_post_meta( get_the_ID(), $key, true );
    $val = ( $val !== '' && $val !== false ) ? $val : $fallback;
    return wp_kses_post( er_clean( $val ) );
}

/* ── Editable values (with original content as fallback) ── */
// $meta_desc      = er_meta( 'er_meta_description',
//     "Bengaluru's first Amazon-themed premium villa plots <b>community of villa plots in Anekal, Bengaluru.</b> Spread across 12.5 acres with 220 BMRDA-approved plots." );

$about_h2       = er_meta( 'er_about_heading',    'Ernika: Amazon-Themed Villa Plots in Anekal' );
$about_p1       = er_meta_html( 'er_about_p1',
    'Guru Punvaanii brings you Bengaluru\'s first Amazon Forest-themed premium villa plots in Anekal, Bengaluru. With 220 BMRDA-approved plots across 12.5 acres, the layout here was designed around trees and open corridors, so you can share the same air as the forest.
' );
$about_p2       = er_meta_html( 'er_about_p2' ,'At Ernika by <a href="https://www.gurupunvaanii.com">Guru Punvaanii</a>, we believe that you should not have to choose between calm and convenience. Keeping that in mind, this neighbourhood keeps you close to schools, hospitals, and everyday city life. This way, you will be surrounded by the greens for quiet and peace, while also connected to the main city for your everyday needs.');
$about_p3       = er_meta_html( 'er_about_p3');

$hl_acres       = er_meta( 'er_highlight_acres',    '12.5 Acres' );
$hl_plots       = er_meta( 'er_highlight_plots',    '220' );
$hl_approval1    = er_meta( 'er_highlight_approval1', 'BMRDA' );
$hl_approval2    = er_meta( 'er_highlight_approval2', 'RERA' );
$hl_sizes       = er_meta( 'er_highlight_sizes',    '30×40, 30×50, 40×40, 40×50 & ODD' );
$hl_location       = er_meta( 'er_location',    'Anekal' );

$hero_vid       = er_meta( 'er_hero_video_id',  'VNnsHctRUx0' );
$section_vid    = er_meta( 'er_video_id',        'sLBAywF0k44' );

$brochure_url   = 'https://gurupunvaanii.com/wp-content/uploads/2026/07/Ernika-Brochure-compressed-1.pdf';

/* ── FAQ ── */
$faqs = [
    [
        'q' => er_meta( 'er_faq_1_q', 'What is Ernika by Guru Punvaanii?' ),
    'a' => er_meta_html('er_faq_1_a', 'Ernika is a BMRDA-approved, Bengaluru\'s first Amazon-themed premium <b>community of villa plots in Anekal, Bengaluru.</b> It has <b>220 plots across 12.5 acres</b>, designed for families who want peaceful living without compromising on connectivity.'
)
        ],
	[
        'q' => er_meta( 'er_faq_2_q', 'Where is Ernika located, and how well is it connected?' ),
    'a' => er_meta_html('er_faq_2_a', 'Ernika is located in one of the fastest-growing corridors in Bengaluru, Anekal. You will get excellent connectivity to Electronic City, Hosur Road, schools, IT hubs, hospitals, and your everyday essentials.')
        ],
	[
        'q' => er_meta( 'er_faq_3_q', 'What makes Ernika different from other villa plot projects in Bengaluru?' ),
    'a' => er_meta_html('er_faq_3_a',' Ernika is Bengaluru\'s first Amazon forest-themed premium villa plot community. It is designed to keep you close to nature, greenery, and in touch with the theme, while not compromising on the modern lifestyle.'),
        ],
    [
        'q' => er_meta( 'er_faq_4_q', 'What plot sizes are available?' ),
        'a' => er_meta_html( 'er_faq_4_a', 'Ernika offers three sizes: 30×30 ft, 30×50 ft, and 40×40 ft, giving you the flexibility to build your dream home.' ),
    ],
    [
        'q' => er_meta( 'er_faq_5_q', 'Is Ernika a good investment?' ),
        'a' => er_meta_html( 'er_faq_5_a', 'Anekal is one of Bengaluru\'s fastest-growing corridors. Backed by Guru Punvaanii\'s track record of 12 completed projects, your investment is in trustworthy hands!' ),
    ],
    [
        'q' => er_meta( 'er_faq_6_q', 'Why should I trust Guru Punvaanii?' ),
        'a' => er_meta_html( 'er_faq_6_a', 'Guru Punvaanii has 12 completed projects, 3000+ happy families, and 38+ lakh sqft delivered across Bengaluru. We believe in Fair Policy and Fair Property — a promise we have always kept.' ),
    ],
];

/* ── Proximity ── */
$prox_edu  = [
    er_meta( 'er_prox_edu_1',  'Alliance University — 10 Min' ),
    er_meta( 'er_prox_edu_2',  'Vishwa Chetana Degree College — 1 Min' ),
    er_meta( 'er_prox_edu_3',  'Saraswathi Vidya Mandira — 5 Mins' ),
    er_meta( 'er_prox_edu_4',  'National Public School — 5 Mins' ),
    er_meta( 'er_prox_edu_5',  'Akshara College — 5 Mins' ),
    er_meta( 'er_prox_edu_6',  'New Baldwin International School — 5 Mins' ),
];
$prox_hosp = [
    er_meta( 'er_prox_hosp_1', 'Narayana Hrudayalaya — 20 Mins' ),
    er_meta( 'er_prox_hosp_2', 'Ganga Multi Specialty Hospital — 5 Mins' ),
    er_meta( 'er_prox_hosp_3', 'Aditi Hospital — 10 Mins' ),
    er_meta( 'er_prox_hosp_4', 'Vijaya Nursing Home — 5 Mins' ),
];
$prox_shop = [
    er_meta( 'er_prox_shop_1', 'M5 Mall — 25 Mins' ),
    er_meta( 'er_prox_shop_2', 'TRENDS — 5 Mins' ),
    er_meta( 'er_prox_shop_3', 'Reliance Smart Store — 5 Mins' ),
];
$prox_it   = [
    er_meta( 'er_prox_it_1',   'Velankani Tech Park — 25 Mins' ),
    er_meta( 'er_prox_it_2',   'Electronic City Industrial Township — 25 Mins' ),
    er_meta( 'er_prox_it_3',   'HCL Campus — 20 Mins' ),
    er_meta( 'er_prox_it_4',   'Jigani-Bommasandra Industrial — 15 Mins' ),
    er_meta( 'er_prox_it_5',   'Hosur Industrial Area SIPCOT — 20 Mins' ),
];

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<!--     <title><?php wp_title('|', true, 'right'); ?></title>
	bloginfo('|' , 'name');
    <meta name="description" content="<?php echo $meta_desc; ?>">
    ── SCHEMA.ORG STRUCTURED DATA (JSON-LD) ── -->
    <?php
    $page_url = get_permalink() ? get_permalink() : 'https://gurupunvaanii.com/ernika/';
    
    // FAQ Schema items
    $faq_schema_items = [];
    foreach ( $faqs as $f ) {
        $faq_schema_items[] = [
            '@type' => 'Question',
            'name'  => strip_tags( $f['q'] ),
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text'  => strip_tags( $f['a'] )
            ]
        ];
    }

    $schema_graph = [
        '@context' => 'https://schema.org',
        '@graph'   => [
            // WebPage Schema (Fixes MISSING_REQUIRED name for WebPage)
            [
                '@type' => 'WebPage',
                '@id'   => $page_url . '#webpage',
                'url'   => $page_url,
                'name'  => 'Ernika | Premium Villa Plots in Anekal Bangalore',
                'description' => strip_tags( $meta_desc ),
                'inLanguage'  => 'en-US',
                'isPartOf'    => [
                    '@type' => 'WebSite',
                    '@id'   => 'https://gurupunvaanii.com/#website',
                    'name'  => 'Guru Punvaanii Properties',
                    'url'   => 'https://gurupunvaanii.com'
                ]
            ],
            // Real Estate Listing (Fixes MISSING_REQUIRED about for RealEstateListing)
            [
                '@type' => 'RealEstateListing',
                '@id'   => $page_url . '#realestate',
                'url'   => $page_url,
                'name'  => 'Guru Punvaanii Ernika - Premium Villa Plots in Anekal, Bengaluru',
                'description' => strip_tags( $meta_desc ),
                'datePosted'  => '2026-05-01',
                'image' => 'https://gurupunvaanii.com/wp-content/uploads/2026/05/ErnikaArch-scaled.jpeg',
                'about' => [
                    '@type' => 'SingleFamilyResidence',
                    'name'  => 'Guru Punvaanii Ernika Gated Community Villa Plots',
                    'description' => 'Bengaluru\'s first Amazon-themed premium villa plots community in Anekal, Bengaluru.',
                    'image' => 'https://gurupunvaanii.com/wp-content/uploads/2026/05/ErnikaArch-scaled.jpeg',
                    'address' => [
                        '@type' => 'PostalAddress',
                        'addressLocality' => 'Anekal, Bengaluru',
                        'addressRegion'   => 'Karnataka',
                        'postalCode'      => '562106',
                        'addressCountry'  => 'IN'
                    ],
                    'geo' => [
                        '@type'     => 'GeoCoordinates',
                        'latitude'  => 12.7051389,
                        'longitude' => 77.7129444
                    ]
                ],
                'offers' => [
                    '@type' => 'AggregateOffer',
                    'priceCurrency' => 'INR',
                    'offerCount'    => '220',
                    'availability'  => 'https://schema.org/InStock'
                ]
            ],
            // Organization / Real Estate Builder Schema
            [
                '@type' => 'RealEstateAgent',
                '@id'   => 'https://gurupunvaanii.com/#organization',
                'name'  => 'Guru Punvaanii',
                'url'   => 'https://gurupunvaanii.com',
                'logo'  => 'https://gurupunvaanii.com/wp-content/uploads/2026/05/logo.png',
                'image' => 'https://gurupunvaanii.com/wp-content/uploads/2026/05/ErnikaArch-scaled.jpeg',
                'telephone' => '+91-8047192222',
                'address'   => [
                    '@type' => 'PostalAddress',
                    'addressLocality' => 'Bengaluru',
                    'addressRegion'   => 'Karnataka',
                    'addressCountry'  => 'IN'
                ]
            ],
            // Breadcrumb Navigation Schema
            [
                '@type' => 'BreadcrumbList',
                '@id'   => $page_url . '#breadcrumb',
                'itemListElement' => [
                    [
                        '@type'    => 'ListItem',
                        'position' => 1,
                        'name'     => 'Home',
                        'item'     => 'https://gurupunvaanii.com/'
                    ],
                    [
                        '@type'    => 'ListItem',
                        'position' => 2,
                        'name'     => 'Our Projects',
                        'item'     => 'https://gurupunvaanii.com/our-projects'
                    ],
                    [
                        '@type'    => 'ListItem',
                        'position' => 3,
                        'name'     => 'Ernika',
                        'item'     => $page_url
                    ]
                ]
            ],
            // Dynamic FAQ Schema
            [
                '@type' => 'FAQPage',
                '@id'   => $page_url . '#faq',
                'mainEntity' => $faq_schema_items
            ]
        ]
    ];
    ?>
    <script type="application/ld+json">
    <?php echo json_encode( $schema_graph, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ); ?>
    </script>
    <?php wp_head(); ?>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css">
    <style>
        html, body { margin:0!important; padding:0!important; overflow-x:hidden; }
        #wpadminbar { position:fixed!important; }
        #masthead,.site-header,.ast-primary-header-bar,.main-header-bar,.ast-main-header-wrap { background:transparent!important; background-color:transparent!important; box-shadow:none!important; position:absolute!important; top:0!important; left:0!important; right:0!important; z-index:999!important; width:100%!important; }
        .main-header-bar .main-header-menu a,.main-header-bar .ast-masthead-custom-menu-items a,#masthead .menu-item a { color:#fff!important; }
        .site-footer,#colophon,.ast-footer-widget-area,.footer-widget-area,.ast-above-footer-bar,.ast-above-footer,.ast-below-footer-bar,.ast-below-footer,[class*="ast-footer"],[class*="footer-widget"] { margin-top:0!important; padding-top:0!important; }

        /* ── GURU PUNVAANII SITE HEADER ── */
        .gp_custom-header { position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; width: 100% !important; z-index: 99999 !important; padding: 26px 0 16px 0 !important; background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%) !important; box-sizing: border-box !important; }
        .gp_header-inner { max-width: 85% !important; width: 85% !important; margin: 0 auto !important; display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 20px !important; box-sizing: border-box !important; }
        .gp_logo img { height: 70px !important; width: auto !important; display: block !important; object-fit: contain !important; }
        .gp_menu { display: flex !important; align-items: center !important; gap: 36px !important; list-style: none !important; margin: 0 !important; padding: 0 !important; }
        .gp_menu-link { color: #ffffff !important; font-family: 'Inter', sans-serif !important; font-size: 15px !important; font-weight: 600 !important; text-decoration: none !important; transition: all 0.3s ease !important; position: relative !important; padding: 8px 0 !important; }
        .gp_menu-link::after { content: '' !important; position: absolute !important; bottom: -2px !important; left: 0 !important; right: 0 !important; height: 3px !important; background: var(--er-gold, #c68a28) !important; border-radius: 2px !important; opacity: 0 !important; transform: scaleX(0) !important; transition: all 0.3s ease !important; transform-origin: center !important; }
        .gp_menu-link:hover, .gp_menu-link.active { color: #ffffff !important; }
        .gp_menu-link:hover::after, .gp_menu-link.active::after { opacity: 1 !important; transform: scaleX(1) !important; }
        .gp_social { display: flex !important; align-items: center !important; gap: 18px !important; }
        .gp_social a { background: transparent !important; color: var(--er-gold, #c68a28) !important; display: flex !important; align-items: center !important; justify-content: center !important; font-size: 20px !important; text-decoration: none !important; transition: all 0.3s ease !important; border-radius: 0 !important; width: auto !important; height: auto !important; }
        .gp_social a:hover { color: #ffffff !important; transform: translateY(-2px) !important; background: transparent !important; }
        .gp_menu-toggle { display: none !important; background: transparent !important; border: none !important; color: #ffffff !important; font-size: 22px !important; cursor: pointer !important; }
        /* ── FULLSCREEN MOBILE DROPDOWN MODAL (SLIDE FROM TOP) ── */
        .gp_mobile-modal { position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background: rgba(0,0,0,0.96) !important; backdrop-filter: blur(12px) !important; z-index: 999999 !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; padding: 40px 20px !important; box-sizing: border-box !important; transform: translateY(-100%) !important; opacity: 0 !important; visibility: hidden !important; transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, visibility 0.45s !important; }
        .gp_mobile-modal.active { transform: translateY(0) !important; opacity: 1 !important; visibility: visible !important; }
        .gp_mobile-close { position: absolute !important; top: 24px !important; right: 24px !important; width: 44px !important; height: 44px !important; border: none !important; border-radius: 0 !important; background: transparent !important; color: #ffffff !important; font-size: 26px !important; display: flex !important; align-items: center !important; justify-content: center !important; cursor: pointer !important; outline: none !important; box-shadow: none !important; padding: 0 !important; transition: transform 0.25s ease, color 0.25s ease !important; }
        .gp_mobile-close:hover { background: transparent !important; color: var(--er-gold, #c68a28) !important; transform: rotate(90deg) scale(1.15) !important; }
        .gp_mobile-modal-inner { width: 100% !important; text-align: center !important; }
        .gp_mobile-menu { list-style: none !important; padding: 0 !important; margin: 0 0 36px 0 !important; display: flex !important; flex-direction: column !important; align-items: center !important; gap: 22px !important; }
        .gp_m-link { color: #ffffff !important; font-family: 'Plus Jakarta Sans', sans-serif !important; font-size: 18px !important; font-weight: 500 !important; text-decoration: none !important; transition: color 0.3s ease !important; display: inline-block !important; letter-spacing: 0.02em !important; }
        .gp_m-link.active, .gp_m-link:hover { color: var(--er-gold, #c68a28) !important; }
        .gp_mobile-social { display: flex !important; align-items: center !important; justify-content: center !important; gap: 24px !important; margin-top: 8px !important; }
        .gp_mobile-social a { color: var(--er-gold, #c68a28) !important; font-size: 22px !important; text-decoration: none !important; transition: all 0.3s ease !important; display: flex !important; align-items: center !important; justify-content: center !important; }
        .gp_mobile-social a:hover { color: #ffffff !important; transform: translateY(-2px) !important; }
        @media (max-width: 991px) {
          .gp_nav, .gp_social { display: none !important; }
          .gp_menu-toggle { display: block !important; margin-left: auto !important; margin-right: -10px !important; }
          .gp_custom-header { padding: 14px 16px !important; }
          .gp_header-inner { width: 96% !important; max-width: 96% !important; }
          .gp_logo img { height: 44px !important; }
        }
        #er_page { --er-green:#1B3C34; --er-gold:#C58B2D; --er-gold-dark:#A67525; --er-text:#333333; --er-muted:#666666; --er-cream:#fffdf9; --er-white:#ffffff; --er-border:rgba(27,60,52,.18); --er-tr:all 0.3s ease; font-family:'Inter',sans-serif; color:var(--er-text); line-height:1.6; background:#fff; width:100%; margin-bottom:-50px !important; }
        #er_page *,#er_page *::before,#er_page *::after { box-sizing:border-box; margin:0; padding:0; }
        #er_page h1,#er_page h2,#er_page h3,#er_page h4 { font-family:'Playfair Display',Georgia,serif !important; font-weight:600 !important; color:#1e293b !important; line-height:1.25 !important; }
        #er_page a { text-decoration:none; color:inherit; }
        #er_page .er_intro-text p a,#er_page .er_section-heading p a,#er_page .er_faq-answer a { color:#1a73e8; text-decoration:none; }
        #er_page .er_intro-text p a:hover,#er_page .er_section-heading p a:hover,#er_page .er_faq-answer a:hover { color:#0c5bd1; }
        #er_page img { display:block; max-width:100%; }
        #er_page .er_reveal { opacity:0; transform:translateY(30px); transition:opacity .8s cubic-bezier(.4,0,.2,1),transform .8s cubic-bezier(.4,0,.2,1); }
        #er_page .er_reveal.er_active { opacity:1; transform:translateY(0); }
        #er_page .er_stagger-item { opacity:0; transform:translateY(20px); transition:opacity .6s ease-out,transform .6s ease-out; }
        #er_page .er_stagger-container.er_active .er_stagger-item { opacity:1; transform:translateY(0); }
        #er_page .er_section { width:100% !important; max-width:100% !important; box-sizing:border-box !important; padding:45px 0 !important; }
        #er_page .er_container { max-width:85% !important; width:85% !important; margin-left:auto !important; margin-right:auto !important; box-sizing:border-box !important; }

        #er_page .er_amenities-container,
        #er_page .er_spec-container,
        #er_page .er_gallery-container { width:100% !important; max-width:100% !important; margin:0 auto !important; position:relative; box-sizing:border-box !important; }
        #er_page .er_section-head, #er_page .er_section-heading { text-align:center; max-width:940px; margin:0 auto 28px !important; }
        #er_page .er_section-label { display:block; color:var(--er-gold); font-size:10px; font-weight:700; letter-spacing:.25em; text-transform:uppercase; margin-bottom:10px; }
        #er_page .er_section-h2, #er_page .er_section-heading h2 { font-family:'Playfair Display',Georgia,serif !important; font-size:clamp(1.8rem,3vw,2.8rem) !important; font-weight:600 !important; color:#1e293b !important; margin-bottom:12px !important; line-height:1.25 !important; }
        #er_page .er_gold-line { width:64px; height:3px; background:var(--er-gold); border-radius:2px; margin:0 auto 14px; }
        #er_page .er_section-desc, #er_page .er_section-heading p { color:var(--er-muted); max-width:700px; margin:12px auto 0; font-size:16px; line-height:1.7; font-family:'Inter',sans-serif; font-weight:400; }
        #er_page .er_btn { display:inline-block; padding:15px 35px; background:var(--er-gold); color:#fff; font-weight:600; border-radius:4px; border:none; cursor:pointer; text-transform:uppercase; letter-spacing:1px; font-size:14px; font-family:'Inter',sans-serif; transition:var(--er-tr); }
        #er_page .er_btn:hover { background:var(--er-gold-dark); transform:translateY(-2px); box-shadow:0 5px 15px rgba(0,0,0,.12); }
        #er_page .er_btn-sm { display:inline-flex; align-items:center; gap:8px; padding:11px 24px; background:var(--er-gold); color:#fff; font-weight:600; border-radius:999px; border:none; cursor:pointer; text-transform:uppercase; letter-spacing:0.5px; font-size:13px; font-family:'Inter',sans-serif; transition:var(--er-tr); box-shadow:0 4px 12px rgba(197,139,45,0.25); max-width:max-content; }
        #er_page .er_btn-sm:hover { background:var(--er-gold-dark); transform:translateY(-2px); box-shadow:0 6px 18px rgba(197,139,45,0.35); }
        #er_page .er_btn-sm svg { width:15px; height:15px; fill:currentColor; }
        #er_page .er_feature-bullets { list-style:none; padding:0; margin:0px 0 24px; display:grid; gap:10px; }
        #er_page .er_feature-bullets li { display:flex; align-items:center; gap:10px; font-size:14.5px; font-weight:600; color:#1e293b; }
        #er_page .er_feature-bullets li i { color:var(--er-gold); font-size:16px; flex-shrink:0; }
        #er_page .er_hero { height:100vh; min-height:100svh; background:#111; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; padding:0; }
        #er_page .er_hero-video { position:absolute; width:100vw; height:56.25vw; min-width:177.78vh; min-height:100%; border:0; top:50%; left:50%; transform:translate(-50%,-50%) scale(1.08); pointer-events:none; }
        #er_page .er_hero-overlay { position:absolute; inset:0; background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,transparent 45%); pointer-events:none; z-index:1; }
        #er_page .er_intro { background:#fff; }
        #er_page .er_intro-grid { display:grid; grid-template-columns:6fr 6fr; gap:40px; align-items:stretch; }
        #er_page .er_intro-image { position:relative; border-radius:8px; box-shadow:20px 20px 0 var(--er-gold); overflow:hidden; width:100%; height:100%; display:flex; flex-direction:column; }
        #er_page .er_intro-image img { width:100%; height:100%; min-height:100%; object-fit:cover; object-position:left center !important; filter:contrast(110%) saturate(105%); }
        #er_page .er_intro-text { display:flex; flex-direction:column; justify-content:center; height:100%; gap:20px;  }
        #er_page .er_intro-text h2 { font-family:'Playfair Display',Georgia,serif !important; font-size:clamp(1.8rem,4vw,2.6rem) !important; font-weight:600 !important; color:#1e293b !important;  line-height:1.25 !important; }
        #er_page .er_intro-text p { color:var(--er-muted); }
        #er_page .er_highlights-grid { display:grid; grid-template-columns:repeat(5, 1fr); gap:20px; text-align:center; }
        #er_page .er_highlight-card { text-align:center; padding:15px 10px; width:100%; }
        #er_page .er_highlight-card i { font-size:28px; color:var(--er-gold); margin-bottom:14px; display:block; }
        #er_page .er_highlight-card h3 { font-family:'Inter',sans-serif; font-size:24px; font-weight:600; color:var(--er-text); margin-bottom:8px; }
        #er_page #er_highlights,
        #er_page #er_gallery,
        #er_page #er_amenities { padding-top:32px !important; padding-bottom:32px !important; }
        #er_page .er_amenities { text-align:center; }
        #er_page .er_amenities-container, #er_page .er_highlights-container { max-width:100% !important; width:100% !important; margin:28px auto 0 !important; position:relative; padding:0 35px; }
        #er_page .er_amenities-slider .swiper-wrapper, #er_page .er_specification-slider .swiper-wrapper, #er_page .er_highlights-slider .swiper-wrapper { align-items:center !important; }
        #er_page .er_amenities-slider .swiper-slide, #er_page .er_specification-slider .swiper-slide, #er_page .er_highlights-slider .swiper-slide { height:auto; display:flex; align-items:center; justify-content:center; padding-top:0px; }
        #er_page .er_amenities-container .swiper-button-next,
        #er_page .er_amenities-container .swiper-button-prev,
        #er_page .er_highlights-container .swiper-button-next,
        #er_page .er_highlights-container .swiper-button-prev,
        #er_page .er_gallery-container .swiper-button-next,
        #er_page .er_gallery-container .swiper-button-prev,
        #er_page .er_spec-container .swiper-button-next,
        #er_page .er_spec-container .swiper-button-prev {
          color: var(--er-gold) !important;
          --swiper-navigation-color: var(--er-gold);
          --swiper-theme-color: var(--er-gold);
          background: #fff;
          width: 45px !important;
          height: 45px !important;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0,0,0,.1);
          z-index: 10;
          border: 1px solid rgba(0,0,0,.05);
          transform: translateY(-50%);
          top: 50% !important;
        }
        #er_page .er_amenities-container .swiper-button-next:hover,
        #er_page .er_amenities-container .swiper-button-prev:hover,
        #er_page .er_highlights-container .swiper-button-next:hover,
        #er_page .er_highlights-container .swiper-button-prev:hover,
        #er_page .er_gallery-container .swiper-button-next:hover,
        #er_page .er_gallery-container .swiper-button-prev:hover,
        #er_page .er_spec-container .swiper-button-next:hover,
        #er_page .er_spec-container .swiper-button-prev:hover {
          background: #fdfaf6;
        }
        #er_page .er_amenities-container .swiper-button-next,
        #er_page .er_highlights-container .swiper-button-next,
        #er_page .er_gallery-container .swiper-button-next,
        #er_page .er_spec-container .swiper-button-next { right:0!important; }
        #er_page .er_amenities-container .swiper-button-prev,
        #er_page .er_highlights-container .swiper-button-prev,
        #er_page .er_gallery-container .swiper-button-prev,
        #er_page .er_spec-container .swiper-button-prev { left:0!important; }
        #er_page .swiper-button-next:after,
        #er_page .swiper-button-prev:after { font-size:18px!important; font-weight:bold; color: var(--er-gold) !important; }
        #er_page .swiper-pagination-bullet-active { background:var(--er-gold)!important; }
        #er_page .er_amenity-item { width:100%; min-height:160px; padding:10px 15px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; gap:16px; font-size:14px; font-weight:600; line-height:1.4; color:var(--er-muted); margin:auto; }
        #er_page .er_amenity-icon { width:136px; height:64px; display:flex; align-items:center; justify-content:center; border:1.5px solid var(--er-gold); border-radius:999px; color:var(--er-gold); font-size:24px; flex-shrink:0; transition:all 0.3s; }
        #er_page .er_amenity-item:hover .er_amenity-icon { background:var(--er-gold); color:#fff; }
        #er_page #er_gallery { max-width:85%; width:85%; margin:auto; text-align:center; }
        #er_page #er_gallery h2, #er_page #er_gallery p { text-align:center; margin-left:auto; margin-right:auto; width: 78%; }
        #er_page .er_gallery-container { max-width:100%; margin:28px auto 0 !important; position:relative; padding:0 15px; }
        #er_page .er_gallery-slider { padding: 10px 0 28px !important; }
        #er_page .er_gallery-slider .swiper-slide { height: auto; display: flex; }
        #er_page .er_gallery-item { width:100%; border-radius:16px; overflow:hidden; background:#fff; border:1px solid #f1f5f9; box-shadow:0 4px 20px rgba(0,0,0,.05); cursor:pointer !important; transition:transform .3s, box-shadow .3s; display:flex; flex-direction:column; }
        #er_page .er_gallery-item:hover { transform:translateY(-6px); box-shadow:0 12px 30px rgba(0,0,0,.1); }
        #er_page .er_gallery-img { width:100%; height:80vh; min-height:80vh; overflow:hidden; position:relative; border-radius:16px; cursor:pointer !important; }
        #er_page .er_gallery-img img { width:100%; height:100%; min-height:80vh; object-fit:cover; border-radius:16px; transition:transform .7s; cursor:pointer !important; }
        #er_page .er_gallery-item:hover .er_gallery-img img { transform:scale(1.04); }
        #er_page .er_tab-list { display:flex; justify-content:center; margin-bottom:24px; flex-wrap:wrap; gap:8px; max-width:100%; margin-left:auto; margin-right:auto; }
        #er_page .er_tab-btn { min-width:150px; padding:12px 24px; border:1px solid var(--er-border); background:#f9fafb; color:var(--er-text); font:inherit; font-family:'Inter',sans-serif; font-size:12px; font-weight:700; cursor:pointer; border-radius:8px; transition:all .3s; }
        #er_page .er_tab-btn.er_active { background:var(--er-gold); color:#fff; border-color:var(--er-gold); }
        #er_page .er_video-wrap { width:100% !important; max-width:100% !important; margin:0 auto !important; display:flex !important; justify-content:center !important; }
        #er_page .er_video-frame { aspect-ratio:16/7 !important; width:100% !important; max-width:100% !important; margin:0 auto !important; border-radius:16px !important; overflow:hidden !important; position:relative !important; background:#111 !important; border:0 !important; box-shadow:0 10px 30px rgba(0,0,0,0.1) !important; }
        #er_page .er_video-frame iframe { width:100% !important; height:100% !important; border:0 !important; display:block !important; }
        #er_page .er_spec-container { max-width:85%; width:85%; margin:auto; position:relative; padding:0 30px; margin-top:0px; }
        #er_page .er_specification-slider { padding:0px 0 0px; }
        #er_page .er_spec-item { width:100%; min-height:160px; padding:10px 15px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; gap:16px; font-size:14px; font-weight:600; line-height:1.4; color:var(--er-muted); margin:auto; }
        #er_page .er_spec-icon { width:136px; height:64px; display:flex; align-items:center; justify-content:center; border:1.5px solid var(--er-gold); border-radius:999px; color:var(--er-gold); font-size:24px; flex-shrink:0; transition:all 0.3s; }
        #er_page .er_spec-item:hover .er_spec-icon { background:var(--er-gold); color:#fff; }
        #er_page #er_location { padding: 40px 0 0 0; margin: 0 auto; }
        #er_page .er_location-panel { display:none; }
        #er_page .er_location-panel.er_active { display:block; }
        #er_page .er_map-frame { width:100%; border:0; display:block; height:80vh !important; min-height:80vh !important; }
        #er_page .er_proximity-list { border:1px solid var(--er-border); background:#fff; }
        #er_page .er_proximity-item+.er_proximity-item { border-top:1px solid var(--er-border); }
        #er_page .er_proximity-question { width:100%; padding:16px 20px; border:0; background:#fff; display:flex; align-items:center; gap:12px; color:#1e293b; font:inherit; font-weight:600; text-align:left; cursor:pointer; line-height:1.4; }
        #er_page .er_proximity-answer { display:none; padding:0 20px 18px 42px; color:var(--er-muted); }
        #er_page .er_proximity-item.er_active .er_proximity-answer { display:block; }
        #er_page .er_proximity-answer p { margin:12px 0; }
        #er_page .er_proximity-answer i { color:var(--er-muted); margin-right:10px; }
        #er_page .er_proximity-iframe-wrap { position: relative !important; overflow: hidden !important; height: 80vh !important; min-height:420px; !important; border-radius: 16px !important; border: 1px solid #e2e8f0 !important; background: #fff !important; margin-bottom: 16px !important; box-shadow: 0 10px 30px rgba(0,0,0,0.05) !important; }
        #er_page .er_proximity-iframe-wrap iframe { position: absolute !important; top: -62px !important; left: 0 !important; width: 100% !important; max-width: 100% !important; height: calc(100% + 60px) !important; border: 0 !important; display: block !important; border-radius: 0 !important; overflow: hidden !important; }
        #er_page .er_proximity-open-btn { position: absolute !important; bottom: 20px !important; right: 20px !important; z-index: 10 !important; display: inline-flex !important; align-items: center !important; gap: 8px !important; padding: 12px 22px !important; background: var(--er-gold) !important; color: #ffffff !important; font-family: 'Inter', sans-serif !important; font-size: 13px !important; font-weight: 700 !important; border-radius: 999px !important; box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important; text-decoration: none !important; transition: all 0.3s ease !important; }
        #er_page .er_proximity-open-btn:hover { background: var(--er-gold-dark) !important; transform: translateY(-2px) !important; box-shadow: 0 12px 30px rgba(0,0,0,0.4) !important; color: #ffffff !important; }

        #er_page .er_faq { background:#fff; padding: 36px 0 60px 0 !important; margin-bottom:-50px !important; position:relative !important; z-index:2 !important; }
        #er_page .er_faq-container { max-width:960px !important; width:100% !important; margin:24px auto 0; display:flex; flex-direction:column; gap:12px; }
        #er_page .er_faq-item { background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,.04); border: none; }
        #er_page .er_faq-question { padding:20px 24px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:600; color:#1e293b; transition:color .3s; line-height:1.4; text-align:left; }
        #er_page .er_faq-question:hover { color:var(--er-gold); }
        #er_page .er_faq-answer { padding:0 24px; max-height:0; overflow:hidden; transition:all .3s ease-out; color:#334155; font-size:15px; font-weight:450; line-height:1.75; }
        #er_page .er_faq-item.er_active .er_faq-answer { padding:0 24px 20px; max-height:300px; border-top:1px solid #f1f5f9; padding-top:16px; }
        #er_page .er_faq-question i { font-size:12px; color:var(--er-gold); transition:transform .3s; }
        #er_page .er_faq-item.er_active .er_faq-question i { transform:rotate(180deg); }
        /* ── MODAL DIALOG (EKA DESIGN SYSTEM) ── */
        :root, #er_page, .er_modal {
            --er-modal-gold: #c68a28;
            --er-modal-dark: #1e293b;
            --er-modal-slate: #64748b;
        }
        .er_modal { position:fixed; inset:0; z-index:99999; display:none; align-items:center; justify-content:center; padding:20px; background:rgba(15,23,42,0.65) !important; backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); opacity:0; transition:opacity .25s ease !important; }
        .er_modal.er_active { display:flex !important; opacity:1 !important; }
        .er_modal-dialog { width:min(94%, 440px) !important; background:#ffffff !important; border-radius:20px !important; box-shadow:0 25px 60px -15px rgba(0,0,0,0.35) !important; padding:28px 24px 0 !important; position:relative !important; box-sizing:border-box !important; border:1px solid rgba(255,255,255,0.9) !important; overflow:hidden !important; max-height:92vh !important; transform:scale(0.95); transition:transform .25s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important; }
        .er_modal.er_active .er_modal-dialog { transform:scale(1) !important; }
        .er_modal-pattern { position:absolute !important; top:0 !important; right:0 !important; width:180px !important; height:150px !important; background-image:linear-gradient(to right, rgba(198,138,40,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(198,138,40,0.14) 1px, transparent 1px) !important; background-size:16px 16px !important; pointer-events:none !important; z-index:1 !important; mask-image:radial-gradient(circle at top right, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%) !important; -webkit-mask-image:radial-gradient(circle at top right, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%) !important; }
        .er_watermark-pin { position:absolute !important; top:18px !important; right:54px !important; opacity:0.35 !important; pointer-events:none !important; z-index:1 !important; }
        .er_modal-close { position:absolute !important; top:14px !important; right:14px !important; width:32px !important; height:32px !important; border:none !important; border-radius:50% !important; background:transparent !important; color:#64748b !important; cursor:pointer !important; transition:all .2s ease !important; display:flex !important; align-items:center !important; justify-content:center !important; box-shadow:none !important; z-index:99 !important; outline:none !important; padding:0 !important; }
        .er_modal-close:hover { background:transparent !important; color:#1e293b !important; transform:rotate(90deg) scale(1.15) !important; }
        .er_modal-close i { font-size:18px !important; pointer-events:none !important; line-height:1 !important; }
        .er_modal-header { margin-bottom:16px !important; text-align:left !important; position:relative !important; z-index:2 !important; }
        .er_modal-brand-tag { display:inline-flex !important; align-items:center !important; gap:6px !important; font-size:10px !important; font-weight:700 !important; font-family:'Inter',sans-serif !important; letter-spacing:.12em !important; text-transform:uppercase !important; color:#c68a28 !important; margin-bottom:8px !important; }
        .er_brand-icon { width:9px !important; height:9px !important; border-radius:50% 50% 50% 0 !important; border:1.5px solid #c68a28 !important; transform:rotate(-45deg) !important; display:inline-block !important; }
        #er_brochureTitle { font-family:'Playfair Display',serif !important; color:#1e293b !important; font-size:1.55rem !important; font-weight:600 !important; margin:0 0 6px 0 !important; line-height:1.25 !important; letter-spacing:-0.02em !important; }
        #er_brochureTitle em { font-style:italic !important; color:#c68a28 !important; font-weight:500 !important; }
        .er_modal-header p { font-family:'Inter',sans-serif !important; font-size:12.5px !important; color:#64748b !important; font-weight:400 !important; line-height:1.5 !important; margin:0 !important; }
        .er_modal-form { display:flex !important; flex-direction:column !important; gap:12px !important; position:relative !important; z-index:2 !important; }
        .er_form-row { display:grid !important; grid-template-columns:1fr 1fr !important; gap:12px !important; }
        @media(max-width:480px){ .er_form-row { grid-template-columns:1fr !important; gap:12px !important; } }
        .er_full-width { width:100% !important; }
        .er_form-group { display:flex !important; flex-direction:column !important; gap:4px !important; }
        .er_form-group label { font-family:'Inter',sans-serif !important; font-size:10px !important; font-weight:800 !important; text-transform:uppercase !important; letter-spacing:.08em !important; color:#1e293b !important; }
        .er_input-wrap { position:relative !important; width:100% !important; }
        .er_input-icon { position:absolute !important; left:13px !important; top:50% !important; transform:translateY(-50%) !important; color:#94a3b8 !important; font-size:13px !important; pointer-events:none !important; transition:color .3s ease !important; }
        .er_input-wrap input { width:100% !important; height:42px !important; padding:0 14px 0 38px !important; border:1px solid #f3e9d8 !important; border-radius:10px !important; font-size:13px !important; font-family:'Inter',sans-serif !important; color:#1e293b !important; background:#fdfbf7 !important; box-sizing:border-box !important; transition:all 0.3s ease !important; outline:none !important; }
        .er_input-wrap input::placeholder { color:#a0aec0 !important; font-weight:400 !important; }
        .er_input-wrap input:focus { border-color:#c68a28 !important; background:#ffffff !important; box-shadow:0 0 0 3px rgba(198,138,40,0.12) !important; }
        .er_modal-submit-btn { width:100% !important; height:44px !important; display:inline-flex !important; justify-content:center !important; align-items:center !important; gap:8px !important; padding:0 20px !important; border-radius:10px !important; font-size:13.5px !important; font-weight:700 !important; font-family:'Inter',sans-serif !important; letter-spacing:.02em !important; text-transform:none !important; background:linear-gradient(180deg, #c78629 0%, #b86e20 100%) !important; border:none !important; color:#ffffff !important; box-shadow:0 8px 20px rgba(198,138,40,0.28) !important; cursor:pointer !important; transition:all .25s ease !important; }
        .er_modal-submit-btn:hover { background:linear-gradient(180deg, #d38f2f 0%, #c47623 100%) !important; transform:translateY(-1px) !important; box-shadow:0 10px 24px rgba(198,138,40,0.35) !important; }
        .er_modal-submit-btn svg { transition:transform .3s ease !important; width:16px !important; height:16px !important; }
        .er_modal-submit-btn:hover svg { transform:translateY(-2px) translateX(2px) !important; }
        .er_modal-microcopy { text-align:center !important; font-size:11px !important; color:#94a3b8 !important; font-weight:400 !important; margin:2px 0 16px 0 !important; }
        .er_otp-box, .eka_otp-box { width:44px !important; height:50px !important; padding:0 !important; margin:0 !important; text-align:center !important; line-height:50px !important; font-size:22px !important; font-weight:700 !important; border:1.5px solid #ddd !important; border-radius:8px !important; background:#fffdf7 !important; outline:none !important; box-sizing:border-box !important; display:inline-block !important; vertical-align:middle !important; }
        .er_otp-box:focus, .eka_otp-box:focus { border-color:#c68a28 !important; box-shadow:0 0 0 3px rgba(198,138,40,0.2) !important; background:#ffffff !important; }
        .er_modal-footer-bar { display:grid !important; grid-template-columns:repeat(2, 1fr) !important; background:#fbf7f0 !important; border-top:1px solid #f3e9d8 !important; margin:0 -24px !important; padding:12px 14px !important; text-align:center !important; position:relative !important; z-index:2 !important; }
        .er_trust-item { display:flex !important; align-items:center !important; justify-content:center !important; gap:8px !important; }
        .er_trust-item svg { width:20px !important; height:20px !important; stroke:#c68a28 !important; stroke-width:2 !important; }
        .er_trust-item span { font-size:10px !important; font-weight:700 !important; letter-spacing:.05em !important; color:#855c1b !important; line-height:1.2 !important; text-transform:uppercase !important; text-align:left !important; }

        /* ── GALLERY LIGHTBOX SLIDER MODAL ── */
        .er_lightbox-modal { position:fixed !important; top:0 !important; left:0 !important; width:100vw !important; height:100vh !important; background:rgba(0,0,0,0.92) !important; backdrop-filter:blur(10px) !important; -webkit-backdrop-filter:blur(10px) !important; z-index:999999 !important; display:none !important; align-items:center !important; justify-content:center !important; opacity:0 !important; transition:opacity .3s ease !important; box-sizing:border-box !important; padding:20px !important; }
        .er_lightbox-modal.er_active { display:flex !important; opacity:1 !important; }
        .er_lightbox-content { position:relative !important; max-width:90vw !important; max-height:85vh !important; display:flex !important; flex-direction:column !important; align-items:center !important; justify-content:center !important; z-index:10 !important; }
        .er_lightbox-content img { max-width:88vw !important; max-height:78vh !important; object-fit:contain !important; border-radius:12px !important; box-shadow:0 20px 50px rgba(0,0,0,0.6) !important; transition:transform 0.25s ease !important; user-select:none !important; }
        .er_lightbox-caption { margin-top:14px !important; color:#ffffff !important; font-family:'Inter',sans-serif !important; font-size:14px !important; font-weight:500 !important; text-align:center !important; text-shadow:0 2px 4px rgba(0,0,0,0.8) !important; letter-spacing:0.3px !important; }
        .er_lightbox-prev, .er_lightbox-next { position:fixed !important; top:50% !important; transform:translateY(-50%) !important; width:45px !important; height:45px !important; border-radius:50% !important; background:#ffffff !important; color:var(--er-gold, #c68a28) !important; border:1px solid rgba(0,0,0,0.05) !important; box-shadow:0 4px 15px rgba(0,0,0,0.2) !important; display:flex !important; align-items:center !important; justify-content:center !important; cursor:pointer !important; z-index:9999999 !important; transition:all 0.3s ease !important; outline:none !important; padding:0 !important; }
        .er_lightbox-prev { left:24px !important; }
        .er_lightbox-next { right:24px !important; }
        .er_lightbox-prev:hover, .er_lightbox-next:hover { background:#fdfaf6 !important; color:var(--er-gold-dark, #a67525) !important; transform:translateY(-50%) scale(1.08) !important; box-shadow:0 6px 20px rgba(0,0,0,0.3) !important; }
        .er_lightbox-prev i, .er_lightbox-next i { font-size:18px !important; font-weight:bold !important; color:var(--er-gold, #c68a28) !important; line-height:1 !important; }
        .er_lightbox-close { position:fixed !important; top:20px !important; right:24px !important; width:44px !important; height:44px !important; border-radius:50% !important; background:rgba(255,255,255,0.18) !important; color:#ffffff !important; border:1px solid rgba(255,255,255,0.3) !important; display:flex !important; align-items:center !important; justify-content:center !important; cursor:pointer !important; z-index:9999999 !important; transition:all 0.3s ease !important; outline:none !important; padding:0 !important; }
        .er_lightbox-close:hover { background:#ffffff !important; color:#000000 !important; transform:rotate(90deg) scale(1.1) !important; }
        .er_lightbox-close i { font-size:20px !important; line-height:1 !important; }
        @media(max-width:768px) {
            .er_lightbox-prev { left:10px !important; width:40px !important; height:40px !important; }
            .er_lightbox-next { right:10px !important; width:40px !important; height:40px !important; }
            .er_lightbox-close { top:14px !important; right:14px !important; width:38px !important; height:38px !important; }
            .er_lightbox-content img { max-width:94vw !important; max-height:72vh !important; }
        }
        .er_trust-item svg { width:20px !important; height:20px !important; stroke:#c68a28 !important; stroke-width:2 !important; }
        .er_trust-item span { font-size:10px !important; font-weight:700 !important; letter-spacing:.05em !important; color:#855c1b !important; line-height:1.2 !important; text-transform:uppercase !important; text-align:left !important; }

        @media(max-width:768px) {
            #er_page #er_gallery { max-width:98% !important; width:98% !important; }
            #er_page .er_gallery-container { padding:0 4px !important; }
            #er_page .er_gallery-container .swiper-button-prev { left:-4px !important; }
            #er_page .er_gallery-container .swiper-button-next { right:-4px !important; }
            #er_page .er_section { padding:45px 0; }
            #er_page .er_hero { padding:0 !important; }
            #er_page .er_container { padding:0 4px !important; }
            #er_page .er_section-heading h2,
            #er_page .er_intro-text h2 { font-size:2rem; }
            #er_page .er_intro-grid { display: flex !important; flex-direction: column-reverse !important; gap: 30px !important; }
            #er_page .er_intro-image { box-shadow:12px 12px 0 var(--er-gold); height:auto !important; min-height:0; width:100% !important; }
            #er_page .er_intro-image img { height:320px !important; max-height:320px !important; object-fit:cover; object-position:left center !important; }
            #er_page .er_gallery-img,
            #er_page .er_gallery-img img { height:381px !important; min-height:381px !important; }
            #er_page .er_proximity-iframe-wrap { height:540px !important; min-height:540px !important; overflow:hidden !important; }
            #er_page .er_highlights-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:30px 18px; }
            #er_page .swiper-pagination { display: none !important; }
            #er_page .er_container,
            #er_page .er_amenities-container,
            #er_page .er_spec-container,
            #er_page #er_gallery,
            #er_page .er_gallery-container { max-width: 96% !important; width: 96% !important; padding-left: 4px !important; padding-right: 4px !important; margin-left: auto !important; margin-right: auto !important; }
            #er_page .er_tab-list { display: flex !important; flex-direction: row !important; flex-wrap: nowrap !important; justify-content: center !important; gap: 8px !important; width: 100% !important; max-width: 100% !important; }
            #er_page .er_tab-btn { min-width: 0 !important; flex: 1 1 auto !important; padding: 12px 14px !important; text-align: center !important; white-space: nowrap !important; }
            #er_page .er_video-frame { min-height:260px; }
            #er_page .er_section { padding:24px 0 !important; }
            #er_page #er_specification,
            #er_page #er_videos,
            #er_page #er_location { padding:18px 0 20px 0 !important; margin-top:0 !important; margin-bottom:0 !important; }
            #er_page #er_videos .er_section-head,
            #er_page #er_specification .er_section-head { margin-bottom:18px !important; }
            #er_page #er_videos .er_tab-list { margin-bottom:24px !important; }
            #er_page img,
            #er_page .er_about-img img,
            #er_page .er_dev-frame-main img,
            #er_page .er_dev-frame-sub img,
            #er_page .er_trust-frame-main img { max-width: 100% !important; height: auto !important; max-height: 360px !important; object-fit: cover !important; border-radius: 12px; }
            #er_page .er_gallery-img,
            #er_page .er_gallery-img img { height: 220px !important; min-height: 220px !important; max-height: 220px !important; object-fit: cover !important; border-radius: 12px !important; }
            #er_page .swiper-button-prev,
            #er_page .swiper-button-next { width: 32px !important; height: 32px !important; margin-top: 0 !important; }
            #er_page .swiper-button-prev:after,
            #er_page .swiper-button-next:after { font-size: 12px !important; }
            #er_page .er_spec-item { min-height:160px; font-size:15px; padding:15px 10px; }
            #er_page .er_spec-icon { width:110px; height:56px; font-size:20px; }
        }
        @media(max-width:480px) {
            #er_page .er_section { padding:40px 0; }
            #er_page .er_hero { padding:0 !important; }
            #er_page .er_container { padding:0 4px !important; }
            #er_page .er_section-heading h2,
            #er_page .er_intro-text h2 { font-size:1.7rem; }
            #er_page .er_tab-list { flex-wrap:nowrap; gap:8px; }
            #er_page .er_tab-btn { flex:1 1 50%; min-width:0; width:auto; text-align:center; padding:10px 12px; font-size:13px; }
            #er_page .er_btn { width:100%; text-align:center; }
            #er_page .er_video-frame { min-height:210px; }
            #er_page .er_specification-slider { padding:32px 14px 48px; }
            #er_page .er_spec-item { font-size:15px; min-height:130px; }
            #er_page .er_proximity-question { padding:14px 16px; }
            #er_page .er_proximity-answer { padding:0 16px 16px 34px; }
            #er_page .er_highlights-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px 14px; }
            #er_page .er_modal-dialog { padding:28px 20px; }
            #er_page .er_amenities-container { padding:0 4px !important; }
        }
    </style>
</head>

<body <?php body_class('er_body'); ?>>
<?php wp_body_open(); ?>
<header class="gp_custom-header">
  <div class="gp_header-inner">
    <div class="gp_logo">
      <a href="https://gurupunvaanii.com/">
        <img src="https://gurupunvaanii.com/wp-content/uploads/2026/03/Guru-Punvaanii-Logo-300x172.png" alt="Guru Punvaanii Logo">
      </a>
    </div>
    <nav class="gp_nav">
      <ul class="gp_menu">
        <li><a href="https://gurupunvaanii.com/" class="gp_menu-link">Home</a></li>
        <li><a href="https://gurupunvaanii.com/our-projects/" class="gp_menu-link">Our Projects</a></li>
        <li><a href="https://gurupunvaanii.com/about-us/" class="gp_menu-link">About Us</a></li>
        <li><a href="https://gurupunvaanii.com/blog/" class="gp_menu-link">Blog</a></li>
        <li><a href="https://gurupunvaanii.com/contact-us/" class="gp_menu-link">Contact Us</a></li>
      </ul>
    </nav>
    <div class="gp_social">
      <a href="https://www.instagram.com/gurupunvaanii/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="https://www.facebook.com/gurupunvaanii/" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="https://www.youtube.com/@GuruPunvaanii" target="_blank" rel="noopener" aria-label="Youtube"><i class="fab fa-youtube"></i></a>
      <a href="https://x.com/gurupunvaanii" target="_blank" rel="noopener" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
    </div>
    <button class="gp_menu-toggle" aria-label="Menu Toggle" onclick="document.querySelector('.gp_mobile-modal').classList.add('active')">
      <i class="fas fa-bars"></i>
    </button>
  </div>
</header>

<div class="gp_mobile-modal">
  <button class="gp_mobile-close" aria-label="Close Menu" onclick="this.closest('.gp_mobile-modal').classList.remove('active')">
    <i class="fas fa-times"></i>
  </button>
  <div class="gp_mobile-modal-inner">
    <ul class="gp_mobile-menu">
      <li><a href="https://gurupunvaanii.com/" class="gp_m-link">Home</a></li>
      <li><a href="https://gurupunvaanii.com/our-projects/" class="gp_m-link">Our Projects</a></li>
      <li><a href="https://gurupunvaanii.com/about-us/" class="gp_m-link">About Us</a></li>
      <li><a href="https://gurupunvaanii.com/blog/" class="gp_m-link">Blog</a></li>
      <li><a href="https://gurupunvaanii.com/contact-us/" class="gp_m-link">Contact Us</a></li>
    </ul>
     <div class="gp_mobile-social">
      <a href="https://www.instagram.com/gurupunvaanii/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="https://www.facebook.com/gurupunvaanii/" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="https://www.youtube.com/@GuruPunvaanii" target="_blank" rel="noopener" aria-label="Youtube"><i class="fab fa-youtube"></i></a>
      <a href="https://x.com/gurupunvaanii" target="_blank" rel="noopener" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
    </div>
  </div>
</div>

<div id="er_page">

    <!-- HERO -->
    <section class="er_hero er_reveal" aria-label="Ernika project video">
        <iframe class="er_hero-video"
            src="https://www.youtube.com/embed/<?php echo esc_attr( $hero_vid ); ?>?autoplay=1&mute=1&controls=0&loop=1&playlist=<?php echo esc_attr( $hero_vid ); ?>&playsinline=1&rel=0&modestbranding=1"
            title="Ernika project walkthrough video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen></iframe>
        <!-- <div class="er_hero-overlay"></div> -->
    </section>

    <!-- ABOUT -->
    <section id="er_about" class="er_intro er_section er_reveal">
        <div class="er_container er_intro-grid">
            <div class="er_intro-image er_reveal">
                <img src="https://gurupunvaanii.com/wp-content/uploads/2026/05/ErnikaArch-scaled.jpeg"
                     alt="Ernika entrance arch">
            </div>
            <div class="er_intro-text">
                <h1 class="er_reveal"><?php echo $about_h2; ?></h1>
                <p class="er_reveal" style="transition-delay:.1s"><?php echo $about_p1; ?></p>
                <p class="er_reveal" style="transition-delay:.2s"><?php echo $about_p2; ?></p>
                <p class="er_reveal" style="transition-delay:.3s"><?php echo $about_p3; ?></p>
                <ul class="er_feature-bullets er_reveal" style="transition-delay:.35s;">
<!--                     <li><i class="fas fa-check-circle"></i> BMRDA &amp; RERA Approved Layout</li> -->
                    <li><i class="fas fa-check-circle"></i> 220 BMRDA-approved villa plots across 12.5 acres</li>
                    <li><i class="fas fa-check-circle"></i> Bengaluru's First Amazon Forest-Themed Project</li>
					<li><i class="fas fa-check-circle"></i> A to Z Amenities - (26+ Amenities)</li>
                    <li><i class="fas fa-check-circle"></i> RC Roads &amp; Underground Utilities</li>
<!--                     <li><i class="fas fa-check-circle"></i> Prime Location with High Investment Growth Potential</li> -->
                    <li><i class="fas fa-check-circle"></i> Prime Location in Anekal, Bengaluru</li>
                </ul>
                <div class="er_reveal" style="transition-delay:.4s">
                    <button class="er_btn-sm" type="button" data-er-open-brochure>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                        <span>Download Brochure</span>
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- HIGHLIGHTS -->
    <section id="er_highlights" class="er_section er_reveal">
        <div class="er_container">
            <div class="er_section-head er_reveal">
                <span class="er_section-label">PROJECT AT A GLANCE</span>
                <h2 class="er_section-h2">Project Highlights</h2>
                <div class="er_gold-line"></div>
            </div>
            <div class="er_highlights-container">
                <div class="swiper er_highlights-slider er_stagger-container">
                    <div class="swiper-wrapper">
                        <?php
                        $highlights = [
                            ['fas fa-map-marked-alt', $hl_acres, 'Land Area'],
                            ['fas fa-border-all', $hl_plots, 'Villa Plots'],
                            ['fas fa-swimming-pool', '26+', 'Amenities'],
                            ['fas fa-file-signature', $hl_approval1, 'Approved'],
                            ['fas fa-file-signature', $hl_approval2, 'Approved'],
                            ['fas fa-location-dot', $hl_location, 'Bengaluru'],

                        ];
                        // Output twice for smooth Swiper loop (10 slides total for slidesPerView 5)
                        for ( $r = 0; $r < 2; $r++ ) :
                            foreach ( $highlights as $hl ) : ?>
                        <div class="swiper-slide">
                            <div class="er_highlight-card er_stagger-item">
                                <i class="<?php echo esc_attr($hl[0]); ?>"></i>
                                <h3><?php echo esc_html($hl[1]); ?></h3>
                                <p><?php echo esc_html($hl[2]); ?></p>
                            </div>
                        </div>
                        <?php endforeach; endfor; ?>
                    </div>
                    <div class="swiper-pagination" style="bottom:-30px;"></div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        </div>
    </section>

    <!-- GALLERY -->
    <section id="er_gallery" class="er_section er_container er_reveal">
        <div class="er_section-head er_reveal">
            <span class="er_section-label">VISUAL SHOWCASE</span>
            <h2 class="er_section-h2">Project Gallery</h2>
            <div class="er_gold-line"></div>
            <p style="color:var(--er-muted);margin-top:12px;font-size:16px;line-height:1.75;">Here you can have a closer look at the life we have built around Ernika. These are the spaces that your family will grow up calling home. Take your time to look around and see all the reasons why Ernika is worth it.</p>
        </div>
        <div class="er_gallery-container">
            <div class="swiper er_gallery-slider er_stagger-container">
                <div class="swiper-wrapper">
                    <?php
                    $gallery_images = [
//                         ['https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_1.jpg',  'Ernika villa plots community view 1'],
                           ['https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_9.jpeg', 'Ernika villa plots community view 9'],
						['https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_2.jpg', 'Ernika villa plots community view 2'],
                        ['https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_3.jpg', 'Ernika villa plots community view 3'],
                        ['https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_4.jpg', 'Ernika villa plots community view 4'],
                        ['https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_5.jpg', 'Ernika villa plots community view 5'],
                        ['https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_6.jpg', 'Ernika villa plots community view 6'],
                        ['https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_7.jpg', 'Ernika villa plots community view 7'],
                        ['https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_8.jpg', 'Ernika villa plots community view 8'],
                        ['https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_10.png','Ernika villa plots community view 10'],
                        ['https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_11.jpg','Ernika villa plots community view 11'],
                        ['https://gurupunvaanii.com/wp-content/uploads/2026/06/ernika_img_12.jpg','Ernika villa plots community view 12'],
                    ];
                    foreach ( $gallery_images as $img ) : ?>
                    <div class="swiper-slide">
                        <div class="er_gallery-item er_stagger-item">
                            <div class="er_gallery-img">
                                <img src="<?php echo esc_url($img[0]); ?>" alt="<?php echo esc_attr($img[1]); ?>">
                            </div>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
                <div class="swiper-pagination" style="bottom:-35px;"></div>
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    </section>

    <!-- AMENITIES (static — icons/labels don't need SEO editing) -->
    <section id="er_amenities" class="er_section er_amenities er_reveal">
        <div class="er_container">
            <div class="er_section-head er_reveal">
                <span class="er_section-label">WHAT WE OFFER</span>
                <h2 class="er_section-h2">Amenities</h2>
                <div class="er_gold-line"></div>
                <p class="er_section-desc">From A to Z, every amenity at Ernika is designed with your family in mind. It covers a range of amenities like spaces to be active, areas to gather, and corners for the quiet. Each element is intentionally put to make your daily life, your dream life.</p>
            </div>
            <div class="er_amenities-container">
                <div class="swiper er_amenities-slider er_stagger-container">
                    <div class="swiper-wrapper">
                        <?php
                        $amenities = [
                            ['01','fa-tree','Aerobics'],
                            ['02','fa-baseball-ball','Baseball Court'],
                            ['03','fa-chess','Chess | Carrom | Cafeteria'],
                            ['04','fa-bullseye','Dart'],
                            ['05','fa-briefcase-medical','Emergency Medical Room'],
                            ['06','far fa-futbol','Foosball'],
                            ['07','fa-umbrella-beach','Gazebo'],
                            ['08','fa-dumbbell','Health & Fitness Space (Gym)'],
                            ['09','fa-laptop-house','Innovation Incubator (Co-working Space)'],
                            ['10','fa-running','Jenga | Jogging'],
                            ['11','fa-child','Kids Play Area'],
                            ['12','fa-book','Library'],
                            ['13','fa-tree','Miyawaki Forest (Amazon Forest)'],
                            ['14','fa-leaf','Nature Trail'],
                            ['15','fa-bicycle','Outdoor Gym'],
                            ['16','fa-glass-cheers','Party Hall | Playing Cards'],
                            ['17','fa-ring','Quoits'],
                            ['18','fa-football-ball','Rugby Court'],
                            ['19','fa-swimmer','Swimming Pool | Skating Rink'],
                            ['20','fa-table-tennis','Table Tennis'],
                            ['21','fa-clone','Uno'],
                            ['22','fa-gamepad','Video Game'],
                            ['23','fa-weight-hanging','Weight Lifting'],
                            ['24','fa-chess','Xianqi'],
                            ['25','fa-spa','Yoga'],
                            ['26','fa-fist-raised','Zourkhaneh'],
                        ];
                        foreach ( $amenities as $idx => $a ) :
                            $icon_class = strpos($a[1],'far ') === 0 ? $a[1] : 'fas ' . $a[1];
                            // Auto-number from position so the index always matches the real count.
                            $amenity_num = str_pad( $idx + 1, 2, '0', STR_PAD_LEFT );
                        ?>
                        <div class="swiper-slide">
                            <div class="er_amenity-item er_stagger-item">
                                <span class="er_amenity-icon"><i class="<?php echo esc_attr($icon_class); ?>"></i></span>
                                <?php echo esc_html($a[2]); ?>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    <div class="swiper-pagination" style="bottom:-40px;"></div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        </div>
    </section>

    <!-- VIDEOS -->
    <section id="er_videos" class="er_section er_container er_reveal">
        <div class="er_section-head er_reveal">
            <span class="er_section-label">PROJECT VIDEO</span>
            <h2 class="er_section-h2">See It For Yourself</h2>
            <div class="er_gold-line"></div>
        </div>
<!--         <div class="er_tab-list">
            <button class="er_tab-btn er_active" type="button">Project Walkthrough</button>
        </div> -->
        <div class="er_video-wrap">
            <div class="er_video-frame">
                <iframe src="https://www.youtube.com/embed/<?php echo esc_attr($section_vid); ?>?mute=1"
                    title="Ernika Project Walkthrough"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
            </div>
        </div>
    </section>

    <!-- SPECIFICATION (static) -->
    <section id="er_specification" class="er_section er_specification er_reveal">
        <div class="er_container">
            <div class="er_section-head er_reveal">
                <span class="er_section-label">QUALITY STANDARDS</span>
                <h2 class="er_section-h2">Specifications</h2>
                <div class="er_gold-line"></div>
                <p class="er_section-desc">Here, every specification from road width, drainage, sustainable systems, etc., was developed with the long term in mind. Across <a href="https://gurupunvaanii.com/our-projects">our projects</a>, we make sure that what goes into the ground gets the same attention as what rises above it.</p>
            </div>
            <div class="er_spec-container">
                <div class="swiper er_specification-slider er_stagger-container">
                    <div class="swiper-wrapper">
                        <?php
                        $specs = [
                            ['fa-shield-alt','24/7 Security'],
                            ['fa-road','30 Feet Concrete Road With Plantation'],
                            ['fa-water','Overhead Water Tank'],
                            ['fa-faucet','Under Ground Water Pipe Lines'],
                            ['fa-bolt','Under Ground Electrification'],
                            ['fa-lightbulb','LED Street Light'],
                            ['fa-recycle','STP'],
                        ];
                        // Output twice for smooth Swiper loop
                        for ( $r = 0; $r < 2; $r++ ) :
                            foreach ( $specs as $s ) : ?>
                        <div class="swiper-slide">
                            <div class="er_spec-item er_stagger-item">
                                <span class="er_spec-icon"><i class="fas <?php echo esc_attr($s[0]); ?>"></i></span>
                                <?php echo esc_html($s[1]); ?>
                            </div>
                        </div>
                        <?php endforeach; endfor; ?>
                    </div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        </div>
    </section>

    <!-- LOCATION -->
    <section id="er_location" class="er_section er_container er_reveal">
        <div class="er_section-head er_reveal">
            <span class="er_section-label">LOCATION & PROXIMITY</span>
            <h2 class="er_section-h2">Location Highlights</h2>
            <div class="er_gold-line"></div>
        </div>
<!--         <div class="er_tab-list">
            <button class="er_tab-btn er_active" type="button" data-er-loc-tab="proximity">Proximity Map</button>
            <button class="er_tab-btn" type="button" data-er-loc-tab="map">Location Map</button>
        </div> -->
        <div class="er_location-panel er_active" data-er-loc-panel="proximity">
            <div class="er_proximity-iframe-wrap">
                <iframe src="https://ernika-proximities.gurupunvaanii.com/" scrolling="no" allowfullscreen loading="lazy" title="Ernika Proximity Map"></iframe>
                <a href="https://ernika-proximities.gurupunvaanii.com/" target="_blank" rel="noopener noreferrer" class="er_proximity-open-btn" title="Open Proximity Map in New Tab">
                    <span>Open Proximity Map</span>
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
        <div class="er_location-panel" data-er-loc-panel="map">
            <iframe class="er_map-frame"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.1269080098796!2d77.7129444!3d12.7051389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6f00055baf67%3A0x51603bc8349823aa!2sGuru%20Punvaanii%20Ernika!5e0!3m2!1sen!2sin!4v1779394976906!5m2!1sen!2sin"
                allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </section>



    <!-- FAQ -->
    <section id="er_faq" class="er_section er_faq er_reveal">
        <div class="er_container">
            <div class="er_section-head er_reveal">
                <span class="er_section-label">QUESTIONS & ANSWERS</span>
                <h2 class="er_section-h2">Frequently Asked Questions</h2>
                <div class="er_gold-line"></div>
            </div>
            <div class="er_faq-container er_stagger-container">
                <?php foreach ( $faqs as $faq ) : ?>
                <div class="er_faq-item">
                    <div class="er_faq-question">
                        <?php echo $faq['q']; ?>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="er_faq-answer">
                        <p><?php echo $faq['a']; ?></p>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- MODAL (EKA COMPACT DESIGN SYSTEM) -->
    <div class="er_modal" id="er_brochureModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="er_brochureTitle">
        <div class="er_modal-dialog">
            <!-- Background Pattern & Watermark Pin -->
            <div class="er_modal-pattern"></div>
            <div class="er_watermark-pin">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c68a28" stroke-width="1.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>

            <!-- Close Button -->
            <button class="er_modal-close" type="button" aria-label="Close" data-er-close-brochure>
                <i class="fas fa-times"></i>
            </button>

            <!-- Header -->
            <div class="er_modal-header">
                <div class="er_modal-brand-tag">
                    <span class="er_brand-icon"></span>
                    <span>GURU PUNVAANII &nbsp;|&nbsp; ERNIKA</span>
                </div>
                <h2 id="er_brochureTitle">Get the <em>ERNIKA</em><br>layout &amp; brochure</h2>
                <p>Share a few details and we’ll send the full brochure — plot layouts, phase-wise pricing and RERA documents — straight to your phone and inbox.</p>
            </div>

            <!-- Form -->
            <div class="er_modal-form">
                <div id="er_fieldsWrap">
                    <!-- Row 1: Full Name -->
                    <div class="er_form-group er_full-width">
                        <label for="er_bName">FULL NAME *</label>
                        <div class="er_input-wrap">
                            <i class="far fa-user er_input-icon"></i>
                            <input type="text" id="er_bName" name="name" required placeholder="Enter your full name">
                        </div>
                    </div>

                    <!-- Row 2: Phone & Email side by side -->
                    <div class="er_form-row">
                        <div class="er_form-group">
                            <label for="er_bPhone">PHONE NUMBER *</label>
                            <div class="er_input-wrap">
                                <i class="fas fa-phone-alt er_input-icon"></i>
                                <input type="tel" id="er_bPhone" name="phone" required placeholder="10-digit mobile" maxlength="10" inputmode="numeric">
                            </div>
                        </div>
                        <div class="er_form-group">
                            <label for="er_bEmail">EMAIL ADDRESS *</label>
                            <div class="er_input-wrap">
                                <i class="far fa-envelope er_input-icon"></i>
                                <input type="email" id="er_bEmail" name="email" required placeholder="you@email.com">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- OTP Verification Screen (Initially Hidden) -->
                <div id="er_otpWrap" style="display:none; margin-top:8px; text-align:center;">
                    <h3 style="font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:#1a1a1a; margin-bottom:4px;">
                        Verify Your Mobile
                    </h3>
                    <p style="font-family:'Playfair Display',serif; font-style:italic; font-size:13px; color:#8a6020; margin-bottom:16px;">
                        "Just one quick step — you're almost there."
                    </p>
                    <p style="font-size:12px; color:#666; margin-bottom:10px; font-family:'Inter',sans-serif;">
                        We sent a 6-digit OTP to
                    </p>
                    
                    <!-- Mobile Pill Badge -->
                    <div style="display:inline-flex; align-items:center; justify-content:center; gap:8px; background:#fdf6e3; border:1.5px solid #c9a84c; border-radius:30px; padding:6px 20px; font-size:14px; font-weight:700; color:#b8862e; margin-bottom:20px; box-shadow:0 2px 8px rgba(184,134,46,0.12);">
                        <i class="fas fa-mobile-alt"></i>
                        <span id="er_otpTargetPhone">+91 9876543210</span>
                    </div>

                    <!-- 6 OTP Boxes -->
                    <div class="er_otp-boxes" style="display:flex; gap:8px; justify-content:center; margin-bottom:18px;">
                        <input class="er_otp-box" type="text" maxlength="1" inputmode="numeric" id="er_otp0" style="width:44px !important; height:50px !important; padding:0 !important; margin:0 !important; text-align:center !important; line-height:50px !important; font-size:22px !important; font-weight:700 !important; border:1.5px solid #ddd !important; border-radius:8px !important; background:#fffdf7 !important; font-family:'Playfair Display',serif !important; outline:none !important; box-sizing:border-box !important;">
                        <input class="er_otp-box" type="text" maxlength="1" inputmode="numeric" id="er_otp1" style="width:44px !important; height:50px !important; padding:0 !important; margin:0 !important; text-align:center !important; line-height:50px !important; font-size:22px !important; font-weight:700 !important; border:1.5px solid #ddd !important; border-radius:8px !important; background:#fffdf7 !important; font-family:'Playfair Display',serif !important; outline:none !important; box-sizing:border-box !important;">
                        <input class="er_otp-box" type="text" maxlength="1" inputmode="numeric" id="er_otp2" style="width:44px !important; height:50px !important; padding:0 !important; margin:0 !important; text-align:center !important; line-height:50px !important; font-size:22px !important; font-weight:700 !important; border:1.5px solid #ddd !important; border-radius:8px !important; background:#fffdf7 !important; font-family:'Playfair Display',serif !important; outline:none !important; box-sizing:border-box !important;">
                        <input class="er_otp-box" type="text" maxlength="1" inputmode="numeric" id="er_otp3" style="width:44px !important; height:50px !important; padding:0 !important; margin:0 !important; text-align:center !important; line-height:50px !important; font-size:22px !important; font-weight:700 !important; border:1.5px solid #ddd !important; border-radius:8px !important; background:#fffdf7 !important; font-family:'Playfair Display',serif !important; outline:none !important; box-sizing:border-box !important;">
                        <input class="er_otp-box" type="text" maxlength="1" inputmode="numeric" id="er_otp4" style="width:44px !important; height:50px !important; padding:0 !important; margin:0 !important; text-align:center !important; line-height:50px !important; font-size:22px !important; font-weight:700 !important; border:1.5px solid #ddd !important; border-radius:8px !important; background:#fffdf7 !important; font-family:'Playfair Display',serif !important; outline:none !important; box-sizing:border-box !important;">
                        <input class="er_otp-box" type="text" maxlength="1" inputmode="numeric" id="er_otp5" style="width:44px !important; height:50px !important; padding:0 !important; margin:0 !important; text-align:center !important; line-height:50px !important; font-size:22px !important; font-weight:700 !important; border:1.5px solid #ddd !important; border-radius:8px !important; background:#fffdf7 !important; font-family:'Playfair Display',serif !important; outline:none !important; box-sizing:border-box !important;">
                    </div>

                    <!-- Resend Timer -->
                    <div style="font-size:13px; color:#666; margin-bottom:20px; font-family:'Inter',sans-serif;">
                        <span id="er_timerWrap">Resend OTP in <strong id="er_timerCount" style="color:#b8862e; font-weight:700;">02:00</strong></span>
                        <a href="#" id="er_resendOtpBtn" style="display:none; color:#b8862e; font-weight:700; text-decoration:underline;">Resend OTP</a>
                    </div>

                    <!-- Action Buttons -->
                    <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
                        <button type="button" id="er_verifyOtpBtn" style="width:100%; padding:13px; background:linear-gradient(180deg,#d4a84b 0%,#b8862e 50%,#a07025 100%); color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:700; cursor:pointer; letter-spacing:1px; text-transform:uppercase; box-shadow:0 4px 12px rgba(184,134,46,0.3); font-family:'Inter',sans-serif;">
                            VERIFY OTP
                        </button>
                        <button type="button" id="er_changeMobileBtn" style="width:100%; padding:11px; background:linear-gradient(180deg,#ffffff,#f8f2e6); color:#b8862e; border:1.5px solid #b8862e; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer; letter-spacing:1px; text-transform:uppercase; font-family:'Inter',sans-serif;">
                            ← CHANGE MOBILE
                        </button>
                    </div>
                </div>

                <!-- Submit Button (Phase 1) -->
                <div class="er_form-submit-wrap" id="er_submitWrap" style="margin-top:4px;">
                    <button type="button" class="er_modal-submit-btn" id="er_brochureSubmit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        <span>Get OTP &amp; Download</span>
                    </button>
                </div>

                <p class="er_form-msg" id="er_formMsg"></p>

                <!-- Success & Download Step (Shown after lead submission) -->
                <div id="er_downloadStep" style="display:none; margin-top:16px; text-align:center; padding:20px 16px; background:rgba(34,197,94,0.06); border:1.5px solid #22c55e; border-radius:10px;">
                    <div style="width:44px; height:44px; background:#22c55e; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; font-size:20px; font-weight:700;">
                        ✓
                    </div>
                    <h3 style="font-family:'Playfair Display',Georgia,serif; font-size:19px; font-weight:700; color:#1e293b; margin-bottom:6px;">
                        Enquiry Submitted Successfully!
                    </h3>
                    <p style="font-size:13px; color:#475569; margin-bottom:16px; font-family:'Inter',sans-serif; line-height:1.5;">
                        Your mobile number has been verified and your Enquiry has been recorded. Click below to view and download the official brochure.
                    </p>
                    <button type="button" id="er_finalDownloadBtn" onclick="erDownloadBrochure()" style="display:inline-flex; align-items:center; justify-content:center; gap:10px; background:var(--er-gold,#c68a28); color:#fff; font-weight:700; font-size:15px; padding:12px 26px; border-radius:8px; border:none; cursor:pointer; box-shadow:0 4px 14px rgba(198,138,40,0.35); transition:all 0.2s;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        <span>Download Brochure PDF</span>
                    </button>
                </div>

                <p class="er_modal-microcopy">No spam — only the Ernika brochure and updates you ask for.</p>
            </div>

            <!-- Bottom Trust Footer Bar -->
            <div class="er_modal-footer-bar">
                <div class="er_trust-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                    <span>RERA<br>APPROVED</span>
                </div>
                <div class="er_trust-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span>BMRDA<br>LAYOUT</span>
                </div>
            </div>
        </div>
    </div>

    <!-- GALLERY LIGHTBOX SLIDER MODAL -->
    <div class="er_lightbox-modal" id="er_galleryLightbox" aria-hidden="true" role="dialog" aria-modal="true">
        <button class="er_lightbox-close" type="button" aria-label="Close Lightbox" id="er_lightboxCloseBtn">
            <i class="fas fa-times"></i>
        </button>
        <button class="er_lightbox-prev" type="button" aria-label="Previous Image" id="er_lightboxPrevBtn">
            <i class="fas fa-chevron-left"></i>
        </button>
        <div class="er_lightbox-content" id="er_lightboxContent">
            <img src="" alt="" id="er_lightboxImg">
            <div class="er_lightbox-caption" id="er_lightboxCaption"></div>
        </div>
        <button class="er_lightbox-next" type="button" aria-label="Next Image" id="er_lightboxNextBtn">
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>

</div><!-- /#er_page -->

<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
<script>
(function(){
    'use strict';
    var BROCHURE_URL = '<?php echo esc_js( $brochure_url ); ?>';
    function downloadBrochure(){
        if(!BROCHURE_URL) return;
        var a=document.createElement('a'); a.href=BROCHURE_URL; a.target='_blank'; a.rel='noopener';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
    window.erDownloadBrochure = downloadBrochure;
    var sHighlights = new Swiper('.er_highlights-slider',{slidesPerView:1,spaceBetween:20,loop:true,grabCursor:true,speed:800,pagination:{el:'.er_highlights-container .swiper-pagination',clickable:true},navigation:{nextEl:'.er_highlights-container .swiper-button-next',prevEl:'.er_highlights-container .swiper-button-prev'},breakpoints:{480:{slidesPerView:2,spaceBetween:20},768:{slidesPerView:3,spaceBetween:20},1024:{slidesPerView:5,spaceBetween:20}},autoplay:{delay:3000,disableOnInteraction:false}});
    var sAmenities = new Swiper('.er_amenities-slider',{slidesPerView:1,spaceBetween:20,loop:true,grabCursor:true,speed:800,pagination:{el:'.er_amenities-container .swiper-pagination',clickable:true},navigation:{nextEl:'.er_amenities-container .swiper-button-next',prevEl:'.er_amenities-container .swiper-button-prev'},breakpoints:{480:{slidesPerView:2,spaceBetween:20},768:{slidesPerView:3,spaceBetween:20},1024:{slidesPerView:4,spaceBetween:20},1280:{slidesPerView:5,spaceBetween:20}},autoplay:{delay:3000,disableOnInteraction:false}});
    var sGallery = new Swiper('.er_gallery-slider',{slidesPerView:1,spaceBetween:20,loop:false,grabCursor:true,speed:800,pagination:{el:'.er_gallery-container .swiper-pagination',clickable:true},navigation:{nextEl:'.er_gallery-container .swiper-button-next',prevEl:'.er_gallery-container .swiper-button-prev'},breakpoints:{768:{slidesPerView:2,spaceBetween:24},2169:{slidesPerView:3,spaceBetween:24}},autoplay:{delay:3500,disableOnInteraction:false}});
    var sSpec = new Swiper('.er_specification-slider',{slidesPerView:1,spaceBetween:20,loop:true,grabCursor:true,speed:800,navigation:{nextEl:'.er_spec-container .swiper-button-next',prevEl:'.er_spec-container .swiper-button-prev'},breakpoints:{480:{slidesPerView:2,spaceBetween:20},768:{slidesPerView:3,spaceBetween:20},1024:{slidesPerView:5,spaceBetween:20},1280:{slidesPerView:5,spaceBetween:20}},autoplay:{delay:2800,disableOnInteraction:false}});

    // Autoplay on view (start carousel only when in viewport)
    var swipers = [
        { selector: '.er_highlights-slider', instance: sHighlights },
        { selector: '.er_amenities-slider', instance: sAmenities },
        { selector: '.er_gallery-slider', instance: sGallery },
        { selector: '.er_specification-slider', instance: sSpec }
    ];
    swipers.forEach(function(item){
        if (item.instance && item.instance.autoplay) {
            item.instance.autoplay.stop();
        }
        var el = document.querySelector(item.selector);
        if (el && item.instance && 'IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries){
                entries.forEach(function(entry){
                    if (item.instance && item.instance.autoplay) {
                        if (entry.isIntersecting) {
                            item.instance.autoplay.start();
                        } else {
                            item.instance.autoplay.stop();
                        }
                    }
                });
            }, { threshold: 0.15 });
            observer.observe(el);
        }
    });
    var modal=document.getElementById('er_brochureModal');
    function openModal(){modal.classList.add('er_active');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.getElementById('er_bName').focus();}
    var currentOtp = null;
    var isOtpSent = false;

    var currentOtpTimer = null;
    var isOtpSent = false;

    // Helper: get entered 6-digit OTP
    function getEntered6DigitOtp() {
        var val = '';
        for (var i = 0; i < 6; i++) {
            var b = document.getElementById('er_otp' + i);
            if (b) val += b.value.trim();
        }
        return val;
    }

    // Helper: clear 6 OTP boxes
    function clearOtpBoxes() {
        for (var i = 0; i < 6; i++) {
            var b = document.getElementById('er_otp' + i);
            if (b) { b.value = ''; b.style.borderColor = '#ddd'; }
        }
    }

    // Countdown Timer (120s)
    function startOtpCountdown(sec) {
        clearInterval(currentOtpTimer);
        var timerWrap = document.getElementById('er_timerWrap');
        var resendBtn = document.getElementById('er_resendOtpBtn');
        var timerCount = document.getElementById('er_timerCount');

        if(timerWrap) timerWrap.style.display = 'inline';
        if(resendBtn) resendBtn.style.display = 'none';

        currentOtpTimer = setInterval(function(){
            var m = Math.floor(sec / 60).toString().padStart(2, '0');
            var s = (sec % 60).toString().padStart(2, '0');
            if(timerCount) timerCount.textContent = m + ':' + s;
            if (sec <= 0) {
                clearInterval(currentOtpTimer);
                if(timerWrap) timerWrap.style.display = 'none';
                if(resendBtn) resendBtn.style.display = 'inline';
            }
            sec--;
        }, 1000);
    }

    // Restrict Phone field to numbers only (max 10 digits)
    var phoneInputEl = document.getElementById('er_bPhone');
    if (phoneInputEl) {
        phoneInputEl.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 10);
        });
    }

    // OTP Box Navigation & Paste  
    for (var i = 0; i < 6; i++) {
        (function(idx){
            var box = document.getElementById('er_otp' + idx);
            if(!box) return;

            box.addEventListener('input', function(){
                this.value = this.value.replace(/\D/g, '');
                if (this.value) {
                    this.style.borderColor = 'var(--er-gold,#c68a28)';
                    if (idx < 5) {
                        var next = document.getElementById('er_otp' + (idx + 1));
                        if(next) next.focus();
                    }
                } else {
                    this.style.borderColor = '#ddd';
                }
            });

            box.addEventListener('keydown', function(e){
                if (e.key === 'Backspace' && !this.value && idx > 0) {
                    var prev = document.getElementById('er_otp' + (idx - 1));
                    if(prev) prev.focus();
                }
            });

            if (idx === 0) {
                box.addEventListener('paste', function(e){
                    e.preventDefault();
                    var pasteData = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').substring(0, 6);
                    for (var k = 0; k < 6; k++) {
                        var b = document.getElementById('er_otp' + k);
                        if (b) {
                            b.value = pasteData[k] || '';
                            b.style.borderColor = b.value ? 'var(--er-gold,#c68a28)' : '#ddd';
                        }
                    }
                    if (pasteData.length === 6) {
                        var verifyBtn = document.getElementById('er_verifyOtpBtn');
                        if(verifyBtn) verifyBtn.focus();
                    } else if (pasteData.length > 0) {
                        var nextB = document.getElementById('er_otp' + Math.min(pasteData.length, 5));
                        if(nextB) nextB.focus();
                    }
                });
            }
        })(i);
    }

    function resetOtpForm(){
        isOtpSent = false;
        clearInterval(currentOtpTimer);
        var otpWrap = document.getElementById('er_otpWrap');
        if(otpWrap) otpWrap.style.display = 'none';
        var submitWrap = document.getElementById('er_submitWrap');
        if(submitWrap) submitWrap.style.display = 'block';
        var downloadStep = document.getElementById('er_downloadStep');
        if(downloadStep) downloadStep.style.display = 'none';

        var fieldsWrap = document.getElementById('er_fieldsWrap');
        if(fieldsWrap) fieldsWrap.style.display = 'block';

        ['er_bName','er_bPhone','er_bEmail'].forEach(function(id){
            var el = document.getElementById(id);
            if(el) { el.disabled = false; el.value = ''; }
        });
        clearOtpBoxes();
        var msgEl = document.getElementById('er_formMsg');
        if(msgEl) { msgEl.textContent = ''; msgEl.className = 'er_form-msg'; }
        var btn = document.getElementById('er_brochureSubmit');
        if(btn) { btn.disabled = false; }
    }

    function closeModal(){
        modal.classList.remove('er_active');
        modal.setAttribute('aria-hidden','true');
        document.body.style.overflow='';
        resetOtpForm();
    }

    document.querySelectorAll('[data-er-open-brochure]').forEach(function(b){b.addEventListener('click',openModal);});
    document.querySelectorAll('[data-er-close-brochure]').forEach(function(b){b.addEventListener('click',closeModal);});
    modal.addEventListener('click',function(e){if(e.target===modal)closeModal();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('er_active'))closeModal();});

    function getERPFormattedDateTime() {
        var now = new Date();
        var dd = String(now.getDate()).padStart(2, '0');
        var mm = String(now.getMonth() + 1).padStart(2, '0');
        var yyyy = now.getFullYear();
        var hh = String(now.getHours()).padStart(2, '0');
        var min = String(now.getMinutes()).padStart(2, '0');
        return dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min;
    }

    // "← CHANGE MOBILE" button click
    var changeMobileBtn = document.getElementById('er_changeMobileBtn');
    if(changeMobileBtn){
        changeMobileBtn.addEventListener('click', function(){
            isOtpSent = false;
            clearInterval(currentOtpTimer);
            document.getElementById('er_otpWrap').style.display = 'none';
            document.getElementById('er_submitWrap').style.display = 'block';

            var fieldsWrap = document.getElementById('er_fieldsWrap');
            if(fieldsWrap) fieldsWrap.style.display = 'block';

            ['er_bName','er_bPhone','er_bEmail'].forEach(function(id){
                var el = document.getElementById(id);
                if(el) el.disabled = false;
            });

            clearOtpBoxes();
            var msgEl = document.getElementById('er_formMsg');
            if(msgEl) { msgEl.textContent = ''; msgEl.className = 'er_form-msg'; }

            var phoneInput = document.getElementById('er_bPhone');
            if(phoneInput) phoneInput.focus();
        });
    }

    // Resend OTP listener via real SMS API
    var resendBtn = document.getElementById('er_resendOtpBtn');
    if(resendBtn){
        resendBtn.addEventListener('click', function(e){
            e.preventDefault();
            var phoneInput = document.getElementById('er_bPhone');
            var rawPhone = phoneInput ? phoneInput.value.trim() : '';
            var cleanPhone = rawPhone.replace(/\D/g, '').slice(-10);
            var msgEl = document.getElementById('er_formMsg');

            fetch('https://gurupunvaanii.com/eoi-customer-form/otp.php?action=send_otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile: cleanPhone })
            })
            .then(function(res){ return res.json(); })
            .then(function(data){
                if(msgEl){
                    msgEl.textContent = '🔄 ' + (data.message || 'New OTP sent to +91 ' + cleanPhone);
                    msgEl.className = 'er_form-msg er_success';
                }
                startOtpCountdown(120);
            });
        });
    }

    // Phase 1: Click "Get OTP & Download"
    document.getElementById('er_brochureSubmit').addEventListener('click', function(){
        var nameInput = document.getElementById('er_bName');
        var phoneInput = document.getElementById('er_bPhone');
        var emailInput = document.getElementById('er_bEmail');
        var msgEl = document.getElementById('er_formMsg');
        var btn = document.getElementById('er_brochureSubmit');
        var btnSpan = btn.querySelector('span');

        var name = nameInput ? nameInput.value.trim() : '';
        var rawPhone = phoneInput ? phoneInput.value.trim() : '';
        var email = emailInput ? emailInput.value.trim() : '';

        if (!name) {
            msgEl.textContent = '⚠️ Full Name is required.';
            msgEl.className = 'er_form-msg er_error';
            nameInput.focus();
            return;
        }

        var cleanPhone = rawPhone.replace(/\D/g, '');
        if (cleanPhone.length > 10 && (cleanPhone.startsWith('91') || cleanPhone.startsWith('091'))) {
            cleanPhone = cleanPhone.slice(-10);
        }
        var phoneRegex = /^[6-9]\d{9}$/;

        if (!phoneRegex.test(cleanPhone)) {
            msgEl.textContent = '⚠️ Please enter a valid 10-digit mobile number (e.g. 9876543210)';
            msgEl.className = 'er_form-msg er_error';
            phoneInput.focus();
            return;
        }

        if (!email) {
            msgEl.textContent = '⚠️ Email address is required.';
            msgEl.className = 'er_form-msg er_error';
            if (emailInput) emailInput.focus();
            return;
        }
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            msgEl.textContent = '⚠️ Please enter a valid email address (e.g. name@example.com).';
            msgEl.className = 'er_form-msg er_error';
            if (emailInput) emailInput.focus();
            return;
        }

        btn.disabled = true;
        if(btnSpan) btnSpan.textContent = 'Sending OTP…';

        fetch('https://gurupunvaanii.com/eoi-customer-form/otp.php?action=send_otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: cleanPhone })
        })
        .then(function(res){ return res.json(); })
        .then(function(data){
            btn.disabled = false;
            if (data && (data.success || data.status === 'success' || data.sent)) {
                isOtpSent = true;
                document.getElementById('er_otpTargetPhone').textContent = '+91 ' + cleanPhone;
                
                // Hide Phase 1 input fields & submit button, show OTP screen
                var fieldsWrap = document.getElementById('er_fieldsWrap');
                if(fieldsWrap) fieldsWrap.style.display = 'none';
                document.getElementById('er_submitWrap').style.display = 'none';
                document.getElementById('er_otpWrap').style.display = 'block';

                nameInput.disabled = true;
                phoneInput.disabled = true;
                emailInput.disabled = true;

                msgEl.textContent = '📲 ' + (data.message || 'OTP sent to +91 ' + cleanPhone);
                msgEl.className = 'er_form-msg er_success';

                startOtpCountdown(120);
                var otp0 = document.getElementById('er_otp0');
                if(otp0) otp0.focus();
            } else {
                msgEl.textContent = '⚠️ ' + (data.message || 'Failed to send OTP. Please try again.');
                msgEl.className = 'er_form-msg er_error';
                if(btnSpan) btnSpan.textContent = 'Get OTP & Download';
            }
        })
        .catch(function(){
            btn.disabled = false;
            msgEl.textContent = '⚠️ Network error sending OTP. Please try again.';
            msgEl.className = 'er_form-msg er_error';
            if(btnSpan) btnSpan.textContent = 'Get OTP & Download';
        });
    });

    // Phase 2: Click "VERIFY OTP" button
    var verifyOtpBtn = document.getElementById('er_verifyOtpBtn');
    if(verifyOtpBtn){
        verifyOtpBtn.addEventListener('click', function(){
            var nameInput = document.getElementById('er_bName');
            var phoneInput = document.getElementById('er_bPhone');
            var emailInput = document.getElementById('er_bEmail');
            var msgEl = document.getElementById('er_formMsg');
            var btn = document.getElementById('er_verifyOtpBtn');

            var name = nameInput.value.trim();
            var rawPhone = phoneInput.value.trim();
            var email = emailInput.value.trim();
            var cleanPhone = rawPhone.replace(/\D/g, '').slice(-10);

            var enteredOtp = getEntered6DigitOtp();

            if (!enteredOtp || enteredOtp.length < 4) {
                msgEl.textContent = '⚠️ Please enter the OTP sent to your mobile.';
                msgEl.className = 'er_form-msg er_error';
                var otp0 = document.getElementById('er_otp0');
                if(otp0) otp0.focus();
                return;
            }

            btn.disabled = true;
            btn.textContent = 'VERIFYING...';

            fetch('https://gurupunvaanii.com/eoi-customer-form/otp.php?action=verify_otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile: cleanPhone, otp: enteredOtp })
            })
            .then(function(res){ return res.json(); })
            .then(function(data){
                if (data && (data.success || data.status === 'success' || data.verified)) {
                    btn.textContent = 'SUBMITTING...';
                    submitLeadData(name, cleanPhone, email, msgEl);
                } else {
                    btn.disabled = false;
                    btn.textContent = 'VERIFY OTP';
                    msgEl.textContent = '❌ ' + (data.message || 'Incorrect OTP. Please check and try again.');
                    msgEl.className = 'er_form-msg er_error';
                    var otp0 = document.getElementById('er_otp0');
                    if(otp0) otp0.focus();
                }
            })
            .catch(function(){
                btn.disabled = false;
                btn.textContent = 'VERIFY OTP';
                msgEl.textContent = '⚠️ OTP verification failed. Please try again.';
                msgEl.className = 'er_form-msg er_error';
            });
        });
    }

    function submitLeadData(name, cleanPhone, email, msgEl) {
        var nowStr = getERPFormattedDateTime();
        var erpUrl = 'https://24.strategicerpcloud.com/strategicerp/SaveFormField.do?actn=SaveData&id=873&globalvar=0&cloudcode=gurupunvaanii&idselected=0&idhidden=0&mobileform=yes&editids=15715/15800/31227/15730/state//31228/31229/31230/33937/15713/30754/34785/15716/37710/37710/'
                   + '&field15715=' + encodeURIComponent(cleanPhone)
                   + '&field15713=' + encodeURIComponent(name)
                   + '&field33937=' + encodeURIComponent(email)
                   + '&field15730=' + encodeURIComponent('Guru Punvaanii Ernika - google-ads')
                   + '&field15800=' + encodeURIComponent(nowStr)
                   + '&field31227=' + encodeURIComponent(nowStr)
                   + '&field31228=' + encodeURIComponent('Digital Marketing')
                   + '&field31229=' + encodeURIComponent('SEO')
                   + '&field31230=' + encodeURIComponent('/ SEO/ /')
                   + '&field37710=' + encodeURIComponent('+91')
                   + '&field15716=' + encodeURIComponent('Brochure Download (OTP Verified) - Ernika')
                   + '&field34785=';

        var erpImg = new Image();
        erpImg.src = erpUrl;

        function showSuccessDownloadStep() {
            var fieldsWrap = document.getElementById('er_fieldsWrap');
            if(fieldsWrap) fieldsWrap.style.display = 'none';
            var otpWrap = document.getElementById('er_otpWrap');
            if(otpWrap) otpWrap.style.display = 'none';

            if(msgEl){
                msgEl.textContent = '✓ Mobile Verified & Enquiry Recorded!';
                msgEl.className = 'er_form-msg er_success';
            }

            var downloadStep = document.getElementById('er_downloadStep');
            if(downloadStep) downloadStep.style.display = 'block';
        }

        fetch('<?php echo esc_url(admin_url("admin-ajax.php")); ?>',{
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                action: 'er_brochure_Enquiry',
                name: name,
                phone: cleanPhone,
                email: email,
                message: 'Brochure Download (OTP Verified) - Ernika'
            }).toString()
        })
        .then(function(r){ return r.json(); })
        .then(function(){
            showSuccessDownloadStep();
        })
        .catch(function(){
            showSuccessDownloadStep();
        });
    }
    document.querySelectorAll('[data-er-loc-tab]').forEach(function(btn){btn.addEventListener('click',function(){var t=btn.dataset.erLocTab;document.querySelectorAll('[data-er-loc-tab]').forEach(function(x){x.classList.remove('er_active');});document.querySelectorAll('[data-er-loc-panel]').forEach(function(x){x.classList.remove('er_active');});btn.classList.add('er_active');document.querySelector('[data-er-loc-panel="'+t+'"]').classList.add('er_active');});});
    document.querySelectorAll('.er_proximity-question').forEach(function(q){q.addEventListener('click',function(){var item=q.parentElement,icon=q.querySelector('i'),isActive=item.classList.contains('er_active');document.querySelectorAll('.er_proximity-item').forEach(function(i){i.classList.remove('er_active');i.querySelector('.er_proximity-question i').className='fas fa-plus';});if(!isActive){item.classList.add('er_active');icon.className='fas fa-minus';}});});
    document.querySelectorAll('.er_faq-question').forEach(function(q){q.addEventListener('click',function(){var item=q.parentElement,isActive=item.classList.contains('er_active');document.querySelectorAll('.er_faq-item').forEach(function(i){i.classList.remove('er_active');});if(!isActive)item.classList.add('er_active');});});
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('er_active');io.unobserve(e.target);}});},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('#er_page .er_reveal,#er_page .er_stagger-container').forEach(function(el){io.observe(el);});
    document.querySelectorAll('#er_page a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'});});});
    // Force content links to open in the same window (no new tab)
    document.querySelectorAll('#er_page .er_intro-text a,#er_page .er_section-heading a,#er_page .er_faq-answer a').forEach(function(a){a.removeAttribute('target');});

    // ── GALLERY LIGHTBOX SLIDER JS ──
    var lbModal = document.getElementById('er_galleryLightbox');
    var lbImg = document.getElementById('er_lightboxImg');
    var lbCaption = document.getElementById('er_lightboxCaption');
    var lbPrevBtn = document.getElementById('er_lightboxPrevBtn');
    var lbNextBtn = document.getElementById('er_lightboxNextBtn');
    var lbCloseBtn = document.getElementById('er_lightboxCloseBtn');
    var lbData = [];
    var lbCurrentIndex = 0;

    var galleryItems = document.querySelectorAll('#er_gallery .er_gallery-item');
    galleryItems.forEach(function(item, idx){
        var img = item.querySelector('img');
        if (img) {
            var src = img.getAttribute('src');
            var alt = img.getAttribute('alt') || ('Ernika Gallery Image ' + (idx + 1));
            lbData.push({ src: src, alt: alt });
            item.addEventListener('click', function(e){
                e.preventDefault();
                openLb(idx);
            });
        }
    });

    function openLb(index) {
        if (!lbData.length) return;
        if (index < 0) index = lbData.length - 1;
        if (index >= lbData.length) index = 0;
        lbCurrentIndex = index;
        if (lbImg) {
            lbImg.src = lbData[lbCurrentIndex].src;
            lbImg.alt = lbData[lbCurrentIndex].alt;
        }
        if (lbCaption) {
            lbCaption.textContent = (lbCurrentIndex + 1) + ' / ' + lbData.length + ' — ' + lbData[lbCurrentIndex].alt;
        }
        if (lbModal) {
            lbModal.classList.add('er_active');
            lbModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLb() {
        if (lbModal) {
            lbModal.classList.remove('er_active');
            lbModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    function prevLb() { openLb(lbCurrentIndex - 1); }
    function nextLb() { openLb(lbCurrentIndex + 1); }

    if (lbPrevBtn) lbPrevBtn.addEventListener('click', function(e){ e.stopPropagation(); prevLb(); });
    if (lbNextBtn) lbNextBtn.addEventListener('click', function(e){ e.stopPropagation(); nextLb(); });
    if (lbCloseBtn) lbCloseBtn.addEventListener('click', function(e){ e.stopPropagation(); closeLb(); });

    if (lbModal) {
        lbModal.addEventListener('click', function(e){
            if (e.target === lbModal || e.target.id === 'er_lightboxContent') {
                closeLb();
            }
        });
    }

    document.addEventListener('keydown', function(e){
        if (lbModal && lbModal.classList.contains('er_active')) {
            if (e.key === 'ArrowLeft') prevLb();
            if (e.key === 'ArrowRight') nextLb();
            if (e.key === 'Escape') closeLb();
        }
    });
})();
</script>

<?php
if ( file_exists( $astra_footer ) ) {
    include $astra_footer;
} else {
    get_footer();
}
wp_footer();
echo '</body></html>';
exit;