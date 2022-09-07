var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var { Category } = require("../../models/categories");

// const createCategory = async (name) => {
//   let category = new CategoryModel();
//   category.name = name;
//   await category.save();
// };

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

router.get("/", async (req, res) => {
  try {
    let category = await Category.find();
    return res.send(category);
  } catch (err) {
    console.log(err);
    return res.send("Product not Added");
  }
});
module.exports = router;
