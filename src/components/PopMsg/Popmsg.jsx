import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Popmsg = ({text,setShow,handleSubmit,setDepName,setDescription,description,dep_name}) => {
  return (
    <>
      <div className="bg absolute w-[100%] h-[100vh] top-0 left-0 flex items-center justify-center">
        <div className=" relative px-2 py-10 min-w-[400px] bg-[#1A202E] rounded-xl shadow-2xl flex flex-col gap-[20px] items-center justify-evenly">
          <div
            onClick={() => setShow(false)}
            className=" absolute top-3 right-3 text-[30px] cursor-pointer"
          >
            <IoIosCloseCircleOutline />
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
  );
};

export default Popmsg;
