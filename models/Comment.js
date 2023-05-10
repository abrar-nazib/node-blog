/*
Schema:
     post, user, body, replies
*/

const { Schema, model } = require("mongoose"); // Importing Schema and model from mongoose

// Load Models
// const User = require("./User");
// const Post = require("./Post");

const commentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId, // reference to the object id of the post
      ref: "Post", // reference to the Post model
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId, // reference to the object id of the user
      ref: "User", // reference to the User model
      required: true,
    },
    body: {
      type: String,
      trim: true, // trim white spaces
      required: true,
    },
    replies: [
      {
        body: {
          type: String,
          trim: true, // trim white spaces
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId, // reference to the object id of the user
          ref: "User", // reference to the User model
          required: true,
        },
        createAt: {
          type: Date, // will store the date when the reply was created
          default: new Date(), // default value is the current date
        },
      },
    ],
  },
  { timestamps: true }
); // timestamps: true will automatically create createdAt and updatedAt fields

const Comment = model("Comment", commentSchema); // Creating a model Comment from the commentSchema

// export the model
module.exports = Comment;
