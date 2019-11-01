const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, min: 6, max: 255 },
  email: { type: String, required: true, min: 6, max: 255 },
  password: { type: String, required: true, min: 6, max: 1255 },
  isAdmin:{type: Boolean, default: false},
  date: { type: Date, default: Date.now() }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
