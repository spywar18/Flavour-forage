# Flavor Forge - AI Recipe Generator

Flavor Forge transforms the way you cook by turning your available ingredients into delicious recipes using artificial intelligence. Instead of searching through countless recipes or wondering what to cook, simply input what you have, and let AI create a personalized recipe tailored to your ingredients and preferences.

## Features

- **Intelligent Recipe Generation**: Uses Google's Gemini AI to create unique recipes from your ingredients
- **Dietary Preference Support**: Accommodates various dietary needs (vegetarian, vegan, gluten-free, etc.)
- **Cuisine Selection**: Choose from multiple cuisine types for targeted recipe suggestions
- **Nutritional Information**: Complete nutritional breakdown for each recipe
- **Interactive UI**: Beautiful, responsive interface with real-time ingredient management
- **Recipe Management**: Save favorite recipes and print or share them easily

## Tech Stack

### Frontend
- **React 18** with TypeScript for robust type safety
- **Tailwind CSS** for responsive, utility-first styling
- **Framer Motion** for smooth, professional animations
- **React Query** for efficient server state management
- **Lucide React** for consistent, scalable iconography

### Backend
- **Python Flask** for a lightweight, efficient API
- **Google Gemini AI** for intelligent recipe generation
- **CORS** for secure cross-origin requests
- **JSON** for structured data exchange

## Architecture

The application follows a clean, modular architecture:

```
src/
├── components/         # React components
│   ├── Header.tsx     # Navigation and branding
│   ├── Footer.tsx     # Site footer with links
│   ├── RecipeGenerator.tsx  # Main recipe generation interface
│   ├── RecipeCard.tsx      # Recipe display component
│   ├── FilterOptions.tsx   # Dietary and cuisine filters
│   └── IngredientInput.tsx # Ingredient input management
├── services/
│   └── api.ts         # API integration layer
├── types/
│   └── recipe.ts      # TypeScript interfaces
└── App.tsx            # Root component

api/
├── app.py            # Flask backend server
└── requirements.txt  # Python dependencies
```

### Key Design Decisions

1. **Component Separation**: Each component has a single responsibility, making the codebase maintainable and testable.

2. **State Management**: Uses React Query for server state and local state for UI, avoiding unnecessary complexity.

3. **Type Safety**: Comprehensive TypeScript interfaces ensure data consistency.

4. **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints.

5. **Animation Strategy**: Strategic use of Framer Motion for enhanced UX without compromising performance.

## Technical Considerations

### Strengths
- Clean separation of concerns between frontend and backend
- Type-safe data flow throughout the application
- Efficient state management with React Query
- Responsive and accessible design
- Scalable component architecture

### Areas for Improvement
1. **Caching**: Implement recipe caching to reduce API calls
2. **Error Boundaries**: Add React error boundaries for graceful failure handling
3. **Testing**: Add unit and integration tests
4. **API Rate Limiting**: Implement rate limiting for Gemini API calls
5. **Progressive Web App**: Convert to PWA for offline support

## Development Challenges

1. **Prompt Engineering**: Crafting effective prompts for Gemini AI to generate structured recipe data required multiple iterations.
   - Solution: Implemented strict JSON response formatting and error handling

2. **Real-time Validation**: Managing ingredient input with immediate feedback while maintaining performance.
   - Solution: Debounced input validation and optimized re-renders

3. **Mobile Responsiveness**: Creating a fluid layout for both ingredient input and recipe display.
   - Solution: Implemented a mobile-first design with strategic breakpoints

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd flavor-forge
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd api
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `api` directory:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

### Running Locally

1. Start the backend server:
   ```bash
   cd api
   python app.py
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser

## Deployment

The application can be deployed using various platforms:

- Frontend: Vercel, Netlify, or GitHub Pages
- Backend: Heroku, Google Cloud Run, or AWS Lambda

Remember to:
1. Set environment variables for the Gemini API key
2. Configure CORS settings for production domains
3. Set up CI/CD pipelines for automated deployment

## License

MIT