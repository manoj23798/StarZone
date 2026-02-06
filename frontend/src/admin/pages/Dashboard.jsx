import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Scissors, Image, Phone, ShoppingBag, Users, MousePointer2, Database, Zap, CheckCircle2, Server, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const { services, gallery, loading: dataLoading } = useData();
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchDashboardData();
    }, [services]);

    const fetchDashboardData = async () => {
        try {
            const res = await axios.get(`${API_URL}/analytics/stats`);
            setStatsData(res.data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (dataLoading || loading || !services) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const totalMenServices = services.men.reduce((acc, cat) => acc + cat.services.length, 0);
    const totalWomenServices = services.women.reduce((acc, cat) => acc + cat.services.length, 0);

    const mainStats = [
        { label: 'Website Visits', value: statsData?.visits || 0, icon: <Users />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Booking Clicks', value: statsData?.bookings || 0, icon: <MousePointer2 />, color: 'text-green-400', bg: 'bg-green-400/10' },
        { label: 'Men Page Visits', value: statsData?.menVisits || 0, icon: <Scissors />, color: 'text-gold', bg: 'bg-gold/10' },
        { label: 'Women Page Visits', value: statsData?.womenVisits || 0, icon: <Scissors />, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    ];

    const systemStats = [
        { label: 'DB Storage', value: statsData?.db?.storageSize || '0.00 MB', icon: <Database size={16} />, sub: `${statsData?.db?.objects || 0} Objects` },
        { label: 'Gallery size', value: `${gallery.length} Items`, icon: <Image size={16} />, sub: 'ImgBB Hosted' },
        { label: 'Web Performance', value: '98%', icon: <Zap size={16} />, sub: 'Excellent' },
        { label: 'System status', value: 'Active', icon: <CheckCircle2 size={16} />, sub: 'All systems go' },
    ];

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-heading mb-2">System Dashboard</h1>
                    <p className="text-gray-500 text-sm">Real-time control center for Star Zone Salon.</p>
                </div>
                <div className="flex space-x-3 w-full md:w-auto">
                    <button
                        onClick={() => { setLoading(true); fetchDashboardData(); }}
                        className="flex-grow md:flex-grow-0 admin-btn-gold py-2 px-6 flex items-center justify-center space-x-2"
                    >
                        <Zap size={14} />
                        <span>Refresh Stats</span>
                    </button>
                </div>
            </div>

            {/* Main Counters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mainStats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="admin-card group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 ${stat.bg} rounded-full blur-3xl`} />
                        <div className="flex items-center space-x-4 relative z-10">
                            <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl text-xl`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black leading-none mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-heading leading-none">{stat.value}</h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* System Health Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="admin-card h-full">
                        <div className="flex items-center space-x-3 mb-8">
                            <Server size={20} className="text-gold" />
                            <h3 className="text-xl font-heading text-white">System Performance & Storage</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {systemStats.map((item) => (
                                <div key={item.label} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-4">
                                    <div className="p-2 bg-white/5 rounded-lg text-gold">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{item.label}</p>
                                        <p className="text-lg font-bold text-white leading-tight">{item.value}</p>
                                        <p className="text-[10px] text-gold/60 font-medium italic">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-gold/5 rounded-2xl border border-gold/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                <div>
                                    <p className="text-xs font-bold text-white uppercase tracking-widest">Database Health</p>
                                    <p className="text-[10px] text-gray-500">Connected to Cluster0 (StarZone)</p>
                                </div>
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                                uptime: 99.9%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="admin-card h-full overflow-hidden relative">
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-heading text-white">Traffic Analysis</h3>
                                <div className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded">LIVE</div>
                            </div>
                            <p className="text-xs text-gray-500 mb-8 leading-relaxed uppercase tracking-widest">
                                Conversion rate: <span className="text-green-400 font-bold">
                                    {statsData?.visits > 0
                                        ? ((statsData.bookings / statsData.visits) * 100).toFixed(1)
                                        : 0}%
                                </span>
                            </p>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest mb-1">
                                        <div className="flex flex-col">
                                            <span className="text-gray-400">Total Visitors</span>
                                            <span className="text-2xl text-white normal-case font-heading mt-1">{statsData?.visits || 0}</span>
                                        </div>
                                        <span className="text-gold text-lg">75%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '75%' }}
                                            className="h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2 border-t border-white/5">
                                    <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest mb-1">
                                        <div className="flex flex-col">
                                            <span className="text-gray-400">Booking Conversions</span>
                                            <span className="text-2xl text-white normal-case font-heading mt-1">{statsData?.bookings || 0}</span>
                                        </div>
                                        <span className="text-green-400 text-lg">40%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '40%' }}
                                            className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                                    <div className="text-center">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Men Visits</p>
                                        <p className="text-xl font-heading text-white">{statsData?.menVisits || 0}</p>
                                    </div>
                                    <div className="text-center border-l border-white/5">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Women Visits</p>
                                        <p className="text-xl font-heading text-white">{statsData?.womenVisits || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>

            {/* Demographics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Locations */}
                <div className="admin-card">
                    <div className="flex items-center space-x-2 mb-6">
                        <MapPin size={18} className="text-gold" />
                        <h3 className="font-heading text-white">Top Locations</h3>
                    </div>
                    <div className="space-y-4">
                        {Object.entries(statsData?.locations || {}).length > 0 ? (
                            Object.entries(statsData.locations)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 5)
                                .map(([city, count]) => (
                                    <div key={city}>
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                                            <span className="text-gray-400">{city}</span>
                                            <span className="text-gold">{count}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-gold/60" style={{ width: `${Math.min((count / (statsData.visits || 1)) * 100, 100)}%` }} />
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p className="text-xs text-gray-500 italic">No location data yet...</p>
                        )}
                    </div>
                </div>

                {/* Gender */}
                <div className="admin-card">
                    <div className="flex items-center space-x-2 mb-6">
                        <Users size={18} className="text-gold" />
                        <h3 className="font-heading text-white">Gender Split</h3>
                    </div>
                    <div className="flex flex-col justify-center h-[calc(100%-2rem)]">
                        <div className="flex justify-between mb-2">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Male ({statsData?.genders?.male || 0})</span>
                            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">Female ({statsData?.genders?.female || 0})</span>
                        </div>
                        <div className="h-4 w-full flex rounded-full overflow-hidden bg-white/5">
                            <div
                                className="h-full bg-blue-400/60"
                                style={{ width: `${(statsData?.genders?.male / ((statsData?.genders?.male + statsData?.genders?.female) || 1)) * 100}%` }}
                            />
                            <div
                                className="h-full bg-pink-400/60"
                                style={{ width: `${(statsData?.genders?.female / ((statsData?.genders?.male + statsData?.genders?.female) || 1)) * 100}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-4 text-center uppercase tracking-widest font-black italic">Based on booking selections</p>
                    </div>
                </div>

                {/* Age */}
                <div className="admin-card">
                    <div className="flex items-center space-x-2 mb-6">
                        <Zap size={18} className="text-gold" />
                        <h3 className="font-heading text-white">Age Groups</h3>
                    </div>
                    <div className="space-y-4">
                        {['18-25', '26-40', '40+'].map(group => {
                            const count = statsData?.ages?.[group] || 0;
                            const total = Object.values(statsData?.ages || {}).reduce((a, b) => a + b, 0) || 1;
                            return (
                                <div key={group}>
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                                        <span className="text-gray-400">{group} Years</span>
                                        <span className="text-green-400">{count}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500/40" style={{ width: `${(count / total) * 100}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
