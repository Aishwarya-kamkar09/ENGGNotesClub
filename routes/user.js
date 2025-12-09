const express = require("express");
const router = express.Router();
// const User = require("../models/user.js");
// const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
// const { saveRedirectUrl } = require("../Middleware.js");
const usercontroller = require("../controllers/users.js")

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


// router
//   .route("/forgot-password")
//   .get(usercontroller.getForgotPassword)
//   .post(usercontroller.postForgotPassword);

// router
//   .route("/reset/:token")
//   .get(usercontroller.getResetPassword)   // FIXED HERE
//   .post(usercontroller.postResetPassword); // FIXED HERE


router.get("/profile", (req, res) => {
  if(!req.isAuthenticated()) {
    return res.redirect("/login");
  }
    res.render("users/profile");
});



module.exports = router;




















// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const User = require('../models/user');
// const Token = require('../models/Token');
// const sendEmail = require('../utils/mailer'); // helper we'll add

// // helpers
// function generateAccessToken(user) {
//   return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
// }
// function generateRefreshToken(user) {
//   return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
// }

// // SIGNUP
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!email || !password || !name) return res.status(400).json({ msg: 'All fields required' });

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: 'Email in use' });

//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);

//     user = new User({ name, email, password: hashed });
//     await user.save();

//     // create email verification token
//     const tokenString = crypto.randomBytes(32).toString('hex');
//     const token = new Token({ userId: user._id, token: tokenString, type: 'email_verify' });
//     await token.save();

//     const verifyLink = `${process.env.CLIENT_URL}/api/auth/verify-email?token=${tokenString}`;
//     await sendEmail(user.email, 'Verify your email', `Click to verify: ${verifyLink}`);

//     res.json({ msg: 'Signup success. Check email to verify.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // VERIFY EMAIL
// router.get('/verify-email', async (req, res) => {
//   try {
//     const { token } = req.query;
//     if (!token) return res.status(400).send('Invalid token');

//     const found = await Token.findOne({ token, type: 'email_verify' });
//     if (!found) return res.status(400).send('Invalid or expired token');

//     await User.findByIdAndUpdate(found.userId, { emailVerified: true });
//     await found.deleteOne();

//     // optionally auto-login by issuing tokens
//     res.send('Email verified. You can now login.');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // LOGIN (local)
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
//     if (user.provider !== 'local') return res.status(400).json({ msg: `Use ${user.provider} to sign in` });

//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) return res.status(400).json({ msg: 'Invalid credentials' });

//     if (!user.emailVerified) {
//       return res.status(403).json({ msg: 'Please verify your email first' });
//     }

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     // store hashed refresh in DB to allow revoke
//     const hashed = crypto.createHash('sha256').update(refreshToken).digest('hex');
//     user.refreshToken = hashed;
//     await user.save();

//     // set HttpOnly cookie
//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 30 * 24 * 60 * 60 * 1000
//     });

//     res.json({ accessToken, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // REFRESH
// router.post('/refresh', async (req, res) => {
//   try {
//     const token = req.cookies.refreshToken;
//     if (!token) return res.status(401).json({ msg: 'No refresh token' });

//     let payload;
//     try {
//       payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
//     } catch (e) {
//       return res.status(401).json({ msg: 'Invalid refresh token' });
//     }

//     const user = await User.findById(payload.id);
//     if (!user) return res.status(401).json({ msg: 'User not found' });

//     const hashed = crypto.createHash('sha256').update(token).digest('hex');
//     if (hashed !== user.refreshToken) {
//       return res.status(401).json({ msg: 'Refresh token revoked' });
//     }

//     const newAccess = generateAccessToken(user);
//     const newRefresh = generateRefreshToken(user);

//     user.refreshToken = crypto.createHash('sha256').update(newRefresh).digest('hex');
//     await user.save();

//     res.cookie('refreshToken', newRefresh, {
//       httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax',
//       maxAge: 30 * 24 * 60 * 60 * 1000
//     });

//     res.json({ accessToken: newAccess });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // LOGOUT
// router.post('/logout', async (req, res) => {
//   try {
//     const token = req.cookies.refreshToken;
//     if (token) {
//       try {
//         const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
//         await User.findByIdAndUpdate(payload.id, { $unset: { refreshToken: "" }});
//       } catch (e) { /* ignore */ }
//     }
//     res.clearCookie('refreshToken');
//     res.json({ msg: 'Logged out' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // FORGOT PASSWORD
// router.post('/forgot-password', async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.json({ msg: 'If an account exists, you will receive an email' });

//     const tokenString = crypto.randomBytes(32).toString('hex');
//     const token = new Token({ userId: user._id, token: tokenString, type: 'password_reset' });
//     await token.save();

//     const resetLink = `${process.env.FRONTEND_URL}/reset-password.html?token=${tokenString}`;
//     await sendEmail(user.email, 'Reset your password', `Reset link: ${resetLink}`);

//     res.json({ msg: 'If an account exists, you will receive an email' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // RESET PASSWORD
// router.post('/reset-password', async (req, res) => {
//   try {
//     const { token, password } = req.body;
//     const found = await Token.findOne({ token, type: 'password_reset' });
//     if (!found) return res.status(400).json({ msg: 'Invalid or expired token' });

//     const user = await User.findById(found.userId);
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     await found.deleteOne();
//     res.json({ msg: 'Password has been reset' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // GET current user
// const authMiddleware = require('../middleware/auth');
// router.get('/me', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password -refreshToken');
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;