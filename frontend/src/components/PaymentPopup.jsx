import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useStore } from "../store/useStore.js";
import toast from "react-hot-toast";

const stripePromise = loadStripe('pk_test_51PrRxtKoaoIevQJ0u48zLTd3gZMHotHkhZWk0ppbnW2DEv90gYTmsnx7LvGRsB6N5iIiWAqqWsLSuKuZHRQmHBkY00cks24Fv6');

const PaymentPopup = ({ onClose }) => {
  const { total, cart, fetchCart } = useStore();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  
  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
  
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:5000/api/payment/process', {
        amount: total.toFixed(2) * 100,
        products: cart,
      });
  
      const { clientSecret } = response.data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer',
          },
        },
      });
  
      if (error) {
        toast.error('Payment failed: ' + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        await axios.post('http://localhost:5000/api/order/create', {
          paymentId: paymentIntent.id,
          paymentStatus: paymentIntent.status,
          total: total.toFixed(2),
          products: cart.map(product => ({
            name: product.title,
            productId: product.id,
            price: product.price,
            quantity: product.quantity
          }))
        });
        fetchCart();
        onClose();
      }
    } catch (error) {
      toast.error('Error processing payment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-white">Payment</h2>
        <p className="text-gray-300">Total: ${total.toFixed(2)}</p>
        <form onSubmit={handlePayment} className="mt-4">
          <CardElement className="mb-4 border rounded p-2 text-white" />
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

const WrappedPaymentPopup = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentPopup {...props} />
  </Elements>
);

export default WrappedPaymentPopup;
