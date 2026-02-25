import { Toaster } from "react-hot-toast";
import Display from "./components/Display.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import SideBar from "./components/SideBar.jsx";

const App = () => {
  return (

    <>
      <Toaster />
      <AuthWrapper>
        <div className="h-screen bg-black">
          <div className="h-[90%] flex">
            <SideBar/>
            <Display />
          </div>
          {/* PLAYER COMPONENT */}
        </div>

      </AuthWrapper>
    </>


  )
}
export default App;