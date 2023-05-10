const { body } = require("express-validator");
const bcrypt = require("bcrypt");

// load models
const User = require("../../models/User");

const loginValidator = [
  // email validation
  body("email").not().isEmpty().withMessage("Email can not be empty"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password must be greater than 5 characters"),
];

module.exports = loginValidator;
