/*
Schema:
    title, body, author, tags, thumbnail, readTime, likes, dislikes, comments
*/

const { Schema, model } = require("mongoose"); // Importing Schema and model from mongoose

// Load Models
// const User = require("./User");
// const Comment = require("./Comment");

const postSchema = new Schema(
  {
    title: {
      type: String,
      trim: true, // trim white spaces
      maxlength: 100,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId, // reference to the object id of the user
      ref: "User", // reference to the User model
      required: true,
    },
    tags: {
      type: [String], // array of strings
      required: true,
    },
    thumbnail: String, // image url
    readTime: String, // string like 2 min read
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // array of user ids who liked the post
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }], // array of user ids who disliked the post
    comments: [
      {
        type: Schema.Types.ObjectId, // reference to the object id of the comment
        ref: "Comment", // reference to the Comment model
      },
    ],
  },
  { timestamps: true }
); // timestamps: true will automatically create createdAt and updatedAt fields

const Post = model("Post", postSchema); // Creating a model Post from the postSchema

// export the model
module.exports = Post;
