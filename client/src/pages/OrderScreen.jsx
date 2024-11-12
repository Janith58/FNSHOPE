import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const OrderScreen = () => {
  const location = useLocation();
  const { listing } = location.state || {};
  const [qty, setQty] = useState(1);
  const [orderCreated, setOrderCreated] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  console.log(listing._id)
  console.log()
  const handleOrderCreation = async () => {
    try {
      const response = await fetch(`/api/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              product: listing._id,
              quantity: qty,
              price: listing.price,
            },
          ],
          paymentMethod: "PayPal",
          totalAmount: listing.price * qty,
          shippingAddress,
          name:listing.name,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        setOrderCreated(true);
        alert('Order is created');
      } else {
        alert('Failed to create order');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };
  console.log(listing.name)
  if (!listing) {
    return <p>No listing found. Please return to the previous page.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      {/* Listing Details Row */}
      <div className="flex items-center mb-6 p-4 bg-gray-100 rounded-lg shadow">
        {/* Listing Image */}
        <img 
          src={listing.imageUrls?.[0]} 
          alt={listing.name} 
          className="h-24 w-24 object-cover rounded-md mr-4" 
        />
        {/* Listing Info */}
        <div className="flex flex-col justify-between ">
          <h2 className="text-xl font-semibold">{listing.name}</h2>
          
        </div>
        {/* Total Price Section */}
        <div className="ml-auto text-right">
          <p>Single Price: ${listing.price}</p>
          <p className="text-xl font-semibold">
            Total Amount: ${listing.price * qty}
          </p>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="mb-6 flex items-center">
        <label className="mr-2">Quantity:</label>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        >
          {[...Array(listing.quantity).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Shipping Address Section */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
        <input
          type="text"
          placeholder="Address"
          className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          value={shippingAddress.address}
          onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="City"
          className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          value={shippingAddress.city}
          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          value={shippingAddress.postalCode}
          onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Country"
          className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          value={shippingAddress.country}
          onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
          required
        />
      </div>

      {/* Create Order Button */}
      <button
        onClick={handleOrderCreation}
        className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 transition-all duration-200 mb-4"
      >
        Create Order
      </button>
    </div>
  );
};

export default OrderScreen;
