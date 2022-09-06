const mongoose = require("mongoose");

categorySchema = mongoose.Schema({
  _id: String,
  name: String,
  nop: Number,
});

var Category = mongoose.model("Category", categorySchema);

module.exports.Category = Category;
