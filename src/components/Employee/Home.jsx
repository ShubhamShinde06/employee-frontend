import React from 'react'
import SideBar from './sidebar/SideBar'
import Header from '../Header/Header'
import { UseContext } from '../../context/ContextApi'


const HomeComMain = () => {

  const {user} = UseContext()

  return (
    <div className="flex w-[100%] h-[100vh]">
      <div>
        <SideBar/>
      </div>
      <div className='w-[100%] text-white'>
        <Header/>
        <div className='absolute top-[40%] left-[15%] -z-10 lg:left-[40%]'>
          <h1 className='text-[60px] text-center'>Welcom back <br></br> {user?.username}</h1>
        </div>
      </div>
      
    </div>
  )
}

export default HomeComMain