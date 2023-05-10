const bcrypt = require("bcrypt"); // for password hashing
const { validationResult } = require("express-validator"); // for validation of user input
const Flash = require("../utils/Flash"); // for flash messages class

// import utility functions
const errorFormatter = require("../utils/validationErrorFormatter");

// load models
const User = require("../models/User");

// middleware function for signup
exports.signupGetController = async (req, res, next) => {
  res.render("pages/auth/signup", {
    title: "Create A New Account",
    errors: {},
    values: {},
    flashMessage: Flash.getMessage(req),
  });
};

exports.signupPostController = async (req, res, next) => {
  let { username, email, password } = req.body; // get parameters from the request body

  let errors = validationResult(req).formatWith(errorFormatter); // getting the result of validation
  if (!errors.isEmpty()) {
    // console.log("errors: ", errors.mapped());

    req.flash("fail", "Please check your form"); // Flash message
    // if there is an error, render the signup page with the error
    return res.render("pages/auth/signup", {
      title: "Create A New Account",
      errors: errors.mapped(),
      values: {
        username,
        email,
        password,
      },
      flashMessage: Flash.getMessage(req),
    });
  }

  try {
    // hash the password
    let hashedPassword = await bcrypt.hash(password, 11);

    // create a new user
    let user = new User({
      username,
      email,
      password: hashedPassword,
    });
    // let createdUser = await user.save();
    await user.save(); // save the user object to database
    req.flash("success", "User created successfully"); // Flash message
    res.redirect("/auth/login"); // redirect to login page
  } catch (e) {
    next(e);
  }
};

// Controller function for login (middleware)
exports.loginGetController = async (req, res, next) => {
  // if the user is already logged in, redirect to the dashboard
  if (req.session.isLoggedIn && req.session.user) {
    req.flash("fail", "You are already logged in");
    return res.redirect("/dashboard");
  }
  res.render("pages/auth/login", {
    title: "Login To Your Account",
    errors: {},
    flashMessage: Flash.getMessage(req),
  });
};

exports.loginPostController = async (req, res, next) => {
  // Handling validation error
  let { email, password } = req.body;
  let errors = validationResult(req).formatWith(errorFormatter); // getting the result of validation
  if (!errors.isEmpty()) {
    // console.log("errors: ", errors.mapped());

    req.flash("fail", "Please check your form"); // Flash message
    // if there is an error, render the login page with the error
    return res.render("pages/auth/login", {
      title: "Login To Your Account",
      errors: errors.mapped(),
      flashMessage: Flash.getMessage(req),
    });
  }

  // Handling login error
  try {
    // check email
    let user = await User.findOne({ email });
    if (!user) {
      // console.log("User not found");
      req.flash("fail", "Invalid credentials"); // Flash message
      return res.render("pages/auth/login", {
        title: "Login To Your Account",
        errors: { message: "User not found" },
        flashMessage: Flash.getMessage(req),
      });
      // return so that the rest of the code is not executed
    }

    // check password
    let match = await bcrypt.compare(password, user.password); // compare the inputted password with the hashed password
    if (!match) {
      // console.log("Password does not match");
      req.flash("fail", "Invalid credentials"); // Flash message
      return res.render("pages/auth/login", {
        title: "Login To Your Account",
        errors: { message: "Password does not match" },
        flashMessage: Flash.getMessage(req),
      });
    }

    // If everything is okay, create a session and redirect to the dashboard
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((err) => {
      // save the session to database. Why res? why not req?
      if (err) {
        // console.log("Error occured while saving session", err);
        return next(err);
      }
      req.flash("success", "Successfully logged in"); // Flash message
      res.redirect("/dashboard");
    });
  } catch (e) {
    // console.log(e);
    next(e);
  }
};

// middleware function for logout
exports.logoutController = async (req, res, next) => {
  req.session.destroy((err) => {
    // destroy the session
    if (err) {
      // console.log("Error occured while destroying session", err);
      return next(err);
    }

    // req.flash("success", "Successfully logged out"); // Flash message not possible because flash message requires session
    // redirect to login page
    return res.redirect("/auth/login");
  });
};
