import React, { useState } from 'react';
import { Smile } from 'lucide-react';

const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
  '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚',
  '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭',
  '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄',
  '😬', '🤥', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢',
  '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸',
  '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲',
  '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱',
  '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠'
];

interface EmojiPickerProps {
  selectedEmojis: string[];
  onEmojiSelect: (emojis: string[]) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ selectedEmojis, onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emoji: string) => {
    if (selectedEmojis.includes(emoji)) {
      onEmojiSelect(selectedEmojis.filter(e => e !== emoji));
    } else {
      onEmojiSelect([...selectedEmojis, emoji]);
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Mood Emojis
      </label>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedEmojis.map((emoji, index) => (
          <span key={index} className="text-2xl">{emoji}</span>
        ))}
        {selectedEmojis.length === 0 && (
          <span className="text-gray-400 text-sm">Select emojis to express your mood</span>
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
      >
        <Smile size={20} />
        <span>Choose Emojis</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleEmojiClick(emoji)}
                className={`text-2xl p-2 rounded hover:bg-gray-100 transition-colors ${
                  selectedEmojis.includes(emoji) ? 'bg-purple-100' : ''
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-3 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;