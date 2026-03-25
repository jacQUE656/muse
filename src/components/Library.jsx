import React, { useContext, useState, useRef } from 'react';
import { PlaylistContext } from '../context/PlaylistContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Music, Search, X, Trash2, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const Library = () => {
    const { playlists, createPlaylist, removePlaylist } = useContext(PlaylistContext);
    const [filterQuery, setFilterQuery] = useState("");
    const [selectedPlaylist, setSelectedPlaylist] = useState(null); // For the long-press menu
    const navigate = useNavigate();
    const timerRef = useRef(null);

    // --- LONG PRESS LOGIC ---
    const startPress = (playlist) => {
        timerRef.current = setTimeout(() => {
            setSelectedPlaylist(playlist);
            // Optional: Add a tiny vibration for haptic feedback
            if (window.navigator.vibrate) window.navigator.vibrate(50);
        }, 600); // 600ms hold triggers the menu
    };

    const endPress = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    const handleDelete = async () => {
        if (window.confirm(`Delete "${selectedPlaylist.name}"?`)) {
            await removePlaylist(selectedPlaylist.id);
            toast.success("Playlist removed");
            setSelectedPlaylist(null);
        }
    };

    const filteredPlaylists = playlists.filter(p => 
        p.name.toLowerCase().includes(filterQuery.toLowerCase())
    );

    return (
        <div className="flex-1 bg-gradient-to-b from-[#1a1a1a] to-black min-h-screen p-6 pb-40 overflow-y-auto relative">
            
            {/* ... Header and Search Bar (Same as before) ... */}

            {/* PLAYLIST GRID */}
            <div className="grid grid-cols-2 gap-4">
                {filteredPlaylists.map((playlist) => (
                    <div 
                        key={playlist.id} 
                        // Long-press handlers
                        onTouchStart={() => startPress(playlist)}
                        onTouchEnd={endPress}
                        onMouseDown={() => startPress(playlist)}
                        onMouseUp={endPress}
                        onClick={() => !selectedPlaylist && navigate(`/playlist/${playlist.id}`)}
                        className="bg-[#121212]/50 p-3 rounded-2xl border border-white/5 active:scale-95 transition-all relative"
                    >
                        <div className="aspect-square w-full bg-gradient-to-br from-neutral-800 to-black rounded-xl mb-3 flex items-center justify-center shadow-lg">
                            <Music className="text-white/20" size={32} />
                        </div>
                        <p className="text-white font-bold truncate text-sm">{playlist.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-black mt-1">Playlist</p>
                    </div>
                ))}
            </div>

            {/* --- LONG PRESS CONTEXT MENU (OVERLAY) --- */}
            {selectedPlaylist && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-10 animate-in fade-in duration-200">
                    {/* Dark Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedPlaylist(null)}
                    />
                    
                    {/* Menu Content */}
                    <div className="relative w-full max-w-sm bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-500">
                                <Music size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">{selectedPlaylist.name}</h3>
                                <p className="text-xs text-gray-500 uppercase font-black">Playlist Options</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button 
                                onClick={() => navigate(`/playlist/${selectedPlaylist.id}`)}
                                className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl text-white transition-colors"
                            >
                                <Info size={20} className="text-blue-400" />
                                <span className="font-semibold text-sm">View Details</span>
                            </button>

                            <button 
                                onClick={handleDelete}
                                className="w-full flex items-center gap-4 p-4 hover:bg-red-500/10 rounded-2xl text-red-500 transition-colors"
                            >
                                <Trash2 size={20} />
                                <span className="font-semibold text-sm">Delete Playlist</span>
                            </button>

                            <button 
                                onClick={() => setSelectedPlaylist(null)}
                                className="w-full mt-4 p-4 bg-white/5 rounded-2xl text-gray-400 font-bold text-sm uppercase tracking-widest"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Library;