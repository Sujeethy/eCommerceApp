import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/SideBar";
import axios from "axios";
import { Download } from 'lucide-react'; // Importing Lucide icon
import { generateInvoicePDF } from "../utils/generateInvoicePDF";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/order/");
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  

  return (
    <div className="flex-1 p-6 z-10 overflow-y-auto" id="Content">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        {loading ? (
          <p className="text-gray-400">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-400">No orders found</p>
        ) : (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-800 rounded-lg p-4 shadow-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    <span className="font-bold">Order ID:</span> {order.orderId}
                  </h2>
                  <p className="text-gray-400">
                    <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400"><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
                  <p className="text-gray-400">
                    <strong>Payment Status:</strong> {order.payment.paymentStatus}
                  </p>
                  <p className="text-gray-400"><strong>Order Status:</strong> {order.status}</p>
                  <div className="mt-2">
                  <p><strong>Product Details:</strong> </p>
                    {order.products.map((product) => (
                      
                      <div
                        key={product.productId}
                        className="flex justify-between py-1"
                      >
                        <p>{product.name} </p>

                        <p>
                          ${product.price.toFixed(2)} x {product.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <Download
                  className="text-blue-500 cursor-pointer"
                  onClick={() => generateInvoicePDF(order)}
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
  );
};

export default OrdersPage;
