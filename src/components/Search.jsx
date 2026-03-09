import { Music, SearchIcon } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";

const Search = () => {
  const { searchQuery, isSearchActive, searchResults } = useSearch();
  const { songs = [], albums = [] } = searchResults;
  const totalResults = songs.length + albums.length;

  // Shared empty state layout
  const StateLayout = ({ icon: Icon, title, subtitle, animate = false }) => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className={`relative ${animate ? 'animate-bounce' : ''}`}>
        <Icon className="w-16 h-16 text-gray-600 mb-4" />
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 max-w-xs">{subtitle}</p>
    </div>
  );

  // 1. Initial State
  if (!isSearchActive) {
    return (
      <StateLayout 
        icon={SearchIcon} 
        title="Search for Music" 
        subtitle="Find your favourite songs, artists, and albums"
        animate={true} 
      />
    );
  }

  // 2. Typing State
  if (!searchQuery || searchQuery.trim() === "") {
    return (
      <StateLayout 
        icon={SearchIcon} 
        title="Start typing..." 
        subtitle="We're ready when you are." 
      />
    );
  }

  // 3. No Results State
  if (totalResults === 0) {
    return (
      <StateLayout 
        icon={SearchIcon} 
        title={`No results for "${searchQuery}"`} 
        subtitle="Check your spelling or try searching for something else." 
      />
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 pb-24 max-w-7xl space-y-10">
      
      {/* Header */}
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-2xl md:text-4xl font-black text-white mb-2">Search Results</h1>
        <p className="text-sm md:text-base text-gray-400">
          Found <span className="text-white font-medium">{totalResults}</span> result{totalResults !== 1 ? 's' : ''} for <span className="text-green-400">'{searchQuery}'</span>
        </p>
      </div>

      {/* Grid structure diagram concept */}
      

      {/* Results Sections */}
      {songs.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Music className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Songs</h2>
            <span className="text-gray-500 text-sm font-normal">({songs.length})</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {songs.map((song) => (
              <SongItem key={song.id} {...song} />
            ))}
          </div>
        </section>
      )}

      {albums.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
             <div className="p-2 bg-blue-500/10 rounded-lg">
                <Music className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Albums</h2>
            <span className="text-gray-500 text-sm font-normal">({albums.length})</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {albums.map((album) => (
              <AlbumItem 
                key={album.id} 
                {...album}
                image={album.imageUrl || album.image} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Search;