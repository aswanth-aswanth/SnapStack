import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import imageRoutes from './routes/imageRoutes';
import { connectDB } from './config/db';
import errorMiddleware from './middlewares/errorMiddleware';
import { ENV } from './config/env';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

app.use(errorMiddleware);

export default app;
