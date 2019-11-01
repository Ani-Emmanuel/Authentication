const jwt = require("jsonwebtoken");

function varification(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({ payload: { message: "Access Denied" } });
  try {
    const varified = jwt.verify(token, process.env.SECRETE);
    req.user = varified;
    next()
  } catch (error) {
    next(error);
  }
}

module.exports = varification;