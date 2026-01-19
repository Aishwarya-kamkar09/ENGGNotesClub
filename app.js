// ---------------- ENV SETUP ----------------
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// ---------------- IMPORTS ----------------
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Note = require("./models/note.js");


// ---------------- ROUTES ----------------
const noteRouter = require("./routes/note.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const profileRoutes = require("./routes/profile.js");
const searchRoutes = require("./routes/search");
const aiRoutes = require("./routes/ai.js");
const { Socket } = require("dgram");


// ---------------- DB CONNECTION ----------------

const dbUrl = process.env.ATLASDB_URL;

mongoose.connect(dbUrl)
    .then(() => console.log("✔ Connected to MongoDB"))
    .catch(err => console.log(err));


// ---------------- MIDDLEWARE ----------------

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ---------------- SESSION ----------------
app.set("trust proxy", 1);
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport Local Auth
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Passport Google Auth
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID.trim(),
        clientSecret: process.env.GOOGLE_CLIENT_SECRET.trim(),
        callbackURL: "https://enggnotesclub.onrender.com/auth/google/callback"
          // process.env.NODE_ENV === "production" ? "https://enggnotesclub.onrender.com/auth/google/callback" : 
          //     "https://localhost:8080/auth/google/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const username = profile.displayName.replace(/\s/g, "") + Math.floor(Math.random() * 1000);

                let user = await User.findOne({ email });

                if (!user) {
                    user = await new User({ username, email }).save();
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);


// ---------------- GLOBAL VARIABLES ----------------

app.use((req, res, next) => {
    res.locals.currUser = req.user;
    next();
});
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
app.use((req, res, next) => {
    res.locals.search = req.query.search || "";
    next();
});
app.use((req, res, next) => {
    res.locals.mapToken = process.env.MAP_TOKEN;
    next();
});


// ---------------- ROUTE USE ----------------
app.get("/", (req, res) => res.render("notes/home"));
app.use("/notes", noteRouter);
app.use("/notes/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/", profileRoutes);
app.use("/", searchRoutes);
app.use("/", aiRoutes);


// ---------------- BASIC ROUTES ----------------

// app.get("/", (req, res) => res.render("index"));

app.get("/about", (req, res) => res.render("notes/about.ejs"));


app.get("/resources", async (req, res) => {
    let allNotes = await Note.find({});
    res.render("notes/index.ejs", { allNotes });
});

app.get("/subjects/:subject", (req, res) => {
    const {subject} = req.params;
    res.render(`subjects/${subject}`);
});





app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.authProvider === "google") {
    return res.json({ message: "Password reset not available for this account" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
  await user.save();

  const resetLink = `https://enggnotesclub.onrender.com/reset-password/${token}`;

  // send email (nodemailer)
  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

await transporter.sendMail({
  to: email,
  subject: "Reset your password",
  html: `<a href="${resetLink}">Reset Password</a>`
});
});

app.post("/reset-password/:token", async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) return res.send("Invalid or expired token");

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();
});








app.get("/quiz", (req, res) => {
    res.render("quiz/index", {error: null});
});
app.post("/quiz/generate", async (req, res) => {
  const { subject } = req.body;

  if (!subject) {
    return res.render("quiz/index", {
      error: "Please select a subject"
    });
  }

  // TEMP questions (replace later with AI / DB)
  const questions = [
    {
      question: "What is Ohm's Law?",
      options: ["V=IR", "P=VI", "E=mc2", "F=ma"],
      answer: "V=IR"
    },
    {
      question: "Unit of resistance?",
      options: ["Ohm", "Volt", "Ampere", "Watt"],
      answer: "Ohm"
    }
  ];

  res.render("quiz/play", {
    subject: subject.toUpperCase(),
    questions,
    total: questions.length
  });
});





app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
    // res.status(err.statusCode || 500).send(err.message || "Something went wrong!" 
    
  });

app.use((err, req, res, next) => {
    let {statusCode=500, message="something went wrong!!!"} = err;
    res.status(statusCode).render("error.ejs",{message});
});
// ---------------- ERROR HANDLING ----------------
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});



const PORT = process.env.PORT || 8080;

// ---------------- START SERVER ----------------
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});




// // 404 handler (ONLY ONE)
// app.use((req, res, next) => {
//     next(new ExpressError(404, "Page Not Found!"));
// });

// // Global error handler
// app.use((err, req, res, next) => {
//     const { statusCode = 500, message = "Something went wrong!" } = err;
//     res.status(statusCode).render("error.ejs", { message });
// });

// // ---------------- START SERVER ----------------
// const PORT = process.env.PORT || 8080;

// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Server is running on port ${PORT}`);
// });