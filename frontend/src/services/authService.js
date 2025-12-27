import api from './api';
import { jwtDecode } from "jwt-decode"; // Requires 'npm install jwt-decode' if not present, checking later. 
// Assuming jwt-decode might be needed to get role, OR we rely on profile endpoint.
// Let's rely on login response containing role if backend sends it. 
// Backend LoginAPI returns { refresh, access }. ProfileAPI returns user Details.

const login = async (email, password) => {
    const response = await api.post('accounts/login/', { email, password });
    if (response.data.data) {
        // Save tokens
        const { access, refresh } = response.data.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        // Fetch user details to get Role immediately or decode if backend sent it differently
        // Our backend LoginAPI just sends tokens. Let's fetch profile.
        const profileResponse = await api.get('accounts/profile/');
        const user = profileResponse.data.data;
        localStorage.setItem('user_role', user.role);
        localStorage.setItem('user_name', user.first_name || 'User');

        return user;
    }
    return null;
};

const register = async (userData) => {
    return await api.post('accounts/register/', userData);
};

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
};

const getCurrentUser = async () => {
    try {
        const response = await api.get('accounts/profile/');
        return response.data.data;
    } catch (error) {
        return null;
    }
}

export default {
    login,
    register,
    logout,
    getCurrentUser
};
