import React, { useEffect, useState } from 'react'
import SideBar from './sidebar/SideBar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Header from '../Header/Header'


const Salary = () => {


  let count = 1
  const [salary, setSalary] = useState([])

  const {id} = useParams()

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        
        await axios.get(`/api/salary/get-usersalary/${id}`,{
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials: true
        })
        .then((res) => {
          console.log(res.data)
          setSalary(res.data.salarys)
        })
        .catch((error) => {
          console.log(error)
        })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
    fetchSalary()
  },[])

  return (
    <div className="flex w-[100%] h-[100vh] overflow-x-auto">
        <div>
          <SideBar/>
        </div>
        <div className='pt-[150px]'>
        <div className="w-[100%] text-white absolute top-0 right-0 ">
          <Header />
        </div>
          <table className='w-[100vw] overflow-x-auto text-white'>
            <tr>
              <th>Sr.No</th>
              <th>Employee id</th>
              <th>Salary</th>
              <th>allowance</th>
              <th>duducation</th>
              <th>netSalary</th>
              <th>payDate</th>
            </tr>
            {salary.map((data, i) => (
              <tr key={i}>

                <td>{count++}</td>
                <td>{data.employeeId.employeeId}</td>
                <td>{data.basciSalary}</td>
                <td>{data.allowance}</td>
                <td>{data.duducation}</td>
                <td>{data.netSalary}</td>
                <td>{data.payDate}</td>
              </tr>
            ))}
            </table>
        </div>
  </div>
  )
}

export default Salary