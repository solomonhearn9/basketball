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
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/media/photos/Catarina_Macario_(cropped).jpg"
                  alt="Professional Basketball Trainer"
                  className="w-full h-full object-cover"
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
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-basketball-orange rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-basketball-orange rounded-full opacity-30"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2 animate-slide-in-right">
            <h2 className="text-4xl md:text-5xl font-bold font-inter text-black mb-6">
              Your Game.
              <br />
              <span className="text-basketball-orange">Elevated.</span>
            </h2>
            
            <div className="space-y-4 text-gray-700 font-lato text-lg leading-relaxed">
              <p>
                Elite basketball training that combines professional playing experience 
                with proven coaching methodologies. Every session is tailored to your 
                specific goals and skill level.
              </p>
              
              <p>
                Focus on developing physical skills, mental game, court awareness, and 
                basketball IQ. From high school teams to college scholarships and 
                professional careers.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-light-gray rounded-lg">
                <div className="text-3xl font-bold text-basketball-orange mb-2">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-light-gray rounded-lg">
                <div className="text-3xl font-bold text-basketball-orange mb-2">500+</div>
                <div className="text-sm text-gray-600">Players Trained</div>
              </div>
              <div className="text-center p-4 bg-light-gray rounded-lg">
                <div className="text-3xl font-bold text-basketball-orange mb-2">50+</div>
                <div className="text-sm text-gray-600">College Players</div>
              </div>
              <div className="text-center p-4 bg-light-gray rounded-lg">
                <div className="text-3xl font-bold text-basketball-orange mb-2">5</div>
                <div className="text-sm text-gray-600">Pro Players</div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
