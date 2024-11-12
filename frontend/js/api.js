const API_URL = 'http://localhost:5000/api';

export const api = {
    register: async (userData) => {
        console.log('Sending registration request:', userData);
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            console.log('Registration response:', data);
            
            if (!response.ok) throw data;
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }
};