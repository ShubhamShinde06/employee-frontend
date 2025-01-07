import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import { FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import Header from "../Header/Header";
import { RiLuggageDepositLine } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";

const AdminCom = () => {

  const [data, setDate] = useState({})
  const [leave, setLeave] = useState({})

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        
          const summary = await axios.get('/api/dashboard/data',{
            headers:{
              "Content-Type":"application/json"
            },
            withCredentials: true
          })
          //console.log(summary.data)
          setDate(summary.data)
          setLeave(summary.data.leaveSummary)
      } catch (error) {
        console.log(error)
        toast.error(error)
      }
    }
    fetchSummary()
  },[]) 


  return (
    <>
    <div className="flex w-[100%] h-[100vh]">
      <div>
        <SideBar 
          Dashboard={"Dashboard"}
          Department={"Department"}
          Leave={"Leave Type"}
          Employee={"Employee"}
          Salary={"Salary"}
          Leave_Requests={"Leave Requests"}
          Report={"Report"}
        />
      </div>
      <div className="w-full h-[100vh] overflow-scroll lg:overflow-hidden  text-white">
        <Header/>
        <div className="lg:flex gap-[20px] item center px-[50px] py-[50px]">
          <div className="w-[100%] lg:w-[70%] h-auto lg:grid lg:grid-cols-2 grid  gap-[30px] pt-[50px] lg:pb-0 pb-[50px] relative">
            <h1 className=" absolute top-0 uppercase text-[25px]">dashboard overview</h1>
            <div className="h-[330px] border flex flex-col items-center justify-center gap-[20px] rounded-md">
              <div>
                <FaUsers className="text-[60px]"/>
              </div>
              <div>
                <h1 className="text-[20px] font-bold">Total Employee</h1>
              </div>
              <div>
                <h1 className="text-[70px] cursor-pointer">{data.totalEmp}</h1>
              </div>
            </div>

            <div className="h-[330px] border flex flex-col items-center justify-center gap-[20px] rounded-md">
              <div>
                <RiLuggageDepositLine className="text-[60px]"/>
              </div>
              <div>
                <h1 className="text-[20px] font-bold">Total Department</h1>
              </div>
              <div>
                <h1 className="text-[70px] cursor-pointer">{data.totalDep}</h1>
              </div>
            </div>

            <div className="h-[330px] border flex flex-col items-center justify-center gap-[20px] rounded-md">
              <div>
                <GiTakeMyMoney className="text-[60px]"/>
              </div>
              <div>
                <h1 className="text-[20px] font-bold">Total Salary</h1>
              </div>
              <div>
                <h1 className="text-[70px] cursor-pointer">{data.totalSalaries}</h1>
              </div>
            </div>
          </div>
          <div className="lg:w-[30%] h-auto flex flex-col gap-[20px] pt-[50px] relative ">
            <h1 className=" absolute top-0 uppercase text-[25px]">Leave Details</h1>
            <div className="w-full border h-[80px] px-4 flex justify-between items-center rounded-md">
              <div className="flex items-center justify-center gap-[20px]">
                <IoDocumentsOutline className="text-[30px]"/>
                <div>
                < h1 className="text-[20px]">Leave Applied</h1>
                </div>
              </div>
              <div>
                <h1 className="text-[25px]">{leave.appliedFro}</h1>
              </div>
            </div>

            <div className="w-full border h-[80px] px-4 flex justify-between items-center rounded-md">
              <div className="flex items-center justify-center gap-[20px]">
                <GiSandsOfTime className="text-[30px]"/>
                <div>
                < h1 className="text-[20px]">Leave Pendding</h1>
                </div>
              </div>
              <div>
                <h1 className="text-[25px]">{leave.pending}</h1>
              </div>
            </div>

            <div className="w-full border h-[80px] px-4 flex justify-between items-center rounded-md">
              <div className="flex items-center justify-center gap-[20px]">
                <IoCheckmarkDone className="text-[30px]"/>
                <div>
                < h1 className="text-[20px]">Leave Approved</h1>
                </div>
              </div>
              <div>
                <h1 className="text-[25px]">{leave.approved}</h1>
              </div>
            </div>

            <div className="w-full border h-[80px] px-4 flex justify-between items-center rounded-md">
              <div className="flex items-center justify-center gap-[20px]">
                <FaTimes className="text-[30px]"/>
                <div>
                < h1 className="text-[20px]">Leave Rejected</h1>
                </div>
              </div>
              <div>
                <h1 className="text-[25px]">{leave.rejected}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminCom;
