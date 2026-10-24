import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NewsCards({ news = [] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px'
      }}
    >
      {/* Title Card matching WeBeeSocial edgtf-blog-list-title */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px 30px'
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#17153B',
            letterSpacing: '-0.02em'
          }}
        >
          Our news<span style={{ color: 'var(--accent)' }}>...</span>
        </div>
        <p style={{ marginTop: '16px', color: '#666', fontSize: '1.05rem' }}>
          Latest updates, strategic expansions, and production milestones from the Coherence Visual team.
        </p>
      </div>

      {/* News Items */}
      {news.map((item, idx) => (
        <article
          key={idx}
          style={{
            background: '#FFFFFF',
            border: '1px solid #ECECF2',
            borderRadius: '8px',
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all var(--transition-normal)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(199,44,129,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#ECECF2';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
          }}
        >
          <div>
            {/* Category & Date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  letterSpacing: '0.06em'
                }}
              >
                {item.category}
              </span>
              <span style={{ color: '#CCC' }}>&bull;</span>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>
                {item.date}
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#17153B',
                marginBottom: '16px',
                lineHeight: 1.3
              }}
            >
              {item.title}
            </h3>

            {/* Excerpt */}
            <p style={{ color: '#555566', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {item.excerpt}
            </p>
          </div>

          {/* Read More Link (Internal to capability/services, NO blog) */}
          <Link
            to={item.link || '/our-services'}
            className="btn-transparent"
            style={{ padding: '0', fontSize: '0.95rem' }}
          >
            <span>Read More</span>
            <ArrowRight size={16} className="btn-icon" />
          </Link>
        </article>
      ))}
    </div>
  );
}
