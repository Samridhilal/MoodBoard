import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Image } from 'lucide-react';
import EmojiPicker from '../components/EmojiPicker';
import ColorPicker from '../components/ColorPicker';
import axios from 'axios';

const CreateMoodBoard: React.FC = () => {
  const [emojis, setEmojis] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [color, setColor] = useState('#FF6B35');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (emojis.length === 0) {
      setError('Please select at least one emoji');
      setLoading(false);
      return;
    }

    if (!imageUrl.trim()) {
      setError('Please enter an image URL');
      setLoading(false);
      return;
    }

    try {
      await axios.post('/moodboards', {
        emojis,
        imageUrl: imageUrl.trim(),
        color,
        note: note.trim()
      });
      
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create mood board');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create Today's MoodBoard
            </h1>
            <p className="text-gray-600">
              Express your current mood through colors, emojis, and images
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Emoji Picker */}
            <EmojiPicker selectedEmojis={emojis} onEmojiSelect={setEmojis} />

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Image or GIF URL
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="url"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Paste a link to an image or GIF that represents your mood
              </p>
              
              {/* Image Preview */}
              {imageUrl && (
                <div className="mt-4">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = 'https://via.placeholder.com/400x200?text=Invalid+URL';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Color Picker */}
            <ColorPicker selectedColor={color} onColorSelect={setColor} />

            {/* Note */}
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                Short Note (Optional)
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={200}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder="Share what's on your mind..."
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {note.length}/200 characters
              </div>
            </div>

            {/* Preview */}
            {(emojis.length > 0 || imageUrl || note) && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
                <div 
                  className="rounded-lg p-4 relative"
                  style={{ backgroundColor: color + '20' }}
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {emojis.map((emoji, index) => (
                      <span key={index} className="text-2xl">{emoji}</span>
                    ))}
                  </div>
                  
                  {imageUrl && (
                    <div className="mb-3">
                      <img 
                        src={imageUrl} 
                        alt="Mood" 
                        className="w-full h-32 object-cover rounded"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  {note && (
                    <p className="text-gray-700 text-sm italic">
                      "{note}"
                    </p>
                  )}
                  
                  <div className="absolute top-3 right-3">
                    <div 
                      className="w-4 h-4 rounded-full border border-white shadow"
                      style={{ backgroundColor: color }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save size={20} />
                  <span>Save MoodBoard</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMoodBoard;