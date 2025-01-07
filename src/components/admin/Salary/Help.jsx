import axios from "axios";
import toast from "react-hot-toast";

export const getEmployee = async (id) => {
    let employee
    try {
      const {data} = await axios.get(`/api/employee/department/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }); 
        console.log(data)
        if(Array.isArray(data.employees)){
            const dataD = data.employees.map((emp) => ({
                _id:emp._id,
                id:emp.employeeId,
                salary: emp.salary
            }))
            console.log("1",dataD)
            employee = dataD
        }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Server Error");
    }
    return employee
  };
 
