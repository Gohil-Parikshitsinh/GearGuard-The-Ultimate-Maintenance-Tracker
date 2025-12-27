import React, { useEffect, useState } from 'react';
import requestService from '../../services/requestService';
import equipmentService from '../../services/equipmentService';

const CreateRequestForm = ({ onClose, onSuccess, initialDate }) => {
    const [requestType, setRequestType] = useState('CORRECTIVE');
    const [equipments, setEquipments] = useState([]);
    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        equipment: '',
        scheduled_date: initialDate ? initialDate : '',
        // Auto-filled
        category: '',
        maintenance_team_name: ''
    });

    useEffect(() => {
        const fetchEq = async () => {
            try {
                const res = await equipmentService.getAllEquipment();
                setEquipments(res.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchEq();
    }, []);

    // Switch to Preventive if date is provided
    useEffect(() => {
        if (initialDate) {
            setRequestType('PREVENTIVE');
        }
    }, [initialDate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));

        // Auto-fill logic
        if (id === 'equipment') {
            const selectedEq = equipments.find(eq => eq.id.toString() === value);
            if (selectedEq) {
                setFormData(prev => ({
                    ...prev,
                    [id]: value,
                    category: selectedEq.category,
                    maintenance_team_name: selectedEq.maintenance_team_name
                }));
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await requestService.createRequest({
                ...formData,
                request_type: requestType
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to create request", error);
            alert("Error creating request");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">New Maintenance Request</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
                <select id="equipment" onChange={handleChange} className="w-full p-2 border rounded" required value={formData.equipment}>
                    <option value="">Select Equipment...</option>
                    {equipments.map(e => <option key={e.id} value={e.id}>{e.name} ({e.serial_number})</option>)}
                </select>
            </div>

            {/* Auto-filled Read-only fields */}
            <div className="flex space-x-2">
                <div className="w-1/2">
                    <label className="block text-xs font-medium text-gray-500">Category</label>
                    <input type="text" value={formData.category} readOnly className="w-full p-2 bg-gray-100 border rounded text-gray-600" />
                </div>
                <div className="w-1/2">
                    <label className="block text-xs font-medium text-gray-500">Maint. Team</label>
                    <input type="text" value={formData.maintenance_team_name} readOnly className="w-full p-2 bg-gray-100 border rounded text-gray-600" />
                </div>
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" id="subject" onChange={handleChange} value={formData.subject} className="w-full p-2 border rounded" required />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea id="description" onChange={handleChange} value={formData.description} className="w-full p-2 border rounded" rows="3" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
                <div className="flex space-x-2 bg-gray-100 p-1 rounded">
                    <button type="button" onClick={() => setRequestType('CORRECTIVE')} className={`flex-1 py-1 rounded ${requestType === 'CORRECTIVE' ? 'bg-white shadow font-medium' : 'text-gray-500'}`}>Corrective</button>
                    <button type="button" onClick={() => setRequestType('PREVENTIVE')} className={`flex-1 py-1 rounded ${requestType === 'PREVENTIVE' ? 'bg-white shadow font-medium' : 'text-gray-500'}`}>Preventive</button>
                </div>
            </div>

            {requestType === 'PREVENTIVE' && (
                <div>
                    <label htmlFor="scheduled_date" className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                    <input type="date" id="scheduled_date" onChange={handleChange} value={formData.scheduled_date} className="w-full p-2 border rounded" required />
                </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
            </div>
        </form>
    );
};

export default CreateRequestForm;
