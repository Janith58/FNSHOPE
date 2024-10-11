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
    <header className='bg-slate-500 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-900'>FN</span>
            <span className='text-slate-900'>SHOPE</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input
            onChange={(e) => setSearchTerms(e.target.value)}
            value={searchTerms}
            type="search"
            placeholder="Search..."
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <button type="submit">
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-1000 hover:underline'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-1000 hover:underline'>About</li>
          </Link>
          <Link to='/create_listing'>
            {currentUser && (
              <li className='hidden sm:inline text-slate-1000 hover:underline'>Listing</li>
            )}
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
            ) : (
              <li className='hidden sm:inline text-slate-1000 hover:underline'>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
