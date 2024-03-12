const express = require("express");

//import controller methods
const { getAgentbyId, 
    getAgentListByListId, 
    updateAgentContactStatus,
    updateAgentInfo,
    deleteAgent,
    downloadAgentList } = require("../controllers/AgentInfoInDB/agentDBController");

//import middleware
const { verifyUser } = require("../middleware/authentication.js");

//create instance of the router
const router = express.Router();

//route calls
//retrieve agent from database by id
router.get('/:id', getAgentbyId );

//get list of agents from database
//returns an array of agents and all there information
router.get('/list/:id', getAgentListByListId);

//update agent CONTACTED status in database
//returns the updated agent
router.patch('/contact/:id', verifyUser, updateAgentContactStatus);


//update agent information in database ->updateAgentInfo
router.patch('/edit/:id', updateAgentInfo);

//delete agent from database
//delete agent from database by id and decrements api call num_agents by 1
router.delete('/:id', deleteAgent);

//download list of agents from database
router.get('/download/:form/:id', verifyUser, downloadAgentList);

//export statement 
module.exports = router;
