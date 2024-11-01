import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from './component/ListingItem';

const HomePage = () => {
  const [offerListing, setOfferListing] = useState([]);  
  const [saleListing, setSaleListing] = useState([]);    

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch('/api/listing/get');
        const data = await res.json();
        setOfferListing(data);  
      } catch (error) {
        console.error(error);
      }
    };
    fetchOfferListing();
  }, []);

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Hero Section */}
      <section className="text-center py-20 shadow-md rounded-lg">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-gray-800">WELCOME TO FNSHOPE</h2>
          <p className="text-xl text-gray-600 mt-4">Your one-stop shop for sustainable products</p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto py-14 p-12">
        {offerListing && offerListing.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
            {offerListing.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-gray-800">Why Choose Us?</h3>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            We offer eco-friendly products that are sustainable, high-quality, and affordable. We are dedicated to reducing our carbon footprint.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 FNSHOPE. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
