import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import getIcon from './utils/iconUtils';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

import Privacy from './pages/Privacy';
import Contact from './pages/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const Moon = getIcon('Moon');
  const Sun = getIcon('Sun');
  const Home = getIcon('Home');
  const Search = getIcon('Search');
  const BookmarkPlus = getIcon('BookmarkPlus');
  const User = getIcon('User');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-surface-200 dark:border-surface-700/30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-primary-dark dark:text-primary-light"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 10L11 12L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <h1 className="text-xl font-bold">
              <span className="text-primary-dark dark:text-primary-light">Inspire</span>
              <span>Vault</span>
            </h1>
          </div>
          
          <div className="md:flex items-center hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bookmarks..."
                className="input pr-10 w-64"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400">
                <Search size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 md:hidden">
        <div className="grid grid-cols-4 h-16">
          <button className="flex flex-col items-center justify-center gap-1 text-primary">
            <Home size={20} />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-surface-600 dark:text-surface-400">
            <Search size={20} />
            <span className="text-xs">Search</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-surface-600 dark:text-surface-400">
            <BookmarkPlus size={20} />
            <span className="text-xs">Save</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-surface-600 dark:text-surface-400">
            <User size={20} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>

      <footer className="bg-surface-100 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-bold">
                  <span className="text-primary-dark dark:text-primary-light">Inspire</span>
                  <span>Vault</span>
                </h2>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                Save and organize inspirational content from around the web
              </p>
            </div>
            <div className="flex gap-6">
              <a href="/privacy" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Privacy Policy</a>
              <a href="/contact" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="shadow-lg"
      />
    </div>
  );
}

export default App;