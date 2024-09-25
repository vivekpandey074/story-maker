const {
  handleUserRegister,
  handleUserLogin,
  handleGetCurrentUser,
} = require("../controllers/user");

const router = require("express").Router();

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.get("/currentuser", handleGetCurrentUser);

module.exports = router;
