import { Trash2, Shield, RefreshCcw, Palette } from 'lucide-react';

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

export default Settings;
