import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function TestimonialSlider({ testimonials = [] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div style={{ position: 'relative', maxWidth: '960px', margin: '0 auto', padding: '0 40px' }}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
      >
        {testimonials.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div style={{ textAlign: 'left', padding: '20px 0' }}>
              {/* Quotation Marks matching WeBeeSocial */}
              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '5.5rem',
                  lineHeight: '0.8',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  marginBottom: '10px',
                  userSelect: 'none'
                }}
              >
                ,,
              </div>

              {/* Quote Text */}
              <blockquote
                style={{
                  fontSize: 'clamp(1.2rem, 2vw + 0.5rem, 1.75rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 500,
                  lineHeight: 1.45,
                  color: '#17153B',
                  marginBottom: '28px',
                  fontStyle: 'normal'
                }}
              >
                "{item.quote}"
              </blockquote>

              {/* Separator line */}
              <div className="accent-separator" style={{ width: '40px', height: '2px', margin: '20px 0' }} />

              {/* Author & Organization matching WeBeeSocial */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#17153B'
                  }}
                >
                  {item.author}
                </span>
                <span style={{ color: '#888', fontSize: '1.1rem' }}>/</span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--accent)',
                    fontWeight: 600
                  }}
                >
                  {item.organization}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
        <button
          ref={prevRef}
          aria-label="Previous testimonial"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            border: '1px solid #D8D6E2',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#17153B',
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#D8D6E2';
            e.currentTarget.style.color = '#17153B';
          }}
        >
          <ChevronLeft size={22} />
        </button>

        <button
          ref={nextRef}
          aria-label="Next testimonial"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            border: '1px solid #D8D6E2',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#17153B',
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#D8D6E2';
            e.currentTarget.style.color = '#17153B';
          }}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
