import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginWithToken } = useAuth();

    useEffect(() => {
        // 1. Extract params from the URL (e.g., ?token=...&user=...&userId=...)
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userData = params.get('user'); 
        const userId = params.get('userId');

        if (token && userData) {
            loginWithToken(token, userData, userId);

            // 3. Success! Send them to the dashboard
            console.log("OAuth2 Login Successful. Redirecting...");
            navigate('/home');
        } else {
            // 4. If something is missing, send them back to login
            console.error("OAuth2 Redirect failed: Missing token or user data");
            navigate('/login?error=oauth_failed');
        }
    }, [location, navigate, loginWithToken]);

    return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-purple-500 mb-4" size={48} />
        <h2 className="text-xl font-medium">Securing your session...</h2>
    </div>
    );
};

export default OAuth2RedirectHandler;