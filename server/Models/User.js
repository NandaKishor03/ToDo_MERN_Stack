const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    user_id: { type: String, default: uuidv4 }, 
  },
  { collection: "users" }
);

module.exports = mongoose.model("user", userSchema);
