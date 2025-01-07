import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { Link, useParams} from 'react-router-dom'

const ViewSlary = () => {

  let count = 1
  const [salary, setSalary] = useState([])

  const {id} = useParams()

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        
        await axios.get(`/api/salary/get-salary/${id}`,{
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials: true
        })
        .then((res) => {
          //console.log(res.data)
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
    <div>
      <div className=' relative w-full h-[100vh] overflow-x-auto text-white pt-[0px]'>
      <div className="w-full h-[100px] flex items-center justify-center">
          <Link to={'/add-employee'} className="text-[30px] ">Back</Link>
        </div>
      <table>
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

export default ViewSlary