const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    slides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "slides",
      },
    ],
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const story = mongoose.model("stories", storySchema);

module.exports = story;
