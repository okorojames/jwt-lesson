const mongoose = require("mongoose");
const userSchema = require("../models/user_model");

// create new user

const postUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "please fill in all details" });
  }
};
