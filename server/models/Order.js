import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: Object, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    user: {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    },
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;
