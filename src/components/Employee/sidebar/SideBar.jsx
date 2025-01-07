import React, { useState } from "react";
import { UseContext } from "../../../context/ContextApi";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { RiMenu2Line } from "react-icons/ri";

const SideBar = () => {
  const { user, setIsAuth, setSidebar, sidebar } = UseContext();

  const navigateTo = useNavigate();

  const handlelogout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout", {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuth(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsAuth(true);
    }
  };

  const toggle = () => {
    setSidebar(!sidebar);
  };

  return (
    <div>
      {!sidebar ? (
        <div className="lg:w-[18vw] w-[50%]  absolute h-[100vh] bg-[#1A202E] text-white px-3 shadow-2xl shadow-[#4a4a4ad0] ">
          <div className="w-full h-[60px] flex justify-center items-center relative">
            <h1 className="text-[30px]">EMS</h1>
          </div>
          <div className="w-[100%] h-[150px] flex flex-col justify-center items-center gap-[10px] mt-5">
            <div className="w-[80px] h-[80px] border rounded-xl overflow-hidden">
              <img src={user?.profileImage} alt="" />
            </div>
            <h1>{user.username}</h1>
          </div>
          <div>
            <h1 className="text-[15px] font-bold uppercase">Main</h1>
            <div className="flex flex-col gap-[20px] mt-[20px] px-2">
              {/* <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "h-[40px] text-[#5783C7] bg-[#151A25] cursor-pointer flex items-center justify-between px-1 pl-2 main-box rounded-lg"
                    : "h-[40px] hover:bg-[#151A25] cursor-pointer flex items-center justify-between px-1 pl-2 main-box rounded-lg bg-transparent"
                }`
              }
            >
              <div className="flex justify-center items-center">
                <div className="flex items-center gap-[5px]">
                  <div className="text-[22px] hover-icon-color"></div>
                  <div>Dashboard</div>
                </div>
              </div>
            </NavLink> */}
              <NavLink
                to={`/myprofile/${user._id}`}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "h-[40px] text-[#5783C7] bg-[#151A25] cursor-pointer flex items-center justify-between px-1 pl-2 main-box rounded-lg"
                      : "h-[40px] hover:bg-[#151A25] cursor-pointer flex items-center justify-between px-1 pl-2 main-box rounded-lg"
                  }`
                }
              >
                <div className="flex justify-center items-center">
                  <div className="flex items-center gap-[5px]">
                    <div className="text-[22px] hover-icon-color"></div>
                    <div>My Profile</div>
                  </div>
                </div>
              </NavLink>
              <NavLink
                to={`/leave/${user._id}`}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "h-[40px] text-[#5783C7] bg-[#151A25] cursor-pointer flex items-center justify-between px-1 pl-2 main-box rounded-lg"
                      : "h-[40px] hover:bg-[#151A25] cursor-pointer flex items-center justify-between px-1 pl-2 main-box rounded-lg"
                  }`
                }
              >
                <div className="flex justify-center items-center">
                  <div className="flex items-center gap-[5px]">
                    <div className="text-[22px] hover-icon-color"></div>
                    <div>Leave</div>
                  </div>
                </div>
              </NavLink>
              <NavLink
                to={`/salary/${user._id}`}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "h-[40px] text-[#5783C7] bg-[#151A25] cursor-pointer flex items-center justify-between px-1 pl-2 main-box rounded-lg"
                      : "h-[40px] hover:bg-[#151A25] cursor-pointer flex items-center justify-between px-1 pl-2 main-box rounded-lg"
                  }`
                }
              >
                <div className="flex justify-center items-center">
                  <div className="flex items-center gap-[5px]">
                    <div className="text-[22px] hover-icon-color"></div>
                    <div>Salary</div>
                  </div>
                </div>
              </NavLink>
              <NavLink
                to={`/setting/${user._id}`}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "h-[40px] text-[#5783C7] bg-[#151A25] cursor-pointer flex items-center justify-between px-1 pl-2 main-box rounded-lg"
                      : "h-[40px] hover:bg-[#151A25] cursor-pointer flex items-center justify-between px-1 pl-2 main-box rounded-lg"
                  }`
                }
              >
                <div className="flex justify-center items-center">
                  <div className="flex items-center gap-[5px]">
                    <div className="text-[22px] hover-icon-color"></div>
                    <div>Setting</div>
                  </div>
                </div>
              </NavLink>
              <NavLink
                to={"#"}
                onClick={handlelogout}
                className={({ isActive }) =>
                  `${
                    !isActive
                      ? "h-[40px] text-[#5783C7] bg-[#151A25] cursor-pointer flex items-center justify-between px-1 pl-2 main-box rounded-lg"
                      : "h-[40px] hover:bg-[#151A25] cursor-pointer flex items-center justify-between px-1 pl-2 main-box rounded-lg"
                  }`
                }
              >
                <div className="flex justify-center items-center">
                  <div className="flex items-center gap-[5px]">
                    <div className="text-[22px] hover-icon-color"></div>
                    <div>Logout</div>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SideBar;
