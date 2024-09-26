const asyncHandler = require("../utils/asyncHandler");
const Story = require("../models/storyModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Slide = require("../models/slideModel");

const handleCreateStory = asyncHandler(async (req, res, next) => {
  const { slidesArray, category } = req.body;

  const newStoryObj = new Story({
    creator: req.body.userId,
    slides: [],
    category,
  });

  const newStory = await newStoryObj.save();

  const slidesObjArray = [];
  for (let i = 0; i < slidesArray.length; i++) {
    const { heading, description, url } = slidesArray[i];
    const newSlideObj = new Slide({
      story: newStory._id,
      heading,
      description,
      url,
    });

    await newSlideObj.save();

    slidesObjArray.push(newSlideObj);
  }

  await newStoryObj.updateOne({
    slides: slidesObjArray,
  });

  res.status(200).send({
    success: true,
    message: "story created successfully",
  });
});

const handleViewStory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const story = await Story.findById(id).populate("slides");

  if (!story) throw new ApiError(404, "no story found");

  res.status(200).send({
    success: true,
    message: "story fetched successfully",
    story,
  });
});

const handleEditStory = asyncHandler(async (req, res, next) => {});

const handleGetHomeFeed = asyncHandler(async (req, res, next) => {
  let filterArray = req.body.filter;
  let ALLfilters = [
    "Food",
    "Travel",
    "Technology",
    "Fruits",
    "Medical",
    "World",
    "Others",
  ];
  let homeFeedArray = [];

  if (filterArray.includes("ALL")) {
    for (let i = 0; i < ALLfilters.length; i++) {
      const arr = await Story.find({ category: ALLfilters[i] }).populate(
        "slides"
      );
      homeFeedArray.push({ category: ALLfilters[i], feed: arr });
    }
  } else {
    for (let i = 0; i < filterArray.length; i++) {
      const arr = await Story.find({ category: filterArray[i] }).populate(
        "slides"
      );

      homeFeedArray.push({ category: filterArray[i], feed: arr });
    }
  }

  res.status(200).send({
    success: true,
    message: "home feed fetched successfully",
    feedarray: homeFeedArray,
  });
});

const handleToggleBookmark = asyncHandler(async (req, res, next) => {
  const { slideId } = req.params;
  const { userId } = req.body;
  console.log(slideId);
  const currentSlide = await Slide.findById(slideId);

  if (!currentSlide) throw new ApiError(404, "current slide not found");

  let updatedSlide;
  if (currentSlide.bookmarks.includes(userId)) {
    console.log("hi");
    updatedSlide = await currentSlide.updateOne(
      {
        bookmarks: currentSlide.bookmarks.filter((item) => item !== userId),
      },
      { new: true }
    );
  } else {
    updatedSlide = await currentSlide.updateOne(
      {
        bookmarks: [...currentSlide.bookmarks, userId],
      },
      { new: true }
    );
  }

  res.send({
    success: true,
    message: "likes array updated successfully",
    updatedSlide,
  });
});

const handleToggleLike = asyncHandler(async (req, res, next) => {
  const { slideId } = req.params;
});

module.exports = {
  handleCreateStory,
  handleViewStory,
  handleEditStory,
  handleGetHomeFeed,
  handleToggleBookmark,
  handleToggleLike,
};
