import {Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import { Toaster } from 'react-hot-toast'; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import Department from "./components/admin/Department/Department/Department";
import UpdateDep from "./components/admin/Department/updatedepartment/UpdateDep";
import AddEmployee from "./components/admin/Employee/AddEmployee/AddEmployee";
import UpdateEmployee from "./components/admin/Employee/UpdateEmployee/UpdateEmployee";
import ViewEmployee from "./components/admin/Employee/ViewEmployee/ViewEmployee";
import AddSalary from "./components/admin/Salary/AddSalary";
import ViewSlary from "./components/admin/Salary/ViewSlary";
import AddLeaveType from "./components/admin/Leave/AddLeaveType";
import Salary from "./components/Employee/Salary";
import Leave from "./components/Employee/Leave";
import Myprofile from "./components/Employee/Myprofile";
import Setting from "./components/Employee/Setting";
import ViewLeave from "./components/admin/Leave/ViewLeave";
import Empleaves from "./components/admin/Leave/Empleaves";



function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/salary/:id" element={<Salary/>} />
          <Route path="/leave/:id" element={<Leave/>} />
          <Route path="/myprofile/:id" element={<Myprofile/>} />
          <Route path="/setting/:id" element={<Setting/>} />

          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />

          <Route path="/admin" element={<Admin/>} />
          <Route path="/department" element={<Department/>} />
          <Route path="/add-employee" element={<AddEmployee/>} />
          <Route path="/department/update/:id" element={<UpdateDep/>} />
          <Route path="/employee/viwe/:id" element={<ViewEmployee/>} />
          <Route path="/employee/update/:id" element={<UpdateEmployee/>} />
          <Route path="/add-salary" element={<AddSalary/>} />
          <Route path="/salary/viwe/:id" element={<ViewSlary/>} />
          <Route path="/add-leave" element={<AddLeaveType/>} />
          <Route path="/view-leave/:id" element={<ViewLeave/>} />
          <Route path="/leaves-view/:id" element={<Empleaves/>} />

        </Routes>
        <Toaster /> 
    </>
  )
}

export default App
