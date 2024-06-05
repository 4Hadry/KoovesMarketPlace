import mongoose from "mongoose";

const productScheema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
    },
    photo: {
      type: String,
      required: [true, "Please Enter Name"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter price"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter Stock"],
    },
    category: {
      type: String,
      required: [true, "Please Enter  Category"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Please Enter  Brand"],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productScheema);
