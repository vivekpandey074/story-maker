const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema(
  {
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stories",
    },
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
    bookmarks: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const slide = mongoose.model("slides", slideSchema);

module.exports = slide;
