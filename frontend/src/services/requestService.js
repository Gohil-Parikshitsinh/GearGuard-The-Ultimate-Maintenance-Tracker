import api from './api';

const getAllRequests = async () => {
    const response = await api.get('requests/');
    return response.data;
}

const createRequest = async (data) => {
    const response = await api.post('requests/', data);
    return response.data;
}

const updateRequest = async (id, data) => {
    const response = await api.patch(`requests/${id}/`, data);
    return response.data;
}

const getRequestById = async (id) => {
    const response = await api.get(`requests/${id}/`);
    return response.data;
}

export default {
    getAllRequests,
    createRequest,
    updateRequest,
    getRequestById
}
