import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Search = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading,setLoading]=useState(false);
  const [listing, setListing] = useState([]);
  console.log(listing)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    offer: false,
    sort: 'created_at',
    order: 'desc',
    brand: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setSidebardata((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setSidebardata((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    urlParams.set('brand', sidebardata.brand);
    urlParams.set('category', sidebardata.category);
    
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);  // Removed extra `'?'` from the previous code
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermUrl = urlParams.get('searchTerm');
    const offerUrl = urlParams.get('offer');
    const sortUrl = urlParams.get('sort');
    const orderUrl = urlParams.get('order');
    const brandUrl = urlParams.get('brand');
    const categoryUrl = urlParams.get('category');

    if (searchTermUrl || offerUrl || sortUrl || orderUrl || brandUrl || categoryUrl) {
      setSidebardata({
        searchTerm: searchTermUrl || '',
        offer: offerUrl === 'true',
        sort: sortUrl || 'created_at',
        order: orderUrl || 'desc',
        brand: brandUrl || '',
        category: categoryUrl || '',
      });

      const fetchingListing = async()=>{
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListing(data);
        setLoading(false);
      }
      fetchingListing();
    }
  }, [location.search]);  // `location.search` is the query string part of the URL

 
 

  return (
    <div className="text-center bg-green-100 p-5">
      <div className="flex items-center">
        <div className="flex-grow text-center">
          <p className="flex justify-center font-semibold text-3xl text-slate-700">Listing result</p>
        </div>
        <div>
          <button
            className="flex justify-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={toggleDrawer}
          >
            Show drawer form
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white w-80 dark:bg-gray-800"
          role="dialog"
          aria-modal="true"
        >
          <h5
            id="drawer-label"
            className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
          >
            More search
          </h5>

          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={toggleDrawer}
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-6">
              <label
                htmlFor="searchTerm"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Search Term
              </label>
              <input
                type="text"
                id="searchTerm"
                name="searchTerm"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Term"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Brand"
                value={sidebardata.brand}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={sidebardata.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="textile">Textile Crafts</option>
                <option value="pottery">Pottery and Ceramics</option>
                <option value="jewelry">Jewelry Making</option>
                <option value="wood">Wood Crafts</option>
                <option value="glass">Glass Crafts</option>
              </select>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-4">
                <input
                  id="offer"
                  name="offer"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={sidebardata.offer}
                  onChange={handleChange}
                />
                <label
                  htmlFor="offer"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Offer
                </label>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Search;
