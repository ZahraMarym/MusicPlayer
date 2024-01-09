const mongoose = require("mongoose");
//user schema
const Playlist = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  songs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Song",
    },
  ],
  collaborators: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});
const PlaylistModel = new mongoose.model("Playlist", Playlist);
module.exports = PlaylistModel;
