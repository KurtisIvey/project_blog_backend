const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  textContent: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Administrator",
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
