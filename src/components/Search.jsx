import { Music, SearchIcon } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";


const Search = () => {
  const { searchQuery, isSearchActive, searchResults } = useSearch();
  const { songs, albums } = searchResults;
  const totalResults = songs.length + albums.length;

  if(!isSearchActive){
    return(
       <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <SearchIcon className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Search for Music</h2>
        <p className="text-gray-400">Find your favourite songs and albums</p>
      </div>
    )
  }
    if(!searchQuery.trim() === ""){
    return(
       <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <SearchIcon className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Start typing to search</h2>
        <p className="text-gray-400">Search for songs, albums and more</p>
      </div>
    )
  }

  if (totalResults === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <SearchIcon className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
        <p className="text-gray-400">Tr searching for something else</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* SEARCH RESULT HEADERS */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Search Results
        </h1>
        <p className="text-gray-400">
          Found {totalResults} result {totalResults !== 1 ? 's' : ''} for '{searchQuery}'
        </p>
      </div>
      {/* Songs section*/}
      {songs.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-6 h-5 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Songs</h2>
            <span className="text-gray-400">({songs.length})</span>
          </div>
          {/* Display songs */}
          <div className="grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {songs.map((song) => (
              <SongItem
                key={song.id}
                name={song.name}
                description={song.description}
                id={song.id}
                image={song.image}
              />
            ))}
          </div>
        </div>
      )}

      {/* ALBUM SECTION */}

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Music className="w-6 h-5 text-green-400" />
          <h2 className="text-2xl font-bold text-white">Albums</h2>
          <span className="text-gray-400">({albums.length})</span>
        </div>
        {/* Display Albun */}
        <div className="grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {albums.map((album) => (
            <AlbumItem
              key={album.id}
              name={album.name}
              description={album.description}
              id={album.id}
              image={album.imagUrl}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search;