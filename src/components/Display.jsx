import { Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Search from "./Search";
import NavBar from "./NavBar";

const Display = () => {
  return (
 <div className="w-[100%] m-2 bg-[#121212] text-white lg:w-[75%] lg:ml-0 flex flex-col">
  {/* STICK NAV BAR */}
    <div className="sticky top-0 z-10 bg-[#121212]/95 backdrop-blur-sm border-b border-gray-800/60 px-6 pt-4 pb-2">
    <NavBar/>
     {/* Scrollable content */}
     <div className="flex-1 px-6 pb-4 overflow-auto">
      
      <Routes>
          <Route path="/" element ={<DisplayHome />} />
          <Route path="/album" element ={<DisplayAlbum />} />
          <Route path="/search" element ={<Search />} />

      </Routes>
    </div>
   </div>
 </div>
  )
}
export default Display;