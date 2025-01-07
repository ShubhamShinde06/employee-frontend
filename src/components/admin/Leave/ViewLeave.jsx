import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const ViewLeave = () => {
  const { id } = useParams();
    const navigateto = useNavigate()
  const [leavedata, setLeaveData] = useState();

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const { data } = await axios.get(`/api/leave/get-single-leave/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(data.leaves);
        //setLeaveData(data.leaves)
        if (data.leaves) {
          const item = data.leaves;
          const dataD = {
            _id: item._id,
            employeeId: item.employeeId.employeeId,
            empId: item.employeeId._id,
            leaveType: item.leaveType,
            reason: item.reason,
            department: item.employeeId.department.dep_name,
            status: item.status,
            username: item.employeeId.userId?.username,
            profileimg: item.employeeId.userId?.profileImage,
            days:
              new Date(item.endDate).getDate() -
              new Date(item.startDate).getDate(),
            action: item._id,
          };
          console.log(dataD);
          setLeaveData(dataD);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "Server Error");
      }
    };
    fetchLeaveData();
  }, []);

  const changeStatus = async (id, status) => {
    try {
        const { data } = await axios.put(`/api/leave/update-leave/${id}`, {
          status,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        toast.success(data.message)
        navigateto('/add-leave')
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "Server Error");
      }
    };

  

  return (
    <div className="flex w-[100%] h-[100vh] items-center justify-center">
      <div className="w-[500px]  py-5 flex flex-col gap-[20px] text-white relative">
        <div className=" absolute top-0 right-0">
            <Link to={'/add-leave'} className="text-[30px]"><RxCross1/> </Link>
        </div>
        <div>
          <img
            src={leavedata?.profileimg}
            alt="profile"
            className="w-[200px] h-[200px]"
          />
        </div>
        <h1>
          EmployeeId : <span>{leavedata?.employeeId}</span>
        </h1>
        <h1>
          Username : <span>{leavedata?.username || '****'}</span>
        </h1>
        <h1>
            LeaveType : <span>{leavedata?.leaveType}</span>
        </h1>
        <h1>
            Reason : <span>{leavedata?.reason}</span>
        </h1>
        <h1>
          Department : <span>{leavedata?.department}</span>
        </h1>
        <h1>
          Days : <span>{leavedata?.days}</span>
        </h1>
        <div className="flex space-x-3 mb-2">
            <p className="text-lg ">
                {leavedata?.status === "Pendding" ? "Action :" : "Status"}
            </p>
            {
                leavedata?.status === "Pendding" ? 
                <div className=" flex gap-[10xpx] justify-center items-center">
                    <button onClick={() => changeStatus(leavedata?._id ,"Approved")} className="px-1 py-1  rounded-md bg-teal-500 hover:bg-teal-400">Approve</button>
                    <button onClick={() => changeStatus(leavedata?._id ,"Rejected")} className="ml-2 py-1 px-1 rounded-md  bg-red-300 hover:bg-red-400">Reject</button>
                </div>
                :
                <p className="font-medium">{leavedata?.status}</p>
            }
        </div>
      </div>
    </div>
  );

}


export default ViewLeave;
