import React from 'react';

/**
 * AnimatedTitle - Implements Animation 2 from 62644f7162c08f6da3c4c990_text-animation-wfshowcase.gif
 * Staggered letter-by-letter wave reveal from left to right with subtle blur-to-sharp focus
 * and floating purple/magenta scribble accent loop.
 */
export function AnimatedTitle({ text, style = {}, showRing = true, as: Component = 'h1' }) {
  if (!text) return null;

  let charCounter = 0;
  const words = String(text).split(' ');

  return (
    <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
      <Component
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          color: '#FFFFFF',
          marginBottom: '24px',
          letterSpacing: '-0.02em',
          position: 'relative',
          display: 'inline-block',
          ...style
        }}
      >
        {words.map((word, wIdx) => (
          <span
            key={wIdx}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              marginRight: '0.28em'
            }}
          >
            {word.split('').map((char, cIdx) => {
              const delay = charCounter * 28; // 28ms stagger per character
              charCounter++;
              return (
                <span
                  key={cIdx}
                  className="anim2-char"
                  style={{
                    animationDelay: `${delay}ms`
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}

        {/* Floating Animated Scribble Accent Loop (from the GIF showcase) */}
        {showRing && (
          <span
            className="anim-scribble-ring"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-20px',
              right: '-14px',
              width: '58px',
              height: '40px',
              pointerEvents: 'none',
              opacity: 0,
              animation: 'scribbleFadeIn 0.8s ease forwards 0.9s'
            }}
          >
            <svg
              viewBox="0 0 100 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: '100%',
                height: '100%',
                animation: 'scribblePulse 4s ease-in-out infinite 1.8s'
              }}
            >
              <ellipse
                cx="50"
                cy="32"
                rx="42"
                ry="22"
                stroke="#C72C81"
                strokeWidth="3.2"
                strokeDasharray="250"
                strokeDashoffset="250"
                style={{ animation: 'drawRing 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 1s' }}
              />
              <ellipse
                cx="47"
                cy="35"
                rx="38"
                ry="18"
                stroke="#A855F7"
                strokeWidth="2.4"
                opacity="0.85"
                strokeDasharray="230"
                strokeDashoffset="230"
                style={{ animation: 'drawRing 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 1.2s' }}
              />
            </svg>
          </span>
        )}
      </Component>
    </div>
  );
}

/**
 * AnimatedSubtitle - Implements Animation 1 from 62644f7162c08f6da3c4c990_text-animation-wfshowcase.gif
 * Staggered slide-up from bottom with opacity fade for the data just below.
 */
export function AnimatedSubtitle({ text, style = {}, baseDelay = 420, as: Component = 'p' }) {
  if (!text) return null;

  const words = String(text).split(' ');

  return (
    <Component
      style={{
        fontSize: 'clamp(1.1rem, 1.4vw, 1.25rem)',
        color: '#D8D4EC',
        fontWeight: 400,
        lineHeight: 1.65,
        maxWidth: '820px',
        margin: '0 0 32px 0',
        ...style
      }}
    >
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          className="anim1-word"
          style={{
            display: 'inline-block',
            marginRight: '0.28em',
            animationDelay: `${baseDelay + wIdx * 24}ms`
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}

export default { AnimatedTitle, AnimatedSubtitle };
