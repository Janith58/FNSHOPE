import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderListingByProduct = () => {
  const { productId } = useParams();
  const [productOrders, setProductOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProductOrders();
  }, [productId]);

  const fetchProductOrders = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`/api/order/product/${productId}`);
      const data = await res.json();

      if (res.ok) {
        setProductOrders(data);
      } else {
        
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600 animate-pulse">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-medium text-lg">
          Failed to load orders. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-screen-lg">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">
          Orders for Selected Product
        </h1>

        {productOrders.length > 0 ? (
          <ul className="space-y-8">
            {productOrders.map((order) => (
              <li
                key={order._id}
                className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform"
              >
                {/* Header Section */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Order ID: <span className="text-green-600">{order._id}</span>
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <hr className="border-gray-200" />

                {/* Customer & Status */}
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <p className="text-gray-700 font-medium">
                      Customer: {order.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Email: {order.user?.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Status:</span> {order.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Payment:</span>{" "}
                      {order.paymentStatus}
                    </p>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-sm text-gray-700 font-semibold">
                    Shipping Address:
                  </h3>
                  <p className="text-sm text-gray-600">{order.shippingAddress?.address}</p>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
                  </p>
                  <p className="text-sm text-gray-600">{order.shippingAddress?.country}</p>
                </div>

                {/* Items Section */}
                <div>
                  <h3 className="text-sm text-gray-700 font-semibold">Items:</h3>
                  <ul className="pl-4 list-disc text-sm text-gray-600">
                    {order.items.map((item) => (
                      <li key={item.product}>
                        {item.quantity} x {item.product.name} - ${item.price}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Section */}
                <div className="flex justify-end items-center mt-4">
                  <p className="text-green-600 font-bold text-lg">
                    Total: ${order.totalAmount}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center text-lg">
            No orders found for this product.
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderListingByProduct;
