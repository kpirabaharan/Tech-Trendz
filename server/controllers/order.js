import Stripe from 'stripe';

import Order from '../models/Order.js';
import User from '../models/User.js';

const formatOrders = (orders) => {
  const formatDate = (date) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let year = date.getFullYear();
    let month = monthNames[date.getMonth()];
    let day = date.getDate().toString().padStart(2, '0');
    return `${month} ${day}, ${year}`;
  };

  orders.reverse();

  return orders.map((order) => {
    const date = new Date(order.date);
    const secondDate = new Date(date.getTime() + 345600000);

    const orderDate = formatDate(date);
    const estimatedDeliveryDate = formatDate(secondDate);
    return {
      orderId: order._id,
      orderFirstName: order.user.firstName,
      orderLastName: order.user.lastName,
      orderEmail: order.user.email,
      orderDate: orderDate,
      deliveryDate: estimatedDeliveryDate,
      products: order.products,
      totalAmount: order.totalAmount,
      totalQuantity: order.totalQuantity,
    };
  });
};

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

    const formattedOrders = formatOrders(orders);

    res.status(200).json({
      orders: formattedOrders,
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

    const formattedOrders = formatOrders(orders);

    await user.clearCart();

    res.status(201).json({
      orders: formattedOrders,
      items: user.cart.items,
      totalAmount: user.cart.totalAmount,
      totalQuantity: user.cart.totalQuantity,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
