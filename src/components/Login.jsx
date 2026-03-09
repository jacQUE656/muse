import { useState } from "react";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success("Welcome Back...");
        navigate('/home');
      } else if (result.needsVerification) {
        toast.error("Please verify your email before logging in.");
        navigate('/verify-email', { state: { email: email } });
      } else {
        setError(result.message);
      }
    } catch (err) {
      toast.error(err.message || 'An unexpected error occurred');
      setError('Server error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center px-4 py-12">
      
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-300">
        {/* HEADER */}
        <div className="text-center">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="flex items-center justify-center transition-transform hover:scale-110">
              {/* Responsive logo size */}
              <img src={assets.logo2} alt="Musify_logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              <h1 className="ml-3 text-3xl md:text-4xl font-black text-white tracking-tighter italic">
                Musify
              </h1>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Welcome back
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Sign in to continue listening
          </p>
        </div>

        {/* LOGIN FORM */}
       
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-2xl border border-white/10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-400 text-xs md:text-sm text-center">
                {error}
              </div>
            )}
            
            {/* EMAIL FIELD */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Email Address
              </label>
              <input 
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-3.5 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD FIELD */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Password
              </label>
              <input 
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full px-4 py-3.5 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div className="text-right mt-2">
                <Link
                  to="/reset-password"
                  className="text-xs text-green-400 hover:text-green-300 transition-colors font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              disabled={loading}
              className="w-full flex justify-center items-center py-4 px-4 rounded-xl shadow-lg text-sm font-bold text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform active:scale-95"
            >
              {loading ? (
                <div className="flex items-center">
               
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2"></div>
                  Processing...
                </div>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>

          {/* SWITCH TO REGISTER */}
          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <button 
                className="text-green-400 hover:text-green-300 font-bold transition-colors cursor-pointer"
                onClick={onSwitchToRegister}
              >
                <Link to="/register">Sign Up</Link>
              </button>
            </p>
          </div>
        </div>

        {/* FOOTER TEXT */}
        <p className="text-center text-gray-500 text-[10px] uppercase tracking-[0.2em]">
          &copy; 2026 Musify AI. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;