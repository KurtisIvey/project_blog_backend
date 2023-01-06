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

postSchema.virtual("dateAndTime").get(function () {
  //formatted form: 2022-12-08, 17:02
  const formatted = DateTime.fromJSDate(this.timestamp).toFormat(
    "yyyy-MM-dd,HH:mm"
  );
  const year = formatted.substring(0, 4);
  const month = formatted.substring(5, 7);
  const day = formatted.substring(8, 10);
  const time = formatted.substring(11, 16);
  return `${day} ${month} ${year}, ${time}`;
});

module.exports = mongoose.model("Post", postSchema);
