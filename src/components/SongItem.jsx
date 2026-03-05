import { useContext } from "react";

import { PlayerContext } from "../context/PlayerContext";


const SongItem = ({name , image , description , id}) => {
    const { playWithId } = useContext(PlayerContext);

  return (
    <div
    onClick={() => playWithId(id)}
    className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff25]">
          <img src={image} alt="image" className="rounded w-[150px] h-[150px]"/>
     <p className="font-bold mt-2 mb-1">{name}</p>
     <p className="font-slate-200 text-sm">{description}</p>
    </div>
  )
}

export default SongItem;