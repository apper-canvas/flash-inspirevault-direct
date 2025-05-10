import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature({ onSaveBookmark, categories }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    category: '',
    thumbnailImage: ''
  });
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  
  const inputRef = useRef(null);

  // Icon declarations
  const PlusIcon = getIcon('Plus');
  const LinkIcon = getIcon('Link');
  const ImageIcon = getIcon('Image');
  const SaveIcon = getIcon('Save');
  const XIcon = getIcon('X');
  const LoaderIcon = getIcon('Loader');
  const ChevronDownIcon = getIcon('ChevronDown');
  const CheckIcon = getIcon('Check');
  const InfoIcon = getIcon('Info');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.url) {
      newErrors.url = 'URL is required';
    } else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }
    
    if (!formData.title) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      onSaveBookmark({
        ...formData,
        thumbnailImage: formData.thumbnailImage || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop'
      });
      
      // Reset form
      setFormData({
        url: '',
        title: '',
        description: '',
        category: '',
        thumbnailImage: ''
      });
      
      setIsExpanded(false);
      setShowPreview(false);
      setIsLoading(false);
    }, 1500);
  };

  const handlePaste = async () => {
    try {
      const clipboardData = await navigator.clipboard.readText();
      if (clipboardData && /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(clipboardData)) {
        setFormData({
          ...formData,
          url: clipboardData
        });
        
        toast.info("URL pasted from clipboard");
        
        // Simulate fetching metadata
        setIsLoading(true);
        setTimeout(() => {
          // This would normally be fetched from the URL
          const mockMetadata = {
            title: "Example Article Title",
            description: "This is a sample description that would be extracted from the meta tags of the website you're bookmarking.",
            thumbnailImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          };
          
          setFormData({
            ...formData,
            url: clipboardData,
            title: mockMetadata.title,
            description: mockMetadata.description,
            thumbnailImage: mockMetadata.thumbnailImage
          });
          
          setShowPreview(true);
          setIsLoading(false);
          toast.success("Metadata extracted successfully");
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to read from clipboard");
    }
  };

  return (
    <div className="card transition-all duration-300 bg-gradient-to-br from-white to-surface-100 dark:from-surface-800 dark:to-surface-900 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Save New Bookmark</h2>
        <motion.button
          whileHover={{ rotate: isExpanded ? 180 : 0 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
          aria-label={isExpanded ? "Collapse form" : "Expand form"}
        >
          <ChevronDownIcon 
            size={20} 
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </motion.button>
      </div>
      
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              <PlusIcon size={18} />
              <span>Add New Bookmark</span>
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="url">
                URL*
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com/article"
                  className={`input w-full pl-10 ${
                    errors.url ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                  <LinkIcon size={18} />
                </div>
                <button
                  type="button"
                  onClick={handlePaste}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary hover:text-primary-dark"
                >
                  Paste
                </button>
              </div>
              {errors.url && (
                <p className="text-red-500 text-xs mt-1">{errors.url}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className={`input w-full ${
                  errors.title ? "border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description (optional)"
                rows="3"
                className="input w-full resize-none"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="category">
                Category*
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`input w-full ${
                  errors.category ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <option value="">Select a category</option>
                {categories
                  .filter(cat => cat.id !== 'all')
                  .map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))
                }
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="thumbnailImage">
                Thumbnail URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="thumbnailImage"
                  name="thumbnailImage"
                  value={formData.thumbnailImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg (optional)"
                  className="input w-full pl-10"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                  <ImageIcon size={18} />
                </div>
              </div>
            </div>
            
            {showPreview && formData.title && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg overflow-hidden bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600"
              >
                <div className="p-3 border-b border-surface-200 dark:border-surface-600 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <InfoIcon size={16} className="text-primary" />
                    <span className="text-sm font-medium">Preview</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex gap-3">
                    {formData.thumbnailImage && (
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={formData.thumbnailImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop";
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-sm">{formData.title}</h4>
                      {formData.description && (
                        <p className="text-xs text-surface-600 dark:text-surface-400 mt-1 line-clamp-2">
                          {formData.description}
                        </p>
                      )}
                      <p className="text-xs text-surface-500 dark:text-surface-500 mt-1 truncate">
                        {formData.url}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoaderIcon size={18} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <SaveIcon size={18} />
                    <span>Save Bookmark</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setShowPreview(false);
                  // Reset form after a short delay to allow closing animation
                  setTimeout(() => {
                    setFormData({
                      url: '',
                      title: '',
                      description: '',
                      category: '',
                      thumbnailImage: ''
                    });
                    setErrors({});
                  }, 300);
                }}
                className="btn btn-outline p-2"
              >
                <XIcon size={18} />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      
      {/* Quick Tips */}
      <div className="mt-6 px-4 py-3 rounded-lg bg-surface-100 dark:bg-surface-700/50 text-sm">
        <div className="flex items-start gap-2">
          <CheckIcon size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Quick Tip</p>
            <p className="text-surface-600 dark:text-surface-400 mt-1">
              Paste a URL to automatically extract the title, description, and thumbnail from the website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFeature;