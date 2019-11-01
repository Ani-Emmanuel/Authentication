const Router = require("express").Router();
const userService = require("../services/user");
const varify = require("./auth")

Router.route("/users").get(varify,userService.index);

Router.route("/login").post(userService.login);

Router.route("/register").post(userService.register);

module.exports = Router;
