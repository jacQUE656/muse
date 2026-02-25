
import { useState } from "react";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = ({onSwitchToRegister}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const result = await login(email , password);
      if(!result.success){
        toast.error(result.message);
        setError(error.message);
      }
      toast.success(result.message);

    } catch (error) {
       setError(error.message);
       toast.error("Unexpected error occured. Please try again later .");

    } finally {
      setLoading(false);
    }


  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center p4">

      <div className="max-w-md w-full space-y-8">
        {/* HEADER */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center mb-6">
              <img src={assets.logo} alt="Musify_logo" className="w-16 h-16" />
              <h1 className="ml-3 text-3xl font-bold text-white">
                Musify
              </h1>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome back
          </h2>
          <p className="text-gray-300">
            Sign in to continue listening
          </p>
        </div>

        {/*LOGIN FORM */}
        <div className="bg-gray-900/80 backdrop-blug-lg rounded-2xl p-8 shadow-2xl border border-gray-600">
          <form className="space-y-6" onSubmit={handleSubmit}>
             {error && (
                          <div className="bg-red-500/20 border border-red rounded-lg p-3 text-red-300 text-sm">
                                {error}
                          </div>
                        )}
            {/* EMAIL FIELD*/}
            <div>

              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <input type="text"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white place-holder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"

                value={email}
                onChange={e => setEmail(e.target.value)}

              />
            </div>
            {/* PASSWORD FIELD */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                password
              </label>
              <input type="text"
                name="passsword"
                id="password"
                autoComplete="new-password"
                required
                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white place-holder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {/* SUBMIT BUTTON */}
            <button 
             disabled = {loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disables:opacity disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105">
               {loading ?(
                                <div className="flex items-center">
                                    <div className="animated-spin rounded-full h-4 w-4 border-b-2 border-white mr-2">
                                    </div>
                                    Signing in...
                                </div>
                            ):(
                                    'Sign in'
                            )}
            </button>
          </form>
          {/* SWITCH TO REGISTER */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?
              <button className="text-green-400 hover:text-green-300 font-medium transition-colors cursor-pointer"
              onClick={onSwitchToRegister}
              >
                Sign up here
              </button>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;