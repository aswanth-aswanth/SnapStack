import express from 'express';
import { register, login, resetPassword, forgotPassword } from '../controllers/authController';
import { registerValidation, loginValidation, resetPasswordValidation } from '../validations/authValidation';
import validationMiddleware from '../middlewares/validationMiddleware';

const router = express.Router();

router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.post('/reset-password/:token', resetPasswordValidation, validationMiddleware, resetPassword);
router.post('/forgot-password', forgotPassword);

export default router;
