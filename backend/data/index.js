import mongoose from 'mongoose';

// Temporary Data

const productIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
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
    new: false,
    rating: 5,
    category: 'Computer',
    picturePath: 'Macbook-Air.png',
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
    new: true,
    rating: 4,
    category: 'Phone',
    picturePath: 'iPhone-14.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[2],
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    cost: 1599.99,
    description: 'Smartphone',
    new: true,
    rating: 4,
    category: 'Phone',
    picturePath: 'iPhone-14-Pro.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[3],
    name: 'S23 Ultra',
    brand: 'Samsung',
    cost: 1599.99,
    description: 'Smartphone',
    new: true,
    rating: 4.5,
    category: 'Phone',
    picturePath: 'S23-Ultra.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[4],
    name: 'iPad Air',
    brand: 'Apple',
    cost: 799.99,
    description: 'Nice Tablet',
    new: false,
    rating: 4.5,
    category: 'Tablet',
    picturePath: 'iPad-Air.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[5],
    name: 'Macbook Pro',
    brand: 'Apple',
    cost: 2599.99,
    description: 'Powerful Laptop',
    new: true,
    rating: 5,
    category: 'Computer',
    picturePath: 'Macbook-Pro.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[6],
    name: 'Macbook Pro 2',
    brand: 'Apple',
    cost: 2599.99,
    description: 'Powerful Laptop',
    new: false,
    rating: 5,
    category: 'Computer',
    picturePath: 'Macbook-Pro.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[7],
    name: 'Macbook Pro 3',
    brand: 'Apple',
    cost: 2599.99,
    description: 'Powerful Laptop',
    new: false,
    rating: 5,
    category: 'Computer',
    picturePath: 'Macbook-Pro.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[8],
    name: 'Macbook Pro 4',
    brand: 'Apple',
    cost: 2599.99,
    description: 'Powerful Laptop',
    new: false,
    rating: 5,
    category: 'Computer',
    picturePath: 'Macbook-Pro.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[9],
    name: 'Macbook Pro 5',
    brand: 'Apple',
    cost: 2599.99,
    description: 'Powerful Laptop',
    new: false,
    rating: 5,
    category: 'Computer',
    picturePath: 'Macbook-Pro.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[10],
    name: 'Macbook Pro 6',
    brand: 'Apple',
    cost: 2599.99,
    description: 'Powerful Laptop',
    new: false,
    rating: 5,
    category: 'Computer',
    picturePath: 'Macbook-Pro.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[11],
    name: 'Macbook Pro 7',
    brand: 'Apple',
    cost: 2599.99,
    description: 'Powerful Laptop',
    new: false,
    rating: 5,
    category: 'Computer',
    picturePath: 'Macbook-Pro.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[12],
    name: 'Macbook Pro 8',
    brand: 'Apple',
    cost: 2599.99,
    description: 'Powerful Laptop',
    new: false,
    rating: 5,
    category: 'Computer',
    picturePath: 'Macbook-Pro.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[13],
    name: 'Macbook Pro 9',
    brand: 'Apple',
    cost: 2599.99,
    description: 'Powerful Laptop',
    new: false,
    rating: 5,
    category: 'Computer',
    picturePath: 'Macbook-Pro.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: productIds[14],
    name: 'Macbook Pro 10',
    brand: 'Apple',
    cost: 2599.99,
    description: 'Powerful Laptop',
    new: false,
    rating: 5,
    category: 'Computer',
    picturePath: 'Macbook-Pro.png',
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
];
