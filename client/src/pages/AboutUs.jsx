import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake, Lightbulb, Users } from 'lucide-react';
import { fetchPageContent } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import TeamSection from '../components/TeamSection';
import ParallaxCta from '../components/ParallaxCta';
import { AnimatedTitle, AnimatedSubtitle } from '../components/AnimatedHeroText';

export default function AboutUs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPageContent('about-us').then((res) => {
      if (res && res.data) {
        setData(res.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <SkeletonLoader type="page" />;
  if (!data) return <div style={{ padding: '150px 0', textAlign: 'center' }}>Failed to load About Us content.</div>;

  const { hero, story, pillars, team, whyChooseUs } = data;

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
          <AnimatedSubtitle text={hero.lead} />
        </div>
      </section>

      {/* Agency Narrative / PDF Page 2 */}
      <section style={{ padding: '110px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Our Story
              </span>
              <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#17153B', marginTop: '8px', marginBottom: '16px' }}>
                Elevating Brands in Today's Digital Landscape
              </h2>
              <div className="accent-separator" />
              <p style={{ color: '#555566', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '20px' }}>
                {story.paragraph1}
              </p>
              <p style={{ color: '#555566', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '32px' }}>
                {story.paragraph2}
              </p>
              <Link to="/get-in-touch" className="btn-primary">
                <span>Partner With Us</span>
                <ArrowRight size={18} className="btn-icon" />
              </Link>
            </div>

            {/* Quote Card matching PDF Page 11 */}
            <div
              style={{
                background: 'linear-gradient(145deg, #17153B, #801C76)',
                borderRadius: '16px',
                padding: '50px 40px',
                color: '#FFFFFF',
                boxShadow: '0 16px 40px rgba(23, 21, 59, 0.25)',
                position: 'relative'
              }}
            >
              <div style={{ fontSize: '5rem', lineHeight: '0.8', color: 'var(--accent)', fontFamily: 'Georgia, serif' }}>
                “
              </div>
              <blockquote style={{ fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.45, marginBottom: '24px', color: '#FFFFFF' }}>
                {story.quote}
              </blockquote>
              <div style={{ color: '#C4B5FD', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Coherence Visual LLP &bull; Vision Statement
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars - Message From Creator / PDF Page 6 */}
      <section style={{ padding: '110px 0', backgroundColor: '#F8F8FC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {pillars.badge}
            </span>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#17153B', marginTop: '8px', marginBottom: '14px' }}>
              {pillars.title}
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
              Core tenets guiding our creative direction, client solutions, and daily execution.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {pillars.items.map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '36px 28px',
                  border: '1px solid #ECECF2',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  transition: 'all var(--transition-normal)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(199,44,129,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#ECECF2';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    marginBottom: '12px'
                  }}
                >
                  {p.num}
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#17153B', marginBottom: '12px' }}>
                  {p.title}
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Section / PDF Pages 9 & 10 */}
      <section style={{ padding: '110px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {team.badge}
            </span>
            <h2 style={{ fontSize: '3rem', fontWeight: 700, color: '#17153B', marginTop: '8px', marginBottom: '16px' }}>
              {team.title}
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
              Multidisciplinary innovators combining 8+ years of digital strategy, fine arts visual direction, and high-trust brand growth consulting.
            </p>
          </div>

          <TeamSection team={team.members} />
        </div>
      </section>

      {/* Why Choose Us / PDF Page 3 */}
      <section style={{ padding: '110px 0', backgroundColor: '#F8F8FC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#17153B', marginBottom: '14px' }}>
              {whyChooseUs.title}
            </h2>
            <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.15rem' }}>
              {whyChooseUs.subtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {whyChooseUs.points.map((pt, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  padding: '32px 28px',
                  borderRadius: '10px',
                  border: '1px solid #ECECF2',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}
              >
                <CheckCircle2 size={24} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#17153B', marginBottom: '8px' }}>
                    {pt.title}
                  </h4>
                  <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {pt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax CTA Banner */}
      <ParallaxCta
        title="LET'S MAKE SOMETHING BIG TOGETHER"
        subtitle="Whether you're a startup looking to make an impact or an established brand seeking a fresh perspective, Coherence Visual LLP is your partner in success."
        buttonText="Get In Touch"
        buttonLink="/get-in-touch"
        bgImage="/src/assets/photo/hotel-journee-location-post.webp"
      />
    </main>
  );
}
