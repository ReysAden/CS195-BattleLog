const mongoose = require("mongoose");

// TODO: Define your Task schema here
const userSchema = new mongoose.Schema(
  {
    //username 
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
