import api from './api';

const getAllEquipment = async () => {
    const response = await api.get('equipment/');
    return response.data;
}

const createEquipment = async (data) => {
    const response = await api.post('equipment/', data);
    return response.data;
}

const getEquipmentById = async (id) => {
    const response = await api.get(`equipment/${id}/`);
    return response.data;
}

const deleteEquipment = async (id) => {
    // Soft delete
    const response = await api.delete(`equipment/${id}/`);
    return response.data;
}

export default {
    getAllEquipment,
    createEquipment,
    getEquipmentById,
    deleteEquipment
}
