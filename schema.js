const joi = require("joi");

module.exports.noteSchema = joi.object({
    note: joi.object({
        subject: joi.string().required(),
        subjectCode: joi.string().optional(),
        branch: joi.string().required(),
        semester: joi.number().required().min(1).max(8),
        uploadedBy: joi.string().required(),
        uploaderRole: joi.string().valid("student", "teacher").required()
    }).required(),
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required(),
    }).required(),
});