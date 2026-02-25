import { Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Search from "./Search";

const Display = () => {
  return (
    <div className="flex-1 px-6 pb-4 overflow-auto">
      
      <Routes>
          <Route path="/" element ={<DisplayHome />} />
          <Route path="/album" element ={<DisplayAlbum />} />
          <Route path="/search" element ={<Search />} />

      </Routes>
    </div>
  )
}
export default Display;