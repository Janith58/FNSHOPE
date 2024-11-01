import React from 'react';
import { Link } from 'react-router-dom';

export default function ListingItem({ listing }) {
  return (
    <div className="max-w-[300px] h-[400px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link to={`/listing/${listing._id}`}>
        <div className='p-3'>
        <img
          className="w-full h-[200px] object-cover rounded-t-lg transition-opacity duration-300 hover:opacity-90"
          src={listing.imageUrls[0]}
          alt={listing.title}
        />
        </div>
        <div className="p-4 flex flex-col justify-between h-[calc(100%-220px)]">
          <h5 className="text-xl font-semibold text-gray-900 truncate">
            {listing.description || 'Description'}
          </h5>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
            {listing.description ||
              'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'}
          </p>
          <div className="mt-4 flex justify-between items-center ">
            <span className="text-lg font-bold text-green-600">
              {listing.price ? `$${listing.price}` : 'Contact for price'}
            </span>
            <button className="text-sm text-white bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
