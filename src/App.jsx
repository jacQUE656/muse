import { Toaster } from "react-hot-toast";
import Display from "./components/Display.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import SideBar from "./components/SideBar.jsx";
import Player from "./components/Player.jsx";
import { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext.jsx";
import MaximizePlayerOverlay from "./components/MaximizePlayerOverlay.jsx";

const App = () => {

  const {audioRef , track ,isMaximized, toggleMaximize} = useContext(PlayerContext);
  return (

    <>
      <Toaster />
     // <AuthWrapper>
        {isMaximized && <MaximizePlayerOverlay/>}
        <div className="h-screen bg-black">
          <div className="h-[90%] flex">
            <SideBar/>
            <Display />
            
          </div>
          {/* PLAYER COMPONENT */}
          <Player/>
          <audio
          ref={audioRef}
          src={track ? track.file : null}
          preload="auto"
          ></audio>
        </div>
      </AuthWrapper>
    </>

 
  )
}
export default App;