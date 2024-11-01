import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerms, setSearchTerms] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerms); 
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`); 
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get('searchTerm'); 
    if (searchTerm) {
      setSearchTerms(searchTerm); 
    }
  }, [location.search]); 

  return (
    <header className='bg-slate-700 shadow-lg'>
      <div className='flex justify-between items-center max-w-7xl mx-auto px-4 py-3'>
        {/* Brand Logo */}
        <Link to='/'>
          <h1 className='font-bold text-xl flex flex-wrap'>
            <span className='text-white'>FN</span>
            <span className='text-green-500'>SHOPE</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form 
          onSubmit={handleSubmit} 
          className='bg-white p-2 rounded-full flex items-center shadow-sm border border-gray-300'
        >
          <input
            onChange={(e) => setSearchTerms(e.target.value)}
            value={searchTerms}
            type="search"
            placeholder="Search..."
            className='bg-transparent px-2 w-32 sm:w-64 focus:outline-none text-gray-700'
          />
          <button 
            type="submit"
            className="flex justify-center items-center bg-green-600 text-white p-2 rounded-full hover:bg-green-500 transition duration-300"
          >
            <FaSearch />
          </button>
        </form>

        {/* Navigation Links */}
        <ul className='flex gap-4 items-center'>
          <Link to='/'>
            <li className='hidden sm:inline text-white hover:text-green-400 transition duration-300'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-white hover:text-green-400 transition duration-300'>
              About
            </li>
          </Link>
          <Link to='/create_listing'>
            {currentUser && (
              <li className='hidden sm:inline text-white hover:text-green-400 transition duration-300'>
                Listing
              </li>
            )}
          </Link>
          <Link to='/profile' className='relative ' >
            {currentUser ? (
              <>
              <img 
                className='rounded-full h-9 w-9 object-cover border-2 border-green-500 '
                src={currentUser.avatar} 
                alt='profile' 
              />
              <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>

              </>
            ) : (
              <li className='hidden sm:inline text-white hover:text-green-500 transition duration-300'>
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
