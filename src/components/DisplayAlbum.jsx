import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = ({ album }) => {
  const { id } = useParams();

  const { albumsData, songsData } = useContext(PlayerContext);

  return album && albumsData ? (
    <>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img src={album.imageUrl} alt="image" className="w-48 rounded" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {album.name}
          </h2>
        </div>
      </div>
    </>
  ) : null;
}

export default DisplayAlbum;