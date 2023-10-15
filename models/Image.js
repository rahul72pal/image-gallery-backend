const mongoose = require("mongoose");

const imageschema = mongoose.Schema({
  Date:{
    type: Date,
    default: Date.now()
  },
  image:{
  type: String
  },
  publicID:{
    type: String
  }
});

module.exports = mongoose.model("Image",imageschema);