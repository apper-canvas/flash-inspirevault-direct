import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import getIcon from './utils/iconUtils';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

import Privacy from './pages/Privacy';
import Navbar from './components/Navbar';
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
  const HomeIcon = getIcon('Home');
  const SearchIcon = getIcon('Search');
  const BookmarkPlusIcon = getIcon('BookmarkPlus');
  const UserIcon = getIcon('User');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-primary-dark dark:text-primary-light"
          <Route path="/contact" element={<Contact />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 md:hidden">
        <div className="grid grid-cols-4 h-16">
          <Link to="/" className="flex flex-col items-center justify-center gap-1 text-primary">
            <HomeIcon size={20} />
            <span className="text-xs">Home</span>
          </Link>
          <button className="flex flex-col items-center justify-center gap-1 text-surface-600 dark:text-surface-400">
        </div>
      </nav>
            <User size={20} />
            <SearchIcon size={20} />
          </button>
        </div>
      </nav>
            <BookmarkPlusIcon size={20} />
      <footer className="bg-surface-100 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <UserIcon size={20} />
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