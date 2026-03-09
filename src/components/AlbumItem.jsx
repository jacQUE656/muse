import { useNavigate } from "react-router-dom";

const AlbumItem = ({ image, name, description, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/albums/${id}`)}
      // Using aspect-square ensures the card maintains its shape
      // Flex-col with h-full ensures consistent alignment in the grid
      className="p-3 rounded-lg m-5 cursor-pointer hover:bg-white/10 bg-white/5 transition-all duration-300 flex flex-col h-30 group"
    >
      {/* Image Wrapper */}
      <div className="relative aspect-square mb-3 w-40">
        <img
          src={image}
          alt={name}
          className="rounded-md w-35 h-35 object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* Text Content */}
      <div className=" mt-0 flex flex-col flex-grow">
        <p className="font-bold text-white truncate text-sm md:text-base mb-1">
          {name}
        </p>
        {/* line-clamp prevents description from breaking the layout on small screens */}
        <p className="text-gray-400 text-xs md:text-sm line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AlbumItem;