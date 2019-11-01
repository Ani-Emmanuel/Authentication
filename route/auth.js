const jwt = require("jsonwebtoken");
const User = require("../model/user");

async function varification(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({ payload: { message: "Access Denied" } });
  try {
    const varified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = varified;
    const signedUser = await User.findById(varified._id);

    //Making sure only admin can make a post
    if (signedUser.isAdmin) {
      console.log(req.url)
      return next();
    }
    {
      console.log("this the the url \n"+req.url)
      res.status(401).json({
        payload: { message: "Sorry only admin can perform this operation" }
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = varification;
