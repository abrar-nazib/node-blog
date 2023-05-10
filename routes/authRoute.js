const router = require("express").Router();

// Import controllers
const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController,
} = require("../controllers/authController");

// Import middlewares
const signupValidator = require("../validator/auth/signupValidator");
const loginValidator = require("../validator/auth/loginValidator");
const { isUnAuthenticated } = require("../middleware/authMiddleware");

// define the routes
router.get("/signup", isUnAuthenticated, signupGetController);
router.post(
  "/signup",
  [isUnAuthenticated, signupValidator],
  signupPostController
);

router.get("/login", isUnAuthenticated, loginGetController);
router.post("/login", [loginValidator, isUnAuthenticated], loginPostController);

router.get("/logout", logoutController);

// export router
module.exports = router;
