import { ChevronLeft, ChevronRight, LogOut, LogOutIcon, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
const {user , logout} = useAuth();
const navigate = useNavigate();
console.log(user);

const handleLogout=()=>{
logout();
}
  return (
    <>
    <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
           <div 
           onClick={()=>navigate(-1)}
           className="w-8 h-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-gray-800/50 transition-colors flex items-center justify-center">
           <ChevronLeft className="w-4 h-4 text-white"/>
           </div> 
            <div 
            onClick={()=>navigate(-1)}
            className="w-8 h-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-gray-800/50 transition-colors flex items-center justify-center">
           <ChevronRight className="w-4 h-4 text-white"/>
           </div>
        </div>
        <div className="flex items-center gap-4">
            <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
                Explore Premium
            </p>
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-2xl">
            <User className="w-4 h-4 text-white"/>
            <span className="text-white text-sm hidden sm:inline">
            {user?.split("@"[0])}
            </span>
            </div>
            <button 
            onClick={handleLogout}
            title="Logout"
            className="bg-red-600 hover:bg-red-700 py-1 px-3 rounded-2xl text-[15px] cursor-pointer transition-colors flex items-center gap-1">
                <LogOut className="w-4 h-4"/>
                <span className="hidden sm:inline">Logout</span>
            </button>
        </div>

    </div>
    </>
  )
}

export default NavBar;