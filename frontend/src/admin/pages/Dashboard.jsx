import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Scissors, Image, Phone, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { services, gallery, loading } = useData();

    if (loading || !services) return <div>Loading Stats...</div>;

    const totalMenServices = services.men.reduce((acc, cat) => acc + cat.services.length, 0);
    const totalWomenServices = services.women.reduce((acc, cat) => acc + cat.services.length, 0);

    const stats = [
        { label: 'Men Services', value: totalMenServices, icon: <Scissors className="text-blue-400" /> },
        { label: 'Women Services', value: totalWomenServices, icon: <Scissors className="text-pink-400" /> },
        { label: 'Gallery Images', value: gallery.length, icon: <Image className="text-purple-400" /> },
        { label: 'Total categories', value: services.men.length + services.women.length, icon: <ShoppingBag className="text-gold" /> },
    ];

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-heading mb-2">System Dashboard</h1>
                    <p className="text-gray-500 text-sm">Real-time control center for Star Zone Salon.</p>
                </div>
                <div className="flex space-x-4">
                    <Link to="/admin/settings" className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold hover:bg-white/10 transition-all uppercase tracking-widest">System Check</Link>
                    <button className="admin-btn-gold">Refresh Data</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="admin-card group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-gold/5 rounded-full blur-3xl`} />
                        <div className="flex items-center space-x-4 relative z-10">
                            <div className="p-3 bg-white/5 rounded-xl text-xl">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">{stat.label}</p>
                                <h3 className="text-3xl font-heading mt-1">{stat.value}</h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Rest of dashboard items... */}
        </div>
    );
};

export default Dashboard;
