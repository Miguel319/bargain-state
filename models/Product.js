import mongoose from "mongoose";
import { Schema } from "mongoose";
import shortid from "shortid";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name field is required."]
  },
  price: {
    type: Number,
    required: [true, "The price field is required."]
  },
  sku: {
    type: String,
    unique: true,
    default: shortid.generate()
  },
  description: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  }
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
