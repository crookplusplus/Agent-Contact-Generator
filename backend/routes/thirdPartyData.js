const express = require("express");

//require statements to import controller methods
const { generateAgentInfo } = require("../controllers/thirdPartyDataController");
const { testAgentParsing } = require("../controllers/testParsingController")

//create instance of the router
const router = express.Router();

//route calls
//makes API call
router.post('/generate-list', generateAgentInfo);
//testing call for agentparsing
router.post('/parse-agent-test', testAgentParsing);


//export statement
module.exports = router;