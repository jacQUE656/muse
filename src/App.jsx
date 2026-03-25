import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Contexts
import { PlayerContext } from "./context/PlayerContext.jsx";

// Components
import Display from "./components/Display.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import SideBar from "./components/SideBar.jsx";
import Player from "./components/Player.jsx";
import MaximizePlayerOverlay from "./components/MaximizePlayerOverlay.jsx";
import Library from "./components/Library.jsx";
import MobileNav from "./components/MobileNav.jsx";

// Auth Pages
import MuseLandingPage from "./components/MuseLandingPage.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import EmailVerification from "./components/EmailVerifiation.jsx";
import PasswordUpdate from "./components/PasswordUpdate.jsx";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.jsx";

const App = () => {
  const { audioRef, next, track, isMaximized } = useContext(PlayerContext);

  return (
    <>
      <Toaster />
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<MuseLandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/update-password" element={<PasswordUpdate />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

        {/* --- PROTECTED APP SHELL --- */}
        {/* The '*' at the end of 'home/*' is crucial for nested routing */}
        <Route path="/home/*" element={
          <AuthWrapper>
            {isMaximized && <MaximizePlayerOverlay />}

            <div className="h-screen bg-black flex flex-col overflow-hidden text-white">
              
              {/* TOP SECTION: Sidebar + Main Content */}
              <div className="flex flex-1 overflow-hidden">
                
                {/* 1. SIDEBAR (Desktop Only) */}
                {/* w-64 is a fixed width to prevent the 'squishing' in your screenshot */}
                <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0 h-full p-2">
                  <SideBar />
                </aside>

                {/* 2. MAIN CONTENT AREA (Swaps based on URL) */}
                <main className="flex-1 h-full overflow-y-auto bg-[#121212] md:rounded-xl md:my-2 md:mr-2 relative custom-scrollbar">
                  <Routes>
                    {/* These paths are relative to /home/ */}
                    <Route path="/" element={<Display />} />
                    <Route path="/library" element={<Library />} />
                    {/* Add a /search route here if you have a separate Search component */}
                    <Route path="*" element={<Navigate to="/home" />} />
                  </Routes>
                </main>
              </div>

              {/* BOTTOM SECTION: Player + Navigation */}
              <footer className="flex-shrink-0 bg-black border-t border-white/5 z-40">
                {/* Padding bottom on mobile so it doesn't hide behind MobileNav */}
                <div className="pb-[75px] md:pb-0">
                  <Player />
                </div>
                <MobileNav />
              </footer>

              {/* GLOBAL AUDIO ELEMENT */}
              <audio
                ref={audioRef}
                src={track ? track.file : null}
                preload="auto"
                onEnded={next}
              ></audio>
            </div>
          </AuthWrapper>
        } />

        {/* CATCH-ALL REDIRECT */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};

export default App;