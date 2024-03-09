import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "../../UI/Header"


export default function index() {
  return (
    <div className='w-full min-h-screen bg-slate-100'>
        <Header />

        <div className='pt-16'>
            <Outlet />
        </div>
    </div>
  )
}
