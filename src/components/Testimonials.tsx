import React, { useState, useEffect } from 'react';

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

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Marcus Johnson',
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
      name: 'Alex Kim',
      position: 'Center, High School Junior',
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
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-light-gray rounded-xl p-6 md:p-8 text-center animate-scale-in">
            <div className="mb-8">
              {/* Rating */}
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
              
              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-lato text-gray-700 leading-relaxed mb-8">
                "{testimonials[currentIndex].quote}"
              </blockquote>
            </div>

            {/* Author Info */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-20 h-20 rounded-full bg-basketball-orange flex items-center justify-center border-4 border-white shadow-lg">
                          <span class="text-2xl text-white font-bold">${testimonials[currentIndex].name.charAt(0)}</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Author Details */}
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold font-inter text-black">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600 font-lato">
                  {testimonials[currentIndex].position}
                </p>
                {testimonials[currentIndex].achievement && (
                  <p className="text-basketball-orange font-semibold text-sm mt-1">
                    {testimonials[currentIndex].achievement}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-basketball-orange hover:text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-basketball-orange hover:text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-basketball-orange scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center animate-scale-in animate-stagger-1 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-basketball-orange mb-2">98%</div>
            <div className="text-gray-600 font-lato">Player Satisfaction</div>
          </div>
          <div className="text-center animate-scale-in animate-stagger-2 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-basketball-orange mb-2">85%</div>
            <div className="text-gray-600 font-lato">Improved Performance</div>
          </div>
          <div className="text-center animate-scale-in animate-stagger-3 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-basketball-orange mb-2">92%</div>
            <div className="text-gray-600 font-lato">College Placement</div>
          </div>
          <div className="text-center animate-scale-in animate-stagger-4 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-basketball-orange mb-2">4.9/5</div>
            <div className="text-gray-600 font-lato">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
