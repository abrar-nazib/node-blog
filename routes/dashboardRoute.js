const router = require("express").Router();

// Import Controllers
const {
  dashboardGetController,
  createProfileGetController,
  createProfilePostController,
  editProfileGetController,
  editProfilePostController,
} = require("../controllers/dashboardController");

// Import Middleware
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", isAuthenticated, dashboardGetController);

router.get("/create-profile", isAuthenticated, createProfileGetController);
router.post("/create-profile", isAuthenticated, createProfilePostController);

router.get("/edit-profile", isAuthenticated, editProfileGetController);
router.post("/edit-profile", isAuthenticated, editProfilePostController);

module.exports = router;
