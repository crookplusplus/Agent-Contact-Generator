//at production this will not be required. This is only for testing purposes and 
// is used to reduce the number of API calls to the third party API as they are
// limited to 500 a month


const fs = require("fs");
const Agent = require("../models/agentModel");
const { agentDatabaseBuilder } = require("../scripts/agentParsing");
const ApiCall = require("../models/apiCallModel");
const User = require("../models/userModel");

const testAgentParsing = async (req, res) => {
  const { numSkip, numAgent, zip_code } = req.body;
  const user_id = req.user._id;
  const apiCall =  await ApiCall.create({ user_id, num_agents: numAgent, zip_code });

  if (!apiCall) {
    res.status(500).json({ error: "Internal Server Error" });
  }

  try {
    fs.readFile("./sampleCalls/90277p1.json", "utf8", async (err, data) => {
      if (err) {
        console.error("Error reading data file:", err);
        res.status(500).json({ error: "error is here" });
      } else {
        const jsonData = JSON.parse(data);
        //start of agent Parsing and agent data use function calls
        const agentObjects = [];
        const agentSetOfQuery = new Set();
        agentDatabaseBuilder(jsonData, agentObjects, agentSetOfQuery, user_id, apiCall._id);
        const user = await User.findById(user_id);

        if (!user) {
          throw Error("User not found.");
        }
        user.apiCallsMade.push(apiCall._id);
        await user.save();

        //used to output agent to console
        agentObjects.forEach(async (agent) => {
          try {
            const savedAgent = await agent.save();
            console.log(`Agent saved: ${savedAgent.first_name} ${savedAgent.last_name}`);
          } catch (error) {
            console.error(`Error saving agent: ${error}`)
          }

        })
        res.status(200).json({mssg: "File read correctly"})
      }
    });
  } catch (error) {
    console.error("Error reading data file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { testAgentParsing };
