import Stripe from 'stripe';

import Order from '../models/Order.js';
import User from '../models/User.js';

const makeOrder = async (userId) => {
  const user = await User.findById(userId);

  const products = user.cart.items.map((prod) => {
    return {
      productId: prod.productId,
      name: prod.name,
      brand: prod.brand,
      cost: prod.cost,
      picturePath: prod.picturePath,
      quantity: prod.quantity,
    };
  });
  const totalAmount = user.cart.totalAmount;
  const totalQuantity = user.cart.totalQuantity;

  return {
    order: new Order({
      products,
      totalAmount,
      totalQuantity,
      user: user._id,
      date: Date.now(),
    }),
    user: user,
  };
};

export const getOrder = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).populate(
      'user',
      'firstName lastName email',
    );

    res.status(200).json({
      orders: orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const postOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: user.cart.items.map((product) => {
        return {
          price_data: {
            currency: 'cad',
            product_data: { name: product.name },
            unit_amount: (product.cost * 100).toFixed(0),
          },
          quantity: product.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/payment/success`,
      cancel_url: `${process.env.SERVER_URL}/cart`,
    });

    res.status(201).json({
      url: session.url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const successfulOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const { user, order } = await makeOrder(userId);
    await order.save();

    const orders = await Order.find({ userId }).populate(
      'user',
      'firstName lastName email',
    );

    await user.clearCart();

    res.status(201).json({
      orders: orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
