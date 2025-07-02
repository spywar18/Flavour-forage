import React from 'react';
import { Github, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-900 text-primary-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Flavor Forge</h3>
            <p className="text-sm text-primary-200 mb-4">
              Turn your ingredients into delicious recipes with the help of AI.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition-colors">Saved Recipes</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-primary-200 mb-4">
              Subscribe to get the latest recipes and updates.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 text-sm bg-primary-800 text-white placeholder-primary-400 border border-primary-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-accent-400 w-full"
              />
              <button 
                type="submit" 
                className="bg-accent-500 hover:bg-accent-600 text-white px-3 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-primary-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-primary-300">
            &copy; {year} Flavor Forge. All rights reserved.
          </p>
          <p className="text-sm text-primary-300 flex items-center mt-4 sm:mt-0">
            Made with <Heart size={14} className="mx-1 text-accent-500" /> and Gemini AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;