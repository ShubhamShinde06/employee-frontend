import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CiLaptop } from "react-icons/ci";
import { RiLuggageDepositLine } from "react-icons/ri";
import { PiUsersFourLight } from "react-icons/pi";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import { UseContext } from "../../context/ContextApi";

const SideBar = ({ Dashboard, Department, Employee, Salary, Leave }) => {
  //const [change, setChange] = useState('dashboard')
  const { user, sidebar } = UseContext();

  return (
    <div>
      {!sidebar ? (
        <div className="lg:w-[18vw] w-[100%] lg:block h-[100vh] bg-[#1A202E] text-white px-3 shadow-2xl shadow-[#4a4a4ad0] ">
          <div className="w-full h-[60px] flex justify-center items-center">
            <Link to={"#"}>
              <h1 className="text-[30px]">EMS</h1>
            </Link>
          </div>
          <div className="w-[100%] h-[150px] flex flex-col justify-center items-center gap-[10px]">
            <div className="w-[80px] h-[80px] border rounded-xl overflow-hidden">
              <img src={user?.profileImage} alt="" />
            </div>
            <h1>{user?.username}</h1>
          </div>
          <div>
            <h1 className="text-[15px] font-bold uppercase">Main</h1>
            <div className="flex flex-col gap-[20px] mt-[20px] px-2">
              <NavLink
                to={"/admin"}
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
                    <div className="text-[22px] hover-icon-color">
                      <CiLaptop />
                    </div>
                    <div>{Dashboard}</div>
                  </div>
                  {/* <div className='text-[22px]'><MdOutlineKeyboardArrowRight/></div> */}
                </div>
              </NavLink>
              <NavLink
                to={"/department"}
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
                    <div className="text-[22px] hover-icon-color">
                      <RiLuggageDepositLine />
                    </div>
                    <div>{Department}</div>
                  </div>
                  {/* <div className='text-[22px]'><MdOutlineKeyboardArrowRight/></div> */}
                </div>
              </NavLink>
              <NavLink
                to={"/add-employee"}
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
                    <div className="text-[22px] hover-icon-color">
                      <PiUsersFourLight />
                    </div>
                    <div>{Employee}</div>
                  </div>
                  {/* <div className='text-[22px]'><MdOutlineKeyboardArrowRight/></div> */}
                </div>
              </NavLink>
              <NavLink
                to={"/add-salary"}
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
                    <div className="text-[22px] hover-icon-color">
                      <FaRegMoneyBillAlt />
                    </div>
                    <div>{Salary}</div>
                  </div>
                  {/* <div className='text-[22px]'><MdOutlineKeyboardArrowRight/></div> */}
                </div>
              </NavLink>
              <NavLink
                to={"/add-leave"}
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
                    <div className="text-[22px] hover-icon-color">
                      <FaRegMoneyBillAlt />
                    </div>
                    <div>{Leave}</div>
                  </div>
                  {/* <div className='text-[22px]'><MdOutlineKeyboardArrowRight/></div> */}
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
