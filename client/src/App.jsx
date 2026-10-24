import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurServices from './pages/OurServices';
import OurWork from './pages/OurWork';
import GetInTouch from './pages/GetInTouch';
import WorkWithUs from './pages/WorkWithUs';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/our-services" element={<OurServices />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/our-work/:category" element={<OurWork />} />
            <Route path="/get-in-touch" element={<GetInTouch />} />
            <Route path="/work-with-us" element={<WorkWithUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
