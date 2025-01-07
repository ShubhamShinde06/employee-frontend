import React, { useEffect, useState } from "react";
import SideBar from "../../../SideBar/SideBar";
import Header from "../../../Header/Header";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";


const Department = () => {
  const navigateTo = useNavigate();

  let count = 1;
  const [department_info, setDepartment_info] = useState([]);
  const [show, setShow] = useState(false);

  const [dep_name, setDepName] = useState();
  const [description, setDescription] = useState();
  const [dep_filter, setDepFilter] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/api/department/add-department",
        { dep_name, description },
        {
          Headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      navigateTo(0, { replace: true });
      setDepName("");
      setDescription("");
    } catch (error) {
      toast.error(error.response.data.message || "");
      console.log(error);
    }
  };

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


  const handleDelete = async (id) => {
    await axios
      .delete(`/api/department/delete-department/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        navigateTo(0, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.message || "Faild");
      });
  };

  const filterDepartment = (e) => {
    const records = department_info.filter((dep => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())))
    setDepFilter(records)
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
      <div className="w-[100%] h-[100vh] text-white">
        <div>
          <Header />
        </div>
        <div className="flex items-center justify-between px-8 py-8">
          <div>
            <input 
              type="text"
              placeholder="Search..."
              className="border-none  bg-[#1A202E] rounded-md px-8 pl-2 py-2"
              onChange={filterDepartment}
            />
          </div>
          <button
            onClick={() => setShow(true)}
            className="flex items-center gap-[5px] uppercase  py-1 px-2 rounded-lg bg-[#1A202E] hover:border"
          >
            add new department <span className="text-[20px] mb-1">+</span>
          </button>
        </div>
        {show ? (
          <>
            <div className="bg absolute w-[100%] h-[100vh] top-0 left-0 flex items-center justify-center">
              <div className=" relative px-2 py-10 min-w-[400px] bg-[#1A202E] rounded-xl shadow-2xl flex flex-col gap-[20px] items-center justify-evenly">
                <div
                  onClick={() => setShow(false  )}
                  className=" absolute top-3 right-3 text-[30px] cursor-pointer"
                >
                  <IoIosCloseCircleOutline/>
                </div>
                <h1 className="text-[25px] font-bold mb-[20px]">
                  Add New Department
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label htmlFor="name">Department Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Department name"
                      className="px-2 py-2 w-[300px] mt-2 outline-none bg-transparent border-b-2"
                      value={dep_name}
                      onChange={(e) => setDepName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mt-[20px]">
                    <label htmlFor="des">Description</label>
                    <textarea
                      name="des"
                      placeholder="Descripation"
                      className="mt-2 px-2 py-2 outline-none bg-transparent border-b-2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mt-[40px]">
                    <button className="w-full text-white hover:border bg-[#151A25] py-2 rounded-full">
                      ADD
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="lg:ml-[50px] lg:mr-[50px]">
          <table>
            <tr>
              <th>Sr.No</th>
              <th>Department</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            {dep_filter.map((data, i) => (
              <tr key={i}>
                <td>{count++}</td>
                <td>{data.dep_name}</td>
                <td>{data.description}</td>
                <td>
                  <Link to={`/department/update/${data._id}`}>
                    <button
                      onClick={() => editsetShow(true)}
                      className=" px-4 py-1 rounded-md bg-green-600"
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(data._id)}
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

export default Department;
