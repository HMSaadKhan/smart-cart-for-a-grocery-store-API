var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var { Product } = require("../../models/Product");
var { Category } = require("../../models/categories");

// add a product
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    let product = new Product();
    product._id = new mongoose.Types.ObjectId();
    product.name = req.body.name;
    product.category = req.body.category;
    product.price = Math.floor(req.body.price);
    product.images = req.body.images;

    await product.save();
    return res.send("Product Added");
  } catch (err) {
    console.log(err);
    return res.send("Product not Added");
  }
});

// view products by category
router.get("/:category", async (req, res) => {
  try {
    let products = await Product.find({
      category: req.params.category,
    }).populate("category");
    if (products) {
      return res.send(products);
    } else {
      return res.status(400).send("No Products Found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

// view products
router.get("/", async (req, res) => {
  try {
    let product = await Product.find();
    return res.send(product);
  } catch (err) {
    console.log(err);
    return res.send("Product not Added");
  }
});
module.exports = router;
