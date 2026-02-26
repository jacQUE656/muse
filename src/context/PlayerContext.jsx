import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL, useAuth } from "./AuthContext";
import AxiosInstance from "./AxiosInstance.jsx";

export const PlayerContext = createContext();




export const PlayerContextProvider = ({ children }) => {

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const { user, token } = useAuth();

    const getSongsData = async () => {
        try {
            const {status , data} = await AxiosInstance.get("/api/songs");

            if (status === 200) {
                console.log(data.songs)
                setSongsData(data.songs)
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
            const {status , data} = await AxiosInstance.get("/api/albums");
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
        albumsData
    }
    useEffect(() => {
        if (user && token) {
            getAlbumsData();
            getSongsData();
        }

    }, [user, token]);
  
    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>

    )

}