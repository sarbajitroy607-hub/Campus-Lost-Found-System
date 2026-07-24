const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../users/users.schema.js");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Extract Bearer <token>
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You are not Authorized to perform this request" }); // No token present

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err)
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Your token is either expired or invalid." });

    try {
      const account = await User.findById(user.sub).select("isBlocked");

      if (!account || account.isBlocked) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "Your account has been blocked" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unable to verify account status" });
    }
  });
};

module.exports = authenticateToken;
