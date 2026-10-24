import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, CheckCircle2, Sparkles, Send, HeartHandshake } from 'lucide-react';
import { fetchPageContent } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import ParallaxCta from '../components/ParallaxCta';
import { AnimatedTitle, AnimatedSubtitle } from '../components/AnimatedHeroText';

export default function WorkWithUs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPageContent('work-with-us').then((res) => {
      if (res && res.data) {
        setData(res.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <SkeletonLoader type="page" />;
  if (!data) return <div style={{ padding: '150px 0', textAlign: 'center' }}>Failed to load careers page.</div>;

  const { hero, culture, openings } = data;

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

      {/* Agency Culture & Philosophy */}
      <section style={{ padding: '110px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Our Culture
            </span>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#17153B', marginTop: '8px', marginBottom: '14px' }}>
              {culture.title}
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
              "{culture.subtitle}"
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px'
            }}
          >
            {culture.perks.map((perk, idx) => (
              <div
                key={idx}
                style={{
                  background: '#F8F8FC',
                  borderRadius: '12px',
                  padding: '36px 28px',
                  border: '1px solid #ECECF2',
                  transition: 'all var(--transition-normal)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(199,44,129,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#ECECF2';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #17153B, #801C76)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#17153B', marginBottom: '12px' }}>
                  {perk.title}
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section style={{ padding: '110px 0', backgroundColor: '#F8F8FC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Current Openings
            </span>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#17153B', marginTop: '8px', marginBottom: '14px' }}>
              Join Our Creative & Strategic Team
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
              Work directly with our team leads to design high-impact visuals, produce viral short-form edits, and drive brand dominance.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {openings.map((job, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '36px',
                  border: '1px solid #ECECF2',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '24px',
                  transition: 'all var(--transition-normal)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(199,44,129,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#ECECF2';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                }}
              >
                <div style={{ maxWidth: '700px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{ background: '#F1EFF9', color: '#17153B', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                      {job.department}
                    </span>
                    <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 500 }}>
                      {job.type}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#17153B', marginBottom: '8px' }}>
                    {job.role}
                  </h3>
                  <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '16px', fontWeight: 500 }}>
                    {job.lead}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', color: '#17153B', letterSpacing: '0.06em', marginBottom: '8px' }}>
                      Key Focus Areas:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {job.requirements.map((req, rIdx) => (
                        <li key={rIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#555566' }}>
                          <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ alignSelf: 'center' }}>
                  <Link
                    to="/get-in-touch"
                    state={{ service: `Career Inquiry: ${job.role}` }}
                    className="btn-primary"
                    style={{ padding: '14px 28px', fontSize: '0.9rem' }}
                  >
                    <span>Get in touch</span>
                    <ArrowRight size={16} className="btn-icon" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax CTA Banner */}
      <ParallaxCta
        title="DON'T SEE THE EXACT ROLE?"
        subtitle="We are always looking for passionate creators, editors, and strategists. Reach out directly with your portfolio."
        buttonText="Get In Touch"
        buttonLink="/get-in-touch"
        bgImage="/photo/avenue-real-estate-10.webp"
      />
    </main>
  );
}
