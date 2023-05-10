/*
Schema:
User, title, bio, prifilePics, links: {fb, twitter, github, website}, posts, bookmarks,
*/

const { Schema, model } = require("mongoose"); // Importing Schema and model from mongoose

// Load Models
// const User = require("./User");
// const Post = require("./Post");

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, // reference to the object id of the user
      ref: "User", // reference to the User model
      required: true,
    },
    name: {
      type: String,
      trim: true, // trim white spaces
      maxlength: 32,
      required: true,
    },
    title: {
      type: String,
      trim: true, // trim white spaces
      maxlength: 100,
    },
    bio: {
      type: String,
      trim: true, // trim white spaces
      maxlength: 500,
    },
    profilePic: String, // link to profile picture
    links: {
      website: String,
      facebook: String,
      twitter: String,
      github: String,
    },
    posts: [
      // array of posts
      {
        type: Schema.Types.ObjectId, // reference to the object id of the post
        ref: "Post", // reference to the Post model
      },
    ],
    bookmarks: [
      // array of bookmarks
      {
        type: Schema.Types.ObjectId, // reference to the object id of the post
        ref: "Post", // reference to the Post model
      },
    ],
  },
  { timestamps: true }
); // timestamps: true will automatically create createdAt and updatedAt fields

const Profile = model("Profile", profileSchema); // Creating a model Profile from the profileSchema

// export the model
module.exports = Profile;
