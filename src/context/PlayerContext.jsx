
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


    const playPlaylist = (songs, index = 0) => {
        if (songs.length === 0) return;
        setSongsQueue(songs);
        setCurrentTrackIndex(index);
        setTrack(songs[index]);
        setPlayStatus(true);
    }

    const nextSong = () => {
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
            console.log("End of playlist");
            setPlayStatus(false);

        }
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
            setPlayStatus(true);
        }
    }

    const previous = async () => {
        if (currentTrackIndex > 0) {
            const prevIndex = currentTrackIndex - 1;
            setCurrentTrackIndex(prevIndex);
            setTrack(songsQueue[prevIndex]);
        }
    }

    const next = async () => {
        nextSong();
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
        playPlaylist

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