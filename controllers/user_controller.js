const mongoose = require("mongoose");
const userSchema = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// generating token for authenticated user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// create new user

const postUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "please fill in all details" });
  }
  try {
    const user_details = new userSchema({
      firstName,
      lastName,
      email,
      password,
    });
    const user = await userSchema.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "email already exist" });
    } else {
      const salt = await bcrypt.genSalt(10);
      user_details.password = await bcrypt.hash(password, salt);
      await user_details.save();
      const user_token = generateToken(user_details._id);
      console.log(user_token);
      return res.status(201).json({ user_details, user_token });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
};

// login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "please fill in all details" });
  }
  try {
    const users = await userSchema.findOne({ email });
    if (!users) {
      return res.status(400).json({ msg: "lgin credential not valid" });
    } else if (users && (await bcrypt.compare(password, users.password))) {
      const user_token = generateToken(users._id);
      return res.status(200).json({ users, user_token });
    } else {
      return res.status(400).json({ msg: "login credntials not valid" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
};

//
module.exports = { postUser, loginUser };
