import React, { useEffect, useState } from "react";
import SideBar from "./sidebar/SideBar";
import { IoIosCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UseContext } from "../../context/ContextApi";
import Header from "../Header/Header";

const Leave = () => {
  let count = 1
  const { user } = UseContext();
  const navigateTo = useNavigate();
  const {id} = useParams()


  const [show, setShow] = useState(false);
  const [leavedata, setLeaveData] = useState([])

  const [userId] = useState(user._id)
  const [leaveType, setLevaeType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [reason, setReason] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/leave/add-leave",
        {userId, leaveType, startDate, endDate, reason },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.success);
      navigateTo(0, { replace: true });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    
    const fetchLeaveData = async () => {
      try {
        
        const {data} = await axios.get(`/api/leave/get-user-leaves/${id}`,{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials: true
        })
        console.log(data)
        setLeaveData(data.leaves)
       
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "Server Error");
      }
    }
    fetchLeaveData()
  },[])

  return (
    <div className="flex w-[100%] h-[100vh]">
      <div>
        <SideBar />
      </div>
      <div className="w-full flex flex-col gap-[50px] py-[50px] h-[100vh]">
        <div className="w-[100%] text-white absolute top-0 right-0 ">
          <Header />
        </div>
        <div className="flex w-[100%] h-auto justify-between items-center px-5 mt-[50px] ">
          <div>
          </div>
          <button
            onClick={() => setShow(true)}
            className="flex items-center gap-[5px] uppercase  py-1 px-2 rounded-lg bg-[#1A202E] text-white hover:border"
          >
            add new leave <span className="text-[20px] mb-1">+</span>
          </button>
        </div>
        {show ? (
          <div className="bg absolute w-[100%] h-[100vh] top-0 left-0 flex items-center justify-center text-white">
            <div className=" relative px-2 py-10 min-w-[400px] bg-[#1A202E] rounded-xl shadow-2xl flex flex-col gap-[20px] items-center justify-evenly">
              <div
                onClick={() => setShow(false)}
                className=" absolute top-3 right-3 text-[30px] cursor-pointer"
              >
                <IoIosCloseCircleOutline />
              </div>
              <h1 className="text-[25px] font-bold mb-[20px]">
                Request for Type
              </h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[30px] w-[300px]"
              >
                <div>
                  <select
                    name="gender"
                    className="w-full py-2 bg-transparent border-b-2 outline-none"
                    value={leaveType}
                    onChange={(e) => setLevaeType(e.target.value)}
                  >
                    <option className="bg-black" value={""}>
                      Leave Type
                    </option>
                    <option className="bg-black" value={"Sick Leave"}>
                      Sick Leave
                    </option>
                    <option className="bg-black" value={"Casual Leave"}>
                      Casual Leave
                    </option>
                    <option className="bg-black" value={"Annual Leave"}>
                      Annual Leave
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date">From to</label>
                  <input
                    type="date"
                    placeholder="start date"
                    name="date"
                    className="w-full py-2 bg-transparent border-b-2 px-2 outline-none"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="date">End to</label>
                  <input
                    type="date"
                    placeholder="Allowance"
                    name="date"
                    className="w-full py-2 bg-transparent border-b-2 px-2 outline-none"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col mt-[0px] text-white">
                  <label htmlFor="des">Description</label>
                  <textarea
                    name="des"
                    placeholder="Descripation"
                    className="mt-2 px-2 py-2 outline-none bg-transparent border-b-2"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-[40px]">
                  <button
                    type="submit"
                    className="w-full text-white hover:border bg-[#151A25] py-2 rounded-full"
                  >
                    ADD
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
         <div className="lg:ml-[50px] lg:mr-[50px] text-white">
          <table>
            <tr>
              <th>Sr.No</th>
              <th>Type Of Leaves</th>
              <th>startDate</th>
              <th>endDate</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
            {leavedata.map((data, i) => (
              <tr key={i}>
                <td>{count++}</td>
                <td>{data.leaveType}</td>
                <td>{new Date (data.startDate).toLocaleDateString()}</td>
                <th className=" border-none">{new Date (data.endDate).toLocaleDateString()}</th>
                <th className=" border-none">{data.reason}</th>
                <th className="border-none">{data.status}</th>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leave;
