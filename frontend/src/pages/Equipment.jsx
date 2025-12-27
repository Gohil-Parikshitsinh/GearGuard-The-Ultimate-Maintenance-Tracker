import React from 'react';
import Header from '../components/common/Header';
import PropTypes from 'prop-types';

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
  const baseClasses = "px-3 py-1 text-xs font-bold leading-none rounded-full inline-block";
  const statusClasses = {
    Active: "bg-green-100 text-green-800",
    Scrapped: "bg-red-100 text-red-800",
    'In Repair': "bg-yellow-100 text-yellow-800",
  };
  return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

StatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
};

const Equipment = () => {
  return (
    <div className="w-full h-full bg-gray-50">
      <Header title="Equipment Management" />
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Equipment List</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Add Equipment
            </button>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyEquipment.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.serial}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={item.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="relative px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                      <span>Maintenance</span>
                      {item.maintenanceCount > 0 && (
                        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center h-6 w-6 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{item.maintenanceCount}</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Equipment;
