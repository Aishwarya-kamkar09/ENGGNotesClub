const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
// const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { isLoggedin: isLoggedIn } = require("../Middleware.js");
const usercontroller = require("../controllers/users.js");
// const upload = require("../middleware/upload");



// ------------------ MULTER CONFIG ------------------
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
// ----------------------------------------------------


router
  .route("/signup")
  .get(usercontroller.getsignup)
  .post(usercontroller.postsignup);

router
  .route("/login")
  .get(usercontroller.getlogin)
  .post(
      // saveRedirectUrl,
      passport.authenticate("local", 
      {
        failureRedirect: "/login", 
        failureFlash: true,
        // successRedirect: "/notes",
        // successFlash: true
      }) ,
      (req, res) => {

        req.flash("success", "Welcome back!");
        res.redirect("/notes")
      }
      // usercontroller.postlogin
    );

router.get("/logout", usercontroller.getlogout);

router.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));

router.get("/auth/google/callback", 
  passport.authenticate("google", {failureRedirect:"/login"}),
  (req, res) => {
    res.redirect("/notes");
  }
);




router.post("/profile",
    isLoggedIn,
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

    
         res.redirect("/notes");
   
});




module.exports = router;












