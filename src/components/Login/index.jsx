import React, { useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link, Navigate} from "react-router-dom";
import { UseContext } from "../../context/ContextApi";
import { useNavigate } from "react-router-dom";

const LoginCom = () => {

  const route = useNavigate()
  
  const {isAuth, setIsAuth} = UseContext()

  const [email, setEmail] =  useState()
  const [password,setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if(!email || !password) return alert('please fillup')
      const {data} = await axios.post('/api/auth/login',{email,password},
        {
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials: true,
        })
        toast.success(data.message)
        setIsAuth(true)
        setEmail('')
        setPassword('')
        if(data.user.role === "admin"){
          route('/admin')
        }
        else{
          route('/')
        }
    } catch (error) {
      toast.error(error.response.data.message || '')
      console.log(error)
      setIsAuth(false)
    }

  }

  if(isAuth) return <Navigate to={'/'} />
  

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 llg:h-auto lg:block h-[100vh] flex justify-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className="text-white text-[30px] mb-5">Employee Management System</h1>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-black bg-[white]  hover:scale-110 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link to={'/'}>
                    <button
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-white"
                    >
                      Register
                    </button>
                  </Link>
                  
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginCom;
