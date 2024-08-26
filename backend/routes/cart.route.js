import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
    addToCart,
    removeFromCart,
    fetchCartProducts
} from '../controllers/cart.controller.js';

const router = express.Router();

// Route to add an item to the cart
router.post('/add', verifyToken, addToCart);

// Route to remove an item from the cart
router.delete('/remove/:productId', verifyToken, removeFromCart);

// Route to get the user's cart
router.get('/', verifyToken, fetchCartProducts);

export default router;
