const User = require("../models/user");
const validator = require("validator");


// module.exports.postsignup = async (req,res)=>{
//   const { username, email, password } = req.body;

//   if (!validator.isEmail(email))
//     throw new Error("Invalid Email");

//   if (password.length < 8)
//     throw new Error("Password must be at least 8 characters");

//   const newUser = new User({ username, email });
//   const user = await User.register(newUser, password);

//   req.login(user, err => {
//     res.redirect("/profile");
//   });
// };

// module.exports.postlogin = (req, res) => {
//     res.redirect("/profile");
// };


module.exports.getsignup = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.postsignup = async(req, res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/notes");
        }) 
        } catch(err){
            req.flash("error", err.message);
            res.redirect("/signup");
    } 
};

module.exports.getlogin = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.postlogin = async(req, res) => {
        req.flash("success","Welcome back to Wanderlust!");
        let redirectUrl = res.locals.redirectUrl || "/notes";
        res.redirect(redirectUrl);
};

module.exports.getlogout =  (req, res, next) => {
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/notes");
    })
};










// const User = require("../models/user");
// const validator = require("validator");
// // const crypto = require("crypto");
// // const nodemailer = require("nodemailer");

// // SIGNUP
// module.exports.getsignup = (req, res) => {
//   res.render("users/signup.ejs");
// };

// module.exports.postsignup = async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!validator.isEmail(email))
//       throw new Error("Invalid Email");

//     if (password.length < 8)
//       throw new Error("Password must be at least 8 characters");

//     const newUser = new User({ username, email });
//     const user = await User.register(newUser, password);

//     req.login(user, err => {
//       if (err) return next(err);
//       res.redirect("/profile");
//     });
//   } catch (err) {
//     req.flash("error", err.message);
//     res.redirect("/signup");
//   }
// };

// // LOGIN
// module.exports.getlogin = (req, res) => {
//   res.render("users/login.ejs");
// };

// module.exports.postlogin = (req, res) => {
//   req.flash("success", "Welcome back!");
//   res.redirect("/notes");
// };

// // LOGOUT
// module.exports.getlogout = (req, res, next) => {
//   req.logout(err => {
//     if (err) return next(err);
//     req.flash("success", "Logged out successfully");
//     res.redirect("/login");
//   });
// };




// // SHOW FORGOT PAGE
// module.exports.getForgotPassword = (req, res) => {
//     res.render("users/forgotPassword");
// };

// POST Forgot Password (NO EMAIL — SHOW LINK)
// module.exports.postForgotPassword = async (req, res) => {
//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//         req.flash("error", "No user found with that email.");
//         return res.redirect("/forgot-password");
//     }

//     const token = crypto.randomBytes(20).toString("hex");

//     user.resetPasswordToken = token;
//     user.resetPasswordExpires = Date.now() + 3600000;
//     await user.save();

//     const resetLink =` http://localhost:8080/reset/${token}`;

//     res.render("users/resetLink", { resetLink });
// };

// GET Reset Password Page (FIXED NAME)
// module.exports.getResetPassword = async (req, res) => {
//     const { token } = req.params;

//     const user = await User.findOne({
//         resetPasswordToken: token,
//         resetPasswordExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//         req.flash("error", "Password reset token is invalid or expired.");
//         return res.redirect("/forgot-password");
//     }

//     res.render("users/resetPassword", { token });
// };

// POST Reset Password (FIXED NAME)
// module.exports.postResetPassword = async (req, res) => {
//     const { token } = req.params;
//     const { password } = req.body;

//     const user = await User.findOne({
//         resetPasswordToken: token,
//         resetPasswordExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//         req.flash("error", "Token expired or invalid!");
//         return res.redirect("/forgot-password");
//     }

//     await user.setPassword(password);

//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     req.flash("success", "Password reset successful! You can login now.");
//     res.redirect("/login");
// };