const express = require("express");
const bodyparser = require("body-parser");
const userRoute = require("./route/userRoute");
const productRoute = require("./route/productRoute")
const app = express();
require("./db");

//Middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Router Middlewares
app.use("/api/user", userRoute);
app.use("/api/product", productRoute)

//catch 404 error and forward the to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  res.statusCode = 400;
  next(err);
});

//catch all error and forward to error handler
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  res.status(status).json({ error: { message: error.message } });
});

//Server
app.listen(3000, () => console.log("Sever starte!!!!"));
