import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full bg-indigo-500 flex flex-col justify-center items-center min-h-screen  gap-[15px]'>
        <h1 className='text-white font-[500] text-4xl text-center'>Welcome</h1>
        <p  className='text-white text-3xl font-[500] text-center'>This is Best Store In India</p>
        <div className='flex gap-5'>
          <button className='bg-white text-indigo-500 px-5 py-2 rounded-md'  onClick={() => navigate('/login')}>Login</button>
          <button  className='bg-white text-indigo-500 px-5 py-2 rounded-md' onClick={() => navigate('/register')}>Register</button>
        </div>
    </div>
  )
}

export default HomePage