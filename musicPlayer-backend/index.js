// npm-init: package.json--this is node project
//npm i express: install expressJS in project
//using express

const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes=require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
//connecting to the database using mongoose
mongoose
  .connect(
    "mongodb+srv://admin:" +
      process.env.PASSWORD +
      "@cluster0.2wlgie0.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((x) => {
    console.log("Connected to mongo");
  })
  .catch((err) => {
    console.error(err);
  });
//passport-jwt setup
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try{
      const user = await User.findOne({_id:jwt_payload.identifier});
        if (user) {
          return done(null, user);
        } 
    }catch(err){
      return done(err,false);
     }
    }
  )
  );
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);

app.listen(port, () => {
  console.log("App is running on port " + port);
});
