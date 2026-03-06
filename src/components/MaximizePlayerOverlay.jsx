import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Minimize2, Play, Pause, SkipBack, SkipForward, PlusCircle } from "lucide-react";
import { PlaylistContext } from "../context/PlaylistContext";
import PlaylistModal from "./PlaylistModal";

const MaximizePlayerOverlay = () => {
  const { 
    track, 
    toggleMaximize, 
    playStatus, 
    play, 
    pause, 
    next, 
    previous 
  } = useContext(PlayerContext);

  const {addSong} = useContext(PlaylistContext);
  const[showModal , setShowModal ] = useState(false);
    const handleAddToPlaylist = async (playlistId) => {
        const result = await addSong(playlistId , track.id);
        if (result.success) {
            alert("Song added to playlist!")
            setShowModal(false);
        }else{
            alert("Error : " + result.message);
        }
    }

  // Safety check: Don't render if there is no track
  if (!track) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
      
      {/* Minimize Button */}
      <button 
        onClick={toggleMaximize} 
        className="absolute top-8 left-8 text-white hover:text-gray-400 transition"
      >
        <Minimize2 size={32} />
      </button>

      {/* Album Art */}
      <img 
        src={track.image} 
        alt="Album Art" 
        className="w-80 h-80 md:w-96 md:h-96 rounded-lg shadow-2xl mb-8" 
      />

      {/* Track Info */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">{track.name}</h1>
        <p className="text-xl text-gray-400">{track.description}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8">
        <SkipBack onClick={previous} size={40} className="text-gray-400 cursor-pointer hover:text-green-500" />
        
        <div className="bg-white p-4 rounded-full cursor-pointer hover:scale-105 transition">
          {playStatus ? (
            <Pause onClick={pause} size={40} className="text-black" />
          ) : (
            <Play onClick={play} size={40} className="text-black fill-black" />
          )}
        </div>

        <SkipForward onClick={next} size={40} className="text-gray-400 cursor-pointer hover:text-green-500" />
      </div>
      <button 
      onClick={()=> setShowModal(true)}
      className="flex items-center gap-2 text-white hover:text-green-500 transition">
                <PlusCircle size={40} />
            <span>Add to playlist</span>
      </button>
      {showModal && (
        <PlaylistModal
        onClose={()=> setShowModal(false)}
        onSelect={handleAddToPlaylist}
        />
      )}
    </div>
  );
};

export default MaximizePlayerOverlay;