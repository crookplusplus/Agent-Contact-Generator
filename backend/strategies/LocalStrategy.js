const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

//Called when user logs in and signs up
//passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());

//called after user logs in; it sets user details in the req.user object
passport.serializeUser(User.serializeUser());
//gets user details from the req.user object
passport.deserializeUser(User.deserializeUser());