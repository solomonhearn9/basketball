import React, { useState, useRef, useEffect } from 'react';

const Hero: React.FC = () => {
  const [isArrowClicked, setIsArrowClicked] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure video plays automatically
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log('Autoplay prevented:', error);
          // If autoplay fails, try again after user interaction
          const handleUserInteraction = () => {
            video.play().catch(console.error);
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
          };
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('touchstart', handleUserInteraction);
        }
      };
      
      // Handle video loading errors
      const handleError = () => {
        console.error('Video failed to load');
        // Could show a fallback image or message here
      };
      
      // Handle video load events
      const handleLoadedData = () => {
        playVideo();
      };
      
      // Add event listeners
      video.addEventListener('error', handleError);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('canplay', playVideo, { once: true });
      
      // Play immediately if video is already loaded
      if (video.readyState >= 3) {
        playVideo();
      }
      
      // Cleanup function
      return () => {
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  const handleArrowClick = () => {
    setIsArrowClicked(true);
    setShowParticles(true);
    
    // Create particle explosion effect
    createParticleExplosion();
    
    // Fade out current page and navigate
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease-out';
      document.body.style.opacity = '0';
      
      // After fade out, navigate to booking section
      setTimeout(() => {
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
          bookingSection.scrollIntoView({ 
            behavior: 'auto',
            block: 'start'
          });
        }
        
        // Fade back in
        setTimeout(() => {
          document.body.style.opacity = '1';
        }, 50);
      }, 500);
    }, 1000);

    // Reset states after animation
    setTimeout(() => {
      setIsArrowClicked(false);
      setShowParticles(false);
    }, 2000);
  };

  const createParticleExplosion = () => {
    // Create multiple particles for explosion effect
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: fixed;
          width: 4px;
          height: 4px;
          background: #ff6b35;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          animation: particleExplosion 1.5s ease-out forwards;
        `;
        
        // Random direction and distance
        const angle = (Math.PI * 2 * i) / 20;
        const distance = 100 + Math.random() * 200;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.setProperty('--end-x', `${x}px`);
        particle.style.setProperty('--end-y', `${y}px`);
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 1500);
      }, i * 20);
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          webkit-playsinline="true"
        >
          <source src="/media/videos/hero.webm" type="video/webm" />
          <source src="/media/videos/agency-hero.mp4" type="video/mp4" />
          {/* Fallback image for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-32 h-32 bg-basketball-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🏀</span>
              </div>
              <p className="text-lg">Basketball Training Video</p>
            </div>
          </div>
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold font-inter mb-6 animate-fade-in">
          Train Smarter.
          <br />
          <span className="text-basketball-orange">Play Harder.</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 font-lato animate-slide-up">
          Elite basketball training for players of all levels
        </p>

        {/* Animated Arrow Button */}
        <div className="flex justify-center items-center animate-slide-up">
          <button
            onClick={handleArrowClick}
            className={`arrow-button ${isArrowClicked ? 'clicked' : ''}`}
            disabled={isArrowClicked}
          >
            <div className="arrow-container">
              {/* Simple Arrow SVG */}
              <svg 
                className="arrow-svg" 
                viewBox="0 0 24 24" 
                width="32" 
                height="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              
              {/* Glow effect */}
              <div className="arrow-glow"></div>
              
              {/* Ripple effect */}
              <div className="arrow-ripple"></div>
            </div>
          </button>
        </div>

        {/* Scroll indicator - removed since hero is now fixed */}
      </div>
    </section>
  );
};

export default Hero;
