export const login = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'demo@gearguard.com' && password === 'password') {
                resolve({ user: { name: 'Demo User', email: 'demo@gearguard.com', role: 'Admin' }, token: 'mock-jwt-token' });
            } else {
                if (email && password.length >= 6) {
                    resolve({ user: { name: 'New User', email, role: 'Technician' }, token: 'mock-jwt-token' });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }
        }, 1000);
    });
};

export const register = async (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userData.email) {
                resolve({ user: { name: userData.name, email: userData.email, role: 'Technician' }, token: 'mock-jwt-token' });
            } else {
                reject(new Error('Registration failed'));
            }
        }, 1000);
    });
};
