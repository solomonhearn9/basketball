import React, { useState } from 'react';

interface Player {
  id: string;
  name: string;
  photo: string;
  position: string;
  bio: string;
  achievements: string[];
  trainingFocus: string;
}

const MediaGallery: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  // Player data showcasing athletes the trainer has worked with
  const players: Player[] = [
    {
      id: '1',
      name: 'Marcus Johnson',
      photo: '/media/photos/aja.png',
      position: 'Point Guard',
      bio: 'Marcus is a dynamic point guard with exceptional court vision and leadership skills. Through our training sessions, he has developed into a confident floor general who can control the tempo of any game.',
      achievements: ['All-State Selection', 'Team Captain', 'Assist Leader'],
      trainingFocus: 'Ball handling, court vision, leadership'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      photo: '/media/photos/klay.png',
      position: 'Shooting Guard',
      bio: 'Sarah is a sharpshooter with incredible work ethic. Her dedication to perfecting her shooting form has made her one of the most reliable three-point shooters in her conference.',
      achievements: ['3-Point Champion', 'Academic All-American', 'Team MVP'],
      trainingFocus: 'Shooting mechanics, footwork, mental game'
    },
    {
      id: '3',
      name: 'David Rodriguez',
      photo: '/media/photos/kgpic-2.png',
      position: 'Small Forward',
      bio: 'David is a versatile forward who can score from anywhere on the court. His athleticism and determination have helped him become a complete two-way player.',
      achievements: ['Defensive Player of Year', 'All-Conference', 'Most Improved'],
      trainingFocus: 'Defense, versatility, athleticism'
    }
  ];

  const toggleCardFlip = (playerId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playerId)) {
        newSet.delete(playerId);
      } else {
        newSet.add(playerId);
      }
      return newSet;
    });
  };

  return (
    <section id="media" className="section-padding bg-white">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-inter text-black mb-4">
            Training
            <span className="text-basketball-orange"> Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 font-lato max-w-2xl mx-auto animate-slide-up animate-stagger-1">
            Meet the talented athletes who have trained with us and achieved their goals.
          </p>
        </div>

        {/* Player Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {players.map((player, index) => {
            const isFlipped = flippedCards.has(player.id);
            
            return (
              <div
                key={player.id}
                className="group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => toggleCardFlip(player.id)}
              >
                <div className={`flip-card w-full h-[500px] ${isFlipped ? 'flipped' : ''}`}>
                  <div className="flip-card-inner">
                    {/* Front of Card */}
                    <div className="flip-card-front">
                    <div className="relative overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-all duration-500 bg-white transform group-hover:-translate-y-2 h-full flex flex-col">
                      {/* Player Photo */}
                      <div className="flex-1 bg-gray-200 relative overflow-hidden">
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            // Fallback for broken images
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            if (target.parentElement) {
                              target.parentElement.innerHTML = `
                                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                                  <div class="text-center">
                                    <div class="w-16 h-16 bg-basketball-orange rounded-full mx-auto mb-2 flex items-center justify-center">
                                      <span class="text-2xl">🏀</span>
                                    </div>
                                    <p class="text-sm text-gray-600">${player.name}</p>
                                  </div>
                                </div>
                              `;
                            }
                          }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-basketball-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Player Name */}
                      <div className="p-4 text-center">
                        <h3 className="text-xl font-bold font-inter text-black">
                          {player.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Click to view bio</p>
                      </div>
                    </div>
                  </div>

                    {/* Back of Card - Bio */}
                    <div className="flip-card-back">
                    <div className="relative overflow-hidden rounded-xl shadow-md bg-white h-full">
                      <div className="p-6 h-full flex flex-col">
                        {/* Header */}
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold font-inter text-black mb-2">
                            {player.name}
                          </h3>
                          <div className="w-12 h-1 bg-basketball-orange rounded-full"></div>
                        </div>
                        
                        {/* Bio Section */}
                        <div className="mb-6 flex-1">
                          <h4 className="text-lg font-semibold font-inter text-black mb-3">About</h4>
                          <p className="text-gray-600 font-lato leading-relaxed text-sm">
                            {player.bio}
                          </p>
                        </div>
                        
                        {/* Training Focus */}
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold font-inter text-black mb-3">Training Focus</h4>
                          <p className="text-gray-600 font-lato text-sm">
                            {player.trainingFocus}
                          </p>
                        </div>
                        
                        {/* Achievements */}
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold font-inter text-black mb-3">Achievements</h4>
                          <div className="flex flex-wrap gap-2">
                            {player.achievements.map((achievement, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Flip back indicator */}
                        <div className="text-center mt-auto">
                          <p className="text-xs text-gray-400">Click to flip back</p>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
};

export default MediaGallery;
