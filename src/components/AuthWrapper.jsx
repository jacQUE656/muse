import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

const AuthWrapper = ({ children }) => {

    const { isAuthenticted , loading } = useAuth();
    const [showRegister, setShowRegister] = useState(false);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animated-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4">
                        <p className="text-white text-lg">
                            Loading
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (!isAuthenticted()) {
        return showRegister ? (<Register onSwitchToLogin = {() => setShowRegister(false)}/>

        )
        
        :(<Login onSwitchToRegister = {() => setShowRegister(true)}/>
    
    );
    }
    
    return children;
}

export default AuthWrapper;