import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorHandler';

const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;

  statusCode = statusCode || 500;
  message = message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorMiddleware;
