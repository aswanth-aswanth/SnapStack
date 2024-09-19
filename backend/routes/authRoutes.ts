import express from 'express';
import { register, login, resetPassword } from '../controllers/authController';
import { registerValidation, loginValidation, resetPasswordValidation } from '../validations/authValidation';
import validationMiddleware from '../middlewares/validationMiddleware';

const router = express.Router();

router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.post('/reset-password', resetPasswordValidation, validationMiddleware, resetPassword);

export default router;
