import React, { useState } from 'react';

export default function ClientGrid({ clients = [] }) {
  const [visibleCount, setVisibleCount] = useState(8);
  const totalClients = clients.length;
  const hasMore = visibleCount < totalClients;

  const handleToggle = () => {
    if (hasMore) {
      setVisibleCount((prev) => Math.min(prev + 8, totalClients));
    } else {
      setVisibleCount(8);
    }
  };

  return (
    <div className="client-grid-wrapper" style={{ width: '100%' }}>
      <div className="clients-grid">
        {clients.slice(0, visibleCount).map((client, idx) => (
          <div key={idx} className="client-card">
            <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={client.image}
                alt={client.name}
                loading="lazy"
                style={{ maxHeight: '65px', maxWidth: '130px', objectFit: 'contain' }}
              />
            </div>
            <div style={{ marginTop: '12px', textAlign: 'center' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  color: '#17153B',
                  display: 'block'
                }}
              >
                {client.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#888' }}>
                {client.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {totalClients > 8 && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            id="loadMore"
            onClick={handleToggle}
            className="btn-primary"
            style={{
              background: hasMore ? 'var(--accent)' : '#444',
              color: '#FFFFFF',
              boxShadow: 'none',
              padding: '14px 36px',
              fontSize: '0.9rem'
            }}
          >
            {hasMore ? 'Load More Clients' : 'Show Less'}
          </button>
        </div>
      )}
    </div>
  );
}
