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
              <div className="flex flex-1 overflow-hidden">
                {/* DESKTOP SIDEBAR: Only visible on md+ screens */}
                <div className="hidden md:block md:w-[90px] lg:w-[25%] h-full">
                  <SideBar />
                </div>

                {/* MAIN CONTENT AREA: Switches between Home/Search/Library */}
                <div className="flex-1 overflow-y-auto">
                  <Routes>
                    <Route path="/library" element={<Library />} />
                    <Route path="*" element={<Display />} /> 
                  </Routes>
                </div>
              </div>

              {/* PLAYER AREA */}
              <div className="pb-[75px] md:pb-0">
                <Player />
              </div>

              {/* MOBILE NAV: Only visible on small screens */}
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