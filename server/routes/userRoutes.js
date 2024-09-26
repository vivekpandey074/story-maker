const {
  handleUserRegister,
  handleUserLogin,
  handleGetCurrentUser,
} = require("../controllers/user");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.get("/getcurrentuser", authMiddleware, handleGetCurrentUser);

module.exports = router;
