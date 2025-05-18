
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  BarChart2, 
  ShieldCheck,
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: TrendingUp, label: 'Ganhos', path: '/ganhos' },
  { icon: TrendingDown, label: 'Despesas', path: '/despesas' },
  { icon: CreditCard, label: 'Despesas Pessoais', path: '/despesas-pessoais' },
  { icon: ShieldCheck, label: 'Reserva de Emergência', path: '/reserva-emergencia' },
  { icon: BarChart2, label: 'Relatórios', path: '/relatorios' },
];

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: open ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 shadow-lg md:shadow-none md:translate-x-0 md:z-10 pt-16`}
      >
        <div className="p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 md:hidden" 
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
          
          <nav className="mt-6 space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}
                `}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
