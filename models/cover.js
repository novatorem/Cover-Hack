/* Cover mongoose model */
const mongoose = require("mongoose");

const Cover = mongoose.model("Cover", {
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 12
  },
  data: {
    type: Array
  },
  owner: {
    type: String,
    required: true
  }
});

module.exports = { Cover };
