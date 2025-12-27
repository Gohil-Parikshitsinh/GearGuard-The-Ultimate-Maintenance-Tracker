import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navLinkClasses = "flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-200";
  const activeLinkClasses = "bg-gray-300 font-bold";

  return (
    <div className="flex flex-col h-screen p-3 bg-gray-100 shadow-xl w-64 fixed">
      <div className="flex items-center justify-center mb-6 pt-3">
        <h1 className="text-2xl font-bold text-gray-800">GearGuard</h1>
      </div>
      <nav className="flex flex-col space-y-2">
        <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} end>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/equipment" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <span>Equipment</span>
        </NavLink>
        <NavLink to="/requests" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <span>Requests</span>
        </NavLink>
        <NavLink to="/board" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <span>Kanban Board</span>
        </NavLink>
        <NavLink to="/calendar" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <span>Calendar</span>
        </NavLink>
        <NavLink to="/teams" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <span>Teams</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
