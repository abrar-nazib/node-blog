// config dotenv
require("dotenv").config();

// import dependencies
const express = require("express");
const mongoose = require("mongoose"); // for database
const config = require("config"); // for configuration management

const chalk = require("chalk"); // for colorful console messages

const MONGODB_URI = `mongodb://${config.get("db-host")}:${config.get(
  "db-port"
)}/${config.get("db-name")}`;

const app = express();

// Setup view engine
app.set("view engine", "ejs");
app.set("views", "views");

const setMiddlewares = require("./middleware/middlewares");
const setRoutes = require("./routes/routes");

// Using Middlewares from middleware directory
setMiddlewares(app);

// Using Routes from routes directory
setRoutes(app);

//  Error handler middleware: must be at the last of all middlewares to catch all errors
app.use((req, res, next) => {
  let error = new Error("404 Page Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  if (error.status === 404) {
    return res.render("pages/error/404", {
      flashMessage: {},
    });
  }
  console.log(chalk.red.inverse(error.message));
  console.log(error);
  return res.render("pages/error/500", {
    flashMessage: {},
  });
});

// Specify port and start the server
const port = config.get("port");

// connect database
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(chalk.green("Database connected"));
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((e) => {
    return console.log(e);
  });
