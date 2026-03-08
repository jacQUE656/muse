import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
// Ensure you add resendOtp to your ApiService exports
import { verifyManualOtp, verifyViaLink, resendOtp } from '../services/ApiService.js'; 
import toast from 'react-hot-toast';

const EmailVerification = ({ prefilledEmail = '' }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState(prefilledEmail || searchParams.get('email') || location.state?.email || '');
    const [token, setToken] = useState(searchParams.get('token') || '');
    const [status, setStatus] = useState('idle');
    
    // Countdown state
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    // Timer Logic
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(timer);
    }, [countdown]);

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

    const handleResend = async () => {
        if (!canResend) return;

        const response = await resendOtp(email);
        if (response.success) {
            toast.success("New code sent to your email!");
            setCountdown(60); // Reset timer
            setCanResend(false);
        } else {
            toast.error(response.message || "Failed to resend code.");
        }
    };

    return (
        <div className="max-w-md w-full bg-gray-900/80 p-8 rounded-2xl shadow-2xl border border-gray-600 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Verify Your Account</h2>
            
            {status === 'loading' && <p className="text-gray-300 mb-4">Verifying code...</p>}

            {status === 'success' ? (
                <div className="text-green-400 font-semibold">Verification successful! You can now sign in.</div>
            ) : (
                <div className="space-y-4">
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
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Verifying...' : 'Verify Account'}
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">Didn't receive a code?</p>
                        <button
                            onClick={handleResend}
                            disabled={!canResend}
                            className={`text-sm font-medium transition ${
                                canResend 
                                ? 'text-blue-400 hover:text-blue-300 underline' 
                                : 'text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {canResend ? "Resend Code" : `Resend available in ${countdown}s`}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailVerification;