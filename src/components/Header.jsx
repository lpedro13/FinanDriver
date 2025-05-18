
import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Header = ({ setSidebarOpen }) => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 shadow-md z-30 px-4 flex items-center justify-between"
    >
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden mr-2" 
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          FinanDrive
        </h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img  
            alt="Logo do aplicativo" 
            className="h-10 w-10 rounded-full"
           src="https://images.unsplash.com/photo-1678179209287-ab843bbd4647" />
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
