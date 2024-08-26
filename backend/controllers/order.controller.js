import { User } from '../models/user.model.js';
import { ORDER_PLACED_TEMPLATE } from '../mail/emailTemplates.js';
import {sendOrderConfirmationEmail} from '../mail/emails.js';
export const createOrder = async (req, res) => {
  const { products, total, paymentId, paymentStatus } = req.body;
  const userId = req.userId;

  try {
    
    for (const product of products) {
      if (!product.productId || !product.quantity || !product.price|| !product.name) {
        return res.status(400).send('Missing required fields in product data');
      }
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    const order = {
      orderId: Date.now().toString(), 
      products,
      total,
      status: 'pending',
      payment: {
        paymentId,
        paymentStatus
      }
    };

    user.orders.push(order);
    user.cart = []; // Clear the cart after order is placed
    await user.save();
    console.log("successfully")
    await sendOrderConfirmationEmail(user.email, order);
    res.status(201).send(order); // Return the created order with status 201
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getOrders =  async (req, res) => {
  try{
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user.orders);
  }
  catch(error){
    res.status(500).send(error.message);
  }

}
