const express = require("express");
const morgan = require("morgan"); // for logging requests
// const mongoose = require("mongoose"); // for database
const session = require("express-session"); // for session management
const MongoDBStore = require("connect-mongodb-session")(session); // for storing session in database
const flash = require("connect-flash"); // for flash messages
const config = require("config"); // for configuration management

// Import custom middlewares
const { bindUserWithRequest } = require("./authMiddleware");
const setLocals = require("./setLocals");

// store session in database
const MONGODB_URI = `mongodb://${config.get("db-host")}:${config.get(
  "db-port"
)}/${config.get("db-name")}`;
const store = new MongoDBStore({
  // session storage configuration
  uri: MONGODB_URI,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2, // 2 hours
});

// Middlewares
const middlewares = [
  morgan("dev"),
  express.static("public"), // to serve static files from public folder
  express.urlencoded({ extended: true }), // to parse url encoded data ( required for parsing form data)
  express.json(), // to parse json data
  session({
    secret: config.get("secret-key"),
    resave: false, // don't have to save session in every request
    saveUninitialized: false, // don't create session until something is stored
    store: store, // store session in database store initialized above
  }),
  flash(), // for flash messages
  bindUserWithRequest(), // custom: bind user with request
  setLocals(), // custom: set local variables
];

module.exports = (app) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};
