import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/Home"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import Navbar from "./components/shared/Navbar"
import JobDescription from "./components/JobDescription"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setUser } from "./redux/authSlice"
import axios from "axios"
import { USER_API_END_POINT } from "./utils/constant"


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },

  {
    path:'/login',
    element:<Login/>
  },

  {
    path:'/signup',
    element:<Signup/>
  },

  {
    path:'/jobs',
    element:<Jobs/>
  },

  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  
  {
    path:'/browse',
    element:<Browse/>
  },

  {
    path:'/profile',
    element:<Profile/>
  },
  
  
  





])

function App() {
  const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/getCurrentUser`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setUser(res.data.data.user)); // Set user in Redux
                }
            } catch (error) {
                console.log("User not authenticated:", error.response?.data?.message);
            }
        };

        fetchUser();
    }, [dispatch]);


  return (
    <>
      <RouterProvider router={appRouter}/>
      
    </>
    
    
  )
}

export default App
