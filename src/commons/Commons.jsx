import Cookies from "js-cookie";

const TOKEN = 'token';

export const saveToken = (token) =>{
    Cookies.set(TOKEN , token);
};


export const getToken = () =>{
    Cookies.get(TOKEN) || null;
};
