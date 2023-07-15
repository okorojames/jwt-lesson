const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

// db connection method
const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`DB connected at port ${PORT}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

//
module.exports = { connectDb };
