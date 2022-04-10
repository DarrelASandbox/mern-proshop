import 'dotenv/config';
import express from 'express';
import products from '../data/products.js';

const app = express();
const port = process.env.PORT || 4000;

app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products/:id', (req, res) =>
  res.json(products.find((product) => product._id === req.params.id))
);

app.listen(port, () => console.log(`ProShop listening on port ${port}`));
