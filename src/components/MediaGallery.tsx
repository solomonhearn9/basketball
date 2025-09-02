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
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

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

  const openPlayerModal = (player: Player) => {
    setSelectedPlayer(player);
  };

  const closePlayerModal = () => {
    setSelectedPlayer(null);
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
          <p className="text-lg text-gray-600 font-lato max-w-2xl mx-auto">
            Meet the talented athletes who have trained with us and achieved their goals.
          </p>
        </div>

        {/* Player Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openPlayerModal(player)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300 bg-white">
                {/* Player Photo */}
                <div className="aspect-[3/4] bg-gray-200 relative">
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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

                  {/* Position Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 bg-basketball-orange text-white text-xs font-semibold rounded-full">
                      {player.position}
                    </div>
                  </div>
                </div>

                {/* Player Name */}
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold font-inter text-black">
                    {player.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Player Bio Modal */}
        {selectedPlayer && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closePlayerModal}
          >
            <div className="relative max-w-4xl max-h-full">
              {/* Close button */}
              <button
                onClick={closePlayerModal}
                className="absolute -top-12 right-0 text-white text-4xl hover:text-basketball-orange transition-colors duration-300"
              >
                ×
              </button>

              {/* Player Bio Content */}
              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Player Photo */}
                  <div className="lg:w-1/2">
                    <img
                      src={selectedPlayer.photo}
                      alt={selectedPlayer.name}
                      className="w-full h-80 lg:h-full object-cover"
                    />
                  </div>
                  
                  {/* Player Info */}
                  <div className="lg:w-1/2 p-8">
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold font-inter text-black mb-2">
                        {selectedPlayer.name}
                      </h3>
                      <div className="inline-block px-4 py-2 bg-basketball-orange text-white text-sm font-semibold rounded-full mb-4">
                        {selectedPlayer.position}
                      </div>
                    </div>
                    
                    {/* Bio */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold font-inter text-black mb-3">About</h4>
                      <p className="text-gray-600 font-lato leading-relaxed">
                        {selectedPlayer.bio}
                      </p>
                    </div>
                    
                    {/* Training Focus */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold font-inter text-black mb-3">Training Focus</h4>
                      <p className="text-gray-600 font-lato">
                        {selectedPlayer.trainingFocus}
                      </p>
                    </div>
                    
                    {/* Achievements */}
                    <div>
                      <h4 className="text-lg font-bold font-inter text-black mb-3">Achievements</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlayer.achievements.map((achievement, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaGallery;
