import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SideBar from "../../SideBar/SideBar";
import Header from "../../Header/Header";
import { Link } from "react-router-dom";

const AddLeaveType = () => {
  let count = 1;

  const [leavedata, setLeaveData] = useState([]);
  const [leaveFilter, setLeaveFilter] = useState([])

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const { data } = await axios.get(`/api/leave/get-leave`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        //console.log(data);
        const dataD = await data.map((item) => ({
          _id: item._id,
          employeeId: item.employeeId.employeeId,
          empId: item.employeeId._id,
          leaveType: item.leaveType,
          reason: item.reason,
          department: item.employeeId.department.dep_name,
          status: item.status,
          username: item.employeeId.userId.username,
          days: 
            new Date(item.endDate).getDate() - new Date(item.startDate).getDate(),
          action: item._id
        }))
        //console.log("2",dataD)
        setLeaveData(dataD);
        setLeaveFilter(dataD)
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "Server Error");
      }
    };
    fetchLeaveData();
  }, []);

  const filterDepartment = (e) => {
    const records = leavedata.filter((item) => 
      item.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setLeaveFilter(records)
  }

  const filterByBtn = (status) => {
    const records = leavedata.filter((item) => 
      item.status.toLowerCase().includes(status.toLowerCase())
    )

    setLeaveFilter(records)
  }

  return (
    <>
      <div className="flex w-[100%] h-[100vh] overflow-x-auto">
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
        <div className="w-[100%] text-white">
          <div>
            <Header />
          </div>
          <div className="flex items-center justify-between lg:px-8 px-2 py-8">
            <div>
              <input
                type="text"
                placeholder="Search..."
                className="border-none  bg-[#1A202E] rounded-md px-8 pl-2 py-2"
                onChange={filterDepartment}
              />
            </div>
            <div className="flex gap-[5px] lg:gap-[20px]">
              <button onClick={() => filterByBtn("Pendding")} className="flex items-center gap-[5px] uppercase  py-1 px-2 rounded-lg bg-[#1A202E] hover:border">
                Pendding
              </button>
              <button onClick={() => filterByBtn("Approved")} className="flex items-center gap-[5px] uppercase  py-1 px-2 rounded-lg bg-[#1A202E] hover:border">
                Approved
              </button>
              <button onClick={() => filterByBtn("Rejected")} className="flex items-center gap-[5px] uppercase  py-1 px-2 rounded-lg bg-[#1A202E] hover:border">
                Rejected
              </button>
            </div>
          </div>
          <table className="overflow-x-auto">
            <tr>
              <th>Sr.No</th>
              <th>Emp Id</th>
              <th>Username</th>
              <th>Department</th>
              <th>Days</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {leaveFilter.map((data, i) => (
              <tr key={i}>
                <td>{count++}</td>
                <td>{data.employeeId}</td>
                <td>{data.username}</td>
                <th className="border-none">{data.department}</th>
                <th className="border-none">{data.days}</th>
                <th className="border-none">{data.status}</th>
                <th className="border-none">
                  <Link to={`/view-leave/${data.action}`} className="border px-1 py-1 rounded-md font-[100]">
                    View
                  </Link>
                </th>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default AddLeaveType;
