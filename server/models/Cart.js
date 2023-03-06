import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
