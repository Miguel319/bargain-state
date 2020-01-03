import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
      }
    }
  ]
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
