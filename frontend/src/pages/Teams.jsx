import React, { useState } from 'react';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal';
import './Teams.css';

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

  const handleAddTeam = () => {
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
    <div className="teams-page">
      <Header title="Maintenance Teams" />
      <div className="teams-container">
        <div className="teams-header">
          <h2>Teams</h2>
          <button className="add-team-btn" onClick={() => setIsModalOpen(true)}>
            Add Team
          </button>
        </div>
        <div className="teams-list">
          {teams.map((team) => (
            <div key={team.id} className="team-card">
              <h3>{team.name}</h3>
              <div className="team-members">
                <h4>Members:</h4>
                <ul>
                  {team.members.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="add-team-modal">
            <h2>Add New Team</h2>
            <input
              type="text"
              placeholder="Team Name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Members (comma-separated)"
              value={newTeamMembers}
              onChange={(e) => setNewTeamMembers(e.target.value)}
            />
            <button onClick={handleAddTeam}>Add Team</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Teams;