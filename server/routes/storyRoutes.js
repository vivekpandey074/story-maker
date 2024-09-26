const router = require("express").Router();
const {
  handleCreateStory,
  handleViewStory,
  handleEditStory,
  handleGetHomeFeed,
  handleToggleBookmark,
  handleToggleLike,
} = require("../controllers/story");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/post", authMiddleware, handleCreateStory);
router.post("/homefeed", handleGetHomeFeed);
router.get("/view/:id", handleViewStory);
router.patch("/togglebookmark/:slideId", authMiddleware, handleToggleBookmark);
router.post("/toggleLike/:slideId", authMiddleware, handleToggleLike);
router.patch("/edit", handleEditStory);

module.exports = router;
