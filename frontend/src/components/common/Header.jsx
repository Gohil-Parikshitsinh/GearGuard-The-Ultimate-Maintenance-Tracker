import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = ({ title }) => {
  const { theme } = useTheme();

  return (
    <header className="flex items-center justify-between px-8 py-4 mb-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40 rounded-2xl border border-white/20 dark:border-slate-800 transition-colors">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">{title}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back, Admin</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar (Hidden on small screens for now) */}
        <div className="hidden md:flex items-center relative group">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-none placeholder-slate-400"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
            <BellIcon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 ring-2 ring-white dark:ring-slate-800">
              A
            </div>
            <div className="hidden lg:block text-sm">
              <p className="font-semibold text-slate-700 dark:text-slate-200">Admin User</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
