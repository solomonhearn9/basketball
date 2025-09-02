import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Trainer Image */}
          <div className="order-2 lg:order-1 animate-slide-in-left">
            <div className="relative">
              {/* Trainer portrait */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
                <img
                  src="/media/photos/Catarina_Macario_(cropped).jpg"
                  alt="Professional Basketball Trainer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <div class="text-center">
                            <div class="w-32 h-32 bg-basketball-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                              <span class="text-4xl text-white">🏀</span>
                            </div>
                            <p class="text-gray-600 font-medium">Trainer Portrait</p>
                            <p class="text-sm text-gray-500 mt-2">Professional headshot</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
              

            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2 animate-slide-in-right">
            <h2 className="text-4xl md:text-5xl font-bold font-inter text-black mb-6 animate-fade-in">
              Your Game.
              <br />
              <span className="text-basketball-orange">Elevated.</span>
            </h2>
            
            <div className="space-y-4 text-gray-700 font-lato text-lg leading-relaxed">
              <p className="animate-slide-up animate-stagger-1">
                Elite basketball training that combines professional playing experience 
                with proven coaching methodologies. Every session is tailored to your 
                specific goals and skill level.
              </p>
              
              <p className="animate-slide-up animate-stagger-2">
                Focus on developing physical skills, mental game, court awareness, and 
                basketball IQ. From high school teams to college scholarships and 
                professional careers.
              </p>
            </div>

            {/* Credentials with staggered animations */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 rounded-lg hover:shadow-xl transition-all duration-300 animate-scale-in animate-stagger-1 credential-card-1">
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-sm text-white/90">Years Experience</div>
              </div>
              <div className="text-center p-4 rounded-lg hover:shadow-xl transition-all duration-300 animate-scale-in animate-stagger-2 credential-card-2">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-sm text-white/90">Players Trained</div>
              </div>
              <div className="text-center p-4 rounded-lg hover:shadow-xl transition-all duration-300 animate-scale-in animate-stagger-3 credential-card-3">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-sm text-white/90">College Players</div>
              </div>
              <div className="text-center p-4 rounded-lg hover:shadow-xl transition-all duration-300 animate-scale-in animate-stagger-4 credential-card-4">
                <div className="text-3xl font-bold text-white mb-2">5</div>
                <div className="text-sm text-white/90">Pro Players</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
