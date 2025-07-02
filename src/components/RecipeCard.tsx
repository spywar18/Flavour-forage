import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, BookOpen, Bookmark, Share2, Printer, Heart, Award } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this recipe: ${recipe.title}`,
        url: window.location.href,
      });
    } else {
      alert('Web Share API not supported in your browser');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <img 
          src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt={recipe.title} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6">
            <motion.h2 
              className="text-3xl font-serif font-bold text-white mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {recipe.title}
            </motion.h2>
            <motion.p 
              className="text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {recipe.description}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-1" />
            <span>Prep: {recipe.prepTime}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-1" />
            <span>Cook: {recipe.cookTime}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-1" />
            <span>Serves: {recipe.servings}</span>
          </div>
          <div className="flex items-center text-sm">
            <Award size={16} className="mr-1" />
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-serif font-semibold mb-3 flex items-center">
              <BookOpen size={18} className="mr-2 text-accent-500" />
              Ingredients
            </h3>
            <ul className="space-y-2 mb-6">
              {recipe.ingredients.map((ingredient, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-500 mt-2 mr-2"></span>
                  <span>{ingredient}</span>
                </motion.li>
              ))}
            </ul>

            <h3 className="text-xl font-serif font-semibold mb-3">Nutritional Info</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-primary-50 p-3 rounded-lg text-center">
                <div className="text-sm text-gray-600">Calories</div>
                <div className="font-semibold">{recipe.nutritionalInfo.calories}</div>
              </div>
              <div className="bg-primary-50 p-3 rounded-lg text-center">
                <div className="text-sm text-gray-600">Protein</div>
                <div className="font-semibold">{recipe.nutritionalInfo.protein}</div>
              </div>
              <div className="bg-primary-50 p-3 rounded-lg text-center">
                <div className="text-sm text-gray-600">Carbs</div>
                <div className="font-semibold">{recipe.nutritionalInfo.carbs}</div>
              </div>
              <div className="bg-primary-50 p-3 rounded-lg text-center">
                <div className="text-sm text-gray-600">Fat</div>
                <div className="font-semibold">{recipe.nutritionalInfo.fat}</div>
              </div>
              <div className="bg-primary-50 p-3 rounded-lg text-center">
                <div className="text-sm text-gray-600">Fiber</div>
                <div className="font-semibold">{recipe.nutritionalInfo.fiber}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif font-semibold mb-3 flex items-center">
              <BookOpen size={18} className="mr-2 text-accent-500" />
              Instructions
            </h3>
            <ol className="space-y-4 mb-6 list-none pl-7 recipe-steps" style={{ counterReset: 'step-counter' }}>
              {recipe.instructions.map((instruction, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {instruction}
                </motion.li>
              ))}
            </ol>

            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-6 flex justify-between">
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              className={`flex items-center text-sm font-medium ${liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} transition-colors`}
            >
              <Heart size={16} className={`mr-1 ${liked ? 'fill-current' : ''}`} />
              <span>Like</span>
            </button>
            <button 
              onClick={handleSave}
              className={`flex items-center text-sm font-medium ${saved ? 'text-accent-600' : 'text-gray-600 hover:text-accent-600'} transition-colors`}
            >
              <Bookmark size={16} className={`mr-1 ${saved ? 'fill-current' : ''}`} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleShare}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-accent-600 transition-colors"
            >
              <Share2 size={16} className="mr-1" />
              <span>Share</span>
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-accent-600 transition-colors"
            >
              <Printer size={16} className="mr-1" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;