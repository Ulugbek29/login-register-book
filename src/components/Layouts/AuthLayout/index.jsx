import React from 'react'
import { Outlet } from 'react-router-dom'

export default function index() {
  return (
    <div className='w-full h-screen flex justify-between items-center'>
      <div className='relative w-1/2 h-full  flex justify-center items-center bg-[#DCE9F9] px-16 '>
          <Outlet />
      </div>
      <div className='w-1/2 h-full flex justify-center items-center bg-gradient-to-t from-[#DBEFFF] to-white'>
          <img src='/books.jpg' className='w-full h-full object-cover'/>
      </div>
    </div>
  )
}