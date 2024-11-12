import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const OrderList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/order/${currentUser._id}`);
        const data = await res.json();
        setOrders(data); 
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser._id]);
  
  console.log(orders)


  const allItems = orders.flatMap(order =>
    order.items.map(item => ({
      ...item,
      orderId: order._id,
      orderTotalAmount: order.totalAmount,
      name:order.name
    }))
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  hover:text-green-400 ">
          <tr>
            <th scope="col" className="px-6 py-3  hover:text-green-400 ">Order ID</th>
            <th scope="col" className="px-6 py-3  hover:text-green-400 ">Product Name</th>
            <th scope="col" className="px-6 py-3  hover:text-green-400 ">Quantity</th>
            <th scope="col" className="px-6 py-3  hover:text-green-400 ">Price</th>
            <th scope="col" className="px-6 py-3  hover:text-green-400 ">Total Price</th>
            <th scope="col" className="px-6 py-3 text-right  hover:text-green-400 ">Edit</th>
          </tr>
        </thead>
        <tbody>
          {allItems.length > 0 ? (
            allItems.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4  hover:text-green-400 ">{item.orderId}</td>
                <td className="px-6 py-4  hover:text-green-400 ">{item.name}</td>
                <td className="px-6 py-4  hover:text-green-400 ">{item.quantity}</td>
                <td className="px-6 py-4  hover:text-green-400 ">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4  hover:text-green-400 ">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="px-6 py-4 text-right  hover:text-green-400 ">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center">No items available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
