import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate , useLocation } from 'react-router-dom';
import { verifyManualOtp, verifyViaLink } from '../services/ApiService.js';
import toast from 'react-hot-toast';

const EmailVerification = ({ prefilledEmail = '' }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize state from props or URL params
    const [email, setEmail] = useState(prefilledEmail || searchParams.get('email') || location.state?.email ||'');
    const [token, setToken] = useState(searchParams.get('token') || '');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    // Auto-verify if tokens are present in URL
    useEffect(() => {
        if (!email) {
            toast.error("Session expired. Please log in or register again.");
            navigate('/');
        }
        if (email && token) {
            handleVerification(true);
        }
    }, [email, token]);

    const handleVerification = async (isAuto = false) => {
        if (!email || !token) {
            toast.error("Email and OTP are required.");
            return;
        }

        setStatus('loading');
        
        const response = isAuto 
            ? await verifyViaLink(email, token) 
            : await verifyManualOtp(email, token);

        if (response.success) {
            setStatus('success');
            toast.success("Verified successfully! Redirecting...");
            setTimeout(() => navigate('/'), 2000);
        } else {
            setStatus('error');
            toast.error(response.message || "Verification failed.");
        }
    };

    return (
        <div className="max-w-md w-full bg-gray-900/80 p-8 rounded-2xl shadow-2xl border border-gray-600 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Verify Your Account</h2>
            
            {status === 'loading' && <p className="text-gray-300">Verifying code...</p>}

            {status === 'success' ? (
                <div className="text-green-400 font-semibold">Verification successful! You can now sign in.</div>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleVerification(false); }} className="space-y-4">
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email" 
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                        required 
                    />
                    <input 
                        type="text" 
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Enter 6-digit OTP" 
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                        required 
                    />
                    <button 
                        type="submit" 
                        disabled={status === 'loading'}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
                    >
                        {status === 'loading' ? 'Verifying...' : 'Verify Account'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default EmailVerification;