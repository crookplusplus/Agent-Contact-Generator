// Description: This is the main server file that will be used to run the backend of the application
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//import routes
const thirdPartyRoutes = require("./routes/thirdPartyData");
const userRoutes = require("./routes/user");
const agentDBRoutes = require("./routes/agentDataInDB");

const app = express();

//middleware
//saves the information that is transmitted with the request into req.body for later use
app.use(express.json());
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
mongoose.connect(process.env.MONGO_URI+process.env.CALL_DB).then(() => {
  //listen on the port
  app.listen(process.env.PORT, () => {
    console.log("Listening on port: ", process.env.PORT);
  });
});
