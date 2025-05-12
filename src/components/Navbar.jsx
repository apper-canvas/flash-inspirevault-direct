import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const Moon = getIcon('Moon');
  const Sun = getIcon('Sun');
  const HomeIcon = getIcon('Home');
  const Search = getIcon('Search');
  const Bookmark = getIcon('Bookmark');
  const Settings = getIcon('Settings');
  const Menu = getIcon('Menu');
  const X = getIcon('X');
  
  return (
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
          <Link to="/" className="text-xl font-bold">
            <span className="text-primary-dark dark:text-primary-light">Inspire</span>
            <span>Vault</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="nav-link">
            <HomeIcon size={18} className="mr-1" />
            Home
          </Link>
          <Link to="/collections" className="nav-link">
            <Bookmark size={18} className="mr-1" />
            Collections
          </Link>
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
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {dropdownOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Dropdown Menu */}
      <div className={`dropdown-menu ${dropdownOpen ? 'block' : 'hidden'} md:hidden`}>
        <Link to="/" className="dropdown-item"><HomeIcon size={18} className="mr-2" /> Home</Link>
        <Link to="/collections" className="dropdown-item"><Bookmark size={18} className="mr-2" /> Collections</Link>
        <Link to="/settings" className="dropdown-item"><Settings size={18} className="mr-2" /> Settings</Link>
      </div>
    </header>
  );
};

export default Navbar;