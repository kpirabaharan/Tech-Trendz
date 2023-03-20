import mongoose, { Types } from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: String, required: true },
        name: { type: String, rquired: true },
        brand: { type: String, required: true },
        cost: { type: Number, required: true },
        picturePath: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;
