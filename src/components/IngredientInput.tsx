import React from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

interface IngredientInputProps {
  ingredient: string;
  onRemove: () => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredient, onRemove }) => {
  return (
    <motion.div 
      className="bg-white px-3 py-1 rounded-full border border-primary-200 flex items-center text-sm"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <span>{ingredient}</span>
      <button 
        onClick={onRemove} 
        className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
        aria-label={`Remove ${ingredient}`}
      >
        <XCircle size={16} />
      </button>
    </motion.div>
  );
};

export default IngredientInput;