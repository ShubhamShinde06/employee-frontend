import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const Empleaves = () => {

  let count = 1
  const { id } = useParams();

  const [leavedata, setLeaveData] = useState([]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const { data } = await axios.get(`/api/leave/get-single-leaves/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(data);
        setLeaveData(data.leave)
      } catch (error) {
        console.log(error);
        toast.error(error || "Server Error");
      }
    };
    fetchLeaveData();
  }, []);

  return (
    <div>
      <div className="w-[100%] text-white">
        <div className="w-full h-[100px] flex items-center justify-center">
          <Link to={'/add-employee'} className="text-[30px] ">Back</Link>
        </div>
        <table>
          <tr>
            <th>Sr.No</th>
            <th>Emp Id</th>
            <th>Username</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
          {leavedata.map((data, i) => (
            <tr key={i}>
              <td>{count++}</td>
              <td>{data.employeeId.employeeId}</td>
              <td>{data.employeeId.userId.username}</td>
              <th className="border-none">{data.employeeId.department.dep_name}</th>
              <th className="border-none">{data.status}</th>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Empleaves;
