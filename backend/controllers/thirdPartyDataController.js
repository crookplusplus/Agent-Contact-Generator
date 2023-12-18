const { saveAgentsToDatabase } = require("../scripts/getAgentData");
const ApiCall = require("../models/apiCallModel");
const User = require("../models/userModel");


/**
 * Checks for correct number of digits from the user
 * @param {any} ZIP string of numbers retrieved from the user
 * @returns {boolean} if ZIP follows pattern
 */
function zipValidator(ZIP) {
  const zipPattern = /^\d{5}$/;
  return zipPattern.test(ZIP);
}


/**
 * Function to check the parameter selections from the user for validity, and then
 * send the parameters to generate agent contact information from the third party API call
 * @param {any} req contains parameters passed from the user
 * @param {any} res contains messages to go back to the user
 * @returns {any} returns status codes and errors back to the front end
 */
const generateAgentInfo = async (req, res) => {
  const { numberOfCalls, zipCode, user_id } = req.body;

  //throw input errors
  if (numberOfCalls == "0") {
    return res
      .status(400)
      .json({ error: "Please select the number of Agents for the List" });
  }
  if (!numberOfCalls || !zipCode) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  if (!zipValidator(zipCode)) {
    return res.status(400).json({ error: "Zip code must be 5 digits" });
  }
  //create new apiCall document
  const apiCall = await ApiCall.create({ user_id, num_agents: 0, zip_code: zipCode });
  if (!apiCall) {
    console.log("Error creating apiCall during Third Party API call.");
    return res.status(500).json({ error: "Internal Server Error" });
  }
  const user = await User.findById(user_id);
  if (!user) {
    console.log("Error finding user during Third Party API call.");
    return res.status(500).json({ error: "Internal Server Error" });
  }

  try {
    const result = await saveAgentsToDatabase(numberOfCalls, zipCode, user_id, apiCall);
    user.apiCallsMade.push(apiCall._id);
    await user.save();
    console.log(result.message);
    res.status(200).json(result.message);
  } catch (error) {
    console.error("Error when saving data:", error);
    res.status(400).json({ error: error.message });
  }
  //may not need
  console.log("Agents information pulled and saved to database.")
};

//export statement
module.exports = { generateAgentInfo };
