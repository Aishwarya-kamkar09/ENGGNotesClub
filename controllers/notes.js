// const { paperData, syllabusData, youtubeLinks, quizzes } = require("../init/data");
// const Note = require("../models/note");

// //index route
// module.exports.index = async (req, res) => {
//     // const category = req.query.category;
//     // let filter = {};
//     const search = req.query.search;
   
//     // if(category){
//     //     filter.category = category;
//     // }
//     if(search){
//         filter.country = {
//              $regex: search, $options: "i" };
//         } 
//     const allNotes = await Note.find({});
//     res.render("notes/index.ejs", {allNotes, search});

// };

// //get new form
// module.exports.renderNewForm = (req, res) => {
//     res.render("notes/new.ejs");
// };

// //post create new listing
// // module.exports.show = async (req, res) => {
    
// //     let { id } = req.params;
// //     const note = await Note.findById(id)
// //     .populate({
// //         path: "reviews", 
// //         populate: {
// //              path: "author",
// //             },
// //         })
// //         .populate("owner");
// //     if(!note) {          
// //         req.flash("error", "Notes you requested for does not exist!");
// //         return res.redirect("/notes");
// //     }

// // const papers = paperData[subjectName] || [];
// //     console.log(note);
// //     res.render("notes/show.ejs", { note, papers, currUser: req.user });  //youtubeLinks, quizzes, sampleNote
// // };



// // SHOW ROUTE
// module.exports.show = async (req, res) => {

//   let { id } = req.params;

//   const note = await Note.findById(id)
//     .populate({
//       path: "reviews",
//       populate: { path: "author" }
//     })
//     .populate("owner");

//   if (!note) {
//     req.flash("error", "Notes you requested for does not exist!");
//     return res.redirect("/notes");
//   }

//   // ✅ FIX SUBJECT NAME AUTOMATICALLY
//   const subjectName = note.subject.includes("(")
//     ? note.subject.split("(")[0].trim()
//     : note.subject;

//   // ✅ GET PREVIOUS PAPERS
//   const papers = paperData[subjectName] || [];

//   // ✅ GET SYLLABUS
// let syllabus = null;
// // priority 1: User uploaded file
// if (note.syllabus && note.syllabus.url) {
//     syllabus = note.syllabus.url;
// }
// // priority 2: If no upload, load from static data
// else if (syllabusData[subjectName]) {
//     syllabus = syllabusData[subjectName];
// }
  

//   // ✅ GET QUIZZES
//   const quiz = quizzes.find(q => q.subject === subjectName) || null;

//   // ✅ GET YOUTUBE VIDEOS
//   const videos = youtubeLinks.find(v => v.subject === subjectName) || null;

//   res.render("notes/show.ejs", {
//     note,
//     papers,
//     quiz,
//     videos,
//     syllabus,
//     currUser: req.user
//   });
// };

// module.exports.create = async (req, res, next) => {
//  const { note } = req.body;
//  const resources = { notes: {} };
//     const moduleKeys = ['module_1', 'module_2', 'module_3', 'module_4', 'module_5'];
    
//     moduleKeys.forEach(key => {
//       if (req.files && req.files[`note[resources][${key}]`]) {
//         const file = req.files[`note[resources][${key}]`][0];
//         resources.notes[key] = {
//           url: file.path,
//           filename: file.filename
//         };
//       }
//     });
      
//   const newNote = new Note({
//     ...note,
//     resources
//   });

//   newNote.owner = req.user._id;       
//   await newNote.save();
//   req.flash("success", "New Notes Created!");
//   res.redirect("/notes");
// };

// // module.exports.create = async (req, res) => {

// //   const { note } = req.body;

// //   // STORE MODULES
// //   const resources = { notes: {} };
// //   const modules = ['module_1', 'module_2', 'module_3', 'module_4', 'module_5'];

// //   modules.forEach(mod => {
// //     if (req.files[mod]) {
// //       resources.notes[mod] = {
// //         url: req.files[mod][0].path,
// //         filename: req.files[mod][0].filename
// //       };
// //     }
// //   });

// //   // STORE SYLLABUS
// //   let syllabusData = null;
// //   if (req.files && req.files.syllabus) {
// //     syllabusData = {
// //       url: req.files['syllabus'][0].path,
// //       filename: req.files['syllabus'][0].filename
// //     };
// //   }

// //   // SAVE NOTE
// //   const newNote = new Note({
// //     ...note,
// //     resources,
// //     syllabus: syllabusData,
// //     owner: req.user._id
// //   });

// //   await newNote.save();

// //   res.redirect(`/notes/${newNote._id}`);
// // };






// module.exports.edit = async (req, res) => {
//     let {id} = req.params;
//     const note = await Note.findById(id);
//     if(!note) {          
//         req.flash("error", "Notes you requested for does not exist!");
//         // res.redirect("/listings");
//          res.redirect(`/notes/${id}`);
//     }

//     let originalUrl = note.image.url;
//    originalUrl = originalUrl.replace("/upload", "/upload/w_250")
//     res.render("notes/edit.ejs", {note, originalUrl});
// };

// module.exports.update = async (req, res) => {
//     let {id } = req.params;
//     if(!req.body.note) {
//         throw new ExpressError(400, "Send Valid Data For Listing.");
//     }
//     let note = await Note.findByIdAndUpdate(id, {...req.body.note});

//     if(typeof req.file !== "undefined") {
//         let url = req.file.path;
//         let filename = req.file.filename;
//         note.image = { url, filename};

//         await note.save();
//     }
    
//     req.flash("success", "Notes Updated!");
//     res.redirect(`/notes/${id}`);
// };

// module.exports.delete = async (req, res) => {
//     let {id} = req.params;
//     await Note.findByIdAndDelete(id);
//     req.flash("success", " Notes Deleted!");
//     res.redirect("/notes");
// };






























const Note = require("../models/note.js");
const { paperData, syllabusData, youtubeLinks, quizzes } = require("../init/data.js");

// INDEX PAGE
module.exports.index = async (req, res) => {
  const allNotes = await Note.find({});
  res.render("notes/index.ejs", { allNotes });
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("notes/new.ejs");
};

// CREATE NOTE
module.exports.create = async (req, res) => {
  const { note } = req.body;

  const resources = { notes: {} };
  const modules = ["module_1", "module_2", "module_3", "module_4", "module_5"];

  modules.forEach(mod => {
    if (req.files[mod]) {
      resources.notes[mod] = {
        url: req.files[mod][0].path,
        filename: req.files[mod][0].filename
      };
    }
  });

  let syllabusData = null;
  if (req.files["note[syllabus]"]) {
    syllabusData = {
      url: req.files["note[syllabus]"][0].path,
      filename: req.files["note[syllabus]"][0].filename
    };
  }

  const newNote = new Note({
    ...note,
    resources,
    syllabus: syllabusData,
    owner: req.user._id
  });

  await newNote.save();
  res.redirect(`/notes/${newNote._id}`);
};

// SHOW NOTE
module.exports.show = async (req, res) => {
  let { id } = req.params;

  const note = await Note.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!note) {
    req.flash("error", "Notes not found");
    return res.redirect("/notes");
  }

  const subjectName = note.subject.includes("(")
    ? note.subject.split("(")[0].trim()
    : note.subject;

  const papers = paperData[subjectName] || [];
  const syllabus = syllabusData[subjectName] || null;
  const quiz = quizzes.find(q => q.subject === subjectName) || null;
  const videos = youtubeLinks.find(v => v.subject === subjectName) || null;

  res.render("notes/show.ejs", {
    note,
    papers,
    quiz,
    videos,
    currUser: req.user
  });
};

// EDIT FORM
module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);

  if (!note) {
    req.flash("error", "Notes not found");
    return res.redirect("/notes");
  }

  let imageUrl = note.image?.url || "";
  if (imageUrl.includes("/upload"))
    imageUrl = imageUrl.replace("/upload", "/upload/w_250");

  res.render("notes/edit.ejs", { note, originalUrl: imageUrl });
};

// UPDATE
module.exports.update = async (req, res) => {
  const { id } = req.params;

  if (!req.body.note)
    throw new ExpressError(400, "Invalid Data");

  let note = await Note.findByIdAndUpdate(id, req.body.note);

  if (req.file) {
    note.image = {
      url: req.file.path,
      filename: req.file.filename
    };
    await note.save();
  }

  req.flash("success", "Notes Updated");
  res.redirect(`/notes/${id}`);
};

// DELETE
module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  req.flash("success", "Notes Deleted");
  res.redirect("/notes");
};
































// // controllers/notes.js

// const { paperData, syllabusData, youtubeLinks, quizzes } = require("../init/data");
// const Note = require("../models/note");

// // -------------------- INDEX (Only Search) --------------------
// module.exports.index = async (req, res) => {
//   const search = req.query.search || "";
//   let query = {};

//   if (search.trim() !== "") {
//     query = {
//       subject: { $regex: search, $options: "i" }
//     };
//   }

//   const allNotes = await Note.find(query);
//   res.render("notes/index.ejs", { allNotes, search });
// };

// // -------------------- NEW FORM --------------------
// module.exports.renderNewForm = (req, res) => {
//   res.render("notes/new.ejs");
// };

// // -------------------- SHOW ROUTE --------------------
// module.exports.show = async (req, res) => {
//   let { id } = req.params;

//   const note = await Note.findById(id)
//     .populate({
//       path: "reviews",
//       populate: { path: "author" }
//     })
//     .populate("owner");

//   if (!note) {
//     req.flash("error", "Notes you requested for does not exist!");
//     return res.redirect("/notes");
//   }

//   const subjectName = note.subject.includes("(")
//     ? note.subject.split("(")[0].trim()
//     : note.subject;

//   const papers = paperData[subjectName] || [];
//   const quiz = quizzes.find(q => q.subject === subjectName) || null;
//   const videos = youtubeLinks.find(v => v.subject === subjectName) || null;

//   let syllabus = null;
//   if (note.syllabus && note.syllabus.url) {
//     syllabus = note.syllabus.url;
//   } else if (syllabusData[subjectName]) {
//     syllabus = syllabusData[subjectName];
//   }

//   res.render("notes/show.ejs", {
//     note,
//     papers,
//     quiz,
//     videos,
//     syllabus,
//     currUser: req.user
//   });
// };

// // -------------------- CREATE NOTE --------------------
// module.exports.create = async (req, res) => {
//   const { note } = req.body;

//   const resources = { notes: {} };
//   const modules = ["module_1", "module_2", "module_3", "module_4", "module_5"];

//   modules.forEach(mod => {
//     if (req.files[mod]) {
//       resources.notes[mod] = {
//         url: req.files[mod][0].path,
//         filename: req.files[mod][0].filename
//       };
//     }
//   });

//   let syllabusFile = null;
//   if (req.files["note[syllabus]"]) {
//     syllabusFile = {
//       url: req.files["note[syllabus]"][0].path,
//       filename: req.files["note[syllabus]"][0].filename
//     };
//   }

//   const newNote = new Note({
//     ...note,
//     resources,
//     syllabus: syllabusFile,
//     owner: req.user._id
//   });

//   await newNote.save();

//   req.flash("success", "New Notes Created!");
//   res.redirect(`/notes/${newNote._id}`);
// };

// // -------------------- EDIT --------------------
// module.exports.edit = async (req, res) => {
//   let { id } = req.params;
//   const note = await Note.findById(id);

//   if (!note) {
//     req.flash("error", "Notes you requested for does not exist!");
//     return res.redirect("/notes");
//   }

//   res.render("notes/edit.ejs", { note });
// };

// // -------------------- UPDATE --------------------
// module.exports.update = async (req, res) => {
//   let { id } = req.params;

//   const note = await Note.findByIdAndUpdate(id, { ...req.body.note });

//   if (req.file) {
//     note.image = {
//       url: req.file.path,
//       filename: req.file.filename
//     };
//     await note.save();
//   }

//   req.flash("success", "Notes Updated!");
//   res.redirect(`/notes/${id}`);
// };

// // -------------------- DELETE --------------------
// module.exports.delete = async (req, res) => {
//   let { id } = req.params;
//   await Note.findByIdAndDelete(id);

//   req.flash("success", "Notes Deleted!");
//   res.redirect("/notes");
// };