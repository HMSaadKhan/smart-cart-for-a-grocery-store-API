const mongoose = require("mongoose");

userSchema = mongoose.Schema({
  _id: String,
  
  email: { type: String, unique: true },
  password: String,
});
var User = mongoose.model("User", userSchema);

module.exports.User = User;
