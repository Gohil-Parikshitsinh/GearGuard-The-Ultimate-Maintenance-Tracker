import api from './api';

const getAllTeams = async () => {
    const response = await api.get('teams/');
    return response.data;
}

export default {
    getAllTeams
}
