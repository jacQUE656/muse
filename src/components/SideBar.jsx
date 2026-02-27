import { ArrowRight, Home, Library, Plus, Search, X } from "lucide-react";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";


const SideBar = () => {
    const navigate = useNavigate();
    const [showSearchInput, setShowSearchInput] = useState(false);

    const { searchQuery, setSearchQuery, setIsSearchActive , clearSearch} = useSearch();
    const handleSearchClick = () => {

        setIsSearchActive(true);
        setShowSearchInput(true);
        navigate("/search");
    }
    const handleClearSearch = ()=>{
        setShowSearchInput(false);
        clearSearch();
    }
    return (
        <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
            <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 pl-8 cursor-pointer hover:text-green-400 transition-colors">
                    <Home className="w-6 h-6" />
                    <p className="font-bold">
                        Home
                    </p>
                </div>

                {/*SEARCH BOX */}
                <div className="px-4 py-2">
                    {!showSearchInput ? (
                        <div
                            onClick={handleSearchClick}
                            className="flex items-center gap-3 pl-4 hover:text-green-400 transition-colors">
                            <Search className="w-6 h-6" />
                            <p className="font-bold">Search</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 pl-4">
                            <Search className="w-6 h-6 text-gray-400" />
                            {/*SEARCH BOX */}
                            <input
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                type="text"
                                placeholder="What do you want to listen to?"
                                className="flex-1 bg-[#2a2a2a] text-white placeholder-gray-400 px-3 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400 "
                                autoFocus
                            />
                            <button
                                onClick={handleClearSearch}
                                className="p-1 hover:bg-gray-700 rounded-full transition-colors">
                                <X className="w-4 h-4 text-gray-400 hover:text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-[#121212] h-[85%] rounded">
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Library className="w-8 h-8" />
                        <p className="font-semibold">Your Library</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <ArrowRight className="w-5 h-5 cursor-pointer hover:text-green-400 transition-colors" />
                        <Plus className="w-5 h-5 cursor-pointer hover:text-green-400 transition-colors" />
                    </div>
                </div>
                <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
                    <h1>Create your first palylist</h1>
                    <p className="font-light">It's easy we will help you</p>
                    <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
                        Create playlist
                    </button>
                </div>
                <div className=" cursor-pointer p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start mt-4-1 pl-4">

                    <h1>Let's find some podcasts to follow</h1>
                    <p className="cursor-pointer font-light">We will keep you updated on new episodes</p>
                    <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
                        Browse podcasts
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBar;