const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { isLoggedin } = require("../Middleware");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.get("/profile", isLoggedin, (req, res) => {
    res.render("users/profile.ejs");
});

router.post(
  "/profile",
  isLoggedin,
  upload.single("profileImage"),
  async (req, res) => {
    const user = await User.findById(req.user._id);

    user.name = req.body.name;
    user.role = req.body.role;

    if (req.file) {
      user.profileImage = "/uploads/" + req.file.filename;
    }

    await user.save();

    req.flash("success", "Profile updated successfully!");

    // 🔥 Redirect to HOME PAGE
    // res.redirect("/home");
     res.redirect("/group-caht");
  }
);

module.exports = router;