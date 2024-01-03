const mongoose = require("mongoose");
//user schema
const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  likedSongs: {
    type: String,
    default:"",
  },
  likedPlaylist: {
    type: String,
    default:"",
  },
  SubscribedArtist: {
    type: String,
    default:"",
  },
});
const userModel = new mongoose.model("User",User);
module.exports=userModel;
