import { ToastContainer } from "react-toastify";
import AppRoutes from "./components/AppRoutes";
import Footer from "./components/Footer";
import HeaderNav from "./components/HeaderNav";
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useEffect, useState } from "react";
import HeaderNav2 from "./components/HeaderNav2";
export const UserContext = createContext(null);
function App() {
  const [userdata, setuserdata] = useState(null);
  const [isloggedIn,setisloggedIn] = useState(false);
  useEffect(()=>
  {
      if(sessionStorage.getItem("udata")!==null)
      {
        setuserdata(JSON.parse(sessionStorage.getItem("udata")));
        setisloggedIn(true);
      }
  },[])
  return (
    <>
      <ToastContainer theme="colored" />
      <UserContext.Provider value={{ userdata, setuserdata,isloggedIn,setisloggedIn}}>
        {isloggedIn?
        <HeaderNav2/>:<HeaderNav />
        }

        <AppRoutes />
        <Footer />
      </UserContext.Provider>
    </>
  );
}
export default App;