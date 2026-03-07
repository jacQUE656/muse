
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { API_BASE_URL, useAuth } from "./AuthContext";
import AxiosInstance from "./AxiosInstance.jsx";

export const PlayerContext = createContext();




export const PlayerContextProvider = ({ children }) => {

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const { user, token } = useAuth();
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });
    const [songsQueue, setSongsQueue] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    const [isMaximized , setIsMaximized ] = useState(false);
    const toggleMaximize = ()=>setIsMaximized(!isMaximized);

   // Inside PlayerContext.jsx - playPlaylist function
const playPlaylist = (songs, index = 0) => {
    if (!songs || songs.length === 0) return;
    
    // Ensure index is within current bounds
    const safeIndex = index < songs.length ? index : 0; 
    
    setSongsQueue(songs);
    setCurrentTrackIndex(safeIndex);
    setTrack(songs[safeIndex]);
    setPlayStatus(true);
}

    const nextSong = () => {
        if (!songsQueue || songsQueue.length === 0) return;
        if (isRepeat) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            return;
        }
        if (isShuffle && songsQueue.length > 0) {
            const randomIndex = Math.floor(Math.random() * songsQueue.length);
            setCurrentTrackIndex(randomIndex);
            setTrack(songsQueue[randomIndex]);
            return;
        }
        if (currentTrackIndex < songsQueue.length - 1) {
            const nextIndex = currentTrackIndex + 1;
            setCurrentTrackIndex(nextIndex);
            setTrack(songsQueue[nextIndex]);
        } else {
            setCurrentTrackIndex(0);
            setTrack(songsQueue[0]);
            setPlayStatus(false);

        }
        setPlayStatus(true);
    }


    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const play = () => {
        if (track) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const playWithId = async (id) => {
        const foundTrack = songsData.find(item => item.id === id);
        if (foundTrack) {
            setTrack(foundTrack);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const previous = async () => {
        songsData.map(async (item, index) => {
            if (track.id === item.id && index > 0) {
                setTrack(songsData[index - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        });
    }

    const next = async () => {
        songsData.map(async (item, index) => {
            if (track.id === item.id && index < songsData.length - 1) {
                setTrack(songsData[index + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        });
    }

    const seekSong = async (e) => {
        if (audioRef.current.duration) {
            audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;

        }
    }



    const getSongsData = async () => {
        try {
            const { status, data } = await AxiosInstance.get("/api/songs");

            if (status === 200) {
                setSongsData(data.songs)
                if (data.songs.length > 0) {
                    setTrack(data.songs[0]);
                }
                return data.songs;

            }

        } catch (error) {
            console.error(error);
            setSongsData([]);
            return [];
        }

    }

    const getAlbumsData = async () => {

        try {
            const { status, data } = await AxiosInstance.get("/api/albums");
            if (status === 200) {
                const albums = data.albums;
                setAlbumsData(albums);
                return albums;

            }

        } catch (error) {
            console.error(error);
            setAlbumsData([]);
            return [];
        }
    }


 
    
    const contextValue = {
        getSongsData,
        getAlbumsData,
        songsData,
        albumsData,
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        nextSong,
        isRepeat,
        isShuffle,
        setIsRepeat,
        setIsShuffle,
        playPlaylist,
        isMaximized,
        toggleMaximize

    }
    useEffect(() => {
        if (user && token) {
            getAlbumsData();
            getSongsData();
        }

    }, [user, token])

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateSeekBar = () => {
            if (seekBar.current && audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                seekBar.current.style.width = Math.floor(progress) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audio.currentTime % 60),
                        minute: Math.floor(audio.currentTime / 60)
                    },
                    totaltime: {
                        second: Math.floor(audio.duration % 60),
                        minute: Math.floor(audio.duration / 60)
                    }
                }); //end set time  
            }//end if statement
        };
        const handleLoadedMetaData = () => {
            if (seekBar.current) {
                seekBar.current.style.width = "0% "
            }
        };
        //add enent listener 
        audio.addEventListener('timeupdate', updateSeekBar);
        audio.addEventListener('loadedmetadata', handleLoadedMetaData);

        return () => {
            audio.removeEventListener('timeupdate', updateSeekBar);
            audio.removeEventListener('loadedmetadata', handleLoadedMetaData);

        };

    }, [track])

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleEnded = () => nextSong();
            audio.addEventListener("ended", handleEnded);
            return () => audio.removeEventListener("ended", handleEnded);

        }
    }, [currentTrackIndex, songsQueue]);




    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>

    )

}