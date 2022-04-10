import 'dotenv/config';
import colors from 'colors';
import express from 'express';
import mongoose from 'mongoose';
import products from '../data/products.js';

const app = express();
const port = process.env.PORT || 4000;

app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products/:id', (req, res) =>
  res.json(products.find((product) => product._id === req.params.id))
);

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
