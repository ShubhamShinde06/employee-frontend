import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddEmployee = () => {

  let count = 0;

  const [show, setShow] = useState(false);
  const [empdata, setEmpData] = useState([])
  const [emp_filter, setEmpFilter] = useState([]);
  const navigateTo = useNavigate();
  const [departmentinfo, setDepartmentinfo] = useState()

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [employeeId, setEmployeeId] = useState()
  const [dob, setDoB] = useState()
  const [gender, setGender] = useState()
  const [maritalStatus, setMaritalStatus] = useState()
  const [department, setDepartment] = useState()
  const [role, setRole] = useState()
  const [salary, setSalary ] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    const fetchDepartment = async () => {
        try {
          
           axios.get('/api/department/get-department',{
            withCredentials: true,
          })
          .then((res) => {
            //console.log(res.data)
            setDepartmentinfo(res.data)
          })
          .catch((error) => {
            console.log(error)
          })
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
        }
        
      }
      fetchDepartment()
    },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/api/employee/add-employee",
        { username, email, employeeId, dob, gender, maritalStatus, department, role, salary, password  },
        {
          Headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      navigateTo(0, { replace: true });
    } catch (error) {
      toast.error(error.response.data.message || "");
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const {data} = await axios.get("/api/employee/get-employee", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        //console.log(data.employee)
        const dataD = await data.employee.map((emp) => ({
          email: emp.userId.email,
          username: emp.userId.username,
          id: emp.employeeId,
          dob: emp.dob,
          department: emp.department?.dep_name,
          emp_id:emp._id,
          userId: emp.userId._id
        }))
        //console.log(dataD)
        setEmpData(dataD)
        setEmpFilter(dataD)
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "Server Error");
      }
    };
    fetchEmployee();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/employee/delete-employee/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      toast.success(res.data.message)
      navigateTo(0, {replace:true})
    })
    .catch((error) => {
      console.log(error)
      toast.error(error.response.message)
    })
  } 

  const filterEmployee = (e) => {
    const records = empdata.filter((emp => 
      emp.username.toLowerCase().includes(e.target.value.toLowerCase())
    ))

    setEmpFilter(records)

  }

  return (
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
      <div className="w-[100%] h-[100vh] overflow-scroll text-white">
        <div>
          <Header />
        </div>
        <div className="flex items-center justify-between px-8 py-8">
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="border-none  bg-[#1A202E] rounded-md px-8 pl-2 py-2"
              onChange={filterEmployee}
            />
          </div>
          <button
            onClick={() => setShow(true)}
            className="flex items-center gap-[5px] uppercase  py-1 px-2 rounded-lg bg-[#1A202E] hover:border"
          >
            Add New Employee <span className="text-[20px] mb-1">+</span>
          </button>
        </div>
        {show ? (
          <>
            <div className="bg absolute w-[100%] h-[100vh] top-0 left-0 flex items-center justify-center">
              <div className=" relative px-4 py-10 w-auto bg-[#1A202E] rounded-xl shadow-2xl flex flex-col gap-[20px] items-center">
                <div
                  onClick={() => setShow(false)}
                  className=" absolute top-3 right-3 text-[30px] cursor-pointer"
                >
                  <IoIosCloseCircleOutline />
                </div>
                <h1 className="text-[25px] font-bold mb-[20px]">
                  Add New Employee
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
                    <input 
                      type="text" 
                      placeholder="Employee ID" 
                      name="employeeId"
                      className="w-full py-2 bg-transparent border-b-2 outline-none"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                    />
                    <input 
                      type="date" 
                      placeholder="Date of Birth"
                      name="dob"
                      className="w-full py-2 bg-transparent border-b-2 outline-none"
                      value={dob}
                      onChange={(e) => setDoB(e.target.value)} 
                    />
                  </div>
                  <div className="lg:w-[800px] w-[400px] py-4 flex gap-[40px]">
                    <select 
                      name="gender"
                      className="w-full py-2 bg-transparent border-b-2 outline-none"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)} 
                    >
                      <option className="bg-black" value={''}>Select Gender</option>
                      <option className="bg-black" value={'male'}>Male</option>
                      <option className="bg-black" value={'female'}>Female</option>
                      <option className="bg-black" value={'other'}>Other</option>
                    </select>
                    <select 
                      name="maritalStatus"
                      className="w-full py-2 bg-transparent border-b-2 outline-none"
                      value={maritalStatus} 
                      onChange={(e) => setMaritalStatus(e.target.value)}
                    >
                      <option className="bg-black" value={''}>Select Status</option>
                      <option className="bg-black" value={'single'}>Single</option>
                      <option className="bg-black" value={'married'}>Married</option>
                    </select>
                  </div>
                  <div className="lg:w-[800px] w-[400px] py-4 flex gap-[40px]">
                    <select 
                      name="department"
                      className="w-full py-2 bg-transparent border-b-2 outline-none"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)} 
                    >
                      <option className="bg-black" value={''}>Select Department</option>
                      {
                        departmentinfo.map((data) => (
                          <option className="bg-black" value={data._id}>{data.dep_name}</option>
                        ))
                      }
                    </select>
                    <select 
                      name="role"
                      className="w-full py-2 bg-transparent border-b-2 outline-none"
                      value={role}
                      onChange={(e) => setRole(e.target.value)} 
                    >
                      <option className="bg-black" value={''}>Select Role</option>
                      <option className="bg-black" value={'user'}>User</option>
                      <option className="bg-black" value={'admin'}>Admin</option>
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
                    <input 
                      type="password" 
                      placeholder="password" 
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-2 bg-transparent border-b-2 px-2 outline-none"
                    />
                  </div>
                  <button  type="submit" className="w-full py-2 bg-transparent border rounded-full hover:bg-[white] hover:text-black px-2 outline-none mt-5">
                      Add Employee
                   </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="lg:ml-[50px] lg:mr-[50px] overflow-x-auto">
          <table>
            <tr>
              <th>Sr.No</th>
              <th>Employee id</th>
              <th>Username</th>
              <th>Department</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
            {emp_filter.map((data, i) => (
              <tr key={i}>
                <td>{count++}</td>
                <td>{data.id}</td>
                <td>{data.username}</td>
                <td>{data.department}</td>
                <td>{data.dob}</td>
                <td className="lg:block flex flex-col gap-[5px]">
                  <Link to={`/employee/viwe/${data.emp_id}`}>
                    <button
                      //onClick={() => editsetShow(true)}
                      className=" px-6 py-1 ml-1 rounded-md bg-green-600"
                    >
                      View
                    </button>
                  </Link>
                  <Link to={`/salary/viwe/${data.emp_id}`}>
                    <button
                      className=" px-5 py-1 rounded-md bg-green-600 ml-2"
                    >
                      Salary
                    </button>
                  </Link>
                  <Link to={`/employee/update/${data.emp_id}`}>
                    <button
                      //onClick={() => editsetShow(true)}
                      className=" px-7 py-1 rounded-md bg-green-600 ml-2"
                    >
                      Edit
                    </button>
                  </Link>
                  <Link to={`/leaves-view/${data.emp_id}`}>
                    <button
                      //onClick={() => editsetShow(true)}
                      className=" px-4 py-1 rounded-md bg-green-600 ml-2"
                    >
                      Leaves
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(data.emp_id)}
                    className=" px-4 py-1 rounded-md bg-red-600 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
