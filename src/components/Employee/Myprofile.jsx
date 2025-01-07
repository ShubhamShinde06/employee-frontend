import React, { useEffect, useState } from "react";
import SideBar from "./sidebar/SideBar";
import toast from "react-hot-toast";
import axios from "axios";
import {  useParams } from "react-router-dom";
import { UseContext } from "../../context/ContextApi";
import Header from "../Header/Header";


const Myprofile = () => {
  const { id } = useParams();

  const [imgs, setImg] = useState();
  const [username, setUsename] = useState();
  const [email, setEmail] = useState();
  const [department, setDepartment] = useState();
  const [status, setStatus] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await axios.get(
          `/api/employee/get-single-employee/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(data);
        if (data.employee) {
          const emp = data.employee;
          const dataD = {
            email: emp.userId.email,
            img: emp.userId.profileImage,
            name: emp.userId.username,
            gender: emp.gender,
            department: emp.department.dep_name,
            dob: emp.dob,
            status: emp.maritalStatus,
          };
          //console.log(dataD)
          setImg(dataD.img);
          setUsename(dataD.name);
          setEmail(dataD.email);
          setGender(dataD.gender);
          setDepartment(dataD.department);
          setDob(dataD.dob);
          setStatus(dataD.status);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "Server Error");
      }
    };
    fetchEmployee();
  }, []);

  return (
    <>
    
      <div className="flex w-[100%] h-[100vh]">
      <div>
        <SideBar />
      </div>
      <div className="w-[88%] h-[100vh] flex justify-center items-center">
        <div className="w-[100%] text-white absolute top-0 right-0 ">
          <Header />
        </div>
        <div className="text-white">
          <div className="w-[100px] h-[100px] rounded-xl ">
            <img src={imgs} alt="" className="w-[100px] h-[100px] rounded-xl" />
          </div>
          <div>
            <h1 className="text-[20px]">Name : {username}</h1>
          </div>
          <div>
            <h1 className="text-[20px]">Email : {email}</h1>
          </div>
          <div>
            <h1 className="text-[20px]">Gender : {gender}</h1>
          </div>
          <div>
            <h1 className="text-[20px]">DOB : {dob}</h1>
          </div>
          <div>
            <h1 className="text-[20px]">Status : {status}</h1>
          </div>
          <div>
            <h1 className="text-[20px]">Department : {department}</h1>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Myprofile;
