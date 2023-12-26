const User = require("../models/userModel");
const ApiCall = require("../models/apiCallModel");
const Agent = require("../models/agentModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validator = require("validator");

//local and JWT authentication variable and function
//may need to move to the user model
const {
  COOKIE_OPTIONS,
  getToken,
  getRefreshToken,
} = require("../middleware/authentication");
const { signedCookie } = require("cookie-parser");
const cookieParser = require("cookie-parser");

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //create a token and refresh token
    const token = getToken({ _id: user._id });
    const refreshToken = getRefreshToken({ _id: user._id });

    //add refresh token to user object
    user.refreshToken.push({ refreshToken });
    await user.save();

    //set refresh token in cookie
    res.cookie("refreshToken", refreshToken, { ...COOKIE_OPTIONS, signed: true});

    //send token and user info
    res
      .status(200)
      .json({
        success: true,
        token,
        mssg: "User created",
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email and password
  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  //authenticate user
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ error: info.message });
    }

    //log in user
    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }
    });

    //generate token and refresh token
    const token = getToken({ _id: user._id });
    const refreshToken = getRefreshToken({ _id: user._id });

    try {
      //add refresh token to user object
      user.refreshToken.push({ refreshToken });
      await user.save();
      res.cookie("refreshToken", refreshToken, { ...COOKIE_OPTIONS, signed: true});
      res
        .status(200)
        .json({
          success: true,
          mssg: "User logged in",
          token,
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })(req, res, next);
};


//function to logout user
const logoutUser = async (req, res) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  try {
    const user = await User.findById(req.user._id);

    const tokenIndex = user.refreshToken.findIndex(
      item => item.refreshToken === refreshToken
    );

    if (tokenIndex !== -1) {
      user.refreshToken.pull(user.refreshToken[tokenIndex]._id);
    }

    await user.save();

    res.clearCookie("refreshToken", COOKIE_OPTIONS);
    res.status(200).json({ mssg: "User logged out" , success: true});
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};



//function to remove user by id
const deleteUser = async (req, res) => {
  const { user_id } = req.body;

  try {
    const deletedUser = await User.findByIdAndDelete(user_id);
    if (!deletedUser) {
      return res.status(404).json({ error: "No user found with this id" });
    }
    res.status(200).json({ mssg: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteList = async (req, res) => {
  const { list_id } = req.body;

  try {
    const deletedCall = await ApiCall.findByIdAndDelete(list_id);
    if (!deletedCall) {
      return res.status(404).json({ error: "No list found with this id" });
    }

    try {
      // Delete all agents associated with the ApiCall id
      await Agent.deleteMany({ APICall_id: deletedCall._id });
    } catch (error) {
      console.error("Error deleting agents: ", error);
      return res
        .status(500)
        .json({ error: "Error deleting associated agents" });
    }

    const user = await User.findById(deletedCall.user_id);
    if (!user) {
      return res.status(404).json({ error: "No user found with this id" });
    }
    user.apiCallsMade.pull(deletedCall._id);
    await user.save();
    res.status(200).json({ mssg: "Call deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//function to refresh user token
const refreshUserToken = async (req, res, next) => {
  const { signedCookies } = req;
  const { refreshToken } = signedCookies;

  //check if refresh token exists
  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const userId = payload._id;
      User.findOne({_id: userId}).then(
        async user => {
          if (user) {
            //retrieve refresh token index
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );
            //refresh token index not found
            if (tokenIndex === -1) {
              return res.status(401).json({ error: "Unauthorized" });
            }
            //refresh token found, so create new refresh token and replace it
            const newRefreshToken = getRefreshToken({ _id: userId });
            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
            //generate a new token for the front end to use
            const token = getToken({ _id: userId }); 
            //save new refresh token to user object and send it to the client
            try {
              const savedUser = await user.save();
              res.cookie("refreshToken", newRefreshToken,{ ...COOKIE_OPTIONS, signed: true}); 
              res.status(200).json({ success: true, token });
            } catch (err) {
              return res.status(500).json({ error: err });
            }
          }
          //user not found
          else {
            res.status(401).json({ error: "Unauthorized step 1" });
          }
        }, 
        err => next(err)
      )
      //error attempting to validate refresh token
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized step 2" });
    }
  }
  //frontend did not send refresh token
  else {
    res.status(401).json({ error: "Unauthorized step 3" });
  }
}


module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  deleteList,
  deleteUser,
  refreshUserToken,
};
