import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sing Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder="username" className="border p-3 rounded-lg" id='username'/>
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id='email'/>
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id='password'/>
        <button className='bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gp-2 mt-5'>
        <p className='text-center text-gray-500'>Already have an account? </p>
        <Link to="/signin">
        <span className='text-blue-800'> Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
