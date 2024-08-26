// routes/order.route.js
import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { createOrder,getOrders } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createOrder);
router.get('/', verifyToken, getOrders);
export default router;
