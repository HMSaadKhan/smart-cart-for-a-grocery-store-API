var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var { Cart } = require("../../models/cart");
var middleware = require("../../middlewares/user");
const { Product } = require("../../models/Product");

//add to cart
router.post("/:id", middleware.authenticator, async (req, res) => {
  console.log(req.params.id);
  try {
    let cart = await Cart.findOne({ User: req.user._id });
    for (const item of cart.items) {
      if (item.Product === req.params.id) {
        item.quantity += 1;
        await Cart.findByIdAndUpdate(cart._id, { items: cart.items });
        return res.send("dublicate added to cart");
      }
    }
    cart.items.push({ Product: req.params.id, quantity: 1 });
    await Cart.findByIdAndUpdate(cart._id, { items: cart.items });
    return res.send("added to cart");
  } catch (err) {
    console.log(err);
  }
});

//inc to cart item
router.post("/inc/:id", middleware.authenticator, async (req, res) => {
  try {
    let cart = await Cart.findOne({ User: req.user._id });
    for (const item of cart.items) {
      if (item.Product === req.params.id) {
        item.quantity += 1;
        await Cart.findByIdAndUpdate(cart._id, { items: cart.items });
        return res.send("Incremented to product");
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//dec to cart item
router.post("/dec/:id", middleware.authenticator, async (req, res) => {
  try {
    let cart = await Cart.findOne({ User: req.user._id });
    for (const item of cart.items) {
      if (item.Product === req.params.id) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          await Cart.findByIdAndUpdate(cart._id, { items: cart.items });
          return res.send("decremented to product");
        }
      }
    }
    return res.send("not decremented to product");
  } catch (err) {
    console.log(err);
  }
});

//delete cart item
router.delete("/delete/:id", middleware.authenticator, async (req, res) => {
  try {
    let cart = await Cart.findOne({ User: req.user._id });

    let updatedcart = cart.items.filter(
      (item) => item.Product !== req.params.id
    );

    await Cart.findByIdAndUpdate(cart._id, { items: updatedcart });
    return res.send("deleted");
  } catch (err) {
    console.log(err);
  }
});

router.get("/", middleware.authenticator, async (req, res) => {
  try {
    let cart = await Cart.findOne({ User: req.user._id }).populate(
      "items.Product"
    );
    return res.send(cart);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
