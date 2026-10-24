import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import Logo from './Logo';
import SideMenu from './SideMenu';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation Items strictly matching instructions (NO BLOG)
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Our Services', path: '/our-services' },
    { name: 'Our Work', path: '/our-work' },
    { name: 'Get In Touch', path: '/get-in-touch' },
    { name: 'Work With Us', path: '/work-with-us' }
  ];

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    setIsSearchOpen(false);
    if (query.includes('work') || query.includes('portfolio') || query.includes('project')) {
      navigate('/our-work');
    } else if (query.includes('service') || query.includes('seo') || query.includes('brand') || query.includes('video')) {
      navigate('/our-services');
    } else if (query.includes('about') || query.includes('team') || query.includes('sumit') || query.includes('prashant')) {
      navigate('/about-us');
    } else if (query.includes('career') || query.includes('job') || query.includes('join')) {
      navigate('/work-with-us');
    } else {
      navigate('/get-in-touch');
    }
  };

  return (
    <>
      <header className={`site-header ${isSticky ? 'sticky' : ''}`} role="banner">
        <div className="container-fluid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Brand Logo */}
          <Logo variant={isSticky ? 'dark' : 'light'} />

          {/* Desktop Navigation */}
          <nav
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            className="desktop-nav-container"
            aria-label="Main Navigation"
          >
            <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', gap: '4px' }}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    end={item.path === '/'}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Header Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '12px' }}>
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle search bar"
                style={{
                  color: isSticky ? '#17153B' : '#FFFFFF',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color var(--transition-fast)'
                }}
              >
                <Search size={20} />
              </button>

              {/* Side Drawer Hamburger Opener (matching WeBeeSocial ion-navicon) */}
              <button
                onClick={() => setIsSideMenuOpen(true)}
                aria-label="Open side information menu"
                style={{
                  color: isSticky ? '#17153B' : '#FFFFFF',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color var(--transition-fast)'
                }}
              >
                <Menu size={24} />
              </button>
            </div>
          </nav>

          {/* Mobile Opener */}
          <div className="mobile-header-actions" style={{ display: 'none', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              aria-label="Toggle mobile menu"
              style={{
                color: isSticky ? '#17153B' : '#FFFFFF',
                background: isSticky ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.15)',
                borderRadius: '6px',
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Cover Bar */}
        {isSearchOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              background: '#FFFFFF',
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              borderTop: '1px solid #ECECEC',
              padding: '16px 24px',
              zIndex: 1001,
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <div className="container">
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Search size={22} style={{ color: 'var(--accent)' }} />
                <input
                  type="text"
                  placeholder="Search capabilities, case studies, team, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-heading)',
                    color: '#17153B'
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  style={{ color: '#888', padding: '6px' }}
                >
                  <X size={20} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Dropdown */}
        {isMobileNavOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              background: '#120E29',
              borderBottom: '2px solid var(--accent)',
              padding: '24px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
              zIndex: 1002
            }}
            className="mobile-nav-panel"
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMobileNavOpen(false)}
                    style={({ isActive }) => ({
                      display: 'block',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      color: isActive ? 'var(--accent)' : '#FFFFFF',
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)'
                    })}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
              <li style={{ paddingTop: '10px' }}>
                <button
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    setIsSideMenuOpen(true);
                  }}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Agency Info & Office
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Slide-out side menu drawer */}
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />

      {/* Style overrides for responsive header */}
      <style>{`
        @media (max-width: 991px) {
          .desktop-nav-container {
            display: none !important;
          }
          .mobile-header-actions {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
