const User = require("../models/User");
const Profile = require("../models/Profile");

exports.uploadProfilePics = async (req, res, next) => {
  if (req.file) {
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      let profilePics = `/uploads/${req.file.filename}`;
      if (profile) {
        await Profile.findOneAndUpdate(
          {
            user: req.user._id,
          },
          {
            $set: { profilePics },
          }
        );
      }
      // if profile is not created, create a profile picture deleting the default one
      await User.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        {
          $set: { profilePics: profilePics },
        }
      );
      res.status(200).json({
        profilePics,
      });
    } catch (e) {
    //   next(e);
    res.status(500).json({
        profilePics: req.user.profilePics, // send the previous profile picture
    })
    }
  }
};
