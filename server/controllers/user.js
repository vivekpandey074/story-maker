const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const handleUserRegister = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  console.log(username, password);

  if ([username, password].some((field) => field.trim() == "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ username });

  if (user) throw new ApiError(409, "User already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newuser = new User({
    username,
    password: hashedPassword,
  });
  await newuser.save();

  res.status(201).send({
    success: true,
    message: "User created successfully",
  });
});

const handleUserLogin = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "username & password is required!");
  }

  const user = await User.findOne({ username });

  if (!user) throw new ApiError(404, "Please enter valid username or password");

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) throw new ApiError(401, "Invalid username or password");

  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

  res.status(200).cookie("token", token).send({
    success: true,
    message: "User Logged In successfully",
    token: token,
  });
});

const handleGetCurrentUser = asyncHandler(async (req, res, next) => {
  const currentuser = await User.findById(req.body.userId).select("-password");

  if (!currentuser) throw new ApiError(404, "current user not found");

  res.status(200).send({
    success: true,
    message: "User fetched successfully",
    currentuser,
  });
});

module.exports = {
  handleUserLogin,
  handleUserRegister,
  handleGetCurrentUser,
};
