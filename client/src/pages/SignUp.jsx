import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GoogleAuth from './component/GoogleAuth';

const SignUp = () => {

  const [formaData, setFormData] = useState({});
  const [errors, setErrors] = useState();
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handlChange=(e)=>{
    setFormData({...formaData, [e.target.id]: e.target.value});
  }
  console.log(formaData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify(formaData),
      });
          const data = await response.json();
          console.log(data);
          if(data.success === false){
            setErrors(data.message);
            setLoading(false);
            return
          }
      setLoading(false);
      setErrors(null);
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setErrors(data.message);
    }
 }
  

  return (
    <div className='p-3 max-w-lg mx-auto bg-slate-300 mt-6'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sing Up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder="username" className="border p-3 rounded-lg" id='username' onChange={handlChange}/>
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id='email' onChange={handlChange}/>
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id='password' onChange={handlChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-80 disabled:opacity-80' >
         {loading ? "loading...":'Sign up'}
        </button>
        <GoogleAuth/>
      </form>

      <div className='flex gp-2 mt-5'>
        <p className='text-center text-gray-500'>Already have an account? </p>
        <Link to="/signin">
        <span className='text-blue-800'> Sign in</span>
        </Link>
      </div>
      {errors && <p className='text-red-600 mt-5'>{errors}</p>}
    </div>
    
  )
}

export default SignUp
