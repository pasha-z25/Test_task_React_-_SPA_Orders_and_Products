import * as orderController from '@/controllers/orders';
import express from 'express';

const router = express.Router();

router.get('/', orderController.getOrders);

router.get('/:id', orderController.getOrderById);

router.post('/', orderController.addOrder);

router.patch('/:id', orderController.updateOrder);

router.delete('/:id', orderController.deleteOrder);

export default router;
