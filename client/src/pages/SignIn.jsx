import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import GoogleAuth from './component/GoogleAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, errors } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg mt-12 border border-gray-200">
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            id="email"
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            id="password"
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          className="w-full p-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-60"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="mt-4">
          <GoogleAuth/>
        </div>
      </form>

      <div className="text-center mt-6 text-sm text-gray-600">
        <p>Don't have an account?</p>
        <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-semibold">
          Sign Up
        </Link>
      </div>

      {errors && <p className="text-red-600 text-center mt-4">{errors}</p>}
    </div>
  );
};

export default SignIn;
