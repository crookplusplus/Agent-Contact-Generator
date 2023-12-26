const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const Session = new Schema({
  refreshToken: {
    type: String,
    required: true,
    default: "",
  },
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  //password is hashed and salted by passport-local-mongoose
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
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
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
  const user = await this.register({ email: email }, password);

  return user;
};

module.exports = mongoose.model("User", userSchema);
