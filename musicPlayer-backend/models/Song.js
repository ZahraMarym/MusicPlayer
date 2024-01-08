const mongoose = require("mongoose");
//user schema
const Song = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail:{
    type: String,
    required: true,
  },
  track:{
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.ObjectId,
    ref:"User",
  },
});
const songModel = new mongoose.model("Song",Song);
module.exports=songModel;
