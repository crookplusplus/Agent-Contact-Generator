const passport = require('passport');
const jwt = require('jsonwebtoken');  
//The environment bool will be sent in an options object for cookie generation
//for development, this should be false for postman testing
//for production, this should be true so it is only read by the server and client
const environment = false;

exports.COOKIE_OPTIONS = {
    httpOnly: true,
    secure: environment,
    sameSite: 'None',
    maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
};

//generate a JWT token
exports.getToken = user => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY)
  });
}

//generate a refresh token, which is a JWT token
exports.getRefreshToken = user => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY)
    });
    return refreshToken;
}

//middleware to for all authenticated requests
//if used in a routes as a parameter, it will require a valid JWT token and
//will add the user object to the request
//For Postman: Authorization -> Bearer Token -> paste JWT token
exports.verifyUser = passport.authenticate('jwt', {session: false});