import React from 'react';
import { Lightbulb, FileText, CheckCircle2, Palette, UploadCloud, ArrowRight } from 'lucide-react';

const icons = [Lightbulb, FileText, CheckCircle2, Palette, UploadCloud];

export default function ProcedureSteps({ steps = [] }) {
  return (
    <div style={{ marginTop: '50px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          position: 'relative'
        }}
      >
        {steps.map((step, idx) => {
          const IconComponent = icons[idx % icons.length];
          return (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '32px 24px',
                border: '1px solid #ECECF2',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all var(--transition-normal)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(199,44,129,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#ECECF2';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
              }}
            >
              {/* Step Number Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #17153B, #801C76)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconComponent size={24} />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    opacity: 0.8
                  }}
                >
                  {step.num || `0${idx + 1}`}
                </span>
              </div>

              {/* Step Title */}
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '12px',
                  color: '#17153B'
                }}
              >
                {step.name}
              </h3>

              {/* Step Description */}
              <p style={{ fontSize: '0.92rem', color: '#555566', lineHeight: 1.6, flexGrow: 1 }}>
                {step.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
