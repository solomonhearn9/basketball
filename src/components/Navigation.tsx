import React, { useState, useEffect, useRef } from 'react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open and handle focus management
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent layout shift
      
      // Focus management for accessibility
      const firstMenuItem = menuRef.current?.querySelector('button');
      if (firstMenuItem) {
        setTimeout(() => firstMenuItem.focus(), 100);
      }
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      
      // Return focus to menu button when closing
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isMenuOpen]);

  // Handle escape key to close menu and touch gestures
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        handleMenuToggle();
      }
    };

    // Touch gesture support for mobile
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (!isMenuOpen) return;
      startY = e.touches[0].clientY;
      isDragging = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !isMenuOpen) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      
      // If swiping down more than 100px, close menu
      if (deltaY > 100) {
        handleMenuToggle();
        isDragging = false;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    if (isAnimating) return; // Prevent rapid toggling during animation
    
    setIsAnimating(true);
    setIsMenuOpen(!isMenuOpen);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleMenuToggle();
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Media', id: 'media' },
    { name: 'Booking', id: 'booking' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container-max">
          <div className="flex items-center justify-between py-4">
            {/* Brand Name */}
            <div className="flex items-center">
              <span className={`font-black text-2xl font-sans tracking-wide transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>
                Bridge Basketball
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-colors duration-300 hover:text-basketball-orange ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('booking')}
                className="btn-primary text-sm px-6 py-2"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={buttonRef}
              onClick={handleMenuToggle}
              className={`relative z-50 p-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-basketball-orange focus:ring-opacity-50 touch-target ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white hover:bg-opacity-10'
              } ${isAnimating ? 'pointer-events-none' : ''}`}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="hamburger-menu">
                <span className={`hamburger-line ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : 'rotate-0 translate-y-0'
                }`}></span>
                <span className={`hamburger-line ${
                  isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}></span>
                <span className={`hamburger-line ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'rotate-0 translate-y-0'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div 
        ref={menuRef}
        id="mobile-menu"
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out mobile-menu-overlay ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onClick={(e) => {
          // Close menu when clicking on overlay
          if (e.target === e.currentTarget) {
            handleMenuToggle();
          }
        }}
      >
        {/* Background Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black bg-opacity-95"></div>
        
        {/* Menu Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6">
          <div className="text-center max-w-4xl mx-auto">
            {/* Navigation Items */}
            <nav className="space-y-6 md:space-y-8" role="navigation" aria-label="Main navigation">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`mobile-menu-item block w-full text-3xl md:text-5xl font-bold font-inter text-white transition-all duration-500 ease-out hover:text-basketball-orange transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-basketball-orange focus:ring-opacity-50 rounded-lg py-3 touch-target ${
                    isMenuOpen 
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-12 opacity-0 scale-95'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${0.1 + index * 0.1}s` : '0s'
                  }}
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Contact Info */}
            <div className={`mt-12 md:mt-16 transition-all duration-700 ease-out ${
              isMenuOpen 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: isMenuOpen ? '0.7s' : '0s'
            }}>
              <p className="text-gray-300 text-lg md:text-xl">
                Ready to elevate your game?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
