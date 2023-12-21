const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

//Used by the authenticatied requests to deserialize the user, i.e., to fetch user details from the JWT
passport.use(new JwtStrategy(options, async function(jwt_payload, done) {
    try {
        const user = await User.findOne({id: jwt_payload.sub});
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // could create a new account
        }
    } catch (err) {
        return done(err, false);
    }
}));
