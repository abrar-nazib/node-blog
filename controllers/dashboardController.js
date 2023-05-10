const Flash = require("../utils/Flash");
const Profile = require("../models/Post");
const User = require("../models/User");

exports.dashboardGetController = async (req, res, next) => {
  try {
    // check whether the user has a profile created

    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.render("pages/dashboard/dashboard", {
        title: "My Dashboard",
        flashMessage: Flash.getMessage(req),
      });
    }

    return res.redirect("/dashboard/create-profile"); // if not, redirect to create profile page
  } catch (e) {
    next(e);
  }

  res.render("pages/dashboard/dashboard", {
    title: "My Dashboard",
    flashMessage: Flash.getMessage(req),
  });
};

exports.createProfileGetController = async (req, res, next) => {
  try {
    // check whether the user has a profile created
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.redirect("/dashboard/edit-profile"); // if yes, redirect to edit profile page
    }

    res.render("pages/dashboard/create-profile", {
      title: "Create Your Profile",
      flashMessage: Flash.getMessage(req),
      error: {},
    });
  } catch (e) {
    next(e);
  }
};

exports.createProfilePostController = async (req, res, next) => {
  next();
};

exports.editProfileGetController = async (req, res, next) => {
  next();
};

exports.editProfilePostController = async (req, res, next) => {
  next();
};
