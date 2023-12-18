const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  apiCallsMade: [
    {
      type: Schema.Types.ObjectId,
      ref: "ApiCall",
    },
  ],
});

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

    //hash and salt password and save user
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);   
    const user = await this.create({ email, password: hashedPassword });   

  
    return user;
  };


//static login method
userSchema.statics.login = async function (email, password) {
    //validation
    if (!email || !password) {
      throw Error("All fields must be filled");
    }
    
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    
    //check if user exists
    const user = await this.findOne({ email });
    if (!user) {
      throw Error("Incorrect email. Please try again");
    }
    if (!user.password) {
      throw Error("Incorrect password. Please try again");
    }
  
    return user;
  };

module.exports = mongoose.model("User", userSchema);