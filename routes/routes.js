const authRoute = require("./authRoute");
const dashboardRoute = require("./dashboardRoute");
const playgroundRoute = require("../playground/play");
const uploadRoute = require("./uploadRoute");
const apiRoute = require(".../api/apiRoute");

const routes = [
  {
    path: "/auth",
    handler: authRoute,
  },
  {
    path: "/dashboard",
    handler: dashboardRoute,
  },
  {
    path: "/playground",
    handler: playgroundRoute,
  },
  {
    path: "/uploads",
    handler: uploadRoute,
  },
  {
    path: "/",
    handler: (req, res) => {
      res.json({
        message: "Hello World",
      });
    },
  },
];

module.exports = (app) => {
  routes.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  });
};
