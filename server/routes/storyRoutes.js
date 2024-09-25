const router = require("express").Router();

router.post("/create-story", handleCreateStory);
router.get("/view-story", handleViewStory);
router.patch("/edit-story", handleEditStory);
