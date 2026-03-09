import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Play } from "lucide-react";

const SongItem = ({ name, image, description, id }) => {
  const { playWithId, toggleMaximize } = useContext(PlayerContext);

  return (
    <div
      onClick={() => {
        playWithId(id);
        toggleMaximize();
      }}
      // Removed fixed min-width. Added 'group' for hover effects.
      className="p-3 m-5 rounded-lg cursor-pointer hover:bg-white/10 bg-white/5 transition-all duration-300 group flex flex-col h-50"
    >
      {/* Image Container */}
      <div className="relative aspect-square mb-3 w-50">
        <img
          src={image}
          alt={name}
          // Changed to w-full h-full with object-cover for perfect scaling
          className="rounded-md w-full h-full object-cover shadow-lg group-hover:shadow-2xl transition-shadow"
        />
        
        {/* Hover Play Button - Hidden on mobile, shows on hover for desktop */}
        <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
          <div className="bg-green-500 p-3 rounded-full shadow-xl">
            <Play className="w-5 h-5 text-black fill-black" />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col flex-grow">
        <p className="font-bold text-white truncate text-sm md:text-base mb-1">
          {name}
        </p>
        <p className="text-gray-400 text-xs md:text-sm line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SongItem;