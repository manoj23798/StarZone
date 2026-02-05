import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const verifyToken = async () => {
            const savedToken = localStorage.getItem('admin_token');
            const savedUser = localStorage.getItem('admin_user');

            if (savedToken && savedUser) {
                try {
                    // Quick check to see if the token is valid
                    const res = await fetch(`${API_URL}/auth/ping`, {
                        headers: { 'Authorization': `Bearer ${savedToken}` }
                    });

                    if (res.ok) {
                        setUser(JSON.parse(savedUser));
                    } else {
                        // Token expired or invalid
                        logout();
                    }
                } catch (err) {
                    console.error('Verify error:', err);
                    // If server is down, we might want to keep the local session 
                    // or clear it. Let's keep it but log the error.
                    setUser(JSON.parse(savedUser));
                }
            }
            setLoading(false);
        };

        verifyToken();
    }, []);

    const login = async (email, password) => {
        const url = `${API_URL}/auth/login`;
        console.log(`🚀 Fetching: POST ${url}`);
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            console.log(`📡 Response Status: ${res.status}`);
            const data = await res.json();

            if (res.ok) {
                setUser(data.user);
                localStorage.setItem('admin_token', data.token);
                localStorage.setItem('admin_user', JSON.stringify(data.user));
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (err) {
            console.error('Login error:', err);
            return { success: false, message: 'Could not connect to authentication server.' };
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        const token = localStorage.getItem('admin_token');
        const url = `${API_URL}/auth/change-password`;
        console.log(`🚀 Fetching: POST ${url}`);
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });
            console.log(`📡 Response Status: ${res.status}`);

            const text = await res.text();
            console.log(`📝 Raw Response (First 100): ${text.substring(0, 100)}`);

            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('❌ Could not parse JSON response');
                return { success: false, message: `Server error: ${res.status}` };
            }

            return { success: res.ok, message: data.message };
        } catch (err) {
            console.error('❌ Password Change Error:', err);
            return { success: false, message: 'Network error updating password.' };
        }
    };

    const updateProfile = async (profileData) => {
        const token = localStorage.getItem('admin_token');
        try {
            const res = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            });
            const data = await res.json();
            if (res.ok) {
                const newUser = { ...user, ...data.user };
                setUser(newUser);
                localStorage.setItem('admin_user', JSON.stringify(newUser));
            }
            return { success: res.ok, message: data.message };
        } catch (err) {
            return { success: false, message: 'Network error updating profile.' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, changePassword, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
