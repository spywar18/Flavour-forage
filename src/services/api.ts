import axios from 'axios';
import { Recipe } from '../types/recipe';

const API_URL = 'http://localhost:5000';

export const generateRecipe = async (
  ingredients: string[],
  preferences: string[],
  cuisine: string
): Promise<Recipe> => {
  try {
    const response = await axios.post(`${API_URL}/generate-recipe`, {
      ingredients,
      preferences,
      cuisine
    });
    return response.data;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error;
  }
};