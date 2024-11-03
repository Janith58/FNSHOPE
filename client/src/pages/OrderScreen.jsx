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
  // console.log(shippingAddress)
  // console.log(qty)
  // console.log(listing.price)
  // console.log(listing._id)
  const handleOrderCreation = async () => {
    try {
      const response = await fetch(`/api/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listing_id: listing._id,
          quantity: qty,
          paymentMethod: "PayPal",
          totalAmount: listing.price * qty,
          shippingAddress,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        setOrderCreated(true);
        alert('order is created');
      } else {
        alert('Failed to create order');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  if (!listing) {
    return <p>No listing found. Please return to the previous page.</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">{listing.name}</h2>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-semibold">Price: ${listing.price}</p>
        <div className="flex items-center">
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
      </div>

      {/* Shipping Address Section */}
      <div className="mb-6 p-4 bg-gray-100 rounded-md shadow">
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

      <button
        onClick={handleOrderCreation}
        className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 transition-all duration-200 mb-4"
      >
        Create Order
      </button>
      {/* {orderCreated && (
        <PayPalScriptProvider options={{ "client-id": "your-client-id" }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{ amount: { value: (listing.price * qty).toString() } }],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert("Payment completed!");
              });
            }}
          />
        </PayPalScriptProvider>
      )} */}
    </div>
  );
};

export default OrderScreen;
