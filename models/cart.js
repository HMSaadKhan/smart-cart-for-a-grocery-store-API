const mongoose = require("mongoose");
const { Schema } = mongoose;

cartSchema = mongoose.Schema({
  _id: String,
  items: [
    {
      product: { type: String, ref: "Product" },
      quantity: Number,
    },
  ],
});

var Cart = mongoose.model("Cart", cartSchema);

module.exports.Cart = Cart;
