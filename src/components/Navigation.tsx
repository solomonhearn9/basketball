import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
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
            <div className="flex items-center ml-6">
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative z-50 p-2 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                }`}></span>
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
        isMenuOpen 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible'
      }`}>
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-95"></div>
        
        {/* Menu Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center">
          <div className="text-center">
            {/* Brand Name in Menu */}
            <div className="flex items-center justify-center mb-16">
              <span className="text-white font-black text-5xl font-sans tracking-wide">
                Bridge Basketball
              </span>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-8">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block text-4xl md:text-5xl font-bold font-inter text-white transition-all duration-300 hover:text-basketball-orange transform hover:scale-105 ${
                    isMenuOpen 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 0.1}s` : '0s'
                  }}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className={`mt-16 transition-all duration-500 ${
              isMenuOpen 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: isMenuOpen ? '0.6s' : '0s'
            }}>
              <button
                onClick={() => scrollToSection('booking')}
                className="btn-primary text-lg px-12 py-4"
              >
                Book a Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
