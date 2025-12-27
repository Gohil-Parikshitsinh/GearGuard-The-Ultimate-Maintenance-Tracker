import React, { useState } from 'react';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal';

// Dummy data
const dummyRequests = [
  { id: 1, subject: 'Excavator engine making strange noises', equipment: 'Komatsu PC210', type: 'Corrective', status: 'New', technician: 'Alice Smith' },
  { id: 2, subject: 'Scheduled 500-hour service', equipment: 'Caterpillar D6', type: 'Preventive', status: 'In Progress', technician: 'Bob Johnson' },
  { id: 3, subject: 'Angle grinder not starting', equipment: 'Makita Angle Grinder', type: 'Corrective', status: 'Done', technician: 'Charlie Brown' },
  { id: 4, subject: 'Hauler truck annual inspection', equipment: 'Volvo A30G', type: 'Preventive', status: 'New', technician: 'Unassigned' },
  { id: 5, subject: 'Bulldozer hydraulics leaking', equipment: 'Caterpillar D6', type: 'Corrective', status: 'Cancelled', technician: 'N/A' },
];

const dummyEquipment = [
    { id: 1, name: 'Komatsu PC210 Excavator' },
    { id: 2, name: 'Caterpillar D6 Bulldozer' },
    { id: 3, name: 'Volvo A30G Hauler' },
    { id: 4, name: 'Makita Angle Grinder' },
    { id: 5, name: 'Hilti TE 70-ATC/AVR' },
];

const RequestStatusBadge = ({ status }) => {
    const statusStyles = {
        'New': 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-yellow-100 text-yellow-800',
        'Done': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-gray-200 text-gray-700',
    };
    return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>{status}</span>
};



const CreateRequestForm = ({ onClose }) => {
    const [requestType, setRequestType] = useState('Corrective');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd handle form submission here
        console.log("Form submitted");
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">New Maintenance Request</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input type="text" id="subject" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                    <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
                    <select id="equipment" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>Select Equipment...</option>
                        {dummyEquipment.map(e => <option key={e.id}>{e.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
                    <div className="mt-2 flex space-x-4 bg-gray-100 p-1 rounded-lg">
                        <button type="button" onClick={() => setRequestType('Corrective')} className={`w-1/2 py-2 text-sm rounded-md ${requestType === 'Corrective' ? 'bg-white shadow' : 'text-gray-600'}`}>Corrective</button>
                        <button type="button" onClick={() => setRequestType('Preventive')} className={`w-1/2 py-2 text-sm rounded-md ${requestType === 'Preventive' ? 'bg-white shadow' : 'text-gray-600'}`}>Preventive</button>
                    </div>
                </div>
                {requestType === 'Preventive' && (
                     <div>
                        <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                        <input type="date" id="scheduledDate" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                )}
            </div>
            <div className="mt-8 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit Request</button>
            </div>
        </form>
    );
};



const Requests = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full h-full bg-gray-50">
            <Header title="Maintenance Requests" />
            <main className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">All Requests</h2>
                    <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Create Request
                    </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md">
                    <ul className="divide-y divide-gray-200">
                        {dummyRequests.map(req => (
                            <li key={req.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-800">{req.subject}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {req.equipment} &bull; <span className="font-medium text-gray-600">{req.type}</span>
                                    </p>
                                </div>
                                <div className="flex items-center space-x-6 w-1/3 justify-end">
                                   <div className="text-sm text-gray-600 text-right">
                                       <p className="text-xs text-gray-400">Technician</p>
                                       <p className="font-medium">{req.technician}</p>
                                   </div>
                                   <div className="w-28 text-center">
                                       <RequestStatusBadge status={req.status} />
                                   </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CreateRequestForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Requests;
