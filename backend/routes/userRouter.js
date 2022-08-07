import express from 'express';
import { getUsers, registerUser, userLogin } from '../controllers/userController.js';
const router = express.Router();

router.get('/', getUsers);
router.post('/register', registerUser);
router.post('/login', userLogin);

export default router;
