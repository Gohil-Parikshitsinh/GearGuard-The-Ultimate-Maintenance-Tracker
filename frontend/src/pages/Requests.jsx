import React, { useState } from 'react';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal'; // Use existing Modal or refactor later
import { PlusIcon, UserCircleIcon, WrenchScrewdriverIcon, CalendarIcon } from '@heroicons/react/24/outline';

// Dummy data
const dummyRequests = [
    { id: 1, subject: 'Excavator engine making strange noises', equipment: 'Komatsu PC210', type: 'Corrective', status: 'New', technician: 'Alice Smith', date: '2025-01-01' },
    { id: 2, subject: 'Scheduled 500-hour service', equipment: 'Caterpillar D6', type: 'Preventive', status: 'In Progress', technician: 'Bob Johnson', date: '2025-01-02' },
    { id: 3, subject: 'Angle grinder not starting', equipment: 'Makita Angle Grinder', type: 'Corrective', status: 'Done', technician: 'Charlie Brown', date: '2024-12-25' },
    { id: 4, subject: 'Hauler truck annual inspection', equipment: 'Volvo A30G', type: 'Preventive', status: 'New', technician: 'Unassigned', date: '2025-01-05' },
    { id: 5, subject: 'Bulldozer hydraulics leaking', equipment: 'Caterpillar D6', type: 'Corrective', status: 'Cancelled', technician: 'N/A', date: '2024-12-28' },
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
        'New': 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400',
        'In Progress': 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400',
        'Done': 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400',
        'Cancelled': 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
    };
    return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>
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
        <form onSubmit={handleSubmit} className="p-2">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">New Request</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                    <input type="text" id="subject" className="mt-1 block w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white transition-all" required placeholder="Describe the issue" />
                </div>
                <div>
                    <label htmlFor="equipment" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Equipment</label>
                    <select id="equipment" className="mt-1 block w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white transition-all">
                        <option>Select Equipment...</option>
                        {dummyEquipment.map(e => <option key={e.id}>{e.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Request Type</label>
                    <div className="mt-2 flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <button type="button" onClick={() => setRequestType('Corrective')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${requestType === 'Corrective' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>Corrective</button>
                        <button type="button" onClick={() => setRequestType('Preventive')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${requestType === 'Preventive' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>Preventive</button>
                    </div>
                </div>
                {requestType === 'Preventive' && (
                    <div>
                        <label htmlFor="scheduledDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Scheduled Date</label>
                        <input type="date" id="scheduledDate" className="mt-1 block w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white transition-all" />
                    </div>
                )}
            </div>
            <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-5 py-2.5 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all">Submit Request</button>
            </div>
        </form>
    );
};

const Requests = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full">
            <Header title="Maintenance Requests" />

            <div className="flex justify-between items-center mb-6 px-1">
                <div className="flex gap-2">
                    <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                        <option>All Statuses</option>
                        <option>New</option>
                        <option>In Progress</option>
                    </select>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all font-medium">
                    <PlusIcon className="w-5 h-5" />
                    Create Request
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {dummyRequests.map(req => (
                    <div key={req.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all group">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div className="flex-grow">
                                <div className="flex items-start justify-between md:justify-start gap-3">
                                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">{req.subject}</h3>
                                    <div className="md:hidden"><RequestStatusBadge status={req.status} /></div>
                                </div>
                                <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md">
                                        <WrenchScrewdriverIcon className="w-4 h-4" />
                                        <span>{req.equipment}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className={`w-2 h-2 rounded-full ${req.type === 'Corrective' ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
                                        <span>{req.type} Maintenance</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>{req.date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                        {req.technician === 'Unassigned' ? '?' : req.technician.charAt(0)}
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-xs text-slate-400">Assigned to</p>
                                        <p className="font-medium text-slate-700 dark:text-slate-200">{req.technician}</p>
                                    </div>
                                </div>

                                <div className="hidden md:block">
                                    <RequestStatusBadge status={req.status} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CreateRequestForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Requests;
