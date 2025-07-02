import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterOptionsProps {
  dietaryPreferences: string[];
  setDietaryPreferences: React.Dispatch<React.SetStateAction<string[]>>;
  cuisineType: string;
  setCuisineType: React.Dispatch<React.SetStateAction<string>>;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  dietaryPreferences,
  setDietaryPreferences,
  cuisineType,
  setCuisineType
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Keto",
    "Paleo",
    "Low-Carb"
  ];

  const cuisineOptions = [
    "Italian",
    "Mexican",
    "Chinese",
    "Indian",
    "Japanese",
    "Thai",
    "Mediterranean",
    "French",
    "American",
    "Middle Eastern"
  ];

  const toggleDietaryPreference = (preference: string) => {
    if (dietaryPreferences.includes(preference)) {
      setDietaryPreferences(dietaryPreferences.filter(p => p !== preference));
    } else {
      setDietaryPreferences([...dietaryPreferences, preference]);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-700 hover:text-accent-600 transition-colors"
      >
        <span>Advanced Options</span>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Preferences
                </label>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleDietaryPreference(option)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        dietaryPreferences.includes(option)
                          ? 'bg-secondary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-2">
                  Cuisine Type
                </label>
                <select
                  id="cuisine"
                  value={cuisineType}
                  onChange={(e) => setCuisineType(e.target.value)}
                  className="input"
                >
                  <option value="">Any Cuisine</option>
                  {cuisineOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterOptions;