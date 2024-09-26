const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  if (!req.headers.cookie) {
    throw new ApiError(401, "Unauthorized please login first");
  }

  const token = req.headers.cookie.split("token=")[1];

  const decryptedtoken = jwt.verify(token.toString(), process.env.TOKEN_SECRET);

  req.body.userId = decryptedtoken.userId;

  next();
});

module.exports = authMiddleware;
