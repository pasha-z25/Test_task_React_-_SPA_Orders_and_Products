import express from 'express';
import * as userController from '../controllers/users';

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.addUser);

router.put('/:id', userController.updateUser);

router.patch('/:id', userController.updateUser);

export default router;
