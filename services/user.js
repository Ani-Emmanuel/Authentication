const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registrationValidation, loginValidation } = require("../validate/joi");

module.exports = {
  index: async (req, res, next) => {
    try {
      //Getting all the Users
      const user = await User.find({});
      res.status(200).json({ payload: { users: user } });
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      //Validating the data before passing to db
      const { error } = registrationValidation(req.body);
      if (error) return next(error);

      //Checking if email already exist
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist)
        return res
          .status(400)
          .json({ payload: { message: "User with email already exists" } });

      //Hashing password
      const hash = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(req.body.password, hash);

      //Create a new User
      const user = new User(req.body);
      delete user.password;
      user.password = hashpassword;
      const newUser = await user.save();
      res
        .status(201)
        .json({ payload: { message: "User created successfully" } });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      //Validating the data before passing to db
      const { error } = loginValidation(req.body);
      if (error) return next(error);

      //Check for the User
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res
          .status(400)
          .json({ payload: { message: "User does not exist" } });

      //checking if the password is valid
      const validpass = await bcrypt.compare(req.body.password, user.password);
      if (!validpass)
        return res
          .status(400)
          .json({ payload: { message: "Invalid password" } });

      //login user
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header("auth-token", token);
      res.status(200).json({ payload: { users: user } });
    } catch (error) {
      next(error);
    }
  }
};
