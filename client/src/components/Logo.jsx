import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ variant = 'light', size = 'default' }) {
  const isLight = variant === 'light';
  const textColor = isLight ? '#FFFFFF' : '#17153B';
  const subColor = isLight ? '#C4B5FD' : '#64748B';

  return (
    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
      {/* SVG Icon matching Coherence Visual PDF */}
      <svg
        width={size === 'large' ? '54' : '44'}
        height={size === 'large' ? '54' : '44'}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(199,44,129,0.3))' }}
      >
        <circle cx="50" cy="50" r="48" fill="url(#logo-gradient)" />
        {/* Crisp Chevron / Arrowhead cut-out from PDF */}
        <path
          d="M62 26L36 50L62 74L68 67L48 50L68 33L62 26Z"
          fill="#FFFFFF"
        />
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#17153B" />
            <stop offset="0.6" stopColor="#801C76" />
            <stop offset="1" stopColor="#C72C81" />
          </linearGradient>
        </defs>
      </svg>

      {/* Brand Text */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: size === 'large' ? '1.38rem' : '1.18rem',
              letterSpacing: '0.05em',
              color: textColor,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              transition: 'color var(--transition-fast)'
            }}
          >
            COHERENCE VISUAL
          </span>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: size === 'large' ? '0.78rem' : '0.7rem',
              letterSpacing: '0.1em',
              color: '#FFFFFF',
              background: 'var(--accent)',
              padding: '2px 6px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              lineHeight: 1,
              boxShadow: '0 2px 6px rgba(199,44,129,0.35)'
            }}
          >
            LLP
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: size === 'large' ? '0.75rem' : '0.68rem',
            letterSpacing: '0.18em',
            color: subColor,
            textTransform: 'uppercase',
            transition: 'color var(--transition-fast)',
            marginTop: '2px'
          }}
        >
          Digital Marketing Agency
        </span>
      </div>
    </Link>
  );
}
