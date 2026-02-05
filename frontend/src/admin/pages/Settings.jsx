import { useState } from 'react';
import { Trash2, Shield, RefreshCcw, Palette } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const handleReset = () => {
        if (confirm('Are you absolutely sure you want to reset all data? This will revert all changes to factory defaults.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className="max-w-4xl space-y-12">
            <div>
                <h1 className="text-4xl font-heading font-black tracking-tight">Global Settings</h1>
                <p className="text-gray-500 text-sm mt-1">System configuration and safety controls.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SecuritySettings />
                <div className="admin-card space-y-8">
                    <div className="flex items-center space-x-4 pb-6 border-b border-white/5">
                        <div className="p-3 bg-gold/10 rounded-2xl text-gold">
                            <Palette size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-heading">Brand Appearance</h3>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Interface Theme</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                            <span className="text-sm font-medium">Primary Theme</span>
                            <div className="flex space-x-2">
                                <div className="w-6 h-6 bg-gold rounded-full border border-white/20 shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
                                <div className="w-6 h-6 bg-black rounded-full border border-white/20" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                            <span className="text-sm font-medium">Dashboard Mode</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-lg">Luxury Dark</span>
                        </div>
                    </div>
                </div>

                <div className="admin-card space-y-8 border-red-500/20 bg-red-500/5">
                    <div className="flex items-center space-x-4 pb-6 border-b border-white/5">
                        <div className="p-3 bg-red-400/10 rounded-2xl text-red-400">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-heading text-red-400">Danger Zone</h3>
                            <p className="text-[10px] text-red-400/50 uppercase tracking-widest">System Reset</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-2 space-y-4">
                            <p className="text-xs text-gray-400 leading-relaxed italic">
                                Resetting the data will wipe all custom pricing, gallery uploads, and contact info. This action cannot be undone.
                            </p>
                            <button
                                onClick={handleReset}
                                className="w-full flex items-center justify-center space-x-3 py-4 bg-red-500 text-white font-black rounded-xl hover:bg-red-600 transition-all text-xs tracking-widest uppercase shadow-lg shadow-red-500/20"
                            >
                                <RefreshCcw size={16} />
                                <span>FACTORY RESET DATA</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SecuritySettings = () => {
    const { user, changePassword, updateProfile } = useAuth();
    const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '' });
    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
    const [msg, setMsg] = useState({ type: '', text: '' });

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const res = await updateProfile(profile);
        setMsg({ type: res.success ? 'success' : 'error', text: res.message });
        setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.next !== passwords.confirm) {
            setMsg({ type: 'error', text: 'Passwords do not match.' });
            return;
        }
        const res = await changePassword(passwords.current, passwords.next);
        setMsg({ type: res.success ? 'success' : 'error', text: res.message });
        if (res.success) setPasswords({ current: '', next: '', confirm: '' });
        setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    };

    return (
        <div className="admin-card space-y-8">
            <div className="flex items-center space-x-4 pb-6 border-b border-white/5">
                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                    <Shield size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-heading">Security & Admin</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Login Credentials</p>
                </div>
            </div>

            {msg.text && (
                <div className={`p-4 rounded-xl text-xs font-bold uppercase tracking-widest border ${msg.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                    {msg.text}
                </div>
            )}

            <form onSubmit={handleProfileUpdate} className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Admin Profile</h4>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Admin Name"
                        value={profile.name}
                        onChange={e => setProfile({ ...profile, name: e.target.value })}
                        className="bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={profile.email}
                        onChange={e => setProfile({ ...profile, email: e.target.value })}
                        className="bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                    />
                </div>
                <button type="submit" className="text-[10px] font-black uppercase tracking-widest text-gold hover:text-white transition-colors">
                    Update Profile
                </button>
            </form>

            <form onSubmit={handlePasswordChange} className="space-y-4 pt-4 border-t border-white/5">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Change Password</h4>
                <div className="space-y-3">
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={passwords.current}
                        onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={passwords.next}
                            onChange={e => setPasswords({ ...passwords, next: e.target.value })}
                            className="bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={passwords.confirm}
                            onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                            className="bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                        />
                    </div>
                </div>
                <button type="submit" className="btn-gold-sm w-full py-3 text-xs">
                    UPDATE PASSWORD
                </button>
            </form>
        </div>
    );
};

export default Settings;
