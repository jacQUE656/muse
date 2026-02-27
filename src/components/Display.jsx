import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Search from "./Search";
import NavBar from "./NavBar";
import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const location = useLocation();
  const isAlbum = location.pathname.includes("album"); {/* CHECK IF WE ARE IN ALBUM PAGE*/ }
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const displayRef = useRef(); 
  const bgColour = isAlbum ? (albumsData?.find(x => x.id == albumId)?.bgColor || '#121212') : ('#121212');
  useEffect(() => {

    if (isAlbum) {
    displayRef.current.style.background = `linear-gradient(${bgColour}, #121212)`;
    } else{
      displayRef.current.style.background = '#121212';
    }
  }, [isAlbum , bgColour])
  return (
    <div ref={displayRef} className="w-[100%] m-2 bg-[#121212] text-white lg:w-[75%] lg:ml-0 flex flex-col">
      {/* STICK NAV BAR */}
      <div  className="sticky top-0 z-10 bg-[#121212]/95 backdrop-blur-sm border-b border-gray-800/60 px-6 pt-4 pb-2">
        <NavBar />  
      </div> 
         {/* Scrollable content */}
        <div className="flex-1 px-6 pb-4 overflow-auto">

          <Routes>
            <Route path="/" element={<DisplayHome />} />
            <Route path="/albums/:id" element={<DisplayAlbum album={albumsData?.find(x => x.id == albumId)} />} />
            <Route path="/search" element={<Search />} />

          </Routes>
        </div>
    </div>
  )
}
export default Display;