import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from './component/ListingItem';

const Search = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [showMore,setShowMore] = useState(false);

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

    setSidebardata((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
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
    navigate(`/search?${searchQuery}`);  
    setIsDrawerOpen(false);
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

      const fetchingListing = async () => {
        setLoading(true);
        setShowMore(false)
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListing(data);
        setLoading(false);
        if(data.length>8){
          setShowMore(true);
        }
      };
      fetchingListing();
    }
  }, [location.search]); 

  const onShowMoreClick = async ()=>{
    const numberOfListing=listing.length;
    const startIndex=numberOfListing;
    const urlParams=new URLSearchParams(location.search);
    urlParams.set('startIndex',startIndex);
    const searchQuery=urlParams.toString();
    const res=await fetch(`/api/listing/get?${searchQuery}`)
    const data=await res.json();
    if(data.length>9){
      setShowMore(false);
    }
    setListing([...listing,...data]);
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center p-5 bg-white shadow-md rounded-lg">
        <div className="flex-grow text-center">
          <p className="font-semibold text-3xl text-slate-700">Listing Results</p>
        </div>
        <div>
          <button
            className="bg-green-600 text-white rounded-lg px-5 py-2.5 hover:bg-green-700 focus:ring-4 "
            onClick={toggleDrawer}
          >
            More Search
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-white w-80 shadow-lg transition-transform"
          role="dialog"
          aria-modal="true"
        >
          <div className='p-1 bg-green-700 text-center rounded-lg self-center'>
            <h5 className="mb-6 text-base font-semibold text-white uppercase self-center">More Search</h5>
          </div>
          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center"
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
              <label htmlFor="searchTerm" className="block mb-2 text-sm font-medium text-gray-900">Search Term</label>
              <input
                type="text"
                id="searchTerm"
                name="searchTerm"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Search Term"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
              <input
                type="text"
                id="brand"
                name="brand"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Brand"
                value={sidebardata.brand}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
              <select
                id="category"
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
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
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-600"
                  checked={sidebardata.offer}
                  onChange={handleChange}
                />
                <label htmlFor="offer" className="ml-2 text-sm font-medium text-gray-900">Offer</label>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-lg px-5 py-2.5 hover:bg-green-500 focus:ring-4 focus:ring-blue-300"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}
      <section className='container mx-auto py-14 p-12'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {!loading && listing.length === 0 && (
          <div className="col-span-full flex justify-center">
            <p className="text-2xl text-slate-700 font-semibold">No listings found</p>
          </div>
        )}
        {loading && (
          <div className="col-span-full flex justify-center items-center">
            <p className="text-2xl text-slate-700 text-center">Loading...</p>
          </div>
        )}
        {!loading && listing.map((listing) => (
          <ListingItem key={listing._id} listing={listing} />
        ))}
        
      </div>
    </section>
      {showMore && (
          <button onClick={()=>{
            onShowMoreClick()
            }}
            className='text-green-700 hover:underline text-center p-7 w-full'
            >
            Show More
          </button>
        )}
    </div>
  );
};

export default Search;
