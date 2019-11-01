const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  stock_date: { type: Date, default: Date.now() },
  model: { type: String, required: true, min: 1 },
  discription:{type: String, required: true, min:10}
});

module.exports = mongoose.model("Product", productSchema)