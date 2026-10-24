import React, { useEffect } from 'react';
import { X, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { TwitterIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from './SocialIcons';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function SideMenu({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`side-drawer ${isOpen ? 'open' : ''}`}
        aria-label="Agency information drawer"
      >
        {/* Close Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <Logo variant="light" size="default" />
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              color: '#FFFFFF',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background var(--transition-fast)'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Agency Motto */}
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginBottom: '14px', lineHeight: 1.4 }}>
            "We passionately create intelligent and immersive digital experiences with fresh and innovative ideas."
          </h4>
          <div className="accent-separator" />
          <p style={{ color: '#C4B5FD', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Coherence Visual LLP is a premier digital marketing and creative agency. We combine strategic thinking with fresh visual craft to elevate brands across hospitality, real estate, nightlife, and lifestyle.
          </p>
        </div>

        {/* Contact Info */}
        <div style={{ marginBottom: '36px' }}>
          <h5 style={{ color: '#FFFFFF', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
            Office & Contact
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#D8D4EC' }}>
              <MapPin size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>
                J-67/68, F/F-2, J-Block, Laxmi Nagar, Near Mandir, East Delhi, Delhi - 110092
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#D8D4EC' }}>
              <Mail size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <a href="mailto:coherencevisual@gmail.com" style={{ fontSize: '0.95rem', color: '#FFFFFF', textDecoration: 'none' }}>
                coherencevisual@gmail.com
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#D8D4EC' }}>
              <Phone size={18} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <a href="tel:+918789778359" style={{ fontSize: '0.95rem', color: '#FFFFFF', textDecoration: 'none' }}>
                  +91 8789778359
                </a>
                <a href="tel:+917061301321" style={{ fontSize: '0.95rem', color: '#FFFFFF', textDecoration: 'none' }}>
                  +91 7061301321
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Nav */}
        <div style={{ marginBottom: '36px' }}>
          <h5 style={{ color: '#FFFFFF', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            Quick Links
          </h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { name: 'Our Work Portfolio', path: '/our-work' },
              { name: 'Services & Deliverables', path: '/our-services' },
              { name: 'Meet Core Team', path: '/about-us' },
              { name: 'Join Our Team', path: '/work-with-us' },
              { name: 'Start a Project', path: '/get-in-touch' }
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={onClose}
                  style={{
                    color: '#E2E0EE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '0.95rem',
                    transition: 'color var(--transition-fast)'
                  }}
                >
                  <span>{link.name}</span>
                  <ArrowRight size={16} style={{ color: 'var(--accent)' }} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h5 style={{ color: '#FFFFFF', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
            Follow Us
          </h5>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                transition: 'all var(--transition-fast)'
              }}
            >
              <TwitterIcon size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                transition: 'all var(--transition-fast)'
              }}
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                transition: 'all var(--transition-fast)'
              }}
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                transition: 'all var(--transition-fast)'
              }}
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
