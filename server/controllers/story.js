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

const handleEditStory = asyncHandler(async (req, res, next) => {
  const { id, slides, category } = req.body;
  console.log(id, slides, category);
  const updatedStory = await Story.findByIdAndUpdate(
    id,
    { category: category },
    {
      new: true,
    }
  ).populate("slides");

  for (let i = 0; i < slides.length; i++) {
    const { _id, heading, description, url } = slides[i];
    await Slide.findByIdAndUpdate(
      _id,
      {
        heading,
        description,
        url,
      },
      {
        new: true,
      }
    );
  }

  res.status(200).send({
    success: true,
    message: "story updated successfully",
    updatedStory,
  });
});

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

  const currentSlide = await Slide.findById(slideId);

  if (!currentSlide) throw new ApiError(404, "current slide not found");

  let updatedSlide;
  if (currentSlide.bookmarks.includes(userId)) {
    updatedSlide = await Slide.findOneAndUpdate(
      { _id: slideId },
      {
        bookmarks: currentSlide.bookmarks.filter((item) => item !== userId),
      },
      { new: true }
    );
  } else {
    updatedSlide = await Slide.findOneAndUpdate(
      { _id: slideId },
      {
        bookmarks: [...currentSlide.bookmarks, userId],
      },
      { new: true }
    );
  }

  const updatedStory = await Story.findById(currentSlide.story).populate(
    "slides"
  );

  res.send({
    success: true,
    message: "bookmark array updated successfully",
    updatedStory,
  });
});

const handleToggleLike = asyncHandler(async (req, res, next) => {
  const { slideId } = req.params;
  const { userId } = req.body;

  const currentSlide = await Slide.findById(slideId);

  if (!currentSlide) throw new ApiError(404, "current slide not found");

  let updatedSlide;
  if (currentSlide.likes.includes(userId)) {
    updatedSlide = await Slide.findOneAndUpdate(
      { _id: slideId },
      {
        likes: currentSlide.likes.filter((item) => item !== userId),
      },
      { new: true }
    );
  } else {
    updatedSlide = await Slide.findOneAndUpdate(
      { _id: slideId },
      {
        likes: [...currentSlide.likes, userId],
      },
      { new: true }
    );
  }

  const updatedStory = await Story.findById(currentSlide.story).populate(
    "slides"
  );

  res.send({
    success: true,
    message: "likes array updated successfully",
    updatedStory,
  });
});

const handleMyStories = asyncHandler(async (req, res, next) => {
  const mystories = await Story.find({ creator: req.body.userId }).populate(
    "slides"
  );

  res.send({
    success: true,
    message: "user stories fetched successsfully",
    mystories,
  });
});
const handleBookmarks = asyncHandler(async (req, res, next) => {
  const bookmarks = await Slide.find({ bookmarks: req.body.userId });

  res.send({
    success: true,
    message: "user stories fetched successsfully",
    bookmarks,
  });
});

module.exports = {
  handleCreateStory,
  handleViewStory,
  handleEditStory,
  handleGetHomeFeed,
  handleToggleBookmark,
  handleToggleLike,
  handleMyStories,
  handleBookmarks,
};
