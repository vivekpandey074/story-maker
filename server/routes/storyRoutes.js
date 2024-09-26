const router = require("express").Router();
const {
  handleCreateStory,
  handleViewStory,
  handleEditStory,
} = require("../controllers/story");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/post", authMiddleware, handleCreateStory);
router.get("/view", handleViewStory);
router.patch("/edit", handleEditStory);

module.exports = router;
