import cors from 'cors';
import express, { json } from "express"
import globalErrorHandler from './errorHandler/globalErrorHandler.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    throw new Error('hello')
    res.status(200).json('server is running');
  });
  app.use((req, res, next) => {
    res.status(400).json({
      success: false,
      message: 'Not found',
      errorMessages: [
        {
          path: req.originalUrl,
          message: 'API not found',
        },
      ],
    });
    next();
  });
  app.use(globalErrorHandler);
  export default app;