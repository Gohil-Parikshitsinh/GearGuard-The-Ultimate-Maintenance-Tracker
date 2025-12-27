import React from 'react';
import Header from '../components/common/Header';
import {
  WrenchScrewdriverIcon,
  ClipboardDocumentCheckIcon,
  ExclamationCircleIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'; // Outline icons for dashboard

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, trend, color, delay }) => (
  <div className={`
    bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800
    p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300
    group relative overflow-hidden animate-fade-in
  `} style={{ animationDelay: `${delay}ms` }}>
    <div className={`absolute top-0 right-0 p-4 -mr-4 -mt-4 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${color}`}></div>

    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color.replace('bg-', 'bg-opacity-10 text-')}`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>

    <div className="mt-4 flex items-center text-sm">
      <span className="text-green-500 flex items-center font-medium">
        <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
        {trend}
      </span>
      <span className="text-slate-400 ml-2">vs last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="w-full">
      <Header title="Overview" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Equipment"
          value="128"
          icon={WrenchScrewdriverIcon}
          trend="+12%"
          color="bg-blue-500"
          delay={100}
        />
        <StatCard
          title="Active Requests"
          value="14"
          icon={ClipboardDocumentCheckIcon}
          trend="+5%"
          color="bg-emerald-500"
          delay={200}
        />
        <StatCard
          title="Critical Alerts"
          value="3"
          icon={ExclamationCircleIcon}
          trend="-2%"
          color="bg-red-500"
          delay={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Feed */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-slate-700 transition-colors">
                  <WrenchScrewdriverIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white">Equipment #10{i} Maintenance</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Scheduled maintenance checks completed by <span className="text-blue-500">John Doe</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-2">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats / Charts Placeholder */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Maintenance Overview</h2>
            <select className="bg-slate-50 dark:bg-slate-800 border-none text-sm rounded-lg p-2 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-blue-500/20">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          <div className="h-64 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <ArrowTrendingUpIcon className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Chart Visualization</p>
              <p className="text-xs text-slate-400 mt-1">Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
