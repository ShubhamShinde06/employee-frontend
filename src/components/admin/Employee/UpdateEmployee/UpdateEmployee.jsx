import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateEmployee = () => {

  const navigateTo = useNavigate();

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [department_info, setDepartment_info] = useState([])
  const [maritalStatus, setMaritalStatus] = useState('')
  const [department, setDepartment] = useState([])
  const [salary, setSalary ] = useState()

  const {id} = useParams()

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const { data } = await axios.get("/api/department/get-department", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setDepartment_info(data);
        setDepFilter(data)
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "Server Error");
      }
    };
    fetchDepartment();
  }, []);

  useEffect(() => {
    const fetchSignleEmployee = async () => {
      try {
        const {data} = await axios.get(
          `/api/employee/get-single-employee/${id}`,{
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          //console.log("API Response:", data);
          // if (Array.isArray(data.employee)) {
          // If it's a Multi employee object
          //   const dataD = data.employee.map((emp) => ({
          //     email: emp.userId.email,
          //     username: emp.userId.username,
          //     id: emp.employeeId,
          //     dob: emp.dob,
          //     department: emp.department?.dep_name,
          //     emp_id: emp._id,
          //   }));
          //   console.log("Mapped Data:", dataD);
          // } 
          if (data.employee) {
            // If it's a single employee object
            const emp = data.employee;
            const dataD = {
              email: emp.userId.email,
              username: emp.userId.username,
              department: emp.department?.dep_name,
              emp_id: emp._id,
              salary: emp.salary,
            };
            //console.log("Mapped Data 2:", dataD);
            setUsername(dataD.username)
            setEmail(dataD.email)
            setDepartment(dataD.department)
            setSalary(dataD.salary)
          } else {
            console.log("Unexpected data structure:", data);
          }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "Server Error");
      }
    };
    fetchSignleEmployee();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      
      const {data} = await axios.put(`/api/employee/update-employee/${id}`,{email, username, salary, department, maritalStatus},
        {
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials: true,
        })
        toast.success(data.message)
        navigateTo(0, {replace: true})
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div>
      <div className="bg absolute w-[100%] h-[100vh] top-0 left-0 flex items-center justify-center">
        <div className=" relative px-4 py-10 w-auto bg-[#1A202E] rounded-xl shadow-2xl flex flex-col gap-[20px] items-center">
          <div
            className=" absolute top-3 right-3 text-[30px] cursor-pointer text-[white]"
          >
            <Link to={'/add-employee'}><IoIosCloseCircleOutline /></Link>
          </div>
          <h1 className="text-[25px] font-bold mb-[20px] text-white">Update Employee</h1>
          <form onSubmit={handleSubmit} className="text-white flex flex-col justify-center items-center">
            <div className="lg:w-[800px] w-[400px] py-4 flex gap-[40px]">
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="w-full py-2 bg-transparent border-b-2 px-2 outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full py-2 bg-transparent border-b-2 px-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="lg:w-[800px] w-[400px] py-4 flex gap-[40px]">
              <select
                name="maritalStatus"
                className="w-full py-2 bg-transparent border-b-2 outline-none text-[#9CA3AF]"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                <option className="bg-black" value={""}>
                  Select Status
                </option>
                <option className="bg-black" value={"single"}>
                  Single
                </option>
                <option className="bg-black" value={"married"}>
                  Married
                </option>
              </select>
            </div>
            <div className="lg:w-[800px] w-[400px] py-4 flex gap-[40px]">
              <select
                name="department"
                className="w-full py-2 bg-transparent border-b-2 outline-none text-[#9CA3AF]"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option className="bg-black" value={""}>
                  Select Department
                </option>
                {department_info.map((data) => (
                  <option className="bg-black" value={data._id}>
                    {data.dep_name}
                  </option>
                ))} 
              </select>
            </div>
            <div className="lg:w-[800px] w-[400px] py-4 flex gap-[40px]">
              <input
                type="text"
                placeholder="salary"
                name="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full py-2 bg-transparent border-b-2 px-2 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-transparent border rounded-full hover:bg-[white] hover:text-black px-2 outline-none mt-5 text-[#9CA3AF]"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
