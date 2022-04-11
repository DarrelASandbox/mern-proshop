import 'dotenv/config';
import colors from 'colors';
import mongoose from 'mongoose';
import products from './data/products.js';
import users from './data/users.js';
import { Order, Product, User } from './models/index.js';

try {
  const connect = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB: ${connect.connection.host}`.cyan.underline);
} catch (error) {
  console.error(`error: ${error.message}`.red.underline.bold);
  process.exit(1);
}

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') destroyData();
importData();
