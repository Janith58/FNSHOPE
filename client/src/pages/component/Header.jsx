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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className='bg-slate-700 shadow-lg '>
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
                Start Sellin
              </li>
            )}
          </Link>
          <button>
          {currentUser && (
              <li className='hidden sm:inline text-white hover:text-green-400 transition duration-300'>
               <div
                  className="relative inline-block text-left"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <span
                    className="hidden sm:inline text-white hover:text-green-400 transition duration-300"
                  >
                    My Acount

                  </span>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div
                      className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <a
                            href="/profile"
                            className=" hover:text-green-400 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            My Profile
                          </a>
                        </li>
                        <li>
                          <a
                            href="/OrderListing"
                            className=" hover:text-green-400 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            Order List
                          </a>
                        </li>
                        <li>
                          <a
                            href="/productListing"
                            className=" hover:text-green-400 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            product
                          </a>
                        </li>
                        <li>
                          <a
                            href="orderDetails"
                            className=" hover:text-green-400 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 "
                          >
                            Sign out
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            )}
          </button>
          <Link className='relative ' >
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
              <Link to="/signin">
                <li className="text-white hover:text-green-500 transition duration-300">
                  Sign in
                </li>
              </Link>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
