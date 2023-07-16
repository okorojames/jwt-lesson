const mongoose = require("mongoose");

//
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    // other details
    otherDetails: [
      {
        userDate: String,
        userGender: String,
        userAddress: String,
      },
    ],
    // end of other details
  },
  { timestamps: true }
);

//
module.exports = mongoose.model("User", userSchema);
