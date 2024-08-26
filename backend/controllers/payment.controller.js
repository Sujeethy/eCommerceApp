import Stripe from 'stripe';
import { User } from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const API = process.env.STRIPE_SERVER
const stripe = Stripe(API);

export const handlePaymentAndCreateOrder = async (req, res) => {
  const { amount, products, total, paymentMethodId } = req.body; 
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
