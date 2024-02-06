const express = require("express");

//import statements for controller functions
const { addContactAllowance } = require("../controllers/adminController");

//create instance of the router
const router = express.Router();

//route calls  
//increases contact allowance for user to pull from
router.post('/incallowance', addContactAllowance);

module.exports = router;