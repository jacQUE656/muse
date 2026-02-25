import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}





export const AuthProvider = ({ children }) => {
    const API_BASE_URL = "http://localhost:2011";
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);
        const storedToken = localStorage.getItem("access_token");
        const storedUser = localStorage.getItem("userData");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
         setLoading(false);


    },  []);

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
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
            if (response.status === 200) {
                setToken(response.data.token);
                setUser({ email: response.data.email, role: response.data.role });
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("refresh_token", response.data.refresh_token);
                localStorage.setItem("userData", JSON.stringify({ email: response.data.email, role: response.data.role }));

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

        } catch (error) {

            return {
                success: false,
                message: error.response.data || 'Network Failed'
            };
        }
    }

    const isAuthenticted = () => {
        return !!token && !!user;
    }

    const logout = ()=>{
        setToken(null);
        setUser(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("userData");
    }
    const contextValue = {
        register,
        login,
        isAuthenticted,
        loading,
        logout
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}