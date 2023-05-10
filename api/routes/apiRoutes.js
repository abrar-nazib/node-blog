const router = require("express").Router();

const {
  uploadProfilePics,
  removeProfilePics,
  postImageUploadController,
} = require("../controllers/uploadController");

router.post("/profilePics", uploadProfilePics);
module.exports = router;
