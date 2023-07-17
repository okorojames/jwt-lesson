const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user_model");

//
const protected_route = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get the user token
      token = req.headers.authorization.split(" ")[1];

      // check for the token verificaion
      const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

      // get user from the token
      req.user = await userSchema
        .findById(decoded_token.id)
        .select("-password");

      next();

      //
    } catch (err) {
      console.log(err);
      return res.status(401).json({ msg: "Not Authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "Not Authorized" });
  }
};

//
module.exports = { protected_route };
