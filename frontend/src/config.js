export const API_URL = import.meta.env.PROD
    ? 'https://starzone-1.onrender.com/api'
    : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api');
