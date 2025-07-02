import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ChefHat size={32} className="text-accent-500" />
            </motion.div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                Flavor Forge
              </h1>
              <p className="text-xs text-gray-500">Powered by Gemini AI</p>
            </div>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a 
                  href="#" 
                  className="text-sm font-medium text-gray-700 hover:text-accent-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm font-medium text-gray-700 hover:text-accent-600 transition-colors"
                >
                  Saved Recipes
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm font-medium text-gray-700 hover:text-accent-600 transition-colors"
                >
                  About
                </a>
              </li>
            </ul>
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;