import React from 'react';
import { Target, Lightbulb, Sparkles, Film, Rocket } from 'lucide-react';

const icons = [Target, Sparkles, Lightbulb, Film, Rocket];

export default function ThinkProcess({ steps = [] }) {
  return (
    <div style={{ padding: '40px 0', position: 'relative' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          position: 'relative'
        }}
      >
        {steps.map((step, idx) => {
          const IconComp = icons[idx % icons.length];
          const isOdd = idx % 2 === 1;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transform: isOdd ? 'translateY(16px)' : 'translateY(0)',
                transition: 'transform var(--transition-normal)'
              }}
            >
              {/* Icon Bubble */}
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #17153B, #C72C81)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  marginBottom: '20px',
                  boxShadow: '0 8px 24px rgba(199, 44, 129, 0.3)',
                  border: '3px solid #FFFFFF'
                }}
              >
                <IconComp size={36} />
              </div>

              {/* Title & Badge */}
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                  marginBottom: '4px'
                }}
              >
                STAGE {step.number}
              </div>

              <h4
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#17153B',
                  letterSpacing: '0.04em',
                  marginBottom: '8px'
                }}
              >
                {step.name}
              </h4>

              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
