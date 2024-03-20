const User = require("../models/userModel");
const ApiCall = require("../models/apiCallModel");

const addContactAllowance = async (req, res) => {
  const { user_id, incBy } = req.body;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    user.contactAllowance += Number(incBy);
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetAllowance = async (req, res) => {
    const { user_id } = req.body;

    try {
        const user = await User.findById(user_id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        user.contactAllowance = 0;
        await user.save();
        res.status(200).json({message: "Allowance reset"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { addContactAllowance, resetAllowance };
