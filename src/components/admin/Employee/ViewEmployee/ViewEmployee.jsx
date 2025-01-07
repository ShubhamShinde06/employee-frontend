import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { Link, useParams} from 'react-router-dom'

const ViewEmployee = () => {

  const {id} = useParams()

  const [imgs ,setImg] = useState()
  const [username, setUsename] = useState()
  const [email, setEmail] = useState()
  const [department, setDepartment] = useState()
  const [status, setStatus] = useState()
  const [gender, setGender] = useState()
  const [dob, setDob] = useState()

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await axios.get(`/api/employee/get-single-employee/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },  
          withCredentials: true,
        });
        if(data.employee){
          const emp = data.employee
          const dataD = {
            email: emp.userId.email,
            img: emp.userId.profileImage,
            name: emp.userId.username,
            gender: emp.gender,
            department:  emp.department.dep_name,
            dob: emp.dob,
            status: emp.maritalStatus
          }
          //console.log(dataD)
          setImg(dataD.img)
          setUsename(dataD.name)
          setEmail(dataD.email)
          setGender(dataD.gender)
          setDepartment(dataD.department)
          setDob(dataD.dob)
          setStatus(dataD.status)
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
      <div className='w-full h-[100vh] flex justify-center items-center'>
        <div className='px-5 py-5 border flex flex-col gap-3 text-white relative'>
        <div
            className=" absolute top-3 right-3 text-[30px] cursor-pointer text-[white]"
          >
            <Link to={'/add-employee'}><IoIosCloseCircleOutline /></Link>
          </div>
          <div className='w-[100px] h-[100px] rounded-xl '>
            <img 
              src={imgs}
              alt="" 
              className='w-[100px] h-[100px] rounded-xl'
            />
          </div>
          <div>
            <h1 className='text-[20px]'>Name : {username}</h1>
          </div>
          <div>
            <h1 className='text-[20px]'>Email : {email}</h1>
          </div>
          <div>
            <h1 className='text-[20px]'>Gender : {gender}</h1>
          </div>
          <div>
            <h1 className='text-[20px]'>DOB : {dob}</h1>
          </div>
          <div>
            <h1 className='text-[20px]'>Status : {status}</h1>
          </div>
          <div>
            <h1 className='text-[20px]'>Department : {department}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewEmployee