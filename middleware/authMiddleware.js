const User = require("../models/User");

exports.bindUserWithRequest = () => {
  return async (req, res, next) => {
    // return a middleware function. Have to call it to get the middleware
    if (!req.session.isLoggedIn) {
      return next(); // don't do anyting if the user is not logged in
    }
    try {
      let user = await User.findById(req.session.user._id); // find the user by id from session
      req.user = user; // bind the user to the request
      next();
    } catch (e) {
      console.log(e);
      return next(e);
    }
  };
};

exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/auth/login");
  }
  next();
};

exports.isUnAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/dashboard");
  }
  next(); // otherwise pass control to the next middleware
};
