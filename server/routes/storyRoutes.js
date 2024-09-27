const router = require("express").Router();
const {
  handleCreateStory,
  handleViewStory,
  handleEditStory,
  handleGetHomeFeed,
  handleToggleBookmark,
  handleToggleLike,
  handleMyStories,
  handleBookmarks,
} = require("../controllers/story");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/post", authMiddleware, handleCreateStory);
router.post("/homefeed", handleGetHomeFeed);
router.get("/view/:id", handleViewStory);
router.get("/mystories", authMiddleware, handleMyStories);
router.get("/bookmarks", authMiddleware, handleBookmarks);

router.patch("/togglebookmark/:slideId", authMiddleware, handleToggleBookmark);
router.patch("/togglelike/:slideId", authMiddleware, handleToggleLike);
router.patch("/edit", handleEditStory);

module.exports = router;
