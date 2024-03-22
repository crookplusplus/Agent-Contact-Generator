const User = require("../models/userModel");
const ApiCall = require("../models/apiCallModel");
const Agent = require("../models/agentModel");
const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validator = require("validator");
const { saveAgentsToDatabase } = require("../scripts/getAgentData");

//local and JWT authentication variable and function
//may need to move to the user model
const {
  COOKIE_OPTIONS,
  getToken,
  getRefreshToken,
} = require("../middleware/authentication");
const { signedCookie } = require("cookie-parser");
const cookieParser = require("cookie-parser");

/**
 * Checks for correct number of digits from the user
 * @param {any} ZIP string of numbers retrieved from the user
 * @returns {boolean} if ZIP follows pattern
 */
function zipValidator(ZIP) {
  const zipPattern = /^\d{5}$/;
  return zipPattern.test(ZIP);
}

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);

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
        username: user.username,
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
          username: user.username,
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
              res.status(200).json({ success: true, token, username: savedUser.username });
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

const getHighlights = async (req, res) => {
  let checkAgentsContacted = 0, checkTotalAgentsPulled = 0;

  try{
    const user = req.user;
    console.log(user._id);
    for (let callId of user.apiCallsMade) {
      const list = await ApiCall.findById(callId);
      if (list) {
        checkAgentsContacted += list.agents_contacted;
        checkTotalAgentsPulled += Number(list.num_agents);
      }
    }
    if (user.agentsContacted != checkAgentsContacted) {
      user.agentsContacted = checkAgentsContacted;
    }
    if (user.totalAgentsPulled != checkTotalAgentsPulled) {
      user.totalAgentsPulled = checkTotalAgentsPulled;
    }
    user.save();
    
    res
      .status(200)
      .json({agentsContacted : user.agentsContacted, 
        totalAgentsPulled : user.totalAgentsPulled, 
        lastApiCall : user.lastApiCall, 
        number_of_lists: user.apiCallsMade.length}
        );
  } catch (error){
    console.log(error);
    res.status(500).json({ error: 'Error occurred when attempting to retrieve user highlight info' }); // Send error as JSON response
  }
};

const getLists = async (req, res) => {
  let lists = [];
  
  try{
    const user = req.user;
    for (let callId of user.apiCallsMade) {
      let list_id = callId;
      const list = await ApiCall.findById(callId);
      if (list) {
        list.agents = await Agent.find({ APICall_id: list._id });
        let listInfo = {
          list_id: list_id,
          num_agents: list.num_agents,
          zip_code: list.zip_code,
          agents_contacted: list.agents_contacted,
          date_created: list.createdAt
        }
        lists.push(listInfo); 
      }
    }

    res.status(200).json({lists});
  } catch (error){
    console.log(error);
    res.status(500).json({ error: 'Error occurred when attempting to retrieve user lists' }); // Send error as JSON response
  }
};

const getContacts = async (req, res) => {
  let allContacts = {};
  let chronoList = [];
  let totalContacts = 0;
  
  try{
    const user = req.user;
    //reverse the order to get the most recent contacts first
    chronoList = user.apiCallsMade.reverse();

    for (const list of chronoList){
      const agents = await Agent.find({ APICall_id: list });
      totalContacts += agents.length;
      allContacts[list] = agents;
    }
    return res.status(200).json({allContacts, totalContacts});

  } catch {
    console.log(error);
    res.status(500).json({ error: 'Error occurred when attempting to retrieve user contacts' }); 
  }

};

//function used by the redeem page to display the contact allowance of the user
const userCreditCheck = async (req, res) => {
  const user = req.user;
  const credits = user.contactAllowance;
  res.status(200).json({credits});
};

//function to redeem user credits for contacts
const redeemCredits = async (req, res) => {
  const { toRedeem, zipCode } = req.body;
  const user = req.user;
  const numCalls = parseInt(toRedeem / 20);

  //recheck inputs; reduntant for now in place of upgraded validation
  if (!toRedeem || !zipCode) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  if (!zipValidator(zipCode)) {
    return res.status(400).json({ error: "Zip code must be 5 digits" });
  }
  if (toRedeem % 20 !== 0) {
    return res.status(400).json({ error: "Amount should be divisible by 20" });
  }
  if (toRedeem > user.contactAllowance) {
    return res.status(400).json({ error: "Amount exceeds your credits" });
  }
  const apiCall = await ApiCall.create({ user_id: user._id, num_agents: 0, zip_code: zipCode });
  if (!apiCall) {
    console.log("Error creating apiCall during Third Party API call.");
    return res.status(500).json({ error: "Internal Server Error" });
  }
  try {
    const result = await saveAgentsToDatabase(numCalls, zipCode, user._id, apiCall);
    user.apiCallsMade.push(apiCall._id);
    user.contactAllowance -= Number(apiCall.num_agents);
    const credits = user.contactAllowance;
    user.lastApiCall = Date.now();
    await user.save();
    console.log(result.message);
    res.status(200).json({credits});
  } catch (error){
    console.error("Error when saving data:", error);
    res.status(400).json({ error: error.message });
  }
};

//function to increase user contact allowance (cart checkout)
const checkout = async (req, res) => {
  const user = req.user;
  const { value } = req.body;
  let limitCount = 0;


  if (value > 100) {
    return res.status(400).json({ error: "Amount exceeds maximum" });
  }
  if (user.orders.length > 0) {
    let l = user.orders.length;
    let i = l - 1;
    while (i>=0 && limitCount < 100){
      const order = await Order.findById(user.orders[i]);
      if (order.date_created < new Date(Date.now() -24 * 60 * 60 * 1000)){
        limitCount += order.quantity;
      }
      i--;
    }
  }
  //used for testing
  console.log(limitCount);

  if (limitCount + value < 100) {
    const order = await Order.create({ user_id: user._id, quantity: value });
    user.contactAllowance += Number(value);
    user.orders.push(order._id);
    await user.save();
    const credits = user.contactAllowance;
    res.status(200).json({ mssg: "Checkout successful", credits});
  } else {
    res.status(400).json({ error: "Checkout failed, you have reached the daily limit of 100 credits" });
  }
};

const deleteList = async (req, res) => {
  const user = req.user;
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

    user.apiCallsMade.pull(deletedCall._id);
    await user.save();
    if(deletedCall.createdAt == user.lastApiCall){
      user.lastApiCall = user.apiCallsMade[user.apiCallsMade.length - 1].createdAt;
      await user.save();
    }
    if (user.apiCallsMade.length === 0) {
      user.lastApiCall = null;
      await user.save();
    }
    res.status(200).json({ mssg: "Call deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  deleteList,
  deleteUser,
  refreshUserToken,
  getHighlights,
  getLists,
  getContacts,
  userCreditCheck,
  redeemCredits,
  checkout
};
