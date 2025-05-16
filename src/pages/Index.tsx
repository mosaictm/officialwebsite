import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
// import TestimonialsSection from '@/components/TestimonialsSection'; // Removed for now as it wasn't in the file list, uncomment if needed
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import DynamicBackground from '@/components/DynamicBackground';

const Index = () => {
  useEffect(() => {
    // Ensure the page starts from the top on initial load
    // Note: Snap scrolling might override this slightly depending on implementation
    window.scrollTo(0, 0);
  }, []);

  return (
      // REMOVE min-h-screen from this outer div
      <div className="bg-background text-foreground relative">
        <DynamicBackground />
        <Header />
        {/* ADD snap-container class here */}
        <div className="snap-container overflow-x-hidden">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <PortfolioSection />
          {/* <TestimonialsSection /> */} {/* Uncomment if you have this component */}
          <ContactSection />
          <Footer />
        </div>
        <ScrollToTop />
      </div>
  );
};

export default Index;