const express = require("express");

//import statements for controller functions
const { loginUser, signupUser, deleteList, deleteUser, refreshUserToken } = require("../controllers/userController");


//create instance of the router
const router = express.Router();

//route calls
//adds user to database
router.post('/signup', signupUser)
//checks if user exists in database
router.post('/login', loginUser);
//remove user from database
router.delete('/delete/:id', deleteUser);
//refreshes user token
router.post('/refresh', refreshUserToken);

//deletes apiCall/list from database and user profile
router.delete('/list/delete/:id', deleteList);


module.exports = router;