import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import { Clock3, Play, Trash2, Music, Edit2, Delete } from "lucide-react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayPlaylist = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { removePlaylist, fetchSinglePlaylist, updatePlaylistName, removeSong } = useContext(PlaylistContext);
    const { toggleMaximize, playPlaylist, track } = useContext(PlayerContext); // To play songs from the list

    const [playlistData, setPlaylistData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const result = await fetchSinglePlaylist(id);
            if (result.success) {
                setPlaylistData(result.data);
            } else {
                setPlaylistData(null);
            }
            setLoading(false);
        }
        loadData();
    }, [id, fetchSinglePlaylist]);

    const handleDelete = async (id) => {
        const success = await removePlaylist(id);
        if (success) {
            navigate('/');
        }
    }

    const handleRename = async () => {
        const newName = prompt("Enter new playlist name:", playlistData.name);
        if (newName && newName !== playlistData.name) {
            const result = await updatePlaylistName(id, newName);
            if (result.success) {
                setPlaylistData(prev => ({ ...prev, name: newName }));
            }
        }
    };
    const handleRemoveSongFromPlaylist = async (playlistId, songId) => {
        const result = await removeSong(playlistId, songId);
        if (result.success) {
            alert("Song removed from playlist!")

        } else {
            alert("Error : " + result.message);
        }
    }

    if (loading) return <div className="text-white p-8 animate-pulse">Loading playlist...</div>;

    if (!playlistData) return (
        <div className="text-white p-8 text-center">
            <h2 className="text-2xl font-bold">Playlist not found</h2>
            <button onClick={() => navigate('/')} className="mt-4 text-green-500">Return Home</button>
        </div>
    );

    return (
        <div className="flex-1 h-full text-white">
            {/* Header Section */}
            <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8 px-6">
                {/* Fallback for playlist image using first letter */}
                <div className="w-48 h-48 bg-gradient-to-br from-gray-700 to-black shadow-2xl flex items-center justify-center text-6xl font-bold rounded-lg border border-white/10">
                    {playlistData.name[0].toUpperCase()}
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-sm font-bold uppercase tracking-wider">Playlist</p>
                    <h1 className="text-5xl lg:text-8xl font-black mb-4">{playlistData.name}</h1>
                    <button
                        onClick={handleRename}
                        className="opacity-100 group-hover:opacity-100 p-2 hover:bg-white/10 rounded-full transition-all"
                        title="Rename Playlist"
                    >
                        <Edit2 className="w-6 h-6 text-gray-400" />
                    </button>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold hover:underline cursor-pointer">
                            {playlistData.ownerName || "User"}
                        </span>
                        <span className="text-gray-400">• {playlistData.songs?.length || 0} songs</span>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-6 p-6 mt-4">
                <button
                   onClick={() => playPlaylist(playlistData.songs, 0)} // Play the playlist from the first song
                    className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg group"
                >
                    <Play className="fill-black text-black w-6 h-6 ml-1" />
                </button>

                <button
                    onClick={() => {
                        handleDelete(playlistData.id);
                        navigate('/'); // Go home after deleting
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete Playlist"
                >
                    <Trash2 className="w-7 h-7" />
                </button>
            </div>

            {/* Song Table */}
            <div className="px-6 pb-20">
                {/* Table Header */}
                <div className="grid grid-cols-[16px_4fr_3fr_1fr_1fr] gap-4 px-4 py-2 border-b border-white/10 text-gray-400 text-sm mb-4 uppercase tracking-widest font-semibold">
                    <p>#</p>
                    <p>Title</p>
                    <p>Album</p>
                    <div className="flex justify-end"><Clock3 className="w-4 h-4" /></div>
                    {/* <div title="delete song" className="flex justify-end"><Delete  className="w-4 h-4" />   </div> */}
                </div>

                {/* Song List */}
                {playlistData.songs && playlistData.songs.length > 0 ? (
                    playlistData.songs.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => {playPlaylist(playlistData.songs, index);
                                toggleMaximize();
                            }}
                            className="grid grid-cols-[16px_4fr_3fr_1fr_1fr] gap-4 px-4 py-2 rounded-md hover:bg-white/10 group transition-colors cursor-pointer items-center"
                        >
                            <p className={`${track?.id === item.id ? "text-green-500" : "text-gray-400"}`}>{index + 1}</p>
                            <div className="flex items-center gap-4">
                                {item.image ? (
                                    <img src={item.imageUrl || item.image} alt={item.title} className="w-10 h-10 object-cover rounded shadow" />
                                ) : (
                                    <div className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded">
                                        <Music className="w-5 h-5 text-gray-500" />
                                    </div>
                                )}
                                <div className="truncate">
                                    <p className={`font-medium truncate ${track?.id == item.id ? "text-green-500" : "text-white"}`}>{item.name}</p>
                                    <p className="text-sm text-gray-400 group-hover:text-white truncate">{item.artist}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm truncate">{item.album || "Single"}</p>
                            <p className="text-gray-400 text-sm text-end">{item.duration || "3:45"}</p>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Stops the click from bubbling to the row
                                    handleRemoveSongFromPlaylist(playlistData.id, item.id);
                                }}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                title="Delete Song"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <Music className="w-16 h-16 mb-4" />
                        <p className="text-lg">This playlist is currently empty.</p>
                        <button onClick={() => navigate('/search')} className="mt-2 text-green-500 hover:underline">Find songs to add</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisplayPlaylist;