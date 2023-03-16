import User from '../models/User.js';
import Product from '../models/Product.js';

export const addToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    console.log(productId);
    console.log(userId);
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    await user.addToCart(productId, product.name, product.cost);
    res
      .status(201)
      .json({ items: user.cart.items, total: user.cart.totalAmount });
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
