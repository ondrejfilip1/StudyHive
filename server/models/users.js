const mongoose = require("mongoose");
const { isEmail } = require("validator");

const schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 64,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Invalid email"],
    },
    pfpUrl: { type: String, default: "" },
    bio: { type: String, default: "" },
    password: { type: String, required: true },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    settings: {
      theme: { type: String, default: "light" },
      notifications: { type: Boolean, default: true },
    },
    // admin mode
    dev: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
