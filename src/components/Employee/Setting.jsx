import React, { useState } from "react";
import SideBar from "./sidebar/SideBar";
import axios from "axios";
import toast from "react-hot-toast";
import { UseContext } from "../../context/ContextApi";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Setting = () => {

  const {user} = UseContext()
  const navigateTo = useNavigate()

  const [userId] = useState(user._id)
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        '/api/setting/change-password',
        { oldPassword, newPassword, userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      navigateTo(0, { replace: true });
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "* fields required");
    }
  };

  return (
    <div className="flex w-[100%] h-[100vh]">
      <div>
        <SideBar />
      </div>
      <div class="container mx-auto ">
        <div className="w-[100%] text-white absolute top-0 right-0 ">
          <Header />
        </div>
        <div class="flex justify-center items-center h-screen px-6 lg:pl-[300px]">
          <div class="w-full xl:w-3/4 lg:w-11/12 flex">
            <div class="lg:w-1/2 w-[500px]  bg-[#1F2937] border text-white p-5 rounded-lg lg:rounded-l-none">
              <div class="px-8 mb-4 text-center">
                <h3 class="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
              </div>
              <form
                class="lg:px-8 lg:pt-6 lg:pb-8 lg:mb-4 w-[400px] bg-[#1F2937] text-white rounded"
                onSubmit={handleSubmit}
              >
                <div class="mb-4">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-[white]"
                    for="password"
                  >
                    Old-Password
                  </label>
                  <input
                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="password"
                    name="password"
                    placeholder="Enter Old Password..."
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block mb-2 text-sm font-bold text-[white]"
                    for="password"
                  >
                    New-Password
                  </label>
                  <input
                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="password"
                    name="password"
                    placeholder="Enter New Password..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div class="mb-6 text-center mt-6">
                  <button
                    class="w-full px-4 py-2 font-bold text-black bg-[white] rounded-full hover:text-white hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
