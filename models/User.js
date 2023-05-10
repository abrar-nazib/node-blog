/*
Schema: Name, Email, Password, Profile
*/
const { Schema, model } = require("mongoose"); // Importing Schema and model from mongoose

// Load Models
// const Profile = require("./Profile");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true, // trim white spaces
      maxlength: 20,
      required: true,
    },
    email: {
      type: String,
      trim: true, // trim white spaces
      required: true,
      unique: true, // unique email allowed only
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId, // reference to the object id of the profile
      //   ref: "Profile", // reference to the Profile model using string. Have to use if Profile model is not created yet
      ref: "Profile", // reference to the Profile model using Profile model. Profile model is created

      // not required because we will create a profile when a user is created
    },
    profilePics: {
      type: String,
      default: "/uploads/default.png",
    },
  },
  { timestamps: true }
); // timestamps: true will automatically create createdAt and updatedAt fields

const User = model("User", userSchema); // Creating a model User from the userSchema

// export the model
module.exports = User;

// Utilization of string reference and model reference difference:
