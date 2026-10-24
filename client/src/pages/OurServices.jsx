import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileCheck, Layers, Sparkles, ShieldAlert } from 'lucide-react';
import { fetchPageContent } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import ProcedureSteps from '../components/ProcedureSteps';
import ParallaxCta from '../components/ParallaxCta';
import { AnimatedTitle, AnimatedSubtitle } from '../components/AnimatedHeroText';

export default function OurServices() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPageContent('our-services').then((res) => {
      if (res && res.data) {
        setData(res.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <SkeletonLoader type="page" />;
  if (!data) return <div style={{ padding: '150px 0', textAlign: 'center' }}>Failed to load services content.</div>;

  const { hero, serviceList, terms } = data;

  return (
    <main>
      {/* Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: '100px 0 75px 0',
          backgroundImage: `linear-gradient(135deg, rgba(23, 21, 59, 0.94) 0%, rgba(59, 24, 95, 0.9) 50%, rgba(199, 44, 129, 0.85) 100%), url(${hero.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF'
        }}
      >
        <div className="container" style={{ maxWidth: '960px' }}>
          <AnimatedTitle text={hero.title} />
          <AnimatedSubtitle text={hero.subtitle} />
        </div>
      </section>

      {/* In-Depth Capability Breakdown */}
      <section style={{ padding: '110px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '90px' }}>
            {serviceList.map((service, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={service.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                    gap: '50px',
                    alignItems: 'center'
                  }}
                >
                  {/* Visual Preview */}
                  <div
                    style={{
                      order: isEven ? 2 : 1,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
                      height: '420px',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: 'rgba(23, 21, 59, 0.85)',
                        backdropFilter: 'blur(8px)',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em'
                      }}
                    >
                      Capability 0{idx + 1}
                    </div>
                  </div>

                  {/* Content Detail */}
                  <div style={{ order: isEven ? 1 : 2 }}>
                    <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {service.lead}
                    </span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#17153B', marginTop: '6px', marginBottom: '12px' }}>
                      {service.title}
                    </h2>
                    <div className="accent-separator" />
                    <h4 style={{ fontSize: '1.15rem', color: '#17153B', fontWeight: 600, marginBottom: '16px' }}>
                      "{service.tagline}"
                    </h4>
                    <p style={{ color: '#555566', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
                      {service.description}
                    </p>

                    {/* Deliverables tags */}
                    <div style={{ marginBottom: '28px' }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', color: '#17153B', letterSpacing: '0.06em', marginBottom: '10px' }}>
                        Key Deliverables
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {service.deliverables.map((item, dIdx) => (
                          <span
                            key={dIdx}
                            style={{
                              background: '#F1EFF9',
                              color: '#17153B',
                              padding: '6px 14px',
                              borderRadius: '20px',
                              fontSize: '0.85rem',
                              fontWeight: 500
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link to="/get-in-touch" className="btn-primary">
                      <span>Request Proposal</span>
                      <ArrowRight size={18} className="btn-icon" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagement Terms & Conditions / PDF Page 8 */}
      <section style={{ padding: '110px 0', backgroundColor: '#F8F8FC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Transparency & Operating Standards
            </span>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#17153B', marginTop: '8px', marginBottom: '14px' }}>
              {terms.title}
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
              {terms.subtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {terms.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '32px 28px',
                  border: '1px solid #ECECF2',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <FileCheck size={22} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#17153B' }}>
                    {item.term}
                  </h3>
                </div>
                <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax CTA Banner */}
      <ParallaxCta
        title="READY TO ELEVATE YOUR BRAND?"
        subtitle="Our approach combines user, business and stakeholder requirements to drive measurable ROI."
        buttonText="Get In Touch"
        buttonLink="/get-in-touch"
        bgImage="/src/assets/photo/avenue-real-estate-4.webp"
      />
    </main>
  );
}
