import express from 'express';
import * as userController from '../controllers/auth';

const router = express.Router();

router.get('/users', userController.users);

router.post('/login', userController.login);

router.post('/register', userController.register);

export default router;
