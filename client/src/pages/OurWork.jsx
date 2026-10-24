import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, X, ChevronLeft, ChevronRight, Maximize2, Tag, Layers, Sparkles } from 'lucide-react';
import { fetchPageContent } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import ParallaxCta from '../components/ParallaxCta';
import { AnimatedTitle, AnimatedSubtitle } from '../components/AnimatedHeroText';

export default function OurWork() {
  const { category: paramCategory } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Exact categories matching user requests
  const categoriesList = [
    'Graphic Designing',
    'Video editing',
    'Website Development',
    'SEO & Digital Content Strategist',
    'Social Media Marketing'
  ];

  // Slug mapping
  const slugToCategory = {
    'all': 'All',
    'graphic-designing': 'Graphic Designing',
    'video-editing': 'Video editing',
    'website-development': 'Website Development',
    'seo': 'SEO & Digital Content Strategist',
    'seo-digital-content-strategist': 'SEO & Digital Content Strategist',
    'social-media-marketing': 'Social Media Marketing'
  };

  const categoryToSlug = {
    'Graphic Designing': 'graphic-designing',
    'Video editing': 'video-editing',
    'Website Development': 'website-development',
    'SEO & Digital Content Strategist': 'seo-digital-content-strategist',
    'Social Media Marketing': 'social-media-marketing'
  };

  // Determine active category from URL param or default null (overview mode)
  const activeCategory = useMemo(() => {
    if (!paramCategory) return null;
    const key = paramCategory.toLowerCase().trim();
    return slugToCategory[key] || null;
  }, [paramCategory]);

  // Sector cards metadata inspired by BlueLetter India (www.blueletter.in/our-work/)
  const sectorCards = [
    {
      title: 'GRAPHIC DESIGNING ⇢',
      category: 'Graphic Designing',
      slug: 'graphic-designing',
      coverImage: '/photo/avenue-real-estate-13.webp',
      tagline: 'Brand Identities, Print Hoardings, Table Standees & Dining Creatives',
      description: 'Luxury architectural hoardings, restaurant POS table standees, offer graphics, and pop-culture themed visual art engineered to capture high visual attention.',
      itemCount: 16
    },
    {
      title: 'VIDEO EDITING ⇢',
      category: 'Video editing',
      slug: 'video-editing',
      coverImage: '/photo/bolly-punjabi-night-15-aug.webp',
      tagline: 'Hook Optimization, Kinetic Typography & Concert Teaser Reels',
      description: 'High-energy DJ video promos, live band acoustic showcases, and viral Bolly Punjabi club night edits engineered for maximum retention across Reels & TikTok.',
      itemCount: 15
    },
    {
      title: 'WEBSITE DEVELOPMENT ⇢',
      category: 'Website Development',
      slug: 'website-development',
      coverImage: '/photo/hotel-journee-4.webp',
      tagline: 'Responsive Resort Portals, UI Systems & Launch Showcases',
      description: 'Mobile-first resort platforms, luxury pre-launch property teasers, and interactive digital interfaces driving direct bookings and qualified buyer inquiries.',
      itemCount: 7
    },
    {
      title: 'SEO & DIGITAL CONTENT STRATEGIST ⇢',
      category: 'SEO & Digital Content Strategist',
      slug: 'seo-digital-content-strategist',
      coverImage: '/photo/hotel-journee-location-post.webp',
      tagline: 'Keyword Capture, Content Architecture & HNWI Buyer Pipelines',
      description: 'Local hill-station Google search dominance, weekly nightlife promotional content architectures, and high-converting acquisition funnels.',
      itemCount: 5
    },
    {
      title: 'SOCIAL MEDIA MARKETING ⇢',
      category: 'Social Media Marketing',
      slug: 'social-media-marketing',
      coverImage: '/photo/copacabana-post.webp',
      tagline: 'Nightlife Social Ads, Weekly Ladies Night Series & Viral Dining Posts',
      description: 'Organic engagement posts, recurring theme-night social calendars, and mouth-watering food carousels driving viral shares and walk-in footfall.',
      itemCount: 8
    }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    fetchPageContent('our-work').then((res) => {
      if (res && res.data) {
        setData(res.data);
      }
      setLoading(false);
    });
  }, [paramCategory]);

  // Filter projects for the active category
  const categoryProjects = useMemo(() => {
    if (!data || !data.projects) return [];
    if (!activeCategory || activeCategory === 'All') return data.projects;
    return data.projects.filter(
      (p) => p.category.toLowerCase().trim() === activeCategory.toLowerCase().trim()
    );
  }, [data, activeCategory]);

  // Build the list of images for full page viewer for current category
  const lightboxImages = useMemo(() => {
    if (!categoryProjects || categoryProjects.length === 0) return [];
    const list = [];
    const seen = new Set();

    categoryProjects.forEach((proj) => {
      const imgs = proj.galleryImages && proj.galleryImages.length > 0
        ? proj.galleryImages
        : [proj.image];

      imgs.forEach((img) => {
        if (img && !seen.has(img)) {
          seen.add(img);
          list.push({
            url: img,
            title: proj.title,
            tagline: proj.tagline,
            category: proj.category,
            project: proj
          });
        }
      });
    });

    return list;
  }, [categoryProjects]);

  // Full Page Lightbox Handlers
  const openLightboxAtImage = (imgUrl) => {
    const idx = lightboxImages.findIndex((item) => item.url === imgUrl);
    setLightboxIndex(idx !== -1 ? idx : 0);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1));
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation & body scroll lock for full page viewer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, lightboxImages.length]);

  if (loading) return <SkeletonLoader type="page" />;
  if (!data) return <div style={{ padding: '150px 0', textAlign: 'center' }}>Failed to load work portfolio.</div>;

  const { hero } = data;

  return (
    <main>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '100px 0 75px 0',
          backgroundImage: `linear-gradient(135deg, rgba(23, 21, 59, 0.95) 0%, rgba(59, 24, 95, 0.9) 50%, rgba(199, 44, 129, 0.85) 100%), url(${hero.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF'
        }}
      >
        <div className="container" style={{ maxWidth: '1080px' }}>
          <AnimatedTitle
            key={activeCategory || 'our-work-title'}
            text={activeCategory ? activeCategory : hero.title}
          />

          <AnimatedSubtitle
            key={activeCategory ? `${activeCategory}-sub` : 'our-work-sub'}
            text={activeCategory
              ? `Curated portfolio, campaign assets, and high-impact creatives produced under ${activeCategory} by Coherence Visual LLP.`
              : hero.subtitle}
          />

          {/* Quick Back Button when in Subpage view */}
          {activeCategory && (
            <div style={{ marginTop: '24px' }}>
              <button
                onClick={() => navigate('/our-work')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  padding: '9px 18px',
                  borderRadius: '30px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
              >
                <ArrowLeft size={16} />
                <span>All Work Sectors</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* VIEW 1: BlueLetter India Format (Sector Cards Overview) */}
      {!activeCategory && (
        <section style={{ padding: '80px 0 110px 0', backgroundColor: '#F8F8FC' }}>
          <div className="container" style={{ maxWidth: '1180px' }}>
            {/* Intro Header */}
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px auto' }}>
              <span
                style={{
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  display: 'inline-block',
                  marginBottom: '10px'
                }}
              >
                Creative Disciplines & Industries
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                  fontWeight: 700,
                  color: '#17153B',
                  marginBottom: '14px'
                }}
              >
                Explore Work by Sector
              </h2>
              <p style={{ color: '#64748B', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Click any sector below to open its dedicated work page, view all project data, and explore full-page creatives.
              </p>
            </div>

            {/* BlueLetter-style Sector Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '28px'
              }}
            >
              {sectorCards.map((card, idx) => (
                <div
                  key={card.slug || idx}
                  onClick={() => navigate(`/our-work/${card.slug}`)}
                  style={{
                    position: 'relative',
                    height: '380px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(199,44,129,0.25)';
                    const bg = e.currentTarget.querySelector('.sector-card-bg');
                    if (bg) bg.style.transform = 'scale(1.08)';
                    const arrow = e.currentTarget.querySelector('.sector-arrow');
                    if (arrow) arrow.style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                    const bg = e.currentTarget.querySelector('.sector-card-bg');
                    if (bg) bg.style.transform = 'scale(1)';
                    const arrow = e.currentTarget.querySelector('.sector-arrow');
                    if (arrow) arrow.style.transform = 'translateX(0)';
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={card.coverImage}
                    alt={card.category}
                    loading="lazy"
                    className="sector-card-bg"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />

                  {/* Dark Glassmorphism Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(23, 21, 59, 0.45) 0%, rgba(15, 12, 32, 0.88) 60%, rgba(15, 12, 32, 0.98) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '30px',
                      color: '#FFFFFF'
                    }}
                  >
                    {/* Top Row: Tag / Item count */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(6px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          padding: '5px 14px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase'
                        }}
                      >
                        Sector #{idx + 1}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#C4B5FD', fontWeight: 500 }}>
                        {card.itemCount} Creatives
                      </span>
                    </div>

                    {/* Bottom: Title with Arrow & Subtitle */}
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.45rem',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          color: '#FFFFFF',
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <span>{card.title}</span>
                      </h3>
                      <p
                        style={{
                          color: '#D8D4EC',
                          fontSize: '0.9rem',
                          lineHeight: 1.5,
                          marginBottom: '16px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {card.description}
                      </p>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--accent)',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 700,
                          fontSize: '0.84rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        <span>View Sector Gallery</span>
                        <ArrowRight size={15} className="sector-arrow" style={{ transition: 'transform 0.25s ease' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VIEW 2: Clicked Section Details Page (Showing All Data Under This Clicked Section) */}
      {activeCategory && (
        <section style={{ padding: '70px 0 110px 0', backgroundColor: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '1180px' }}>
            {/* Category Navigation Bar (Allowing switching between sectors easily) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                paddingBottom: '30px',
                marginBottom: '40px',
                borderBottom: '1px solid #ECECF2'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#17153B', marginRight: '6px' }}>
                  Switch Sector:
                </span>
                {categoriesList.map((cat) => {
                  const slug = categoryToSlug[cat];
                  const isCurrent = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => navigate(`/our-work/${slug}`)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '24px',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: isCurrent ? 'var(--accent)' : '#F2F1F8',
                        color: isCurrent ? '#FFFFFF' : '#17153B',
                        boxShadow: isCurrent ? '0 4px 12px rgba(199,44,129,0.3)' : 'none'
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <div style={{ color: '#64748B', fontSize: '0.88rem', fontWeight: 600 }}>
                Showing <strong>{lightboxImages.length}</strong> creatives in {activeCategory}
              </div>
            </div>

            {/* Projects & Creatives Grid Under The Clicked Section */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '32px'
              }}
            >
              {categoryProjects.map((project, pIdx) => (
                <div
                  key={project.id || pIdx}
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: '1px solid #ECECF2',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(199,44,129,0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#ECECF2';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                  }}
                >
                  {/* Main Creative Card Image (Clickable to Full Page Viewer) */}
                  <div
                    onClick={() => openLightboxAtImage(project.image)}
                    style={{
                      height: '280px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#0F0C20',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
                      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    />

                    {/* Category Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        background: 'rgba(23, 21, 59, 0.88)',
                        backdropFilter: 'blur(6px)',
                        color: '#FFFFFF',
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '16px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {project.category}
                    </div>

                    {/* Full Page Click Prompt Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        background: 'rgba(15, 12, 32, 0.82)',
                        backdropFilter: 'blur(6px)',
                        color: '#FFFFFF',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '5px 12px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <Maximize2 size={13} style={{ color: 'var(--accent)' }} />
                      <span>Click for Full Page</span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#17153B', marginBottom: '6px' }}>
                        {project.title}
                      </h3>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '10px' }}>
                        {project.tagline}
                      </h4>
                      <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '16px' }}>
                        {project.description}
                      </p>
                    </div>

                    {/* Additional Gallery Thumbnails for This Project */}
                    {project.galleryImages && project.galleryImages.length > 1 && (
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                          Project Creatives ({project.galleryImages.length} images) &bull; Click to expand:
                        </div>
                        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                          {project.galleryImages.map((gImg, gIdx) => (
                            <div
                              key={gIdx}
                              onClick={() => openLightboxAtImage(gImg)}
                              style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                flexShrink: 0,
                                border: '1px solid #ECECF2',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                background: '#0F0C20'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent)';
                                e.currentTarget.style.transform = 'scale(1.08)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#ECECF2';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                              title={`Click to view full page creative #${gIdx + 1}`}
                            >
                              <img
                                src={gImg}
                                alt={`Creative #${gIdx + 1}`}
                                loading="lazy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '12px', borderTop: '1px solid #F0EFF6' }}>
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            background: '#F4F3F9',
                            color: '#4B4963',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FULL PAGE IMAGE LIGHTBOX (With Cross Button At Top Left) */}
      {lightboxIndex !== null && lightboxImages[lightboxIndex] && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            background: 'rgba(8, 6, 20, 0.96)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            padding: '20px'
          }}
          onClick={closeLightbox}
        >
          {/* CRITICAL USER REQUIREMENT: CROSS BUTTON AT TOP-LEFT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close full page view"
            style={{
              position: 'fixed',
              top: '24px',
              left: '24px',
              zIndex: 100002,
              background: 'rgba(23, 21, 59, 0.92)',
              border: '2px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '50%',
              width: '52px',
              height: '52px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(0,0,0,0.65)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent)';
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(23, 21, 59, 0.92)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={26} strokeWidth={2.6} />
          </button>

          {/* Top Info Bar */}
          <div
            style={{
              position: 'fixed',
              top: '28px',
              right: '28px',
              zIndex: 100001,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '24px',
              padding: '6px 18px',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}
          >
            <span>{lightboxImages[lightboxIndex].category}</span>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>&bull;</span>
            <span style={{ color: 'var(--accent)' }}>
              {lightboxIndex + 1} / {lightboxImages.length}
            </span>
          </div>

          {/* Previous Image Button */}
          {lightboxImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
              style={{
                position: 'fixed',
                left: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 100001,
                background: 'rgba(23, 21, 59, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 6px 20px rgba(0,0,0,0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(23, 21, 59, 0.85)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronLeft size={30} />
            </button>
          )}

          {/* Next Image Button */}
          {lightboxImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
              style={{
                position: 'fixed',
                right: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 100001,
                background: 'rgba(23, 21, 59, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 6px 20px rgba(0,0,0,0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(23, 21, 59, 0.85)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronRight size={30} />
            </button>
          )}

          {/* Centered Full Page Image */}
          <div
            style={{
              maxWidth: '92vw',
              maxHeight: '82vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImages[lightboxIndex].url}
              alt={lightboxImages[lightboxIndex].title}
              style={{
                maxHeight: '82vh',
                maxWidth: '92vw',
                objectFit: 'contain',
                borderRadius: '10px',
                boxShadow: '0 25px 70px rgba(0,0,0,0.85)'
              }}
            />
          </div>

          {/* Floating Caption / Action Bar */}
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              background: 'rgba(15, 12, 32, 0.94)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '35px',
              padding: '10px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              zIndex: 100001,
              maxWidth: '90vw',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.98rem', fontWeight: 700, color: '#FFFFFF' }}>
                {lightboxImages[lightboxIndex].title}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#C4B5FD', fontWeight: 500 }}>
                {lightboxImages[lightboxIndex].category} &bull; Coherence Visual LLP
              </span>
            </div>

            <Link
              to="/get-in-touch"
              state={{ service: `Portfolio Inquiry: ${lightboxImages[lightboxIndex].title}` }}
              onClick={closeLightbox}
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
            >
              <span>Get in touch</span>
              <ArrowRight size={14} className="btn-icon" />
            </Link>
          </div>
        </div>
      )}

      {/* Parallax CTA Banner */}
      <ParallaxCta
        title="WANT TO CREATE SOMETHING EXTRAORDINARY?"
        subtitle="Let our multidisciplinary team formulate your campaign roadmap with high-converting creative."
        buttonText="Get in touch"
        buttonLink="/get-in-touch"
        bgImage="/photo/bolly-punjabi-night-15-aug.webp"
      />
    </main>
  );
}
