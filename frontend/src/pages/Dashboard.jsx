import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import PropTypes from 'prop-types';
import dashboardService from '../services/dashboardService';
import { ChartBarIcon, ClipboardDocumentCheckIcon, WrenchScrewdriverIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// A reusable card component for displaying summary stats
const SummaryCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 border-l-4" style={{ borderColor: color }}>
      <div className="p-3 rounded-full bg-gray-50">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color.replace('bg-', 'bg-opacity-10 text-')}`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  );
};

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_equipment: 0,
    active_equipment: 0,
    total_requests: 0,
    open_requests: 0,
    overdue_requests: 0,
    completed_requests: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardService.getSummary();
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-b-2 border-sky-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full pb-8">
      <Header title="Dashboard" />
      <main className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard
            title="Total Assets"
            value={stats.total_equipment}
            icon={<WrenchScrewdriverIcon className="w-8 h-8 text-blue-500" />}
            color="#3b82f6"
          />
          <SummaryCard
            title="Active Assets"
            value={stats.active_equipment}
            icon={<CheckCircleIcon className="w-8 h-8 text-green-500" />}
            color="#22c55e"
          />
          <SummaryCard
            title="Open Requests"
            value={stats.open_requests}
            icon={<ClipboardDocumentCheckIcon className="w-8 h-8 text-orange-500" />}
            color="#f97316"
          />
          <SummaryCard
            title="Overdue Jobs"
            value={stats.overdue_requests}
            icon={<ExclamationCircleIcon className="w-8 h-8 text-red-500" />}
            color="#ef4444"
          />
          <SummaryCard
            title="Completed Jobs"
            value={stats.completed_requests}
            icon={<ClipboardDocumentCheckIcon className="w-8 h-8 text-indigo-500" />}
            color="#6366f1"
          />
          <SummaryCard
            title="Total Maintenance"
            value={stats.total_requests}
            icon={<ChartBarIcon className="w-8 h-8 text-purple-500" />}
            color="#a855f7"
          />
        </div>

        {/* Analytics Section (Placeholder for now, can be updated with Recharts) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Requests Overview</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
              <p className="text-gray-400">Charts coming soon</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Team Performance</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
              <p className="text-gray-400">Charts coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
