import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();

    if (user) return <Navigate to="/admin" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (res.success) {
            navigate('/admin');
        } else {
            setError(res.message || 'Invalid credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <span className="text-4xl font-heading font-black tracking-tighter text-gold">
                        STAR <span className="text-white">ZONE</span>
                    </span>
                    <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] mt-2">Secure Admin Gateway</p>
                </div>

                <div className="bg-black-card border border-white/5 rounded-3xl p-10 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-2xl font-bold mb-8 text-center">Login to Dashboard</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-gold transition-colors"
                                    placeholder="ranjith@starzone.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-gold transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-400 text-xs text-center font-medium bg-red-400/5 py-3 rounded-lg border border-red-400/10">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gold text-black-main font-black py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-gold-light transition-all active:scale-95 shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                        >
                            <span>ACCESS DASHBOARD</span>
                            <ArrowRight size={20} />
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-xs mt-8">
                        Access restricted to authorized salon management only.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
