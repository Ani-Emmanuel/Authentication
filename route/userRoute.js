const Router = require("express").Router();
const userService = require("../services/user");
const verify = require("./auth")

//With the verify middleware you need to be loggedin
Router.route("/users").get(verify,userService.index);

Router.route("/login").post(userService.login);

Router.route("/register").post(userService.register);

module.exports = Router;
