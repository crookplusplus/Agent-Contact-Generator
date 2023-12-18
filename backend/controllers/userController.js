const User = require("../models/userModel");
const ApiCall = require("../models/apiCallModel");
const Agent = require("../models/agentModel");


const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    res.status(200).json({ id: user._id, email: user.email, mssg: "User created" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    res.status(200).json({ id: user._id, email: user.email, mssg: "User logged in"  });

    
  } catch (error) {
    res.status(400).json({ error: error.message });
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
      return res.status(500).json({ error: "Error deleting associated agents" });
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
}

module.exports = {
  signupUser,
  loginUser,
  deleteList, 
  deleteUser
};
