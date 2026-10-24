import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

export default function TeamSection({ team = [] }) {
  if (!team || team.length === 0) return null;

  return (
    <div style={{ marginTop: '50px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}
      >
        {team.map((member, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #ECECF2',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all var(--transition-normal)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(199,44,129,0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#ECECF2';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
            }}
          >
            {/* Top Header Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #17153B, #801C76)',
                padding: '32px 28px',
                color: '#FFFFFF'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>

              <h3 style={{ color: '#FFFFFF', fontSize: '1.45rem', fontWeight: 700, marginBottom: '6px' }}>
                {member.name}
              </h3>
              <div
                style={{
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '6px'
                }}
              >
                {member.role}
              </div>
              <div style={{ color: '#C4B5FD', fontSize: '0.85rem' }}>
                {member.credentials}
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '28px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* Quote */}
              <blockquote
                style={{
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  color: '#4A485A',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                  paddingLeft: '14px',
                  borderLeft: '3px solid var(--accent)'
                }}
              >
                "{member.quote}"
              </blockquote>

              {/* Core Competencies */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#17153B',
                    letterSpacing: '0.08em',
                    marginBottom: '12px'
                  }}
                >
                  Core Competencies
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {member.competencies.map((comp, cIdx) => (
                    <li key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#555566' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
