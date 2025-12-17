// const User = require("../models/user");
// const validator = require("validator");


// // module.exports.postsignup = async (req,res)=>{
// //   const { username, email, password } = req.body;

// //   if (!validator.isEmail(email))
// //     throw new Error("Invalid Email");

// //   if (password.length < 8)
// //     throw new Error("Password must be at least 8 characters");

// //   const newUser = new User({ username, email });
// //   const user = await User.register(newUser, password);

// //   req.login(user, err => {
// //     res.redirect("/profile");
// //   });
// // };

// // module.exports.postlogin = (req, res) => {
// //     res.redirect("/profile");
// // };


// module.exports.getsignup = (req, res) => {
//     res.render("users/signup.ejs");
// };

// module.exports.postsignup = async(req, res) => {
//     try{
//         let {username, email, password} = req.body;
//         const newUser = new User({email,username});
//         const registeredUser = await User.register(newUser, password);
//         console.log(registeredUser);
//         req.login(registeredUser, (err) => {
//             if(err){
//                 return next(err);
//             }
//             req.flash("success", "Welcome to Wanderlust");
//             res.redirect("/notes");
//         }) 
//         } catch(err){
//             req.flash("error", err.message);
//             res.redirect("/signup");
//     } 
// };

// module.exports.getlogin = (req, res) => {
//     res.render("users/login.ejs");
// };

// module.exports.postlogin = async(req, res) => {
//         req.flash("success","Welcome back to Wanderlust!");
//         let redirectUrl = res.locals.redirectUrl || "/notes";
//         res.redirect(redirectUrl);
// };

// module.exports.getlogout =  (req, res, next) => {
//     req.logout((err) =>{
//         if(err){
//             return next(err);
//         }
//         req.flash("success", "You are logged out!");
//         res.redirect("/notes");
//     })
// };








const User = require("../models/user");
const validator = require("validator");

module.exports.getsignup = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.postsignup = async(req, res) => {
    try {
        let { username, email, password } = req.body;

        if (!validator.isEmail(email)) {
            req.flash("error", "Invalid email!");
            return res.redirect("/signup");
        }

        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);

            // 🔥 Redirect to profile setup page
            req.flash("success", "Account created! Please complete your profile.");
            res.redirect("/profile");
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.getlogin = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.postlogin = async (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/home");
};

module.exports.getlogout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.flash("success", "You are logged out!");
        res.redirect("/");
    });
};
