import { Toaster } from "react-hot-toast";
import Display from "./components/Display.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";

const App = () => {
  return(
 
     <>
      <Toaster/>
      <AuthWrapper>
      <Display/>
      </AuthWrapper>
     </>

    
  )
}
export default App;