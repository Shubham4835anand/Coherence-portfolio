import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ParallaxCta({
  title = "LET'S MAKE SOMETHING BIG TOGETHER",
  subtitle = "We passionately create intelligent and immersive digital experiences with fresh and innovative ideas.",
  buttonText = "Start Your Project",
  buttonLink = "/get-in-touch",
  bgImage = "/src/assets/photo/hotel-nest-mountain-view-text.webp"
}) {
  return (
    <section
      className="parallax-section"
      style={{
        backgroundImage: `linear-gradient(rgba(18, 14, 41, 0.85), rgba(18, 14, 41, 0.9)), url(${bgImage})`,
        padding: '130px 20px',
        textAlign: 'center',
        color: '#FFFFFF'
      }}
    >
      <div className="container" style={{ maxWidth: '900px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 4vw + 0.5rem, 3.8rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '20px',
            letterSpacing: '-0.02em'
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: '1.2rem',
              color: '#D8D4EC',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '750px',
              margin: '0 auto 36px auto'
            }}
          >
            {subtitle}
          </p>
        )}
        <Link to={buttonLink} className="btn-primary" style={{ padding: '18px 44px', fontSize: '1rem' }}>
          <span>{buttonText}</span>
          <ArrowRight size={20} className="btn-icon" />
        </Link>
      </div>
    </section>
  );
}
