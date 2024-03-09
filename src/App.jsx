import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from "./components/Layouts/AuthLayout"
import LoginPage from "./components/Pages/LoginPage"
import MainLayout from "./components/Layouts/MainLayout"
import BookPage from "./components/Pages/BookPage"
import PersonalLibrary from "./components/Pages/PersonalLibrary"
import { useSelector } from 'react-redux'

export default function App() {
  const isAuth = useSelector((store)=> store?.auth?.isAuth)

  if(!isAuth) {
    return (
      <Routes>
        <Route path='/' element={<AuthLayout />}>
            <Route index element={<Navigate to="login" />} />
            <Route index path='login' element={<LoginPage />}/>
            <Route path="*" element={<Navigate to="login" />} />
        </Route>
      </Routes>
    )
  }


  return (
    <div>
   <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index  element={<Navigate to="/home" />} />
            <Route  path='home' element={<BookPage />}/>
            <Route  path='personal-library' element={<PersonalLibrary />}/>
            <Route  path='*' element={<Navigate to="/home" />}/>
        </Route>
        <Route path="*" element={<BookPage />} />
      </Routes>
    </div>
  )
}
