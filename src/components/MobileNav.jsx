import { Home, Search, Library, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useSearch } from "../context/SearchContext";
import { PlaylistContext } from "../context/PlaylistContext";

const MobileNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsSearchActive } = useSearch();
    const { createPlaylist } = useContext(PlaylistContext);

    const isActive = (path) => location.pathname === path;

    const handleSearchClick = () => {
        setIsSearchActive(true);
        navigate("/search");
    };

    const handleCreatePlaylist = async () => {
        const pName = prompt("Enter playlist name:");
        if (!pName) return;
        const pDesc = prompt("Enter playlist description:");
        if (!pDesc) return;
        await createPlaylist(pName, pDesc);
    };

    const navItems = [
        { icon: Home, label: "Home", path: "/home", action: () => navigate('/home') },
        { icon: Search, label: "Search", path: "/search", action: handleSearchClick },
        { icon: Library, label: "Library", path: "/library", action: () => navigate('/library') },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/5 px-6 py-3 z-50">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {navItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <button 
                            key={item.path}
                            onClick={item.action}
                            className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${
                                active ? "text-green-500 scale-110" : "text-gray-500"
                            }`}
                        >
                            {/* NEON AURA */}
                            {active && (
                                <div className="absolute -top-1 w-8 h-8 bg-green-500/20 blur-xl rounded-full animate-pulse" />
                            )}
                            
                            <item.icon 
                                size={22} 
                                strokeWidth={active ? 2.5 : 2}
                                className={active ? "drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" : ""} 
                            />
                            <span className={`text-[10px] tracking-widest uppercase font-black ${active ? "opacity-100" : "opacity-50"}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}

                {/* CREATE PLAYLIST BUTTON */}
                <button 
                    onClick={handleCreatePlaylist}
                    className="flex flex-col items-center gap-1 text-gray-500 active:scale-90 transition-transform"
                >
                    <div className="bg-white/10 p-2 rounded-xl mb-1 hover:bg-white/20 transition-colors">
                        <Plus size={20} className="text-white" />
                    </div>
                    <span className="text-[10px] tracking-widest uppercase font-black opacity-50">Create</span>
                </button>
            </div>
        </div>
    );
};

export default MobileNav;