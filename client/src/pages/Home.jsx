import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import { fetchPageContent } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import ClientGrid from '../components/ClientGrid';
import TestimonialSlider from '../components/TestimonialSlider';
import ProcedureSteps from '../components/ProcedureSteps';
import ThinkProcess from '../components/ThinkProcess';
import ParallaxCta from '../components/ParallaxCta';
import { AnimatedTitle, AnimatedSubtitle } from '../components/AnimatedHeroText';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPageContent('home').then((res) => {
      if (res && res.data) {
        setData(res.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <SkeletonLoader type="hero" />;
  if (!data) return <div style={{ padding: '150px 0', textAlign: 'center' }}>Failed to load home page content.</div>;

  const {
    hero,
    whatWeDo,
    servicesOverview,
    thinkMethodology,
    integratedSolutions,
    strategySection,
    clientsSection,
    ctaBanner,
    procedureOverview,
    testimonials,
    newsCards
  } = data;

  return (
    <main>
      {/* 1. Hero Banner matching WeBeeSocial wbs_hero */}
      <section
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `linear-gradient(135deg, rgba(23, 21, 59, 0.92) 0%, rgba(59, 24, 95, 0.88) 45%, rgba(199, 44, 129, 0.82) 100%), url(${hero.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '100px 0 75px 0',
          color: '#FFFFFF'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '960px' }}>
            {/* Main Headline - Animation 2 (Staggered Letter Wave Reveal) */}
            <AnimatedTitle
              text={hero.title}
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw + 0.5rem, 5rem)',
                marginBottom: '28px',
                lineHeight: 1.08
              }}
            />

            {/* Subtitle - Animation 1 (Staggered Slide-Up from Bottom) */}
            <AnimatedSubtitle
              text={hero.subtitle}
              style={{
                fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                marginBottom: '40px'
              }}
              baseDelay={380}
            />

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <Link to={hero.ctaLink} className="btn-primary" style={{ padding: '18px 40px', fontSize: '1rem' }}>
                <span>{hero.ctaText}</span>
                <ArrowRight size={20} className="btn-icon" />
              </Link>
              <Link to={hero.secondaryCtaLink} className="btn-outline-white" style={{ padding: '18px 36px' }}>
                <span>{hero.secondaryCtaText}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What We Do Section matching WeBeeSocial edgtf-three-columns */}
      <section style={{ backgroundColor: '#F4F4F6' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Big Title Column */}
          <div
            style={{
              backgroundColor: '#ECEBF0',
              padding: '12% 10%',
              display: 'flex',
              alignItems: 'center',
              borderRight: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
                  fontWeight: 700,
                  color: '#17153B',
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em'
                }}
              >
                What we do<span style={{ color: 'var(--accent)' }}>?</span>
              </h2>
            </div>
          </div>

          {/* Column 1 */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '10% 8%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#17153B', marginBottom: '8px' }}>
              {whatWeDo.columns[0].heading}
            </h3>
            <div className="accent-separator" />
            <h4 style={{ fontSize: '1.15rem', color: '#17153B', fontWeight: 600, marginBottom: '16px' }}>
              {whatWeDo.columns[0].subtitle}
            </h4>
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.7, marginBottom: '28px' }}>
              {whatWeDo.columns[0].description}
            </p>
            <div>
              <Link to={whatWeDo.columns[0].buttonLink} className="btn-transparent" style={{ padding: 0 }}>
                <span>{whatWeDo.columns[0].buttonText}</span>
                <ArrowRight size={18} className="btn-icon" />
              </Link>
            </div>
          </div>

          {/* Column 2 */}
          <div style={{ backgroundColor: '#F8F8FA', padding: '10% 8%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#17153B', marginBottom: '8px' }}>
              {whatWeDo.columns[1].heading}
            </h3>
            <div className="accent-separator" />
            <h4 style={{ fontSize: '1.15rem', color: '#17153B', fontWeight: 600, marginBottom: '16px' }}>
              {whatWeDo.columns[1].subtitle}
            </h4>
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.7, marginBottom: '28px' }}>
              {whatWeDo.columns[1].description}
            </p>
            <div>
              <Link to={whatWeDo.columns[1].buttonLink} className="btn-transparent" style={{ padding: 0 }}>
                <span>{whatWeDo.columns[1].buttonText}</span>
                <ArrowRight size={18} className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Portfolio Mosaic / Services Grid matching WeBeeSocial .port */}
      <section style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {servicesOverview.badge}
            </span>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#17153B', marginTop: '8px', marginBottom: '16px' }}>
              {servicesOverview.title}
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
              {servicesOverview.subtitle}
            </p>
          </div>

          {/* Mosaic Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {servicesOverview.items.map((srv, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  height: '360px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                  group: 'card'
                }}
              >
                <img
                  src={srv.image}
                  alt={srv.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(18, 14, 41, 0.95) 0%, rgba(18, 14, 41, 0.4) 50%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '30px',
                    color: '#FFFFFF'
                  }}
                >
                  <h3 style={{ color: '#FFFFFF', fontSize: '1.45rem', fontWeight: 700, marginBottom: '8px' }}>
                    {srv.title}
                  </h3>
                  <p style={{ color: '#D8D4EC', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '16px' }}>
                    {srv.description}
                  </p>
                  <Link
                    to={srv.link}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}
                  >
                    <span>View Capability</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Integrated Solutions Split Section (Text Left, Image Right) */}
      <section style={{ backgroundColor: '#17153B', color: '#FFFFFF', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
          <div style={{ padding: '12% 10%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '14px' }}>
              {integratedSolutions.title}
            </h2>
            <div className="accent-separator" />
            <h4 style={{ color: '#C4B5FD', fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px' }}>
              {integratedSolutions.subtitle}
            </h4>
            <p style={{ color: '#D8D4EC', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
              {integratedSolutions.description}
            </p>
            <div>
              <Link to="/our-services" className="btn-primary">
                <span>Discover Integrated Services</span>
                <ArrowRight size={18} className="btn-icon" />
              </Link>
            </div>
          </div>
          <div style={{ minHeight: '480px', position: 'relative' }}>
            <img
              src={integratedSolutions.image}
              alt="Integrated Solutions"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* 5. Strategy Section Split (Image Left, Text Right) */}
      <section style={{ backgroundColor: '#120E29', color: '#FFFFFF', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
          <div style={{ minHeight: '480px', position: 'relative', order: 1 }}>
            <img
              src={strategySection.image}
              alt="Strategy & Creative"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: '12% 10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: 2 }}>
            <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '14px' }}>
              {strategySection.title}
            </h2>
            <div className="accent-separator" />
            <h4 style={{ color: '#C4B5FD', fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px' }}>
              {strategySection.subtitle}
            </h4>
            <p style={{ color: '#D8D4EC', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
              {strategySection.description}
            </p>
            <div>
              <Link to="/about-us" className="btn-outline-white">
                <span>Our Methodology</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THINK Methodology Section matching PDF Page 4 */}
      <section style={{ padding: '110px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px auto' }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {thinkMethodology.badge}
            </span>
            <h2 style={{ fontSize: '3rem', fontWeight: 700, color: '#17153B', marginTop: '8px', marginBottom: '16px' }}>
              {thinkMethodology.title}
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem', lineHeight: 1.7 }}>
              {thinkMethodology.subtitle}
            </p>
          </div>

          <ThinkProcess steps={thinkMethodology.steps} />
        </div>
      </section>

      {/* 7. Procedure 5 Steps matching PDF Page 7 */}
      <section style={{ padding: '100px 0', backgroundColor: '#F8F8FC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px auto' }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Workflow & Delivery
            </span>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#17153B', marginTop: '8px', marginBottom: '14px' }}>
              {procedureOverview.title}
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
              {procedureOverview.subtitle}
            </p>
          </div>

          <ProcedureSteps steps={procedureOverview.steps} />
        </div>
      </section>

      {/* 8. Clients Grid with "Load More" */}
      <section style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px auto' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#17153B', marginBottom: '14px' }}>
              Our <span style={{ color: 'var(--accent)' }}>Clients</span>
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.05rem' }}>
              {clientsSection.subtitle}
            </p>
          </div>

          <ClientGrid clients={clientsSection.logos} />
        </div>
      </section>

      {/* 9. Parallax CTA Banner */}
      <ParallaxCta
        title={ctaBanner.title}
        subtitle={ctaBanner.subtitle}
        buttonText={ctaBanner.buttonText}
        buttonLink={ctaBanner.buttonLink}
        bgImage={ctaBanner.bgImage}
      />

      {/* Testimonials Slider */}
      <section style={{ padding: '110px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Client Endorsements
            </span>
          </div>
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>
    </main>
  );
}
