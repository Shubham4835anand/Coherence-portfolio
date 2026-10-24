import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '160px 24px 100px 24px',
        backgroundColor: '#FFFFFF'
      }}
    >
      <div className="container" style={{ maxWidth: '600px' }}>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(5rem, 12vw, 8rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: 'var(--accent)',
            marginBottom: '10px'
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#17153B',
            marginBottom: '16px'
          }}
        >
          Page Not Found
        </h1>
        <p style={{ color: '#64748B', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
          The page you are looking for doesn't exist or has been relocated within the Coherence Visual network.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary">
            <Home size={18} />
            <span>Return to Home</span>
          </Link>
          <Link to="/our-services" className="btn-transparent">
            <span>Explore Capabilities</span>
            <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
          </Link>
        </div>
      </div>
    </main>
  );
}
