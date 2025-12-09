const joi = require("joi");

module.exports.noteSchema = joi.object({
    note: joi.object({
        subject: joi.string().required(),
        branch: joi.string().required(),
        semester: joi.number().required().min(1).max(5),
    }).required(),
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required(),
    }).required(),
});