module.exports = () => {
  return (req, res, next) => {
    res.locals.user = req.user; // save user data to the local storage
    res.locals.isLoggedIn = req.session.isLoggedIn;
    next(); // pass control to the next middleware
  };
};
