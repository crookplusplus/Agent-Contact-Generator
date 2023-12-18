const mongoose = require("mongoose");
const axios = require("axios");
const { agentDatabaseBuilder } = require("./agentParsing");
const ApiCall = require("../models/apiCallModel");
const Agent = require("../models/agentModel");


/**
 * helper function to increment the offset for the pagination of the API call
 * @param {number} offset
 * @returns {number} increments offset by 20
 */
function incrementOffset(offset) {
  return (offset += 20);
}


/**
 * Function to bundle the API's options and make the third-party API call
 * @param {string} offset the offset is made into a string before it is passed to this function
 * @param {string} zipCode for region to get the agents from
 * @returns {JSON} returns JSON data from the API 
 */
async function makeAPICall(offset, zipCode) {
  //parameter for the third party api call
  const options = {
    method: "GET",
    url: process.env.AGENT_API_URL,
    params: {
      postal_code: zipCode,
      offset: offset,
      limit: "20",
      sort: "recent_activity_high",
      types: "agent",
      agent_type: "buyer",
    },
    headers: {
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}



/**
 * Driver function to make the correct number of API calls, increment the offset value,
 * save the agent's information to the database, and keep track of the number of agent that have been saved.
 * @param {any} numberOfCalls passed from the frontend for number of calls to make based on the 
 * number of agents the user wants to get contact information for. Will be used as a number.
 * @param {string} zipCode used to determine the region the user wants agent info for
 * @returns {any} returns message of the number of Agents saved to the Database
 */
async function saveAgentsToDatabase(numberOfCalls, zipCode, user_id, apiCall) {
  let numAgentsSaved = 0;
  let errors = [];
  const agentObjects = [];
  const agentSetOfQuery = new Set();
  try {
    let offSet = -20;
    for (let i = 0; i < numberOfCalls; i++) {
      offSet = incrementOffset(offSet);
      let offSetString = `${offSet}`;
      const callData = await makeAPICall(offSetString, zipCode);
      agentDatabaseBuilder(callData, agentObjects, agentSetOfQuery, user_id, apiCall._id);

      //save agents to the database
      try {
        await Promise.all(agentObjects.map(async (agent) => {
          try {
            await agent.save();
            numAgentsSaved++;
          } catch (error) {
            //catch possible errors of saving agent or agents
            errors.push(error);
          }
        }));
        agentObjects.length = 0;
      } catch (error) {
        // Handle any errors that occurred while saving the agents
        console.error("Error saving agents: ", error);
      }
    }

    if (errors.length > 0) {
      // If there are errors, throw them higher up the call stack
      throw new Error(`Errors saving agents: ${errors.map((error) => error.message).join(", ")}`);
    }
    apiCall.num_agents = Number(apiCall.num_agents) + numAgentsSaved;
    await apiCall.save();

    return { message: `${numAgentsSaved} Agents saved successfully.` }; //message is sent to terminal of server
  } catch (error) {
    console.error("Error saving data to database: ", error);
    throw error;
  }
}

module.exports = {
  saveAgentsToDatabase,
};
