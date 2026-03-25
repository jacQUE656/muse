import { Toaster } from "react-hot-toast";
import Display from "./components/Display.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import SideBar from "./components/SideBar.jsx";
import Player from "./components/Player.jsx";
import { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext.jsx";
import MaximizePlayerOverlay from "./components/MaximizePlayerOverlay.jsx";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword.jsx";
import EmailVerification from "./components/EmailVerifiation.jsx";
import PasswordUpdate from "./components/PasswordUpdate.jsx";
import MuseLandingPage from "./components/MuseLandingPage.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.jsx";
import Library from "./components/Library.jsx";
import MobileNav from "./components/MobileNav.jsx"; // Don't forget this!

const App = () => {
  const { audioRef, next, track, isMaximized } = useContext(PlayerContext);

  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MuseLandingPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/update-password" element={<PasswordUpdate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

        {/* Authenticated App Routes */}
     <Route path="*" element={
      
  <AuthWrapper>
    {isMaximized && <MaximizePlayerOverlay />}
    
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      
      {/* WRAPPER FOR SIDEBAR + MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT: SIDEBAR (Visible only on desktop) */}
        <aside className="hidden md:block w-[250px] lg:w-[300px] h-full p-2 bg-black">
          <SideBar />
        </aside>

        {/* RIGHT: MAIN CONTENT AREA */}
        <main className="flex-1 h-full overflow-y-auto bg-[#121212] md:rounded-lg md:m-2 custom-scrollbar">
          <Routes>
            <Route path="/home" element={<Display />} />
            <Route path="/library" element={<Library />} />
            <Route path="/search" element={<Display />} /> {/* Or Search component */}
            <Route path="*" element={<Display />} />
          </Routes>
        </main>
      </div>

      {/* BOTTOM: PLAYER */}
      <footer className="h-auto pb-[75px] md:pb-0 bg-black border-t border-white/5">
        <Player />
      </footer>

      {/* MOBILE ONLY NAVIGATION */}
      <MobileNav />

      <audio
        ref={audioRef}
        src={track ? track.file : null}
        preload="auto"
        onEnded={next}
      ></audio>
    </div>
  </AuthWrapper>
} />
      </Routes>
    </>
  );
};

export default App;