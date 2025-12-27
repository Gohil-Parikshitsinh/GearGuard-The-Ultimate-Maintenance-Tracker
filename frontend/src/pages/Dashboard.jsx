import React from 'react';
import Header from '../components/common/Header';
import PropTypes from 'prop-types';

// A reusable card component for displaying summary stats
const SummaryCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
      <div className="p-3 rounded-full bg-gray-100">
        {icon}
      </div>
      <div>
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
    </div>
  );
};

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};


// Icons for the summary cards
const EquipmentIcon = () => (
  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
);

const OpenRequestsIcon = () => (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
);

const OverdueRequestsIcon = () => (
    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);


const Dashboard = () => {
  return (
    <div className="w-full h-full">
      <Header title="Dashboard" />
      <main className="p-6">
        {/* Summary Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard title="Total Equipment" value="128" icon={<EquipmentIcon />} />
          <SummaryCard title="Open Requests" value="16" icon={<OpenRequestsIcon />} />
          <SummaryCard title="Overdue Requests" value="3" icon={<OverdueRequestsIcon />} />
        </div>

        {/* Placeholder for future charts or tables */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Activity Overview</h2>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Chart will be displayed here</p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
