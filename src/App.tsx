import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import MediaGallery from './components/MediaGallery';
import Booking from './components/Booking';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Enhanced scroll animations with better performance and mobile support
    const isMobile = window.innerWidth <= 768;
    const observerOptions = {
      threshold: isMobile ? [0, 0.1, 0.2, 0.3, 0.4, 0.5] : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px' // More sensitive on mobile
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Add staggered animation delays for child elements
          const children = entry.target.querySelectorAll('.animate-stagger-1, .animate-stagger-2, .animate-stagger-3, .animate-stagger-4, .animate-stagger-5');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, index * (isMobile ? 50 : 100)); // Faster on mobile
          });
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.animate-slide-up, .animate-slide-in-left, .animate-slide-in-right, .animate-fade-in, .animate-scale-in, .animate-rotate-in, .reveal-on-scroll'
    );
    animatedElements.forEach((el) => observer.observe(el));

    // Parallax effect for background elements
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-fast');
      
      parallaxElements.forEach((element) => {
        const speed = element.classList.contains('parallax-slow') ? 0.5 : 0.3;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.setProperty('--scroll-offset', `${yPos}px`);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle resize events to update mobile detection
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        // Re-observe elements with new settings if mobile state changed
        observer.disconnect();
        const newObserverOptions = {
          threshold: newIsMobile ? [0, 0.1, 0.2, 0.3, 0.4, 0.5] : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
          rootMargin: newIsMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
        };
        
        const newObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              
              const children = entry.target.querySelectorAll('.animate-stagger-1, .animate-stagger-2, .animate-stagger-3, .animate-stagger-4, .animate-stagger-5');
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.classList.add('visible');
                }, index * (newIsMobile ? 50 : 100));
              });
            }
          });
        }, newObserverOptions);
        
        animatedElements.forEach((el) => newObserver.observe(el));
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <Navigation />
      
      {/* Fixed Hero Section - Non-scrollable */}
      <section id="home" className="fixed inset-0 z-0">
        <Hero />
      </section>
      
      {/* Scrollable Content - Starts after hero */}
      <main className="relative z-10 mt-screen">
        <About />
        <Services />
        <MediaGallery />
        <Booking />
        <Testimonials />
        <Footer />
      </main>
    </div>
  );
}

export default App;
