import React, { useState } from 'react';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal';
import { UserGroupIcon, PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Teams = () => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: 'Mechanical Team',
      members: ['John Doe', 'Jane Smith', 'Peter Jones'],
    },
    {
      id: 2,
      name: 'Electrical Team',
      members: ['Alice Williams', 'Bob Brown', 'Charlie Davis'],
    },
    {
      id: 3,
      name: 'Inspection Team',
      members: ['Eve Johnson', 'Frank Miller', 'Grace Taylor'],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamMembers, setNewTeamMembers] = useState('');

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (newTeamName.trim() !== '') {
      const newTeam = {
        id: teams.length + 1,
        name: newTeamName,
        members: newTeamMembers.split(',').map((member) => member.trim()),
      };
      setTeams([...teams, newTeam]);
      setIsModalOpen(false);
      setNewTeamName('');
      setNewTeamMembers('');
    }
  };

  return (
    <div className="w-full">
      <Header title="Maintenance Teams" />
      <div className="flex justify-between items-center mb-8 px-1">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <UserGroupIcon className="w-6 h-6 text-blue-500" />
          Active Teams
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium shadow-lg shadow-blue-500/30"
        >
          <PlusIcon className="w-5 h-5" />
          Add Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{team.name}</h3>
              <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded-lg">
                {team.members.length} Members
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Team Members</h4>
              <div className="flex flex-col gap-2">
                {team.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <UserCircleIcon className="w-8 h-8 text-slate-300" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{member}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">View Details &rarr;</button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleAddTeam} className="p-2">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Create New Team</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Team Name</label>
              <input
                type="text"
                placeholder="e.g. Rapid Response Team"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Members</label>
              <input
                type="text"
                placeholder="Name 1, Name 2, Name 3"
                value={newTeamMembers}
                onChange={(e) => setNewTeamMembers(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                required
              />
              <p className="text-xs text-slate-400 mt-1">Separate names with commas</p>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all">Create Team</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Teams;