//--------- 1
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const GoogleStrategy = require("passport-google-oauth20").Strategy;
//--------- 2
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")

//--------- 3
const noteRouter = require("./routes/note.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const Note = require("./models/note.js");

// const cookie = require("express-session/session/cookie.js");

//--------- 4
// const MONGO_URL = "mongodb://127.0.0.1:27017/enggnoteshub";


const dbUrl = process.env.ATLASDB_URL;

//original
main().then(() => {
    console.log("connected to DB");
})
    .catch((err) =>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl)
}

//--------- 5
// main().then(() => {
//     console.log("connected to DB");
// })
//     .catch((err) =>{
//         console.log(err);
//     });

// async function main() {
//     await mongoose.connect(dbUrl)
// };



//--------- 6
//for index route
app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "views"));
//for show route
app.use(express.urlencoded({extended: true}));
//for method-override
app.use(methodOverride("_method"));
// for ejs-mate
app.engine("ejs", ejsMate);
//for static file like css files
app.use(express.static(path.join(__dirname, "/public")));






//--------- 7
// using mongo session
// const store = MongoStore.create({
//     mongoUrl: dbUrl,
//     crypto: {
//         secret: process.env.SECRET,
//     },
//     touchAfter: 24 * 3600,
// });

//--------- 8
// store.on("error", () => {
//     console.log("ERROR in MONGO SESSION STORE", err);
// });

//--------- 9
//using express session
const sessionOptions = {
    // store,
    secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60* 24* 7,
        maxAge: 1000 * 60 * 60 * 24 *7,
        httpOnly: true
    },
};



app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser((user,done)=>done(null,user.id));
passport.deserializeUser(async(id,done)=>{
  const user = await User.findById(id);
  done(null,user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID.trim(),
  clientSecret: process.env.GOOGLE_CLIENT_SECRET.trim(),
  callbackURL: "http://localhost:8080/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
try{
  const email = profile.emails[0].value;
  const username = profile.displayName.replace(/\s/g,"") + Math.floor(Math.random()*1000);

  let user = await User.findOne({ email });

  if (!user) {
    user = await new User({ username, email }).save();
  }
    return done(null, user);
  } catch(err){
    return done(err, null);
  }
}));

app.use((req,res,next) => {
    res.locals.currUser = req.user;
    console.log("Logged-in user:", req.user);
    next();
});



app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});


app.use((req,res,next) => {
    res.locals.search = req.query.search || "";
    next();
});


 
//chatgpt
app.use((req,res,next) => {
    res.locals.mapToken = process.env.MAP_TOKEN;
    next();
});



//Useing listings route from routes/listing.js
app.use("/notes", noteRouter);
app.use("/notes/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.get("/home", (req, res) => {
    res.render("notes/home.ejs");
});

app.get("/secondHome", (req, res) => {
    res.render("notes/secondHome.ejs");
});




app.get("/resources", async(req,res) => {
    let allNotes = await Note.find({});
    res.render("notes/index.ejs", {allNotes});
});



app.get('/', (req, res) => res.render('index'));
app.post('/quiz', async (req, res) => {
  const subject = req.body.subject;
  try {
    // Mock AI API call (replace with PrepAI/QuizAPI endpoint)
    const questions = await generateQuestions(subject, 5);
    res.render('quiz', { questions, subject });
  } catch (err) {
    res.render('error', { message: 'Failed to generate questions' });
  }
});
async function generateQuestions(subject, count) {
  // Replace with real AI API like PrepAI or QuizAPI
  // Example: https://quizapi.io/api/v1/questions?category=linux&limit=5
  const response = await axios.get(`https://quizapi.io/api/v1/questions?apiKey=YOUR_KEY&category=${subject}&limit=${count}`);
  return response.data.map(q => ({
    question: q.question,
    options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
    answer: q.correct_answer
  }));
}


//for error handling middleware
// app.all(/.*/, (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found!"));
// });
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});
app.use((err, req, res, next) => {
    let {statusCode=500, message="something went wrong!!!"} = err;
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});













