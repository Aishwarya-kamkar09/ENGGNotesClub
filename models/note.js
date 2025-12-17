const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    
  },
    subject: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String
    },
    branch: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    content: {
      type: String
    },

    // Uploaded modules (local files)
    resources: {
        notes: {
            module_1: { url: String, filename: String },
            module_2: { url: String, filename: String },
            module_3: { url: String, filename: String },
            module_4: { url: String, filename: String },
            module_5: { url: String, filename: String }
        }
    },
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    uploaderRole:{
        type: String,
        ref: ["student", "teacher"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    // Syllabus PDF
    syllabus: {
        url: String,
        filename: String
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    }, 
    downloads: { 
        type: Number, 
        default: 0 
    },
    rating: { 
        type: Number, 
        default: 0 
    }, // average rating
    ratingsCount: { 
        type: Number, 
        default: 0 
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

module.exports = mongoose.model("Note", NoteSchema);






