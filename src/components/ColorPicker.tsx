import React from 'react';

const colors = [
  { name: 'Sunset Orange', value: '#FF6B35', gradient: 'from-orange-400 to-red-500' },
  { name: 'Ocean Blue', value: '#007BFF', gradient: 'from-blue-400 to-blue-600' },
  { name: 'Forest Green', value: '#28A745', gradient: 'from-green-400 to-green-600' },
  { name: 'Purple Dream', value: '#6F42C1', gradient: 'from-purple-400 to-purple-600' },
  { name: 'Pink Blush', value: '#E83E8C', gradient: 'from-pink-400 to-pink-600' },
  { name: 'Golden Yellow', value: '#FFC107', gradient: 'from-yellow-400 to-yellow-500' },
  { name: 'Teal Wave', value: '#20C997', gradient: 'from-teal-400 to-teal-600' },
  { name: 'Rose Red', value: '#DC3545', gradient: 'from-red-400 to-red-600' },
  { name: 'Indigo Night', value: '#6610F2', gradient: 'from-indigo-400 to-indigo-600' },
  { name: 'Coral Sunset', value: '#FF7F50', gradient: 'from-coral-400 to-orange-500' },
  { name: 'Lavender', value: '#B19CD9', gradient: 'from-purple-300 to-purple-400' },
  { name: 'Mint Fresh', value: '#98D8C8', gradient: 'from-green-300 to-teal-400' },
];

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorSelect }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Color Theme
      </label>
      <div className="grid grid-cols-6 gap-3">
        {colors.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onColorSelect(color.value)}
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${color.gradient} transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
              selectedColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
            }`}
            title={color.name}
          />
        ))}
      </div>
      {selectedColor && (
        <div className="mt-2 text-sm text-gray-600">
          Selected: {colors.find(c => c.value === selectedColor)?.name || 'Custom color'}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;