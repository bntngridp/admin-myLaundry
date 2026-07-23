const API_BASE_URL = 'http://localhost:8083/api';

async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem('admin_token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
        ...options,
        headers
    };
    
    if (options.body && typeof options.body === 'object') {
        config.body = JSON.stringify(options.body);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        // Handle expired/invalid token
        if (response.status === 401 && !window.location.pathname.endsWith('login.html')) {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_role');
            window.location.replace('login.html');
            return null;
        }
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
