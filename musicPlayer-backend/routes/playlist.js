const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");
const Playlist = require("../models/Playlist");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const playtlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser,
      collaborators: [],
    };
    const playlist = await Playlist.create(playtlistData);
    return res.status(200).json(playlist);
  }
);

router.get(
  "/get/me",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
      const artistId = req.user._id;

      const playlists = await Playlist.find({owner: artistId}).populate(
          "owner"
      );
      return res.status(200).json({data: playlists});
  }
);

//get a playlist by id
router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      return res.status(301).json({ error: "Invalid id" });
    }
    return res.status(200).json(playlist);
  }
);

//get all playlist made by artist
router.get(
    "/get/artist/:artistId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const {artistId} = req.params;
        const artist = await User.findOne({_id:artistId});
        if(!artist){
            return res.status(304).json({error: "Artist doesnot exist"});
        }
        const playlists = await Playlist.find({ owner: artistId });
        return res.status(200).json({data: playlists});
    });


//add a song to playlist
router.post(
    "/add/song",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const currentUser = req.user;
        const {playlistId, songId}=req.body;
        const playlist = await Playlist.findOne({_id:playlistId});
        if(!playlist){
            return res.status(304).json({error:"Playlist doesnot exist"});
        }
        if(!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id)){
            return res.status(400).json({error:"Not allowed"});

        }
        const song = await Song.findOne({_id:songId});
        if(!song){
            return res.status(304).json({error:"Song doesnot exist"});
        }
        playlist.songs.push(songId);
        await playlist.save();
        return res.status(200).json(playlist);

    });

module.exports = router;
