import 'dotenv/config';
import colors from 'colors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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
