const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
const { required } = require("joi");


const noteSchema = new Schema({
  subject: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: Number, required: true },
  
  // 5 Modules under notes
  resources: {
    notes: {
      module_1: { url: String, filename: String },
      module_2: { url: String, filename: String },
      module_3: { url: String, filename: String },
      module_4: { url: String, filename: String },
      module_5: { url: String, filename: String }
    }
  },
  
  // ✅ SEPARATE syllabus field
  syllabus: {
    url: String,
    filename: String
  },
  
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
   reviews : [ {
          type: Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
  // ... rest of your schema
});



noteSchema.post("findOneAndDelete", async (note) => {
  if(note){
    await Review.deleteMany({_id : {$in : note.reviews}});
  }
});

const Note = mongoose.model("Note", noteSchema);


module.exports = Note;









// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // Define Quiz Schema
// const quizSchema = new Schema({
//   question: {
//     type: String,
//     required: true,
//   },
//   options: {
//     type: [String],
//     required: true,
//   },
//   answer: {
//     type: String,
//     required: true,
//   },
// });

// // Define Resources Schema
// const resourceSchema = new Schema({
//   notes: String,
//   syllabus: String,
//   previous_papers: [String],
//   youtube_links: [String],
//   quizzes: [quizSchema],
// });

// // Define Main Listing Schema (like Student Buddy format)
// const notesSchema = new Schema({
//   subject: {
//     type: String,
//     required: true,
//   },
//   branch: {
//     type: String,
//     required: true,
//   },
//   semester: {
//     type: Number,
//     required: true,
//   },
//   resources: resourceSchema,
// });

// const Notes = mongoose.model("Notes", notesSchema);
// module.exports = Notes;