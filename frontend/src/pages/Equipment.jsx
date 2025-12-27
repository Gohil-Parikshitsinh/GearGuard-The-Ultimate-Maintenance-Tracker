import React from 'react';
import Header from '../components/common/Header';
import { PlusIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'; // Updated icons

// Dummy data for the equipment table
const dummyEquipment = [
  { id: 1, name: 'Komatsu PC210 Excavator', serial: 'SN-KOM-001', category: 'Heavy Machinery', location: 'Site A', status: 'Active', maintenanceCount: 2 },
  { id: 2, name: 'Caterpillar D6 Bulldozer', serial: 'SN-CAT-012', category: 'Heavy Machinery', location: 'Site B', status: 'Active', maintenanceCount: 0 },
  { id: 3, name: 'Volvo A30G Hauler', serial: 'SN-VOL-089', category: 'Transport', location: 'Workshop', status: 'In Repair', maintenanceCount: 5 },
  { id: 4, name: 'Makita Angle Grinder', serial: 'SN-MAK-734', category: 'Power Tools', location: 'Site A', status: 'Scrapped', maintenanceCount: 0 },
  { id: 5, name: 'Hilti TE 70-ATC/AVR', serial: 'SN-HIL-551', category: 'Power Tools', location: 'Warehouse', status: 'Active', maintenanceCount: 1 },
];

// Component for the colored status badge
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Active: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30",
    Scrapped: "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-600",
    'In Repair': "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30",
  };

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const Equipment = () => {
  return (
    <div className="w-full">
      <Header title="Equipment Management" />
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Equipment List</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium shadow-lg shadow-blue-500/30">
            <PlusIcon className="w-5 h-5" />
            Add Equipment
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Serial Number</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 relative"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {dummyEquipment.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-200">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-mono">{item.serial}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400 text-xs font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={item.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="relative p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all group">
                      <WrenchScrewdriverIcon className="w-5 h-5" />
                      {item.maintenanceCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
