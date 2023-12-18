const Agent = require("../../models/agentModel");
const ApiCall = require("../../models/apiCallModel");

const getAgentbyId = async (req, res) => {
  const agentId = req.body.agent_id;

  try {
    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }

    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//function to get list of agents from database
const getAgentListByListId = async (req, res) => {
  const listId = req.body.list_id;

  try {
    //find all agents in the database with the list_id
    const agentList = await Agent.find({ APICall_id: listId });

    if (!agentList) {
      return res.status(404).json({ error: "Agent list not found" });
    }
    if (agentList.length === 0) {
      return res.status(404).json({ error: "Agent list not found" });
    }

    res.json(agentList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//function to update agent contact status in database
const updateAgentContactStatus = async (req, res) => {
  const agentId = req.body.agent_id;
  const contactedStatus = req.body.contacted;

  try {
    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }
    
    agent.contacted = contactedStatus;
    await agent.save();

    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//function to delete agent from database by id and decrements api call num_agents by 1
const deleteAgent = async (req, res) => {
  const agentId = req.body.agent_id;

  try {
    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }

    const apiCall = await ApiCall.findById(agent.APICall_id);
    await Agent.deleteOne({ _id: agent._id });
    apiCall.num_agents = Number(apiCall.num_agents) - 1;
    await apiCall.save();

    res.json({ message: "Agent removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { getAgentbyId, 
    getAgentListByListId, 
    updateAgentContactStatus,
    deleteAgent };
