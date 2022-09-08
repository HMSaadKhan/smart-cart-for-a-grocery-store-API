const jwt = require("jsonwebtoken");
const config = require("config");

const { User } = require("../models/user");

//checking for jwt token
module.exports.authenticator = async (req, res, next) => {
  let token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("Please Login");
  }

  try {
    let user = jwt.verify(token, "someprivatekey");
    console.log(user);
    user = await User.findById(user._id);
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(400).send("Please Login");
    }
  } catch (err) {
    console.log(err.message);
    return res.status(401).send("Please Login");
  }
};
