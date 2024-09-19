import express from 'express';
import { uploadImages, editImageInBatch, deleteImageInBatch, rearrangeImages } from '../controllers/imageController';
import { imageUploadValidation, imageEditValidation, imageRearrangeValidation } from '../validations/imageValidation';
import validationMiddleware from '../middlewares/validationMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import upload from '../middlewares/multerMiddleware'; 

const router = express.Router();

router.post('/upload',authMiddleware, upload.array('images'), imageUploadValidation, validationMiddleware, uploadImages);
router.put('/edit/:id', authMiddleware, imageEditValidation, validationMiddleware, editImageInBatch);
router.delete('/delete/:id', authMiddleware, deleteImageInBatch);
router.post('/rearrange', authMiddleware, imageRearrangeValidation, validationMiddleware, rearrangeImages);

export default router;
