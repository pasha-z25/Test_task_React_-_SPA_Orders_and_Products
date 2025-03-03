import express from 'express';
import * as userController from '../controllers/users';

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.addUser);

router.patch('/:id', userController.updateUser);

export default router;
