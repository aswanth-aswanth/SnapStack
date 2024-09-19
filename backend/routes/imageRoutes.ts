import express from 'express';
import { 
  uploadImages, 
  fetchImagesByUserId,
  updateImageBatch 
} from '../controllers/imageController';
import { 
  imageUploadValidation, 
  updateImageBatchValidation 
} from '../validations/imageValidation';
import validationMiddleware from '../middlewares/validationMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import upload from '../middlewares/multerMiddleware'; 

const router = express.Router();

router.post('/upload', authMiddleware, upload.array('images'), imageUploadValidation, validationMiddleware, uploadImages);
router.get('/user', authMiddleware, fetchImagesByUserId);

router.put('/batch/:batchId', authMiddleware, upload.array('images'), updateImageBatchValidation, validationMiddleware, updateImageBatch);

export default router;