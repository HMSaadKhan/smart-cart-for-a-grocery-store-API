var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
var cartController = require("../../middlewares/cart");

var middleware = require("../../middlewares/cart");

//Register a user
router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      return res.status(400).send("Email already in use");
    } else {
      user = new User();
      user._id = new mongoose.Types.ObjectId();
      user.email = req.body.email;
      user.password = req.body.password;
      // let salt = await bcrypt.genSalt(5);
      // user.password = await bcrypt.hash(req.body.password, salt);
    }

    await user.save();
    return res.send("user Added");
  } catch (err) {
    console.log(err);
    return res.send("user not Added");
  }
});

//Login user
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) return res.status(400).send("Email not registered");
    if (!user.password === req.body.password)
      return res.status(401).send("Invalid Password");

    try {
      let token = jwt.sign(
        { _id: user._id, name: user.name },
        "someprivatekey"
      );
      cartController.cartCreator(user._id);
      return res.send(token);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

//View All Users
router.get("/", async (req, res) => {
  try {
    let user = await User.find();
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.send("user not Added");
  }
});
module.exports = router;
