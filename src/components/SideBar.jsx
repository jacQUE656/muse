import { ArrowRight, Home, Library, Plus, Search, Trash2, X } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { PlaylistContext } from "../context/PlaylistContext";

const SideBar = () => {
    const navigate = useNavigate();
    const [showSearchInput, setShowSearchInput] = useState(false);
    const { searchQuery, setSearchQuery, setIsSearchActive, clearSearch } = useSearch();
    const { playlists, createPlaylist, loading, removePlaylist } = useContext(PlaylistContext);

    const handleSearchClick = () => {
        setIsSearchActive(true);
        setShowSearchInput(true);
        navigate("/search");
    };

    const handleClearSearch = () => {
        setShowSearchInput(false);
        clearSearch();
    };

    const handleCreatePlaylist = async () => {
        const pName = prompt("Enter playlist name:");
        if (!pName) return;
        const pDesc = prompt("Enter playlist description:");
        await createPlaylist(pName, pDesc || "My MUSE Collection");
    };

    return (
        /* The width is now controlled by the parent 'aside' in App.jsx */
        <div className="h-full flex flex-col gap-2 text-white">
            
            {/* 1. TOP NAV (Fixed) */}
            <div className="bg-[#121212] rounded-xl flex flex-col py-3 px-3 gap-1">
                <div
                    onClick={() => navigate('/home')}
                    className="flex items-center gap-4 px-3 py-3 cursor-pointer hover:bg-white/5 rounded-lg transition-all group"
                >
                    <Home className="w-6 h-6 text-gray-400 group-hover:text-green-500" />
                    <p className="font-bold text-sm lg:block hidden">Home</p>
                </div>

                <div className="px-1">
                    {!showSearchInput ? (
                        <div
                            onClick={{navigate: () => navigate('/search')
                                , handleSearchClick
                            }}
                            className="flex items-center gap-4 px-2 py-3 hover:bg-white/5 rounded-lg transition-all cursor-pointer group"
                        >
                            <Search className="w-6 h-6 text-gray-400 group-hover:text-green-500" />
                            <p className="font-bold text-sm lg:block hidden">Search</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 p-1 bg-[#2a2a2a] rounded-full px-3 animate-in fade-in zoom-in duration-200">
                            <Search className="w-4 h-4 text-gray-400 shrink-0" />
                            <input
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-transparent text-white text-xs py-1 focus:outline-none"
                                autoFocus
                            />
                            <button onClick={handleClearSearch}>
                                <X className="w-4 h-4 text-gray-400 hover:text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* 2. LIBRARY SECTION (Scrollable) */}
            <div className="bg-[#121212] flex-1 rounded-xl flex flex-col overflow-hidden">
                <div className="p-5 flex items-center justify-between">
                    <div 
                        onClick={() => navigate('/library')} 
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <Library className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                        <p className="font-bold text-gray-400 group-hover:text-white hidden lg:block">Library</p>
                    </div>
                    <Plus
                        onClick={handleCreatePlaylist}
                        className="w-5 h-5 text-gray-400 cursor-pointer hover:text-green-500 transition-colors lg:block hidden" 
                    />
                </div>

                {/* PLAYLIST LIST */}
                <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
                    {playlists.length > 0 ? (
                        playlists.map((playlist) => (
                            <div 
                                key={playlist.id} 
                                onClick={() => navigate(`/playlist/${playlist.id}`)}
                                className="group flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-lg p-2 mb-1 transition-all"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-11 h-11 bg-gradient-to-br from-neutral-700 to-neutral-900 shrink-0 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                                        {playlist.name[0]?.toUpperCase()}
                                    </div>
                                    <div className="hidden lg:block overflow-hidden">
                                        <p className="font-bold truncate text-sm text-white">{playlist.name}</p>
                                        <p className="text-[10px] text-gray-500 uppercase font-black">Playlist</p>
                                    </div>
                                </div>
                                
                                <button
                                    className="hidden lg:block opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-red-500 transition-all"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if(confirm("Delete playlist?")) removePlaylist(playlist.id);
                                    }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 bg-white/5 rounded-xl m-2 hidden lg:block">
                            <p className="text-sm font-bold">Start your collection</p>
                            <button
                                onClick={handleCreatePlaylist}
                                className="mt-3 px-4 py-1.5 bg-white text-black text-xs font-black rounded-full hover:scale-105 transition-all"
                            >
                                Create Playlist
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;