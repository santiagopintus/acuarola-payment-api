import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  buyerEmail: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  buyerAdress: {
    type: Date,
    required: true,
  },
});

const Product = mongoose.model("Product", orderSchema);

export default Product;
