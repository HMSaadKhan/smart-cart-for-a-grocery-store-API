const mongoose = require("mongoose");
var { Cart } = require("../models/cart");
var { Category } = require("../models/categories");
var { Product } = require("../models/Product");

module.exports.cartCreator = async (userId) => {
  let cart = await Cart.findOne({ User: userId });
  if (cart) {
    await Cart.findByIdAndDelete(cart._id);
  }
  cart = new Cart();
  cart._id = new mongoose.Types.ObjectId();
  cart.User = userId;

  let categories = await Category.find();
  console.log(categories);
  for (const category of categories) {
    let product = await Product.findOne({ category: category._id });
    console.log(product);
    if (product) {
      cart.items.push({ Product: product._id, quantity: 1 });
    }
  }
  console.log(cart);
  await cart.save();
  return;
};
