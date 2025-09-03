import React from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
  features: string[];
}

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: '1-on-1',
      title: '1-on-1 Training',
      description: 'Personalized training sessions tailored to your specific needs and goals.',
      icon: '🎯',
      price: '$120/session',
      features: ['Individual attention', 'Custom workout plans', 'Video analysis', 'Progress tracking']
    },
    {
      id: 'group',
      title: 'Group Sessions',
      description: 'Train with other players in small groups for competitive development.',
      icon: '👥',
      price: '$60/session',
      features: ['Small groups (4-6 players)', 'Competitive drills', 'Team building', 'Peer motivation']
    },
    {
      id: 'shooting',
      title: 'Shooting Clinics',
      description: 'Intensive shooting workshops focusing on form, accuracy, and consistency.',
      icon: '🏀',
      price: '$80/session',
      features: ['Form correction', 'Shot mechanics', 'Game situations', 'Mental approach']
    },
    {
      id: 'virtual',
      title: 'Virtual Coaching',
      description: 'Remote training sessions with video analysis and personalized feedback.',
      icon: '💻',
      price: '$90/session',
      features: ['Video analysis', 'Remote guidance', 'Flexible scheduling', 'Recorded sessions']
    }
  ];

  const scrollToBooking = (serviceId?: string) => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      // Add a small delay to ensure smooth scrolling
      setTimeout(() => {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // If a service was selected, we could potentially pre-select it in the booking form
        if (serviceId) {
          // Store the selected service in sessionStorage for the booking component to use
          sessionStorage.setItem('selectedService', serviceId);
        }
      }, 100);
    }
  };

  return (
    <section id="services" className="section-padding bg-light-gray">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-inter text-black mb-4">
            Training
            <span className="text-basketball-orange"> Services</span>
          </h2>
          <p className="text-lg text-gray-600 font-lato max-w-2xl mx-auto animate-slide-up animate-stagger-1">
            Professional training programs designed to maximize your potential and accelerate development.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="text-4xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold font-inter text-black mb-3 text-center group-hover:text-basketball-orange transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 font-lato mb-4 text-center text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Price */}
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-basketball-orange">
                  {service.price}
                </span>
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => scrollToBooking(service.id)}
                className="w-full btn-primary text-sm py-2 transform group-hover:scale-105 transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <p className="text-lg text-gray-600 mb-6 font-lato animate-slide-up animate-stagger-1">
            Not sure which option is right for you?
          </p>
          <button
            onClick={() => scrollToBooking()}
            className="btn-secondary border-basketball-orange text-basketball-orange hover:bg-basketball-orange hover:text-white animate-scale-in animate-stagger-2"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
