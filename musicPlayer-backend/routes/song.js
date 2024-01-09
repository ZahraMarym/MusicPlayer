const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");
// Require controller modules.
//route to create song
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createSong = await Song.create(songDetails);
    return res.status(200).json(createSong);
  }
);
//route to get songs

router.get(
  "/get/mySongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const songs = await Song.find({ artist: req.user._id }).populate("artist");
    return res.status(200).json(songs);
  }
);
//route to get songs of any artist
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findOne({ _id: artistId });
    //if the artist does not exist it will send a error message back
    if (!artist) {
      return res.status(400).json({ error: "Artist does not exist." });
    }
    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  }
);


router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { songName } = req.params;

      // Construct an array of case-insensitive regular expressions
      const regexArray = [
        { name: { $regex: new RegExp(songName, "i") } },
        { name: { $regex: new RegExp(songName.toUpperCase(), "i") } },
        { name: { $regex: new RegExp(`^${songName}$`, "i") } },
        { name: { $regex: new RegExp(`^${songName}`, "i") } },
        { name: { $regex: new RegExp(`${songName}$`, "i") } },
      ];

      // Use the $in operator to match any of the regular expressions
      const songs = await Song.find({ $or: regexArray }).populate("artist");

      if (songs.length === 0) {
        return res
          .status(404)
          .json({ message: "No songs found with the given name." });
      }

      return res.status(200).json({ data: songs });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
