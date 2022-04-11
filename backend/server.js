import 'dotenv/config';
import colors from 'colors';
import express from 'express';
import mongoose from 'mongoose';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

try {
  const connect = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB: ${connect.connection.host}`.cyan.underline);
} catch (error) {
  console.error(`error: ${error.message}`.red.underline.bold);
  process.exit(1);
}

app.listen(port, () =>
  console.log(`ProShop listening on port ${port}`.yellow.underline)
);
