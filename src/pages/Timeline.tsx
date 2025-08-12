import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Palette } from 'lucide-react';
import axios from 'axios';

interface MoodBoard {
  _id: string;
  emojis: string[];
  imageUrl: string;
  color: string;
  note: string;
  date: string;
  createdAt: string;
}

const Timeline: React.FC = () => {
  const [moodBoards, setMoodBoards] = useState<MoodBoard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodBoards = async () => {
      try {
        const response = await axios.get('/moodboards');
        setMoodBoards(response.data);
      } catch (error) {
        console.error('Failed to fetch mood boards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodBoards();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <Calendar className="mr-3 text-purple-600" size={32} />
            Your Mood Timeline
          </h1>
          <p className="text-gray-600">
            Journey through your daily emotions and memories
          </p>
        </div>

        {moodBoards.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center">
            <Calendar className="mx-auto text-gray-400 mb-6" size={64} />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Mood Boards Yet</h2>
            <p className="text-gray-600 mb-6">
              Start creating daily mood boards to see your emotional journey here
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {moodBoards.map((moodBoard) => (
              <div
                key={moodBoard._id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Side - Date and Emotions */}
                  <div className="lg:w-1/3">
                    <div className="flex items-center mb-4">
                      <Clock className="text-gray-500 mr-2" size={16} />
                      <span className="text-sm text-gray-500">
                        {formatDate(moodBoard.date)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {getFullDate(moodBoard.date)}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {moodBoard.emojis.map((emoji, index) => (
                        <span key={index} className="text-3xl">{emoji}</span>
                      ))}
                    </div>
                    
                    <div className="flex items-center">
                      <Palette className="text-gray-500 mr-2" size={16} />
                      <div 
                        className="w-6 h-6 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: moodBoard.color }}
                      ></div>
                    </div>
                  </div>

                  {/* Right Side - Image and Note */}
                  <div className="lg:w-2/3">
                    {moodBoard.imageUrl && (
                      <div className="mb-4">
                        <img
                          src={moodBoard.imageUrl}
                          alt="Mood"
                          className="w-full h-48 object-cover rounded-xl shadow-md"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                          }}
                        />
                      </div>
                    )}
                    
                    {moodBoard.note && (
                      <div 
                        className="p-4 rounded-lg relative"
                        style={{ backgroundColor: moodBoard.color + '15' }}
                      >
                        <p className="text-gray-700 italic text-sm leading-relaxed">
                          "{moodBoard.note}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;