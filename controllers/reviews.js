const Review = require("../models/reviews.js");
const Note = require("../models/note.js");


module.exports.postreview = async (req, res) => {
    let note = await Note.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    note.reviews.push(newReview);

    await newReview.save();
    await note.save();
    req.flash("success", "New Review created!");
    res.redirect(`/notes/${note._id}`); 
};

module.exports.deletereview = async (req, res) => {
        let {id, reviewId} = req.params;
        await Note.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
        await Review.findByIdAndDelete(reviewId);
         req.flash("success", " Review Deleted!");
        res.redirect(`/notes/${note._id}`); 
     };

