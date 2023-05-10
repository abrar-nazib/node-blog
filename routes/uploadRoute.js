const router = require("express").Router();

const { uploadProfilePics } = require("../controllers/uploadController");
// Import Middleware
const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post(
  "/profilePics",
  [isAuthenticated, upload.single("profilePics")],
  uploadProfilePics
);

module.exports = router;
