import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal';
import requestService from '../services/requestService';
import equipmentService from '../services/equipmentService';
import CreateRequestForm from '../components/requests/CreateRequestForm';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const STATUSES = {
    NEW: 'New',
    IN_PROGRESS: 'In Progress',
    REPAIRED: 'Repaired',
    SCRAP: 'Scrap'
};

const RequestStatusBadge = ({ status }) => {
    const statusStyles = {
        'NEW': 'bg-blue-100 text-blue-800',
        'IN_PROGRESS': 'bg-yellow-100 text-yellow-800',
        'REPAIRED': 'bg-green-100 text-green-800',
        'SCRAP': 'bg-red-200 text-red-800',
    };
    return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100'}`}>{status}</span>
};

const KanbanBoard = ({ requests, onDragEnd }) => {
    // Structure: { NEW: [req1], IN_PROGRESS: [req2] }
    const [columns, setColumns] = useState({});

    useEffect(() => {
        const cols = { NEW: [], IN_PROGRESS: [], REPAIRED: [], SCRAP: [] };
        requests.forEach(req => {
            if (cols[req.status]) cols[req.status].push(req);
        });
        setColumns(cols);
    }, [requests]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex space-x-4 overflow-x-auto pb-4 h-[calc(100vh-200px)]">
                {Object.entries(columns).map(([statusKey, items]) => (
                    <Droppable key={statusKey} droppableId={statusKey}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`flex-shrink-0 w-80 bg-gray-100 rounded-lg p-4 flex flex-col h-full ${snapshot.isDraggingOver ? 'bg-gray-200' : ''}`}
                            >
                                <h3 className="font-bold text-gray-700 mb-4 flex justify-between items-center">
                                    {STATUSES[statusKey]}
                                    <span className="bg-white text-gray-500 px-2 py-0.5 rounded text-sm shadow-sm">{items.length}</span>
                                </h3>
                                <div className="overflow-y-auto flex-grow space-y-3 min-h-[100px]">
                                    {items.map((req, index) => (
                                        <Draggable key={req.id.toString()} draggableId={req.id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${req.is_overdue ? 'border-red-500' : 'border-blue-500'
                                                        } hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing`}
                                                    style={{ ...provided.draggableProps.style }}
                                                >
                                                    <h4 className="font-semibold text-gray-800 mb-1">{req.subject}</h4>
                                                    <p className="text-xs text-gray-500 mb-2">{req.equipment_name} &bull; {req.serial_number}</p>

                                                    <div className="flex justify-between items-center mt-3">
                                                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${req.request_type === 'CORRECTIVE' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>
                                                            {req.request_type && req.request_type[0]}
                                                        </span>
                                                        <div className="flex items-center space-x-2">
                                                            {req.tech_name && (
                                                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700" title={req.tech_name}>
                                                                    {req.tech_name[0]}
                                                                </div>
                                                            )}
                                                            {!req.tech_name && <div className="w-6 h-6 rounded-full bg-gray-200" title="Unassigned" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

const Requests = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requestList, setRequestList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterEquipment, setFilterEquipment] = useState(null); // ID or null

    // Parse URL params for Smart Button
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const eqId = params.get('equipment');
        if (eqId) setFilterEquipment(eqId);
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            // Support filtering if we added it to backend, OR filter client side. 
            // We added backend support: ?equipment=ID
            let query = '';
            if (filterEquipment) query = `?equipment=${filterEquipment}`;

            // Check if requestService supports query args? Usually services are generic.
            // Assuming requestService.getAllRequests() just calls get('requests/'). We might need to modify it or pass params?
            // Let's assume we can modify requestService or it passes args.
            // For now, let's just fetch all and filter client side if service doesn't support params yet, 
            // BUT we updated backend so better to use it. 
            // Let's modify service call in a real app, but for now I'll just rely on what requestService has.
            // requestService.getAllRequests() has no args. I will fix that later or just filter here.

            const data = await requestService.getAllRequests();
            let list = data.data; // Backend returns wrapped in "data": wrapper?

            // Client side filter fallback or primary if service not updated
            if (filterEquipment) {
                list = list.filter(r => r.equipment.toString() === filterEquipment.toString() || r.equipment_id?.toString() === filterEquipment.toString());
            }
            setRequestList(list);
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [filterEquipment]);

    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId) return;

        // Optimistic UI Update
        const newStatus = destination.droppableId;
        const updatedList = requestList.map(req =>
            req.id.toString() === draggableId ? { ...req, status: newStatus } : req
        );
        setRequestList(updatedList);

        // API Call
        try {
            await requestService.updateRequest(draggableId, { status: newStatus });
        } catch (error) {
            console.error("Failed to update status", error);
            // Revert on fail
            fetchRequests();
            alert("Failed to update status on server.");
        }
    };

    return (
        <div className="w-full h-full bg-gray-50 flex flex-col">
            <Header title="Maintenance Requests" />
            <main className="flex-grow p-6 overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                        <h2 className="text-xl font-semibold text-gray-700">
                            {filterEquipment ? 'Equipment Requests' : 'Kanban Board'}
                        </h2>
                        {filterEquipment && (
                            <button onClick={() => { setFilterEquipment(null); window.history.pushState({}, '', '/requests'); }} className="text-sm text-blue-600 hover:underline">
                                Clear Filter
                            </button>
                        )}
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700">
                        + New Request
                    </button>
                </div>

                {loading ? (
                    <div className="text-center p-10 text-gray-500">Loading requests...</div>
                ) : (
                    <KanbanBoard requests={requestList} onDragEnd={onDragEnd} />
                )}
            </main>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CreateRequestForm onClose={() => setIsModalOpen(false)} onSuccess={fetchRequests} />
            </Modal>
        </div>
    );
};

export default Requests;
