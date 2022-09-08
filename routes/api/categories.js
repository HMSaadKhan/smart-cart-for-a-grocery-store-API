var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var { Category } = require("../../models/categories");
var { Product } = require("../../models/Product");

var middleware = require("../../middlewares/user");
//add a category
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    let category = new Category();
    category._id = new mongoose.Types.ObjectId();
    category.name = req.body.name;
    await category.save();
    return res.send("Product Added");
  } catch (err) {
    console.log(err);
    return res.send("Product not Added");
  }
});

//get categories
router.get("/", middleware.authenticator, async (req, res) => {
  try {
    let categories = await Category.find().lean();
    for (category of categories) {
      category.products = await Product.countDocuments({
        category: category._id
      });
    }
  

    return res.send(categories);
  } catch (err) {
    console.log(err);
    return res.send("Product not Added");
  }
});
module.exports = router;
