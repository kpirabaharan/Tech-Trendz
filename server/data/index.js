import mongoose from 'mongoose';

// Temporary Data

const productIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const products = [
  {
    _id: productIds[0],
    name: 'Macbook Air',
    brand: 'Apple',
    cost: 1999.99,
    description: 'Powerful light Laptop',
    rating: 9,
    category: 'Computer',
    picturePath: 'Macbook-Air.jpeg',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[1],
    name: 'iPhone 14',
    brand: 'Apple',
    cost: 1099.99,
    description: 'Smartphone',
    rating: 8,
    category: 'Phone',
    picturePath: 'iPhone-14.jpeg',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
];
