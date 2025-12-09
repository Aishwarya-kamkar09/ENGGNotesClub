const express = require("express");
const router = express.Router({mergeParams: true});
const WrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Note = require("../models/note.js");
const {validateReview, isLoggedin, isReviewAuthor} = require("../Middleware.js")
const reviewcontroller = require("../controllers/reviews.js")



//Review
//Post Review Route
router.post("/", isLoggedin, validateReview ,  WrapAsync(reviewcontroller.postreview));

//Delete Review Route
router.delete("/:reviewId", isLoggedin, isReviewAuthor, WrapAsync(reviewcontroller.deletereview));


module.exports = router;