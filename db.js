const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("db connect")
);
