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
    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-slide-up, .animate-slide-in-left, .animate-slide-in-right');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
