const express = require("express");

//import statements for controller functions
const { loginUser, 
    signupUser, 
    deleteList, 
    deleteUser, 
    refreshUserToken,
    logoutUser,
    getHighlights,
    getLists,
    getContacts,
    userCreditCheck,
    redeemCredits,
    checkout
    } = require("../controllers/userController");
const { verifyUser } = require("../middleware/authentication");


//create instance of the router
const router = express.Router();

//route calls
//adds user to database
router.post('/signup', signupUser)
//checks if user exists in database
router.post('/login', loginUser);
//logs user out
router.post('/logout', verifyUser, logoutUser);
//remove user from database
router.delete('/delete/:id', deleteUser);
//refreshes user token
router.post('/refresh', refreshUserToken);
//retrieves user highlight information for dashboard
router.get('/highlights', verifyUser, getHighlights)
//retrieves user information for lists for the user dashboard
router.get('/lists', verifyUser, getLists);
//gets users agent contact information
router.get('/contacts', verifyUser, getContacts);
//gets users contact allowance amount
router.get('/credits', verifyUser, userCreditCheck);
//redeems user credits for contacts
router.post('/redeem', verifyUser, redeemCredits);
//increases user contact allowance (cart checkout)
router.post('/checkout', verifyUser, checkout);

//deletes apiCall/list from database and user profile
router.delete('/list/delete/:id', deleteList);


module.exports = router;