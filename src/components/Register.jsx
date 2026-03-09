
import { useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import EmailVerification from "./EmailVerifiation";
import { Link } from "react-router-dom";


const Register = ({onSwitchToLogin}) => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const [isVerifying, setIsVerifying] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!firstname || !lastname || !phonenumber || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            toast.error('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            toast.error('Passwords do not match!');
            return;
        }
        setLoading(true);
        try {
            const result = await register(firstname, lastname, phonenumber, email, password);
            if (result.success) {
                toast.success(result.message);
                setIsVerifying(true);
                //onSwitchToLogin();
            }

        } catch {
            toast.error('Server error occured...');
            setError(e.message);
        } finally {
            setLoading(false);
        }


    }


    return (
     <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center px-4 py-8 md:py-12">
  {isVerifying ? (
    <EmailVerification prefilledEmail={email} />
  ) : (
    <div className="w-full max-w-md space-y-6 md:space-y-8">
      {/* HEADER */}
      <div className="text-center">
        <div className="flex flex-col items-center justify-center mb-4 md:mb-6">
          <div className="flex items-center justify-center">
            <img src={assets.logo2} alt="Musify_logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            <h1 className="ml-3 text-2xl md:text-3xl font-bold text-white tracking-tight">
              Musify
            </h1>
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
          Join Musify
        </h2>
        <p className="text-gray-400 text-sm">
          Create your account to start listening
        </p>
      </div>

      {/* REGISTER FORM */}
      <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700/50">
        <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-xs md:text-sm text-center">
              {error}
            </div>
          )}

          {/* NAME FIELDS GRID (Stacks on mobile, side-by-side on tablet+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                First Name
              </label>
              <input 
                type="text"
                name="firstname"
                id="firstname"
                required
                className="block w-full px-4 py-2.5 md:py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                placeholder="John"
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                Last Name
              </label>
              <input 
                type="text"
                name="lastname"
                id="lastname"
                required
                className="block w-full px-4 py-2.5 md:py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                placeholder="Doe"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
              />
            </div>
          </div>

          {/* PHONE FIELD */}
          <div>
            <label htmlFor="phonenumber" className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
              Phone Number
            </label>
            <input 
              type="tel"
              name="phonenumber"
              id="phonenumber"
              required
              className="block w-full px-4 py-2.5 md:py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="+1 (555) 000-0000"
              value={phonenumber}
              onChange={e => setPhonenumber(e.target.value)}
            />
          </div>

          {/* EMAIL FIELD */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
              Email Address
            </label>
            <input 
              type="email"
              name="email"
              id="email"
              required
              className="block w-full px-4 py-2.5 md:py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD FIELDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                Password
              </label>
              <input 
                type="password"
                name="password"
                id="password"
                required
                className="block w-full px-4 py-2.5 md:py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white text-sm focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmpassword" className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                Confirm
              </label>
              <input 
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                required
                className="block w-full px-4 py-2.5 md:py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white text-sm focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            disabled={loading}
            className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-lg text-sm font-bold text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'CREATE ACCOUNT'
            )}
          </button>
        </form>

        {/* SWITCH TO LOGIN */}
        <div className="mt-6 text-center border-t border-white/5 pt-6">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <button 
            type="button"
              className="text-green-400 hover:text-green-300 font-bold transition-colors cursor-pointer"
              onClick={onSwitchToLogin}
            >
             <Link to="/login">
               Sign in
             </Link>
            </button>
          </p>
        </div>

        {/* TERMS AND CONDITION */}
        <div className="mt-4 text-center">
          <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tighter">
            By creating an account, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  )}
</div>
    );
};

export default Register