import * as productController from '@/controllers/products';
import express from 'express';

const router = express.Router();

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);

router.post('/', productController.addProduct);

router.patch('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

export default router;
