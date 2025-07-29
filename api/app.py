from flask import Flask, request, jsonify
import google.generativeai as genai
import json
import os
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


try:
    GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
except Exception as e:
    logger.error(f"Failed to initialize Gemini API: {e}")

@app.route('/generate-recipe', methods=['POST'])
def generate_recipe():
    try:
        data = request.json
        ingredients = data.get('ingredients', [])
        preferences = data.get('preferences', [])
        cuisine = data.get('cuisine', '')
        
        if not ingredients:
            return jsonify({"error": "No ingredients provided"}), 400
        
        logger.info(f"Generating recipe with ingredients: {ingredients}")
        
        # Format preferences and cuisine if provided
        dietary_req = f"It should be {', '.join(preferences)}" if preferences else ""
        cuisine_req = f"The cuisine should be {cuisine}" if cuisine else ""
        
        # Construct prompt
        prompt = f"""
        Create a detailed recipe using these ingredients: {', '.join(ingredients)}.
        {dietary_req}
        {cuisine_req}
        
        Format the response as a JSON object with the following structure:
        {{
            "title": "Recipe Title",
            "description": "Brief description of the dish",
            "ingredients": ["Ingredient 1 with quantity", "Ingredient 2 with quantity", ...],
            "instructions": ["Step 1", "Step 2", ...],
            "prepTime": "Time in minutes",
            "cookTime": "Time in minutes",
            "servings": number,
            "difficulty": "Easy/Medium/Hard",
            "nutritionalInfo": {{
                "calories": number,
                "protein": "grams",
                "carbs": "grams",
                "fat": "grams",
                "fiber": "grams"
            }},
            "tags": ["Tag1", "Tag2", ...]
        }}
        
        ONLY return the JSON object, with no additional text before or after.
        """
        
        # Get response from Gemini
        response = model.generate_content(prompt)
        
        # Extract JSON from response
        recipe_text = response.text
        
        # Clean up the response text to extract valid JSON
        if "```json" in recipe_text:
            recipe_text = recipe_text.split("```json")[1].split("```")[0].strip()
        elif "```" in recipe_text:
            recipe_text = recipe_text.split("```")[1].split("```")[0].strip()
            
        # Parse the JSON
        recipe = json.loads(recipe_text)
        
        return jsonify(recipe)
    
    except json.JSONDecodeError as e:
        logger.error(f"JSON Decode Error: {e}, Raw response: {recipe_text}")
        return jsonify({"error": "Failed to parse recipe data"}), 500
    
    except Exception as e:
        logger.error(f"Error generating recipe: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
