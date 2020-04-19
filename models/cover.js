/* Cover mongoose model */
const mongoose = require("mongoose");

const Cover = mongoose.model("Cover", {
  text: {
    type: String,
    required: true,
    minlegth: 1
  },
  owner: {
    type: String,
    required: true
  }
});

module.exports = { Cover };
