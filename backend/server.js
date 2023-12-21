// Description: This is the main server file that will be used to run the backend of the application

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//import routes
const thirdPartyRoutes = require("./routes/thirdPartyData");
const userRoutes = require("./routes/user");
const agentDBRoutes = require("./routes/agentDataInDB");

//import passport files
require("./strategies/JWTStrategy");
require("./strategies/LocalStrategy");
require("./middleware/authentication");



//app initialization
const app = express();

//MIDDLEWARE
//cors middleware
const whiteList = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(whiteList);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
//saves the information that is transmitted with the request into req.body for later use
app.use(express.json());
//parses the cookies that are sent with the request
app.use(cookieParser(process.env.COOKIE_SECRET));
//server side session middleware
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

//initialize passport (see passport require() above)
app.use(passport.initialize());
//passport session middleware
app.use(passport.session());
//middleware for logging requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
//data routes for third-party api calls
app.use("/api/data", thirdPartyRoutes);
//user routes for login and sign up
app.use("/api/user", userRoutes);
//agent routes for agent data in database
app.use("/api/agent", agentDBRoutes);

//Connect to the DB
const url = process.env.MONGO_URI + process.env.CALL_DB;

mongoose.connect(url)
.then(() => {
  console.log("Connected to the database");

  // Start the server after the database connection is established
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`);
  });
})
.catch(err => {
  console.error("Failed to connect to the database", err);
});
