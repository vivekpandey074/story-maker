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

    const x = await newSlideObj.save();
    console.log(x);

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

const handleViewStory = asyncHandler(async (req, res, next) => {});
const handleEditStory = asyncHandler(async (req, res, next) => {});

module.exports = { handleCreateStory, handleViewStory, handleEditStory };
