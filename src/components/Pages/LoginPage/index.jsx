import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import FRow from '../../FormElements/FRow';
import InputPassword from "../../FormElements/inputPassword"
import  TextField  from '../../FormElements/TextField';
import { login } from '../../redux/Auth/auth.slice';
import {registerService,loginService} from "../../services/authService"

export default function index() {
    const [isRegister, setRegister] = useState(false)
    const {control, handleSubmit} = useForm()
    const dispatch = useDispatch()

    const onSubmit = (value) => {
        if(isRegister) {
            const {name, email, username, password} = value
            const data = {
                name,
                email,
                key: username,
                secret: password
            }
            registerService(data)
            .then((res)=>  dispatch(login(res.data.data)))
            .catch((err)=> console.log(err))
        }else {
            const {username, password} = value
            const data = {
                key: username,
                secret: password
            }
            loginService(data)
            .then((res)=>  dispatch(login(res.data.data)))
            .catch((err)=> console.log(err))
        }
       
    }


  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[550px]  h-fit overscroll-auto flex flex-col items-center py-8 px-8 bg-white rounded-lg'>
            <h2 className='text-3xl font-bold'>{!isRegister ? "Log In" : "Register"}</h2>
            <div className='w-full flex justify-start my-2'>
                <span onClick={()=>setRegister((prev)=> !prev)} className='text-blue-600 text-base font-semibold cursor-pointer'>{!isRegister ? "Register" : "LogIn"}</span>
            </div>
            <form className='w-full h-full flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            {!isRegister ? (
                <>
                <FRow label="Username" required>
                    <TextField control={control} fullWidth name="username" required placeholder="Введите логин..."/>
                </FRow>
                <FRow label="Password" required>
                <InputPassword control={control} fullWidth  name="password" required placeholder="Введите пароль..." />
                </FRow>
                </>
            ) : (
                <>
                <FRow label="Name" required>
                    <TextField control={control} fullWidth name="name" required placeholder="Введите имя..."/>
                </FRow>
                <FRow label="Email" required>
                    <TextField control={control} type="email" fullWidth name="email" required placeholder="Введите email..."/>
                </FRow>
                <FRow label="Username" required>
                    <TextField control={control} fullWidth name="username" required placeholder="Введите логин..."/>
                </FRow>
                <FRow label="Password" required>
                <InputPassword control={control} fullWidth  name="password" required placeholder="Введите пароль..." />
                </FRow> 
                </>
            )}
                <Button type='submit' fullWidth variant='contained'>{!isRegister ? "LogIn" : "Register"} </Button>
            </form>
        </div>
    </div>
  )
}
