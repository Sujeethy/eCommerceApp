import express from 'express';
import { handlePaymentAndCreateOrder } from '../controllers/payment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/process', verifyToken, handlePaymentAndCreateOrder);

export default router;
