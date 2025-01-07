import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateDep = () => {

    const navigateTo = useNavigate();

    const {id} = useParams()

    const [dep_name, setDepName] = useState()
    const [description, setDescription] = useState()

    useEffect(() => {
        const fetchSignleDepartment = async () => {
          try {
            const {data} = await axios.get(
              `/api/department/get-single-department/${id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            setDepName(data.dep_name);
            setDescription(data.description)
          } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Server Error");
          }
        };
        fetchSignleDepartment();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            
            const {data} = await axios.put(`/api/department/update-department/${id}`,{dep_name,description},
                {
                    headers:{
                        "Content-Type":"application/json",
                    },
                    withCredentials: true,
                })
                toast.success(data.message)
                navigateTo(0, { replace: true });
                setDepName('')
                setDescription('')
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || "* fields required")
        }
      }

  return (
    <div>
      <div className="bg absolute w-[100%] h-[100vh] top-0 left-0 flex items-center justify-center">
        <div className=" relative px-2 py-10 min-w-[400px] bg-[#1A202E] rounded-xl shadow-2xl flex flex-col gap-[20px] items-center justify-evenly">
          <div
            //onClick={() => setShow(false)}
            className=" absolute top-3 right-3 text-[30px] cursor-pointer text-[white]"
          >
            <Link to={'/department'}><IoIosCloseCircleOutline /></Link>
          </div>
          <h1 className="text-[25px] font-bold mb-[20px] text-white">
            Update Department
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col text-[white]">
              <label htmlFor="name">Department Name</label>
              <input
                type="text"
                name="name"
                placeholder="Department name"
                className="px-2 py-2 w-[300px] mt-2 outline-none bg-transparent border-b-2 text-[white]"
                value={dep_name}
                onChange={(e) => setDepName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-[20px] text-white">
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
    </div>
  );
};

export default UpdateDep;
