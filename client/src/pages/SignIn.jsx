import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice';

const SignIn = () => {

  const [formaData, setFormData] = useState({});
  const {loading,errors}=useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlChange=(e)=>{
    setFormData({...formaData, [e.target.id]: e.target.value});
  }
  console.log(formaData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify(formaData),
      });
          const data = await response.json();
          console.log(data);
          if(data.success === false){
           dispatch(signInFailure(data.message))
            return
          }
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
 }
  

  return (
    <div className='p-3 max-w-lg mx-auto bg-slate-300 mt-6'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sing In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id='email' onChange={handlChange}/>
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id='password' onChange={handlChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-80 disabled:opacity-80' >
         {loading ? "loading...":'Sign In'}
        </button>
      </form>

      <div className='flex gp-2 mt-5'>
        <p className='text-center text-gray-500'>Dont have an account? </p>
        <Link to="/signup">
        <span className='text-blue-800'> Sign Up</span>
        </Link>
      </div>
      {errors && <p className='text-red-600 mt-5'>{errors}</p>}
    </div>
    
  )
}

export default SignIn
