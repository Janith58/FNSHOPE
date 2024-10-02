import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className='mx-auto max-w-lg ' >
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-5'>
        <img src={currentUser.avatar} alt='profile' className='rounded-full self-center h-24 w-24 object-cover cursor-pointer mt-2'/>
        <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg'/>
        <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg'/>
        <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 hover:opacity-85 text-white font-bold p-3 px-4 rounded-lg'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-600 cursor-pointer'>Delete Acount</span>
        <span className='text-red-600 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile
