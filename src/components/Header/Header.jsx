import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { RiMenu2Line } from "react-icons/ri";
import { UseContext } from "../../context/ContextApi";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigateTo = useNavigate()

  const {setIsAuth, setSidebar, sidebar, user} = UseContext()

  const handlelogout = async () => {
    try {
      
      const {data} = await axios.post('/api/auth/logout',{
        withCredentials: true,
      })
      toast.success(data.message)
      setIsAuth(false)
      navigateTo('/login')
      localStorage.removeItem(user)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setIsAuth(true)
    }
  }

  const toggle = () => {
    setSidebar(!sidebar)
  }

  return (
    <>
      <div className="w-[100%]  h-[80px]  bg-[#1A202E] flex items-center justify-between lg:px-4">
        <div className="text-[25px] cursor-pointer px-2 lg:px-0">
          <RiMenu2Line onClick={toggle} />
        </div>
        <div className="">
          <button onClick={handlelogout} className="lg:px-6 py-2 px-2 mr-[10px] lg:mr-0  rounded-xl  bg-[#151A25] hover:border">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
