import express from 'express';
import { uploadImages, editImage, deleteImage, rearrangeImages } from '../controllers/imageController';
import { imageUploadValidation, imageEditValidation, imageRearrangeValidation } from '../validations/imageValidation';
import validationMiddleware from '../middlewares/validationMiddleware';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/upload', authMiddleware, imageUploadValidation, validationMiddleware, uploadImages);
router.put('/edit/:id', authMiddleware, imageEditValidation, validationMiddleware, editImage);
router.delete('/delete/:id', authMiddleware, deleteImage);
router.post('/rearrange', authMiddleware, imageRearrangeValidation, validationMiddleware, rearrangeImages);

export default router;
