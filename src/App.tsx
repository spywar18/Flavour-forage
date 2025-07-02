import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { motion } from 'framer-motion';
import Header from './components/Header';
import RecipeGenerator from './components/RecipeGenerator';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <motion.main 
          className="flex-grow py-8 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-5xl mx-auto">
            <RecipeGenerator />
          </div>
        </motion.main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;