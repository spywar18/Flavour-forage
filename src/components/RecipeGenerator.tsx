import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'react-query';
import { PlusCircle, XCircle, ChefHat, Clock, Bookmark, Share2, Printer } from 'lucide-react';
import IngredientInput from './IngredientInput';
import RecipeCard from './RecipeCard';
import FilterOptions from './FilterOptions';
import { Recipe } from '../types/recipe';
import { generateRecipe } from '../services/api';

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [cuisineType, setCuisineType] = useState<string>('');
  
  const { mutate, isLoading, data: recipe, error, reset } = useMutation(
    (data: { ingredients: string[], preferences: string[], cuisine: string }) => 
      generateRecipe(data.ingredients, data.preferences, data.cuisine),
    {
      onSuccess: (data) => {
        console.log('Recipe generated:', data);
      },
      onError: (error) => {
        console.error('Error generating recipe:', error);
      }
    }
  );

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.length > 0) {
      mutate({ 
        ingredients, 
        preferences: dietaryPreferences,
        cuisine: cuisineType
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleReset = () => {
    setIngredients([]);
    setDietaryPreferences([]);
    setCuisineType('');
    reset();
  };

  // Mock recipe for development - remove when connected to backend
  const mockRecipe: Recipe = {
    title: "Creamy Garlic Parmesan Pasta with Spinach",
    description: "A rich and creamy pasta dish that comes together in just 20 minutes. Perfect for weeknight dinners!",
    ingredients: [
      "8 oz pasta (fettuccine or spaghetti)",
      "2 tbsp olive oil",
      "4 cloves garlic, minced",
      "1 cup heavy cream",
      "1 cup grated Parmesan cheese",
      "2 cups fresh spinach",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)"
    ],
    instructions: [
      "Cook pasta according to package instructions. Reserve 1/2 cup of pasta water before draining.",
      "In a large skillet, heat olive oil over medium heat. Add minced garlic and sauté until fragrant, about 1 minute.",
      "Reduce heat to medium-low and add heavy cream. Simmer for 2-3 minutes until it starts to thicken slightly.",
      "Gradually whisk in the Parmesan cheese until melted and smooth.",
      "Add drained pasta to the sauce and toss to coat. If sauce is too thick, add reserved pasta water a little at a time.",
      "Add spinach and toss until wilted, about 1-2 minutes.",
      "Season with salt, pepper, and red pepper flakes if desired.",
      "Serve immediately with additional Parmesan cheese on top."
    ],
    prepTime: "5 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "Easy",
    nutritionalInfo: {
      calories: 420,
      protein: "12g",
      carbs: "40g",
      fat: "22g",
      fiber: "2g"
    },
    tags: ["Vegetarian", "Quick", "Pasta"]
  };

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-2">
          Turn Your Ingredients Into Delicious Recipes
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Enter the ingredients you have on hand, and our AI will create a custom recipe just for you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-serif font-semibold mb-4">Your Ingredients</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700">
                  Add Ingredients
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="ingredient"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., chicken, rice, tomatoes"
                    className="input flex-grow"
                  />
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="ml-2 p-2 bg-accent-100 text-accent-600 rounded-md hover:bg-accent-200 transition-colors"
                    aria-label="Add ingredient"
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {ingredients.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 bg-primary-50 rounded-md">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Your Ingredients:</h4>
                      <div className="flex flex-wrap gap-2">
                        {ingredients.map((ingredient, index) => (
                          <IngredientInput
                            key={index}
                            ingredient={ingredient}
                            onRemove={() => handleRemoveIngredient(ingredient)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <FilterOptions 
                dietaryPreferences={dietaryPreferences}
                setDietaryPreferences={setDietaryPreferences}
                cuisineType={cuisineType}
                setCuisineType={setCuisineType}
              />

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={ingredients.length === 0 || isLoading}
                  className={`btn btn-primary flex-grow flex items-center justify-center ${
                    ingredients.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                        <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Recipe...
                    </>
                  ) : (
                    <>
                      <ChefHat size={18} className="mr-2" />
                      Generate Recipe
                    </>
                  )}
                </button>
                {ingredients.length > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-secondary"
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-3">
          <AnimatePresence>
            {error ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4"
              >
                <h3 className="font-medium text-lg mb-2">Error Generating Recipe</h3>
                <p>We couldn't generate a recipe with those ingredients. Please try again with different ingredients or check your connection.</p>
              </motion.div>
            ) : recipe || ingredients.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <RecipeCard recipe={mockRecipe} /> {/* Replace with recipe when connected to backend */}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-secondary-50 border border-secondary-200 text-secondary-800 rounded-lg p-6 flex flex-col items-center justify-center h-full min-h-[400px]"
              >
                <img 
                  src="https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Cooking ingredients" 
                  className="w-48 h-48 object-cover rounded-full mb-6 shadow-md"
                />
                <h3 className="text-xl font-serif font-semibold mb-2">Ready to Cook Something Amazing?</h3>
                <p className="text-center text-gray-600 max-w-md">
                  Add your available ingredients and we'll create a delicious recipe for you to enjoy.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RecipeGenerator;