import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import { fetchPageContent, submitContactForm } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import ParallaxCta from '../components/ParallaxCta';
import { AnimatedTitle, AnimatedSubtitle } from '../components/AnimatedHeroText';

export default function GetInTouch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Branding & Logo Design',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { success: boolean, message: string }
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPageContent('get-in-touch').then((res) => {
      if (res && res.data) {
        setData(res.data);
      }
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors.length > 0) setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    setErrors([]);

    const res = await submitContactForm(formData);
    setSubmitting(false);

    if (res.ok) {
      setSubmitStatus({
        success: true,
        message: res.data.message || 'Thank you! Your message has been received. Our team will get back to you within 24 hours.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Branding & Logo Design',
        message: ''
      });
    } else {
      setSubmitStatus({
        success: false,
        message: res.data.message || 'There was an issue sending your message. Please check the fields below.'
      });
      if (res.data.errors) {
        setErrors(res.data.errors);
      }
    }
  };

  if (loading) return <SkeletonLoader type="page" />;
  if (!data) return <div style={{ padding: '150px 0', textAlign: 'center' }}>Failed to load contact page.</div>;

  const { hero, contactInfo, formFields } = data;

  return (
    <main>
      {/* Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: '100px 0 75px 0',
          backgroundImage: `linear-gradient(135deg, rgba(23, 21, 59, 0.94) 0%, rgba(59, 24, 95, 0.9) 50%, rgba(199, 44, 129, 0.85) 100%), url(${hero.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF'
        }}
      >
        <div className="container" style={{ maxWidth: '960px' }}>
          <AnimatedTitle text={hero.title} />
          <AnimatedSubtitle text={hero.subtitle} />
        </div>
      </section>

      {/* Main Content Grid: Form + Info */}
      <section style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '60px',
              alignItems: 'flex-start'
            }}
          >
            {/* Contact Form Card */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '44px 36px',
                border: '1px solid #ECECF2',
                boxShadow: '0 12px 35px rgba(0,0,0,0.06)'
              }}
            >
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#17153B', marginBottom: '8px' }}>
                Send Us A Message
              </h2>
              <div className="accent-separator" />
              <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.6, marginBottom: '28px' }}>
                Fill out the form below and our strategy team will reach out to discuss your project requirements and initial roadmap.
              </p>

              {/* Success Notification */}
              {submitStatus && submitStatus.success && (
                <div
                  style={{
                    background: '#ECFDF5',
                    border: '1px solid #10B981',
                    borderRadius: '8px',
                    padding: '16px 20px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    color: '#065F46'
                  }}
                >
                  <CheckCircle2 size={24} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>Inquiry Sent Successfully!</strong>
                    <span>{submitStatus.message}</span>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {submitStatus && !submitStatus.success && (
                <div
                  style={{
                    background: '#FEF2F2',
                    border: '1px solid #EF4444',
                    borderRadius: '8px',
                    padding: '16px 20px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    color: '#991B1B'
                  }}
                >
                  <AlertCircle size={24} style={{ color: '#EF4444', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>Submission Failed</strong>
                    <span>{submitStatus.message}</span>
                  </div>
                </div>
              )}

              {/* Detailed Validation Errors */}
              {errors.length > 0 && (
                <ul style={{ background: '#FFF1F2', padding: '12px 28px', borderRadius: '8px', marginBottom: '20px', color: '#BE123C', fontSize: '0.9rem' }}>
                  {errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service" className="form-label">
                    Primary Service Needed *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Branding & Logo Design">Branding & Logo Design</option>
                    <option value="Website Design & Development">Website Design & Development</option>
                    <option value="Video Production & Editing">Video Production & Editing</option>
                    <option value="SEO & Digital Marketing">SEO & Digital Marketing</option>
                    <option value="Social Media Strategy">Social Media Strategy</option>
                    <option value="Comprehensive 360° Package">Comprehensive 360° Package</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Project Details & Goals *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your brand, current challenges, objectives, and timeline..."
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '18px 30px',
                    opacity: submitting ? 0.7 : 1
                  }}
                >
                  <Send size={18} />
                  <span>{submitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            </div>

            {/* Direct Contact Info & SLAs */}
            <div>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Contact Channels
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#17153B', marginTop: '6px', marginBottom: '14px' }}>
                {contactInfo.headline}
              </h2>
              <div className="accent-separator" />
              <p style={{ color: '#555566', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '36px' }}>
                {contactInfo.intro}
              </p>

              {/* Channels List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                {contactInfo.channels.map((ch, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#F8F8FC',
                      padding: '24px',
                      borderRadius: '12px',
                      border: '1px solid #ECECF2',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start'
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #17153B, #801C76)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {idx === 0 ? <Mail size={22} /> : idx === 1 ? <ShieldCheck size={22} /> : idx === 2 ? <CheckCircle2 size={22} /> : <MapPin size={22} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {ch.label}
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#17153B', margin: '4px 0' }}>
                        {ch.value}
                      </div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--accent)', fontWeight: 500 }}>
                        {ch.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Operational Guarantee */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #17153B, #801C76)',
                  borderRadius: '12px',
                  padding: '28px',
                  color: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Clock size={22} style={{ color: 'var(--accent)' }} />
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem', fontWeight: 700 }}>
                    Rapid Response Commitment
                  </h4>
                </div>
                <p style={{ color: '#D8D4EC', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Every inquiry receives dedicated review from our managing directors and creative lead within 24 business hours with initial recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax CTA Banner */}
      <ParallaxCta
        title="LET'S MAKE SOMETHING BIG TOGETHER"
        subtitle="We passionately create intelligent and immersive digital experiences with fresh and innovative ideas."
        buttonText="Explore Our Work"
        buttonLink="/our-work"
        bgImage="/photo/hotel-nest-mountain-view-text.webp"
      />
    </main>
  );
}
