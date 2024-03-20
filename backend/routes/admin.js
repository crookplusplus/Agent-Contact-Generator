const express = require("express");

//import statements for controller functions
const { addContactAllowance, resetAllowance } = require("../controllers/adminController");
const { verifyUser } = require("../middleware/authentication");

//create instance of the router
const router = express.Router();

//route calls  
//increases contact allowance for user to pull from
router.post('/incallowance', addContactAllowance);
//function that resets the contact allowance for a user
router.post('/resetallowance', resetAllowance);

module.exports = router;