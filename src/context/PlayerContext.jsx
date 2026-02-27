import axios from "axios";
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

    const pause = () => { 
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const play = () => { 
        audioRef.current.play();
        setPlayStatus(true);
    }

    const playWithId = async (id) => {
        songsData.map(item =>{
            if (id === item.id) {
                setTrack(item);
            }
        });

        await audioRef.current.play();
        setPlayStatus(true);
     }

    const previous = async () => {
        songsData.map(async (item , index)=>{
            if (track.id === item.id && index > 0) {
                 setTrack(songsData[index - 1]);
                play();
            }
        });
     }

    const next = async () => { 
           songsData.map(async (item , index)=>{
            if (track.id === item.id && index < songsData.length -1) {
                  setTrack(songsData[index + 1]);
                 play();
            }
        });
    }

    const seekSong = async (e) => { 
        audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    }



    const getSongsData = async () => {
        try {
            const { status, data } = await AxiosInstance.get("/api/songs");

            if (status === 200) {
                console.log(data.songs)
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
                console.log(albums);
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
        seekSong
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





    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>

    )

}