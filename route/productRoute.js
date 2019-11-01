const Router = require("express").Router();
const productService = require("../services/product");
const verify = require("../route/auth")

Router.route("/").get(productService.index)
Router.route("/register").post(verify, productService.register)

module.exports = Router;