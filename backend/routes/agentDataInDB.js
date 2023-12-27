const express = require("express");

const { verifyUser } = require("../middleware/authentication");

//import controller methods
const { getAgentbyId, 
    getAgentListByListId, 
    updateAgentContactStatus,
    deleteAgent,
    downloadAgentList } = require("../controllers/AgentInfoInDB/agentDBController");

//create instance of the router
const router = express.Router();

//route calls
//retrieve agent from database by id
router.get('/:id', verifyUser, getAgentbyId );

//get list of agents from database
//returns an array of agents and all there information
router.get('/list/:id', verifyUser, getAgentListByListId);

//update agent contact status in database
//returns the updated agent
router.patch('/contact/:id', verifyUser, updateAgentContactStatus);

//delete agent from database
//delete agent from database by id and decrements api call num_agents by 1
router.delete('/:id', verifyUser, deleteAgent);

//download list of agents from database
router.get('/download/:form/:id', verifyUser, downloadAgentList);

//export statement 
module.exports = router;
