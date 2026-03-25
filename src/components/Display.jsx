import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Search from "./Search";
import NavBar from "./NavBar";
import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";
import DisplayPlaylist from "./DisplayPlaylist";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const location = useLocation();
  
  const isAlbum = location.pathname.includes("album");
  const albumId = location.pathname.split("/").pop();
  const displayRef = useRef(null);
  
  const bgColour = isAlbum 
    ? (albumsData?.find((x) => x.id == albumId)?.bgColor || "#121212") 
    : "#121212";

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum 
        ? `linear-gradient(${bgColour}, #121212 80%)` 
        : "#121212";
    }
  }, [isAlbum, bgColour]);

  return (
    /* REMOVED: lg:w-[75%] and h-screen 
       ADDED: h-full and removed fixed width to let App.jsx aside/main handle it */
    <div 
      ref={displayRef} 
      className="w-full h-full overflow-hidden flex flex-col bg-[#121212]"
    >
      {/* Sticky NavBar */}
      <div className="sticky top-0 z-20 w-full bg-[#121212]/80 backdrop-blur-md border-b border-white/5">
        <div className="px-4 py-3 md:px-6">
          <NavBar />
        </div>
      </div>

      {/* Main Content: Scrollable */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="p-4 md:p-6 lg:p-8">
          <Routes>
            {/* Note: Paths here are relative to the parent /home/* route */}
            <Route path="/home" element={<DisplayHome />} />
            <Route path="/albums/:id" element={<DisplayAlbum album={albumsData?.find(x => x.id == albumId)} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/playlist/:id" element={<DisplayPlaylist />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Display;