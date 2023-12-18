const express = require("express");

//import controller methods
const { getAgentbyId, 
    getAgentListByListId, 
    updateAgentContactStatus,
    deleteAgent } = require("../controllers/AgentInfoInDB/agentDBController");

//create instance of the router
const router = express.Router();

//route calls
//retrieve agent from database by id
router.get('/:id', getAgentbyId );

//get list of agents from database
//returns an array of agents and all there information
router.get('/list/:id', getAgentListByListId);

//update agent contact status in database
//returns the updated agent
router.patch('/contact/:id', updateAgentContactStatus);

//delete agent from database
//delete agent from database by id and decrements api call num_agents by 1
router.delete('/:id', deleteAgent);

//export statement 
module.exports = router;
