//products model schema

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "price cannot be negative"]
    },

    stock: {
      type: Number,
      default: 0,
      min: [0, "stock cannot be negative"]
    },

    category: {
      type: String,
      required: [true, "category is required"],
      trim: true
    },

    image: {
      type:[String],
      default: "no img right now"
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;