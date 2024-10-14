import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function GoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(getAuth(app), provider);

      const res = await fetch('api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Could not sign in with Google', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="w-full bg-red-600 text-white p-4 rounded-lg text-lg font-bold uppercase hover:opacity-90 transition duration-300 ease-in-out transform hover:bg-red-700 focus:ring-2 focus:ring-red-500"
    >
      Continue with Google
    </button>
  );
}
