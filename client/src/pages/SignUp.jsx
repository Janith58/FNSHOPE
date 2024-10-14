import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GoogleAuth from './component/GoogleAuth';

const SignUp = () => {
  const [formaData, setFormData] = useState({});
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlChange = (e) => {
    setFormData({ ...formaData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formaData),
      });
      const data = await response.json();
      if (data.success === false) {
        setErrors(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setErrors(null);
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setErrors(data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          id="username"
          onChange={handlChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          id="email"
          onChange={handlChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          id="password"
          onChange={handlChange}
        />
        <button
          disabled={loading}
          className="bg-green-600 text-white p-4 font-bold rounded-lg hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <GoogleAuth />
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600">Already have an account?{' '}
          <Link to="/signin" className="text-indigo-600 hover:underline">Sign in</Link>
        </p>
      </div>

      {errors && <p className="text-red-600 mt-4 text-center">{errors}</p>}
    </div>
  );
};

export default SignUp;
