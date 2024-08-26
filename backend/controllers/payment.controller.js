import Stripe from 'stripe';
import { User } from '../models/user.model.js';


const stripe = Stripe('sk_test_51PrRxtKoaoIevQJ0V8b8oEYHBKd3KZ8z9tdysIpbFkVFEB6vSRGVzAaer1Kl2yl8ZwRSiDJKuhTRZ6MXXS9IB1tT00YzeopY5c'); // Replace with your Stripe secret key

export const handlePaymentAndCreateOrder = async (req, res) => {
  const { amount, products, total, paymentMethodId } = req.body; // Amount in cents, paymentMethodId from frontend
  const userId = req.userId;
  const user = await User.findById(userId);
      if (!user) return res.status(404).send('User not found');

  try {
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd', // Use 'inr' for Indian Rupees
        automatic_payment_methods: { enabled: true },
       
      });
      
      
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });

    
  } catch (error) {
    console.error('Error processing payment and creating order:', error);
    res.status(500).json({ error: error.message });
  }
};
