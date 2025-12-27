import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
    Squares2X2Icon,
    WrenchScrewdriverIcon,
    ClipboardDocumentCheckIcon,
    ViewColumnsIcon,
    CalendarIcon,
    UserGroupIcon,
    MoonIcon,
    SunIcon,
    ChevronLeftIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'; // Outline icons usually look better for UI
// Note: Heroicons v2 uses 24/outline or 24/solid paths.

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: Squares2X2Icon },
        { path: '/equipment', label: 'Equipment', icon: WrenchScrewdriverIcon },
        { path: '/requests', label: 'Requests', icon: ClipboardDocumentCheckIcon },
        { path: '/board', label: 'Board', icon: ViewColumnsIcon }, // Used ViewColumnsIcon as KanbanIcon alternative
        { path: '/calendar', label: 'Calendar', icon: CalendarIcon },
        { path: '/teams', label: 'Teams', icon: UserGroupIcon },
    ];

    return (
        <div
            className={`fixed left-0 top-0 h-full bg-white dark:bg-slate-900 shadow-xl transition-all duration-300 z-50 flex flex-col border-r border-slate-200 dark:border-slate-800 ${isOpen ? 'w-64' : 'w-20'
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 h-16 border-b border-slate-100 dark:border-slate-800">
                <h1 className={`font-bold text-xl text-blue-600 dark:text-blue-400 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    GearGuard
                </h1>
                <button
                    onClick={toggleSidebar}
                    className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                    <ChevronLeftIcon className={`w-5 h-5 transition-transform duration-300 ${!isOpen && 'rotate-180'}`} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 flex flex-col gap-1 px-3 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
              ${isActive
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                            }
            `}
                    >
                        <div className="">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <span className={`font-medium whitespace-nowrap transition-all duration-200 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 overflow-hidden w-0'}`}>
                            {item.label}
                        </span>

                        {/* Tooltip for collapsed state */}
                        {!isOpen && (
                            <div className="absolute left-full ml-6 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                {item.label}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / Settings */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <button
                    onClick={toggleTheme}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${!isOpen && 'justify-center'}`}
                >
                    {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                    <span className={`font-medium whitespace-nowrap transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                </button>

                <button
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors ${!isOpen && 'justify-center'}`}
                >
                    <ArrowRightOnRectangleIcon className="w-6 h-6" />
                    <span className={`font-medium whitespace-nowrap transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                        Logout
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
