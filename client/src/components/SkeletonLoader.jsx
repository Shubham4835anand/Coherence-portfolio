import React from 'react';

export default function SkeletonLoader({ type = 'page' }) {
  if (type === 'hero') {
    return (
      <div style={{ minHeight: '80vh', background: '#120E29', display: 'flex', alignItems: 'center', padding: '120px 24px' }}>
        <div className="container" style={{ width: '100%' }}>
          <div className="skeleton" style={{ width: '180px', height: '28px', marginBottom: '24px' }} />
          <div className="skeleton" style={{ width: '70%', height: '64px', marginBottom: '24px' }} />
          <div className="skeleton" style={{ width: '50%', height: '24px', marginBottom: '36px' }} />
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="skeleton" style={{ width: '160px', height: '52px' }} />
            <div className="skeleton" style={{ width: '140px', height: '52px' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '120px 0', minHeight: '100vh', background: '#FFFFFF' }}>
      <div className="container">
        <div className="skeleton" style={{ width: '220px', height: '32px', marginBottom: '20px' }} />
        <div className="skeleton" style={{ width: '60%', height: '56px', marginBottom: '30px' }} />
        <div className="skeleton" style={{ width: '90%', height: '20px', marginBottom: '14px' }} />
        <div className="skeleton" style={{ width: '80%', height: '20px', marginBottom: '48px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          <div className="skeleton" style={{ height: '280px' }} />
          <div className="skeleton" style={{ height: '280px' }} />
          <div className="skeleton" style={{ height: '280px' }} />
        </div>
      </div>
    </div>
  );
}
