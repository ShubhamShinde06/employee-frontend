import React, { useEffect, useState } from "react";
import SideBar from "../../SideBar/SideBar";
import Header from "../../Header/Header";
import toast from "react-hot-toast";
import axios from "axios";
import { getEmployee } from "./Help";
import { useNavigate } from "react-router-dom";


const AddSalary = () => {

  const navigateTo = useNavigate();

  const [salary, setSalary] = useState({
    employeeId:null,
    basciSalary: 0,
    allowance: 0,
    deducation: 0,
    paydate: null
  })

  const handelChange = () => {
    const {name, value} = e.target;
    setSalary((prevData) => ({...prevData, [name]:value}))
  }

  const [department, setDepartment] = useState([])
  const [employee, setEmployee] = useState([])

  const [employeeId, setEmpId] = useState()
  const [basciSalary, setBasciSalary] = useState()
  const [allowance, setAllowance] = useState()
  const [duducation, setDuducation] = useState()
  const [date, setDate] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      
      const {data} = await axios.post('/api/salary/add-salary',
        {employeeId, basciSalary, allowance, duducation, date},
        {
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials:true
        }
      )
      toast.success(data.message)
      navigateTo(0, {replace: true})
    } catch (error) {
      console.log(error)
      //toast.error(error.response.message)
    }
  }


  useEffect(() => {
    const fetchDepartment = async () => {
        try {
          
           axios.get('/api/department/get-department',{
            withCredentials: true,
          })
          .then((res) => {
            //console.log(res.data)
            setDepartment(res.data)
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
    

    const handleChange = async (e) => {
      const emp = await getEmployee(e.target.value)
      setEmployee(emp)
    }
  

  return (
    <div>
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
        <div className="w-[100%] h-[100vh] text-white">
          <div>
            <Header />
          </div>

          <div className=" h-[100vh] pt-[150px] relative px-4 py-10 w-auto bg-[#1A202E] rounded-xl shadow-2xl flex flex-col gap-[20px] items-center">
            <h1 className="text-[25px] font-bold mb-[20px]">
              Add Salary
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
              <div className="lg:w-[800px] w-[450px] py-4 flex gap-[40px]">
                <select
                  name="department"
                  className="w-full py-2 bg-transparent border-b-2 outline-none"
                  onChange={handleChange}
                >
                  <option className="bg-black" value={''}>Select Department</option>
                      {
                        department.map((data) => (
                          <option className="bg-black" value={data._id}>{data.dep_name}</option>
                        ))
                      }
                </select>
                <select
                  name="employeeId"
                  className="w-full py-2 bg-transparent border-b-2 outline-none"
                  value={employeeId}
                  onChange={(e) => setEmpId(e.target.value)}
                >
                  <option className="bg-black" value={''}>Select Employee</option>
                      {
                        employee.map((data) => (
                          <option className="bg-black" value={data._id}>{data.id}</option>
                        ))
                      }
                </select>
              </div>
              <div className="lg:w-[800px] w-[450px] py-4 flex gap-[40px]">
                <input
                  type="number"
                  placeholder="Basci salary"
                  name="basciSalry"
                  className="w-full py-2 bg-transparent border-b-2 px-2 outline-none"
                  value={basciSalary}
                  onChange={(e) => setBasciSalary(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Allowance"
                  name="allowance"
                  className="w-full py-2 bg-transparent border-b-2 px-2 outline-none"
                  value={allowance}
                  onChange={(e) => setAllowance(e.target.value)}
                />
              </div>
              <div className="lg:w-[800px] w-[450px] py-4 flex gap-[40px]">
                <input
                  type="number"
                  placeholder="Duducation"
                  name="duducation"
                  className="w-full py-2 bg-transparent border-b-2 px-2 outline-none"
                  value={duducation}
                  onChange={(e) => setDuducation(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Allowance"
                  name="date"
                  className="w-full py-2 bg-transparent border-b-2 px-2 outline-none"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-transparent border rounded-full hover:bg-[white] hover:text-black px-2 outline-none mt-5"
              >
                Add Employee
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalary;
