import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  image: string;
  quote: string;
  rating: number;
  achievement?: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Russel Westbrook',
      position: 'Point Guard, Duke University',
      image: '/media/photos/agent2.jpg',
      quote: 'The training completely transformed my game. My shooting percentage improved by 25% in just 3 months, and I finally got the scholarship I was working towards.',
      rating: 5,
      achievement: 'NCAA Division I Scholarship'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      position: 'Shooting Guard, High School Senior',
      image: '/media/photos/agent3.jpg',
      quote: 'I was struggling with confidence on the court. The mental game coaching helped me overcome my fears and become a leader on my team.',
      rating: 5,
      achievement: 'Team Captain & All-State Selection'
    },
    {
      id: '3',
      name: 'David Rodriguez',
      position: 'Small Forward, Community College',
      image: '/media/photos/agent4.jpg',
      quote: 'The attention to detail in technique correction was incredible. Every session I learned something new that made me a better player.',
      rating: 5,
      achievement: 'Conference Player of the Year'
    },
    {
      id: '4',
      name: 'Emily Thompson',
      position: 'Power Forward, University of North Carolina',
      image: '/media/photos/agent4.1.jpg',
      quote: 'The virtual coaching sessions were perfect for my busy schedule. The video analysis helped me see things I never noticed before.',
      rating: 5,
      achievement: 'ACC All-Conference Team'
    },
    {
      id: '5',
      name: 'Eli Manning',
      
      position: 'QB, NFL HOF',
      image: '/media/photos/download-1.jpg',
      quote: 'I went from being a bench player to starting center. The strength and conditioning program made all the difference.',
      rating: 5,
      achievement: 'State Championship Winner'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  // Touch/swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-inter text-basketball-orange mb-4">
            Trusted by Players
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div 
          ref={carouselRef}
          className="relative max-w-4xl mx-auto"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Main Testimonial */}
          <div className="bg-white rounded-2xl p-6 md:p-10 text-center animate-scale-in shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Background gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 mb-8">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
              
              {/* Quote */}
              <blockquote className="text-lg md:text-xl lg:text-2xl font-lato text-gray-800 leading-relaxed mb-8 px-2 md:px-4 font-medium">
                <span className="text-basketball-orange text-4xl md:text-5xl leading-none">"</span>
                {testimonials[currentIndex].quote}
                <span className="text-basketball-orange text-4xl md:text-5xl leading-none">"</span>
              </blockquote>
            </div>

            {/* Author Info */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-basketball-orange/20"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-basketball-orange to-orange-600 flex items-center justify-center border-4 border-white shadow-xl ring-4 ring-basketball-orange/20">
                          <span class="text-2xl md:text-3xl text-white font-bold">${testimonials[currentIndex].name.charAt(0)}</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Author Details */}
              <div className="text-center md:text-left">
                <h4 className="text-xl md:text-2xl font-bold font-inter text-gray-900 mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600 font-lato text-base md:text-lg mb-2">
                  {testimonials[currentIndex].position}
                </p>
                {testimonials[currentIndex].achievement && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-basketball-orange/10 to-orange-100 border border-basketball-orange/20">
                    <p className="text-basketball-orange font-semibold text-sm md:text-base">
                      {testimonials[currentIndex].achievement}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Hidden on mobile, shown on desktop */}
          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-basketball-orange hover:text-white transition-all duration-300 border border-gray-200 hover:border-basketball-orange"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-basketball-orange hover:text-white transition-all duration-300 border border-gray-200 hover:border-basketball-orange"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Mobile Swipe Indicator */}
          <div className="md:hidden w-full flex justify-center items-center mt-4 mb-2">
            <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Swipe to navigate</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 touch-target ${
                  index === currentIndex
                    ? 'bg-basketball-orange scale-125 shadow-lg'
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16">
          <div className="text-center animate-scale-in animate-stagger-1 hover:scale-105 transition-transform duration-300 p-4 rounded-lg bg-white/50 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-basketball-orange mb-2">98%</div>
            <div className="text-gray-600 font-lato text-sm md:text-base">Player Satisfaction</div>
          </div>
          <div className="text-center animate-scale-in animate-stagger-2 hover:scale-105 transition-transform duration-300 p-4 rounded-lg bg-white/50 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-basketball-orange mb-2">85%</div>
            <div className="text-gray-600 font-lato text-sm md:text-base">Improved Performance</div>
          </div>
          <div className="text-center animate-scale-in animate-stagger-3 hover:scale-105 transition-transform duration-300 p-4 rounded-lg bg-white/50 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-basketball-orange mb-2">92%</div>
            <div className="text-gray-600 font-lato text-sm md:text-base">College Placement</div>
          </div>
          <div className="text-center animate-scale-in animate-stagger-4 hover:scale-105 transition-transform duration-300 p-4 rounded-lg bg-white/50 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-basketball-orange mb-2">4.9/5</div>
            <div className="text-gray-600 font-lato text-sm md:text-base">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
