const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const Session = new Schema({
  refreshToken: {
    type: String,
    required: false,
    default: "",
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: false,
  },  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactAllowance: {
    type: Number,
    default: 0,
    min: 0
  },
  agentsContacted: {
    type: Number,
    default: 0
  },
  totalAgentsPulled: {
    type: Number,
    default: 0
  },
  lastApiCall: {
    type: Date,
    default: null
  },
  apiCallsMade: [
    {
      type: Schema.Types.ObjectId,
      ref: "ApiCall",
    },
  ],
  //array of session tokens to support sessions on multiple devices
  refreshToken: {
    type: [Session],
  },
});

//passport-local-mongoose plugin to handle hashing and salting passwords
let options = { usernameField: "email", usernameQueryFields: ["email"] };
userSchema.plugin(passportLocalMongoose, options);

//static signup method to check existence of user, and hash and salt password
userSchema.statics.signup = async function (username, email, password) {
  //validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  //check if user exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("User already exists");
  }

  //this is an example for passing values to the user object before saving
  //const user = await this.register({ username: email, name: 'John Doe' }, password);

  //creates user object with hashed and salted password
  const user = await this.register({username: username, email: email }, password);

  return user;
};

module.exports = mongoose.model("User", userSchema);
