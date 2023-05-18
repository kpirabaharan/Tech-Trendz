import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String, required: true },
    new: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    category: { type: String, required: true },
    picturePath: { type: String, default: '' },
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
