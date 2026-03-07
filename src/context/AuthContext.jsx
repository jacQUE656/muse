import axios from "axios";
//import {saveToken} from "../commons/Commons.jsx"
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const API_BASE_URL = "http://localhost:2011";
  export const getToken =()=>{
        return token;
    }
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}





export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(false);
     const [userId, setUserId] = useState('');
    useEffect(() => {

        setLoading(true);
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("userData");
        const storedUserId = localStorage.getItem("userId");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
            setUserId(storedUserId);
        }
         setLoading(false);


    }, []);

    const register = async (firstname, lastname, phonenumber, email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { firstname, lastname, phonenumber, email, password })

            if (response.status === 200) {
                return {
                    success: true,
                    message: 'Registraton successful'
                }

            } else {
                return {
                    success: false,
                    message: response.data.message || 'Registraton failed'
                }
            }
        } catch (error) {
            return {
                success: false,
                message: error.response.data || 'Network error try again later.'
            }

        }
    }

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password, portal: "user" });
            if (response.status === 200) {
                setToken(response.data.token);
                setUser(response.data.user);
                setUserId(response.data.user_id)
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userData",response.data.user);
                localStorage.setItem("userId",response.data.user_id);
                //saveToken(response.data.token);

                return {
                    success: true,
                    message: 'Login successful'
                };
            } else {
                return {
                    success: false,
                    message: response.data.message || 'Login failed'
                };
            }

        }catch (error) {
        // Check if the server says the user is not verified
        if (error.response?.status === 403) {
            return { 
                success: false, 
                message: "Account not verified. Please verify your email.",
                needsVerification: true 
            };
        }
        return { 
            success: false, 
            message: error.response?.data?.message || "Login failed" 
        };
    }
    }

    const isAuthenticted = () => {
        return !!token && !!user;
    }

    const logout = ()=>{
        // clear cookies
        setToken(null);
        setUser(null);
        setUserId(null)
        localStorage.removeItem('token');
        localStorage.removeItem("userData");
        localStorage.removeItem("userId");
       
    }
  
  
    const contextValue = {
        register,
        login,
        isAuthenticted,
        loading,
        logout,
        user,
        token,
        userId,
        
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}