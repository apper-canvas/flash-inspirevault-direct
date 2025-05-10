import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

function Home() {
  const [categories, setCategories] = useState([
    { id: 'all', name: 'All', icon: 'BookOpen', active: true },
    { id: 'selfhelp', name: 'Self Help', icon: 'HeartHandshake', active: false },
    { id: 'finance', name: 'Finance', icon: 'DollarSign', active: false },
    { id: 'tutorials', name: 'Tutorials', icon: 'GraduationCap', active: false },
    { id: 'videos', name: 'Videos', icon: 'Video', active: false },
    { id: 'travel', name: 'Travel', icon: 'Plane', active: false },
    { id: 'design', name: 'Design', icon: 'PenTool', active: false },
    { id: 'coding', name: 'Coding', icon: 'Code', active: false },
  ]);

  const [featuredBookmarks, setFeaturedBookmarks] = useState([
    {
      id: 1,
      title: "10 Productivity Hacks You Should Try Today",
      url: "https://example.com/productivity",
      description: "Boost your productivity with these science-backed techniques",
      thumbnailImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "selfhelp",
      dateAdded: "2023-10-15",
      likes: 423,
      source: "Medium"
    },
    {
      id: 2,
      title: "Investing for Beginners: Where to Start",
      url: "https://example.com/investing-basics",
      description: "Learn the fundamentals of investing with this comprehensive guide",
      thumbnailImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "finance",
      dateAdded: "2023-10-12",
      likes: 287,
      source: "Forbes"
    },
    {
      id: 3,
      title: "Learning React Hooks: A Comprehensive Guide",
      url: "https://example.com/react-hooks",
      description: "Master React hooks with this step-by-step tutorial",
      thumbnailImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "coding",
      dateAdded: "2023-10-10",
      likes: 512,
      source: "Dev.to"
    },
    {
      id: 4,
      title: "Hidden Gems: Tokyo's Best Kept Secrets",
      url: "https://example.com/tokyo-travel",
      description: "Discover the hidden spots that most tourists miss in Tokyo",
      thumbnailImage: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80",
      category: "travel",
      dateAdded: "2023-10-08",
      likes: 356,
      source: "Lonely Planet"
    },
    {
      id: 5,
      title: "Advanced CSS Animation Techniques",
      url: "https://example.com/css-animations",
      description: "Take your web designs to the next level with these animation techniques",
      thumbnailImage: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
      category: "design",
      dateAdded: "2023-10-05",
      likes: 198,
      source: "CSS-Tricks"
    },
    {
      id: 6,
      title: "Mindfulness Meditation: A Beginner's Guide",
      url: "https://example.com/mindfulness",
      description: "Start your meditation practice with these beginner-friendly techniques",
      thumbnailImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "selfhelp",
      dateAdded: "2023-10-02",
      likes: 432,
      source: "Headspace"
    }
  ]);

  const [filteredBookmarks, setFilteredBookmarks] = useState(featuredBookmarks);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredBookmarks(featuredBookmarks);
    } else {
      setFilteredBookmarks(featuredBookmarks.filter(bookmark => bookmark.category === activeCategory));
    }
  }, [activeCategory, featuredBookmarks]);

  const handleCategoryClick = (categoryId) => {
    setCategories(categories.map(cat => ({
      ...cat,
      active: cat.id === categoryId
    })));
    setActiveCategory(categoryId);
  };

  const handleLike = (bookmarkId) => {
    setFeaturedBookmarks(featuredBookmarks.map(bookmark => {
      if (bookmark.id === bookmarkId) {
        const newLikes = bookmark.likes + 1;
        return { ...bookmark, likes: newLikes };
      }
      return bookmark;
    }));
    toast.success("Bookmark liked!");
  };

  const handleSaveBookmark = (newBookmark) => {
    const bookmarkWithDetails = {
      ...newBookmark,
      id: featuredBookmarks.length + 1,
      dateAdded: new Date().toISOString().split('T')[0],
      likes: 0,
    };
    
    setFeaturedBookmarks([bookmarkWithDetails, ...featuredBookmarks]);
    toast.success("Bookmark saved successfully!");
  };

  // Icon declarations
  const BookmarkIcon = getIcon('Bookmark');
  const ExternalLinkIcon = getIcon('ExternalLink');
  const HeartIcon = getIcon('Heart');
  
  // Get icons for each category
  const categoryIcons = {};
  categories.forEach(category => {
    categoryIcons[category.id] = getIcon(category.icon);
  });

  return (
    <div>
      {/* Categories */}
      <div className="mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => {
            const CategoryIcon = categoryIcons[category.id];
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all whitespace-nowrap ${
                  category.active
                    ? "bg-primary text-white"
                    : "bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700"
                }`}
              >
                <CategoryIcon size={16} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Main Feature - Bookmark Adder */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <MainFeature onSaveBookmark={handleSaveBookmark} categories={categories} />
        </div>
        
        {/* Right: Bookmarks Grid */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredBookmarks.length > 0 ? (
              filteredBookmarks.map((bookmark) => (
                <motion.div
                  key={bookmark.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card overflow-hidden flex flex-col"
                >
                  <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={bookmark.thumbnailImage} 
                      alt={bookmark.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                    <div className="absolute bottom-2 right-2">
                      <span className="tag bg-primary/80 text-white backdrop-blur-sm">
                        {bookmark.source}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">{bookmark.title}</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-4 line-clamp-2">{bookmark.description}</p>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center gap-1 text-surface-500">
                      <button 
                        onClick={() => handleLike(bookmark.id)}
                        className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                      >
                        <HeartIcon size={16} className="text-secondary" />
                      </button>
                      <span className="text-sm">{bookmark.likes}</span>
                    </div>
                    <div className="flex gap-2">
                      <a 
                        href={bookmark.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                      >
                        <ExternalLinkIcon size={16} />
                      </a>
                      <button className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700">
                        <BookmarkIcon size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="text-surface-400 mb-4">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2v16z"></path>
                  </svg>
                </div>
                <h3 className="text-xl mb-2">No bookmarks found</h3>
                <p className="text-surface-500 dark:text-surface-400 max-w-md">
                  No bookmarks found in this category. Try selecting a different category or add a new bookmark.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;