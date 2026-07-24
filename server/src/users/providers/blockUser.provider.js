const User = require("../users.schema.js");
const { StatusCodes } = require("http-status-codes");
const logger = require("../../helpers/winston.helper.js");
const errorLogger = require("../../helpers/errorLogger.helper.js");

// Single provider handling both approve and reject.
// Action is determined by req.body.action — "approved" | "rejected"
// Route: PATCH /items/:id/verify

async function blockUserProvider(req, res) {
  try {
  
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        if (user.role === "admin") {
            return res.status(StatusCodes.FORBIDDEN).json({
                message: "Admin accounts cannot be blocked",
            });
        }

        user.isBlocked = !user.isBlocked;
        await user.save();

    return res.status(StatusCodes.OK).json({
        message: user.isBlocked ? "User blocked successfully" : "User unblocked successfully",
      data: user,
    });

  } catch (error) {
    console.log(error);
    errorLogger("Error updating user block status", req, error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update user block status",
    });
  }
}

module.exports = blockUserProvider;
