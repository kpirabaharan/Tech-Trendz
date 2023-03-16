import User from '../models/User.js';
import Product from '../models/Product.js';

export const fetchCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json({
      items: user.cart.items,
      totalAmount: user.cart.totalAmount,
      totalQuantity: user.cart.totalQuantity,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    await user.addToCart(productId, product.name, product.cost);
    res.status(201).json({
      items: user.cart.items,
      totalAmount: user.cart.totalAmount,
      totalQuantity: user.cart.totalQuantity,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};