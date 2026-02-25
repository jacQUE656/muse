
import { useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";


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
                onSwitchToLogin();
            }

        } catch {
            toast.error('Server error occured...');
            setError(e.message);
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
                        Join Musify
                    </h2>
                    <p className="text-gray-300">
                        Create your account to start listening
                    </p>
                </div>

                {/*REGISTER FORM */}
                <div className="bg-gray-900/80 backdrop-blug-lg rounded-2xl p-8 shadow-2xl border border-gray-600">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {error && (
                          <div className="bg-red-500/20 border border-red rounded-lg p-3 text-red-300 text-sm">
                                {error}
                          </div>
                        )}

                        {/* FIRSTNAME FIELD*/}
                        <div>
                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-200 mb-2">
                                firstname
                            </label>
                            <input type="text"
                                name="firstname"
                                id="firstname"
                                autoComplete="firstname"
                                required
                                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white place-holder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your firstname"
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                            />
                        </div>

                        {/* LASTNAME FIELD*/}
                        <div>
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-200 mb-2">
                                lastname
                            </label>
                            <input type="text"
                                name="lastname"
                                id="lastname"
                                autoComplete="lastname"
                                required
                                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white place-holder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your lastname"
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                            />
                        </div>

                        {/* LASTNAME FIELD*/}
                        <div>
                            <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-200 mb-2">
                                phoneNumber
                            </label>
                            <input type="text"
                                name="phonenumber"
                                id="phonenumber"
                                autoComplete="phonenumber"
                                required
                                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white place-holder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your Phonenumber"
                                value={phonenumber}
                                onChange={e => setPhonenumber(e.target.value)}
                            />
                        </div>
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
                                name="password"
                                id="password"
                                autoComplete="new-password"
                                required
                                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white place-holder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                placeholder="Create a password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        {/*CONFIRM PASSWORD FIELD */}
                        <div>
                            <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-200 mb-2">
                                confirmPassword
                            </label>
                            <input type="text"
                                name="confirmpassword"
                                id="confirmpassword"
                                autoComplete="new-password"
                                required
                                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white place-holder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}

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
                                    Creating Account...
                                </div>
                            ):(
                                    'Create Account'
                            )}
                        </button>
                    </form>
                    {/* SWITCH TO LOGIN */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Already have an account?
                            <button className="text-green-400 hover:text-green-300 font-medium transition-colors cursor-pointer"
                            onClick={onSwitchToLogin}
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                    {/* TERMS AND CONDITION */}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            By creating an account, you agree to our Terms of Service and Policy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register