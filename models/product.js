const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: String,
  name: String,
  category: { type: String, ref: "Category" }, //Foreign Key
  price: Number, //Rupees
  images: String,
});

var Product = mongoose.model("Product", productSchema);

module.exports.Product = Product;
