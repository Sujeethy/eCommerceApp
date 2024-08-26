import { User } from '../models/user.model.js';
import axios from 'axios';

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId.toString());

        if (cartItemIndex > -1) {
            user.cart[cartItemIndex].quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }

        await user.save();
        res.status(200).send(user.cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send('Server Error: ' + error.message);
    }
};

export const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId.toString());

        if (cartItemIndex > -1) {
            user.cart.splice(cartItemIndex, 1);
            await user.save();
            res.status(200).send("Product removed from cart");
        } else {
            res.status(404).send('Product not found in cart');
        }
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).send('Server Error: ' + error.message);
    }
};

export const fetchCartProducts = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        const baseUrl = 'https://dummyjson.com/products/';
        const productRequests = user.cart.map(item => axios.get(`${baseUrl}${item.productId}`));
        const productResponses = await Promise.all(productRequests);

        const products = productResponses.map((response, index) => ({
            ...response.data,
            quantity: user.cart[index].quantity,
        }));
        res.status(200).send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send("dummyjson.com fetching products failed: " + error.message);
    }
};
