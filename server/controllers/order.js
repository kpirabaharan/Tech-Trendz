import Stripe from 'stripe';

import Order from '../models/Order.js';
import User from '../models/User.js';

export const getOrder = async (req, res) => {
  // const { userId } = req.params;
};

export const postOrder = async (req, res) => {
  try {
    const { userId } = req.body;
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

    const order = new Order({
      products,
      totalAmount,
      totalQuantity,
      userId: user._id,
    });
    await order.save();

    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: order.products.map((product) => {
        return {
          price_data: {
            currency: 'cad',
            product_data: { name: product.name },
            unit_amount: product.cost * 100,
          },
          quantity: product.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/payment/success`,
      cancel_url: `${process.env.SERVER_URL}/payment/cancel`,
    });

    res.status(201).json({
      url: session.url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
