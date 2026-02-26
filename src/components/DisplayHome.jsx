import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import AlbumItem from "./AlbumItem.jsx";
import SongItem from "./SongItem.jsx";


const DisplayHome = () => {

  const {songsData,albumsData} = useContext(PlayerContext);

  return (
    <>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">
          Featured Charts
        </h1>
        <div className="flex overflow-auto">
          {/* Display Album Data */}
          {albumsData.map((item,index) =>(
             <AlbumItem 
            key={index}
            name={item.name}
            description = {item.description}
            id={item._id}
            image ={item.imageUrl}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">
        Today's biggest hits
        </h1>
        <div className="flex overflow-auto">
          {/* Display Songs Data */}
          {songsData.map((item , index) =>(
            <SongItem
            key={index}
            name={index.name}
            description={item.description}
            id={item._id}
            image={item.image}
            />
          ))}
        </div>
        
      </div>
    </>

  )
}

export default DisplayHome;