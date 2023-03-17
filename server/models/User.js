import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String, required: true, min: 5 },
    cart: {
      items: [
        {
          productId: { type: String, required: true },
          name: { type: String, rquired: true },
          brand: { type: String, required: true },
          cost: { type: Number, required: true },
          picturePath: { type: String, required: true },
          quantity: { type: Number, required: true },
        },
      ],
      totalQuantity: { type: Number, required: true, default: 0 },
      totalAmount: { type: Number, required: true, default: 0 },
    },
  },
  { timestamps: true },
);

UserSchema.methods.addToCart = function (
  productId,
  name,
  brand,
  cost,
  picturePath,
) {
  /* Find Product Index in Cart if Exists */
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === productId.toString();
  });

  const updatedCartItems = [...this.cart.items];
  var updatedCost = 0;
  var updatedQuantity = 0;

  /* Create Product in Cart or Increase Quantity of Product */
  if (cartProductIndex >= 0) {
    updatedCartItems[cartProductIndex].quantity += 1;
  } else {
    updatedCartItems.push({
      productId,
      name,
      brand,
      cost,
      picturePath,
      quantity: 1,
    });
  }
  updatedCartItems.forEach((item) => {
    updatedCost += item.quantity * item.cost;
    updatedQuantity += item.quantity;
  });

  this.cart.items = updatedCartItems;
  this.cart.totalAmount = updatedCost;
  this.cart.totalQuantity = updatedQuantity;

  return this.save();
};

UserSchema.methods.deleteFromCart = function (productId) {
  /* Filter out Product from Cart */
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

const User = mongoose.model('User', UserSchema);

export default User;
