import User from '../models/User.js';
import Product from '../models/Product.js';

export const fetchCart = async (req, res) => {
  const { userId } = req.params;
  try {
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
  const { productId, userId } = req.body;
  try {
    const user = await User.findById(userId);

    const product = await Product.findById(productId);

    await user.addToCart(
      productId,
      product.name,
      product.brand,
      product.cost,
      product.picturePath,
    );
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
  const { productId, userId } = req.body;
  try {
    const user = await User.findById(userId);

    await user.removeFromCart(productId);

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

export const removeAllFromCart = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const user = await User.findById(userId);

    await user.removeAllFromCart(productId);

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

export const clearCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);

    await user.clearCart();

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
