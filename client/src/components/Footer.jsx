import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { TwitterIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from './SocialIcons';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        {/* Top 4 Columns */}
        <div className="footer-top">
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Logo variant="light" size="default" />
            </div>
            <p style={{ color: '#A09CB8', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '24px' }}>
              We are a full service creative digital marketing agency based in New Delhi. We combine our expertise in creating integrated marketing solutions with creative visual output to generate a rich digital experience for businesses. We live by our motto – “Innovating the Digital Landscape with Creativity & Strategy!”
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.06)', padding: '10px 16px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <ShieldCheck size={24} style={{ color: 'var(--accent)' }} />
              <div>
                <div style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Verified Agency
                </div>
                <div style={{ color: '#8E8AA7', fontSize: '0.75rem' }}>
                  Coherence Visual LLP Media Partners
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Registered Office & Services (Strictly from cv letter head.pdf) */}
          <div>
            <h3 className="footer-title">Registered Office</h3>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '24px' }}>
              <MapPin size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }} />
              <p style={{ color: '#D8D4EC', fontSize: '0.92rem', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                J-67/68, F/F-2, J-BLOCK,<br />
                LAXMI NAGAR, NEAR MANDIR,<br />
                EAST DELHI, DELHI - 110092
              </p>
            </div>

            <h3 className="footer-title" style={{ marginTop: '20px' }}>Our Services</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Logo Design & Branding', path: '/our-services' },
                { name: 'Website Design & Dev', path: '/our-services' },
                { name: 'Video Editing & Production', path: '/our-services' },
                { name: 'Social Media Marketing', path: '/our-services' },
                { name: 'SEO & Growth Strategy', path: '/our-services' }
              ].map((s) => (
                <li key={s.name}>
                  <Link
                    to={s.path}
                    style={{
                      color: '#9E9AB7',
                      fontSize: '0.92rem',
                      transition: 'color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                    onMouseLeave={(e) => (e.target.style.color = '#9E9AB7')}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details (Direct from cv letter head.pdf) */}
          <div>
            <h3 className="footer-title">Direct Contact</h3>
            
            {/* Phone Numbers from Letterhead */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#8E8AA7', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} style={{ color: 'var(--accent)' }} />
                <span>Call Directly</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a
                  href="tel:+918789778359"
                  style={{
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
                >
                  +91 8789778359
                </a>
                <a
                  href="tel:+917061301321"
                  style={{
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
                >
                  +91 7061301321
                </a>
              </div>
            </div>

            {/* Email from Letterhead */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ color: '#8E8AA7', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} style={{ color: 'var(--accent)' }} />
                <span>Official Email</span>
              </div>
              <a
                href="mailto:coherencevisual@gmail.com"
                style={{
                  color: '#FFFFFF',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
              >
                coherencevisual@gmail.com
              </a>
            </div>

            {/* Creative Media Desks */}
            <div>
              <div style={{ color: '#8E8AA7', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                Regional Hubs
              </div>
              <p style={{ color: '#9E9AB7', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                East Delhi HQ &bull; Mussoorie Hospitality Desk &bull; Pan-India Digital Production
              </p>
            </div>
          </div>

          {/* Column 4: Connect & Inquiry */}
          <div>
            <h3 className="footer-title">Connect With Us</h3>
            <p style={{ color: '#9E9AB7', fontSize: '0.92rem', marginBottom: '16px' }}>
              Have an upcoming launch or rebranding campaign? Let's discuss your roadmap.
            </p>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#8E8AA7', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                Get In Touch
              </div>
              <Link
                to="/get-in-touch"
                style={{
                  color: 'var(--accent)',
                  fontWeight: 700,
                  fontSize: '0.96rem',
                  textDecoration: 'underline',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Contact our strategy team here</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Social Icons */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ color: '#8E8AA7', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                Follow Our Work
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
                >
                  <TwitterIcon size={17} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
                >
                  <FacebookIcon size={17} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
                >
                  <InstagramIcon size={17} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
                >
                  <LinkedinIcon size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Letterhead Address Ribbon (Matching cv letter head.pdf footer) */}
      <div
        style={{
          background: 'rgba(23, 21, 59, 0.75)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '16px 20px'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            textAlign: 'center'
          }}
        >
          {/* Stylized Location Icon from PDF letterhead */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #17153B 0%, #801C76 50%, #C72C81 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(199,44,129,0.3)',
              flexShrink: 0
            }}
          >
            <MapPin size={17} />
          </div>

          <span
            style={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.92rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            J-67/68, F/F-2, J-BLOCK, LAXMI NAGAR, NEAR MANDIR, EAST DELHI, DELHI-110092
          </span>

          <span style={{ color: '#8E8AA7', margin: '0 4px' }}>&bull;</span>

          <span style={{ color: '#C4B5FD', fontSize: '0.88rem', fontWeight: 600 }}>
            Ph: +91 8789778359 | 7061301321
          </span>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            Coherence Visual LLP (Digital marketing agency) &copy; {new Date().getFullYear()}. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/our-services" style={{ color: '#8C87A5', transition: 'color var(--transition-fast)' }}>
              Terms & Conditions
            </Link>
            <Link to="/get-in-touch" style={{ color: '#8C87A5', transition: 'color var(--transition-fast)' }}>
              Privacy & Engagement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
