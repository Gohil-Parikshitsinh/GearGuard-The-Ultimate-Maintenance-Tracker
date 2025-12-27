import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import PropTypes from 'prop-types';
import equipmentService from '../services/equipmentService';
import teamService from '../services/teamService'; // Assuming we need teams for dropdown

// Component for the colored status badge
const StatusBadge = ({ is_active }) => {
  const baseClasses = "px-3 py-1 text-xs font-bold leading-none rounded-full inline-block";
  return (
    <span className={`${baseClasses} ${is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {is_active ? 'Active' : 'Inactive'}
    </span>
  );
};

StatusBadge.propTypes = {
  is_active: PropTypes.bool.isRequired,
};

const Equipment = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [teams, setTeams] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    serial_number: '',
    category: '',
    department: '',
    location: '',
    purchase_date: '',
    maintenance_team: ''
  });

  const userRole = localStorage.getItem('user_role');
  const isAdmin = userRole === 'ADMIN';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await equipmentService.getAllEquipment();
      setEquipmentList(data.data);

      // If admin, fetch teams for the dropdown
      if (isAdmin) {
        const teamData = await teamService.getAllTeams();
        setTeams(teamData.data);
      }
    } catch (error) {
      console.error("Failed to fetch equipment", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await equipmentService.createEquipment(formData);
      setShowModal(false);
      fetchData(); // Refresh list
      // Reset form
      setFormData({
        name: '', serial_number: '', category: '', department: '', location: '', purchase_date: '', maintenance_team: ''
      });
    } catch (error) {
      alert('Failed to create equipment. Ensure Admin privileges and unique serial number.');
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 pb-8">
      <Header title="Equipment Management" />
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Equipment List</h2>
          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Equipment
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center p-8">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dept</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipmentList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.serial_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.maintenance_team_name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => window.location.href = `/requests?equipment=${item.id}`}
                        className="flex items-center text-blue-600 hover:text-blue-900 focus:outline-none"
                        title="View Maintenance Requests"
                      >
                        <span className="mr-1 font-semibold">Maintenance</span>
                        {item.open_request_count > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                            {item.open_request_count}
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge is_active={item.is_active} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Create Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Equipment</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Name" required className="w-full p-2 border rounded" onChange={handleInputChange} />
                <input name="serial_number" placeholder="Serial Number" required className="w-full p-2 border rounded" onChange={handleInputChange} />
                <input name="category" placeholder="Category" required className="w-full p-2 border rounded" onChange={handleInputChange} />
                <input name="department" placeholder="Department" required className="w-full p-2 border rounded" onChange={handleInputChange} />
                <input name="location" placeholder="Location" required className="w-full p-2 border rounded" onChange={handleInputChange} />
                <input name="purchase_date" type="date" required className="w-full p-2 border rounded" onChange={handleInputChange} />

                <select name="maintenance_team" required className="w-full p-2 border rounded" onChange={handleInputChange}>
                  <option value="">Select Maintenance Team</option>
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>

                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Equipment;
