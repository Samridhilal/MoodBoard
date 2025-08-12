import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PlusCircle, Calendar, Sparkles, Image } from 'lucide-react';
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

const Home: React.FC = () => {
  const { user } = useAuth();
  const [todaysMoodBoard, setTodaysMoodBoard] = useState<MoodBoard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodaysMoodBoard = async () => {
      try {
        const response = await axios.get('/moodboards/today');
        setTodaysMoodBoard(response.data);
      } catch (error) {
        // No mood board for today is expected
        setTodaysMoodBoard(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysMoodBoard();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome back, {user?.username}! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              How are you feeling today?
            </p>
          </div>
        </div>

        {/* Today's MoodBoard Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Calendar className="mr-3 text-purple-600" size={28} />
                Today's Mood
              </h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : todaysMoodBoard ? (
              <div 
                className="rounded-xl p-6 mb-4 relative overflow-hidden"
                style={{ backgroundColor: todaysMoodBoard.color + '20' }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {todaysMoodBoard.emojis.map((emoji, index) => (
                    <span key={index} className="text-3xl">{emoji}</span>
                  ))}
                </div>
                
                {todaysMoodBoard.imageUrl && (
                  <div className="mb-4">
                    <img 
                      src={todaysMoodBoard.imageUrl} 
                      alt="Mood" 
                      className="w-full h-40 object-cover rounded-lg"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {todaysMoodBoard.note && (
                  <p className="text-gray-700 text-sm italic">
                    "{todaysMoodBoard.note}"
                  </p>
                )}
                
                <div className="absolute top-4 right-4">
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: todaysMoodBoard.color }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 mb-6">You haven't created a mood board today yet!</p>
                <Link
                  to="/create"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
                >
                  <PlusCircle className="mr-2" size={20} />
                  Create Today's Mood
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Sparkles className="mr-3 text-pink-600" size={28} />
                Quick Actions
              </h2>
              
              <div className="space-y-4">
                {!todaysMoodBoard && (
                  <Link
                    to="/create"
                    className="block w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                  >
                    <div className="flex items-center">
                      <PlusCircle className="mr-3" size={24} />
                      <div>
                        <h3 className="font-semibold">Create Today's Mood</h3>
                        <p className="text-sm opacity-90">Express how you're feeling today</p>
                      </div>
                    </div>
                  </Link>
                )}
                
                <Link
                  to="/timeline"
                  className="block w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-3" size={24} />
                    <div>
                      <h3 className="font-semibold">View Timeline</h3>
                      <p className="text-sm opacity-90">Browse all your mood boards</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Tips</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Use multiple emojis to express complex feelings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Colors can represent your energy level</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Add images that inspire or reflect your mood</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;