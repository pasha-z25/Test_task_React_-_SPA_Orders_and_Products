import express from 'express';
import * as orderController from '../controllers/orders';

const router = express.Router();

router.get('/', orderController.getOrders);

router.get('/:id', orderController.getOrderById);

router.post('/', orderController.addOrder);

router.put('/:id', orderController.updateOrder);

router.delete('/:id', orderController.deleteOrder);

export default router;
