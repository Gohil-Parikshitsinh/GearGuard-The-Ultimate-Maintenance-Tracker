import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-4">
        <span className="font-medium text-gray-600">Admin User</span>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          {/* Placeholder for user avatar icon or image */}
          <span className="text-lg font-bold text-gray-500">A</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
