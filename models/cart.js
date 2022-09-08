const mongoose = require("mongoose");
const { Schema } = mongoose;

cartSchema = mongoose.Schema({
  _id: String,
  User: { type: String, required: true, ref: "User" },
  items: [
    {
      Product: { type: String, ref: "Product" },
      quantity: Number,
    },
  ],
});

var Cart = mongoose.model("Cart", cartSchema);

module.exports.Cart = Cart;
