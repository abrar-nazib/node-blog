const { body } = require("express-validator");

// load models
const User = require("../../models/User");

const signupValidator = [
  // username validation
  body("username")
    .isLength({ min: 2, max: 20 })
    .withMessage("Username must be between 2 to 20 characters")
    .custom(async (username) => {
      let user = await User.findOne({ username }); // find the user with the username (let used for block scope)
      // hours wasted on this thing. Must use await before database calls
      if (user) {
        return Promise.reject("Username already exists");
      }
    })
    .trim(),

  //email validation
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user) {
        return Promise.reject("Email already exists");
      }
    }),

  // password validation
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be greater than 5 characters"),
  body("confirmPassword").custom((confirmPassword, { req }) => {
    if (confirmPassword !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true; // return true if validation is successful. Must return otherwise will hang
  }),
];

module.exports = signupValidator;
