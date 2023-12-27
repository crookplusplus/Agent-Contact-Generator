const express = require("express");

//require statements to import controller methods
const { generateAgentInfo } = require("../controllers/thirdPartyDataController");
const { testAgentParsing } = require("../controllers/testParsingController")
const { verifyUser } = require("../middleware/authentication");

//create instance of the router
const router = express.Router();

//route calls
//makes API call
router.post('/generate-list', verifyUser, generateAgentInfo);
//testing call for agentparsing
router.post('/parse-agent-test', verifyUser, testAgentParsing);


//export statement
module.exports = router;