import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Minus, Plus } from "lucide-react";
import { useStore } from "../store/useStore.js";
import PaymentPopup from "../components/PaymentPopup";


const CartPage = () => {
  const { cart, updateCartQuantity, removeCartItem, total, fetchCart } = useStore();
  const [loading, setLoading] = useState(true);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  useEffect(() => {
    fetchCart();
    setLoading(false);
  }, []);
  
  return (
    <div className="flex-1 p-6 z-10 overflow-y-auto" id="Content">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        {loading ? (
          <p className="text-gray-400">Loading cart items...</p>
        ) : cart.length === 0 ? (
          <p className="text-gray-400">Your cart is empty</p>
        ) : (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {cart.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <div className="text-gray-400 mt-2 flex items-center justify-between">
                    <p>${product.price}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(product.id, -1)}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                        disabled={product.quantity === 1}
                      >
                        <Minus className="w-4 h-4 text-gray-300" />
                      </button>
                      <span className="text-gray-100">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(product.id, 1)}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                      >
                        <Plus className="w-4 h-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => removeCartItem(product.id)}
                        className="p-2 rounded-full bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4 text-gray-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-gray-800 rounded-lg p-4 mt-4 shadow-lg">
              <h2 className="text-lg font-semibold">Total</h2>
              <p className="text-gray-400">${total.toFixed(2)}</p>
              <button
                onClick={() => setShowPaymentPopup(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        )}
      {showPaymentPopup && <PaymentPopup onClose={() => setShowPaymentPopup(false)} />}
    </div>
  );
};

export default CartPage;
