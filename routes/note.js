// const express = require("express");
// const router = express.Router();
// const WrapAsync = require("../utils/wrapAsync.js");
// const Note = require("../models/note.js");
// const {isLoggedin, isOwner, validateNote} = require("../Middleware.js");
// const noteController = require("../controllers/notes.js");
// const multer = require("multer");
// // const {storage} = require("../cloudConfig.js");

// const {sampleNote, paperData, syllabusData, youtubeLinks, quizzes} = require("../init/data.js")
// // const notesController = require('../controllers/notes'); 

// const path = require("path");
// const fs = require("fs");

// const uploadDir = path.join(__dirname, "../uploads/notes");

// // Make folder if not exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 50 * 1024 * 1024 }
// });


// // router.post("/", isLoggedin,
// //   upload.fields([
// //   {name: "syllabus", maxCount: 1},
// //   {name: "module_1", maxCount: 1},
// //   {name: "module_2", maxCount: 1},
// //   {name: "module_3", maxCount: 1},
// //   {name: "module_4", maxCount: 1},
// //   {name: "module_5", maxCount: 1},
// // ]),
// // validateNote,
// // WrapAsync(noteController.create)
// // );
// // downloadable route
// // router.get("/download/:id/:module", async (req, res) => {
// //   const note = await Note.findById(req.params.id);
// //   const mod = req.params.module;
// //   if (!note || !note.resources || !note.resources.notes || !note.resources.notes[mod]) {
// //     return res.status(404).send("File not found");
// //   }
// //   const file = note.resources.notes[mod];
// //   // ✅ GOOGLE DRIVE / ONLINE LINK
// //   if (typeof file === "string" && file.startsWith("http")) {
// //     return res.redirect(file);
// //   }
// //   // ✅ LOCAL FILE UPLOAD
// //   if (typeof file === "string") {
// //     const filePath = path.join(__dirname, "..", file);
// //     if (!fs.existsSync(filePath)) {
// //       return res.status(404).send("File not found on server");
// //     }
// //     return res.download(filePath);
// //   }
// //   return res.status(400).send("Invalid file format in database");
// // });

// // DOWNLOAD MODULE PDF
// router.get("/download/:id/:module", async (req, res) => {
//   try {
//     const note = await Note.findById(req.params.id);
//     const mod = req.params.module;

//     if (!note || !note.resources || !note.resources.notes || !note.resources.notes[mod]) {
//       return res.status(404).send("Module not found");
//     }

//     const fileEntry = note.resources.notes[mod];

//     // CASE 1: fileEntry is a string (external link)
//     if (typeof fileEntry === "string") {
//       if (fileEntry.startsWith("http")) return res.redirect(fileEntry);
//       const filePath = path.join(__dirname, "..", fileEntry);
//       if (!fs.existsSync(filePath)) return res.status(404).send("File missing on server");
//       return res.download(filePath);
//     }

//     // CASE 2: fileEntry is object -> { url, filename }
//     if (typeof fileEntry === "object") {
//       const url = fileEntry.url;
//       const filename = fileEntry.filename || path.basename(url);

//       // If it's a Google Drive / online link
//       if (url.startsWith("http")) {
//         return res.redirect(url);
//       }

//       // Local uploaded file
//       const filePath = path.join(__dirname, "..", url);
//       if (!fs.existsSync(filePath)) return res.status(404).send("File missing on server");

//       res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
//       return res.download(filePath);
//     }

//     return res.status(400).send("Invalid module file format");

//   } catch (err) {
//     console.error(err);
//     return res.status(500).send("Server error");
//   }
// });

// // DOWNLOAD SYLLABUS
// router.get("/download/syllabus/:id", async (req, res) => {
//   const note = await Note.findById(req.params.id);
//   if (!note || !note.syllabus || !note.syllabus.url) {
//     return res.status(404).send("No syllabus found");
//   }
//   const file = note.syllabus; //.url
//   // If file is Google Drive or external link
//   if (file.url.startsWith("http")) {
//     return res.redirect(file);
//   }
//   // Local file
//   const filePath = path.join(__dirname, "..", file);
//   return res.download(filePath);
// });


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

// // post create new listing
// module.exports.show = async (req, res) => {
    
//     let { id } = req.params;
//     const note = await Note.findById(id)
//     .populate({
//         path: "reviews", 
//         populate: {
//              path: "author",
//             },
//         })
//         .populate("owner");
//     if(!note) {          
//         req.flash("error", "Notes you requested for does not exist!");
//         return res.redirect("/notes");
//     }

// const papers = paperData[subjectName] || [];
//     console.log(note);
//     res.render("notes/show.ejs", { note, papers, currUser: req.user });  //youtubeLinks, quizzes, sampleNote
// };



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
//   const syllabus = syllabusData[subjectName] || null;
//   note.resources.syllabus = syllabus;

//   // ✅ GET QUIZZES
//   const quiz = quizzes.find(q => q.subject === subjectName) || null;

//   // ✅ GET YOUTUBE VIDEOS
//   const videos = youtubeLinks.find(v => v.subject === subjectName) || null;

//   res.render("notes/show.ejs", {
//     note,
//     papers,
//     quiz,
//     videos,
//     currUser: req.user
//   });
// };

// // module.exports.create = async (req, res, next) => {
// //  const { note } = req.body;
// //  const resources = { notes: {} };
// //     const moduleKeys = ['module_1', 'module_2', 'module_3', 'module_4', 'module_5'];
    
// //     moduleKeys.forEach(key => {
// //       if (req.files && req.files[note[resources][${key}]]) {
// //         const file = req.files[note[resources][${key}]][0];
// //         resources.notes[key] = {
// //           url: file.path,
// //           filename: file.filename
// //         };
// //       }
// //     });
      
// //   const newNote = new Note({
// //     ...note,
// //     resources
// //   });

// //   newNote.owner = req.user._id;       
// //   await newNote.save();
// //   req.flash("success", "New Notes Created!");
// //   res.redirect("/notes");
// // };
// module.exports.create = async (req, res) => {

//   const { note } = req.body;

//   // STORE MODULES
//   const resources = { notes: {} };
//   const modules = ['module_1', 'module_2', 'module_3', 'module_4', 'module_5'];

//   modules.forEach(mod => {
//     if (req.files[mod]) {
//       resources.notes[mod] = {
//         url: req.files[mod][0].path,
//         filename: req.files[mod][0].filename
//       };
//     }
//   });

//   // STORE SYLLABUS
//   let syllabusData = null;
//   if (req.files['note[syllabus]']) {
//     syllabusData = {
//       url: req.files['note[syllabus]'][0].path,
//       filename: req.files['note[syllabus]'][0].filename
//     };
//   }

//   // SAVE NOTE
//   const newNote = new Note({
//     ...note,
//     resources,
//     syllabus: syllabusData,
//     owner: req.user._id
//   });

//   await newNote.save();

//   res.redirect(`/notes/${newNote._id}`);
 
// };






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
// //  controllers/notes.js




// //Router.route implementation
// //it includes index route and create route
// router
//     .route("/")
//     .get(WrapAsync(noteController.index))
//     .post(isLoggedin,
//          upload.fields([
//             { name: 'module_1', maxCount: 1 },
//             { name: 'module_2', maxCount: 1 },
//             { name: 'module_3', maxCount: 1 },
//             { name: 'module_4', maxCount: 1 },
//             { name: 'module_5', maxCount: 1 },
//             { name: 'note[syllabus]', maxCount: 1 },
//             ]),
//          validateNote, 
//         //  WrapAsync(noteController.create)
//          );
    


// router.get("/profile", async (req, res) => {
//     const currUser = req.user;

//     // fetch other users except current user
//     const users = await User.find({ _id: { $ne: currUser._id } });

//     res.render("users/profile", { currUser, users });
// });




// //New Route
// router.get("/new", isLoggedin , WrapAsync(noteController.renderNewForm));




// //this includes show, update and delete route
// router
//     .route("/:id")
    
//     .get(WrapAsync(noteController.show))
//     .put(isLoggedin, 
//         isOwner,
//         upload.single('note[image]'),
//         validateNote, 
//         WrapAsync(noteController.update))
//     .delete(isLoggedin, 
//         isOwner, 
//         WrapAsync(noteController.delete)
//     );

// //Edit route
// router.get("/:id/edit", isLoggedin, isOwner, WrapAsync(noteController.edit));



// //this is Route to work on Filters
// // router
// //     .route("/")
// //     .get(WrapAsync(listingController.index))
// //     .post(isLoggedin,
// //          upload.single('listing[image]'),
// //          validateListing, 
// //          WrapAsync(listingController.create)
// //     );

// // router.get("/", async(req, res) => {
// //     let {search} = req.query;
// //     let query = {};
// //     if(search && search.trim() !== ""){
// //         let regex = new RegExp(search, "i");
// //       query = {
// //             $or: [
// //                 {title: regex },
// //                 {location :regex},
// //                 {category : regex}
// //             ]
// //         };
// //     }
// //     const listings = await Listing.find(query);
// //     res.render("../includes/navbar.ejs", {listings, search});
// // });


// module.exports = router;























// const express = require("express");
// const router = express.Router();

// const WrapAsync = require("../utils/wrapAsync.js");
// const Note = require("../models/note.js");
// const { isLoggedin, isOwner, validateNote } = require("../Middleware.js");
// const noteController = require("../controllers/notes.js");

// const multer = require("multer");
// const { storage } = require("../cloudConfig.js");   // use ONLY Cloudinary storage
// const upload = multer({ storage });

// // ------------------------------
// // ROUTES
// // ------------------------------

// // INDEX + CREATE
// // INDEX + CREATE
// router.route("/")
//   .get(WrapAsync(noteController.index))
//   .post(
//     isLoggedin,
//     upload.fields([
//       { name: "syllabus", maxCount: 1 },
//       { name: "module_1", maxCount: 1 },
//       { name: "module_2", maxCount: 1 },
//       { name: "module_3", maxCount: 1 },
//       { name: "module_4", maxCount: 1 },
//       { name: "module_5", maxCount: 1 }
//     ]),
//     validateNote,
//     WrapAsync(noteController.create)
//   );

// // NEW
// router.get("/new", isLoggedin, noteController.renderNewForm);

// // SHOW / UPDATE / DELETE
// router.route("/:id")
//   .get(WrapAsync(noteController.show))
//   .put(
//     isLoggedin,
//     isOwner,
//     upload.single("image"),
//     validateNote,
//     WrapAsync(noteController.update)
//   )
//   .delete(
//     isLoggedin,
//     isOwner,
//     WrapAsync(noteController.delete)
//   );

// // EDIT
// router.get("/:id/edit", isLoggedin, isOwner, WrapAsync(noteController.edit));

// module.exports = router;



























// =========================
//  REQUIRED MODULES
// =========================
const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/wrapAsync.js");
const Note = require("../models/note.js");
const { isLoggedin, isOwner, validateNote } = require("../Middleware.js");
const noteController = require("../controllers/notes.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const User = require("../models/user.js");
const { paperData, syllabusData, youtubeLinks, quizzes } = require("../init/data.js");

// =========================
//  FILE UPLOAD SETTINGS
// =========================
const uploadDir = path.join(__dirname, "../uploads/notes");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }
});

// =========================
//  DOWNLOAD ROUTE (CLEANED)
// =========================
router.get("/download/:id/:module", async (req, res) => {
  try {
    const { id, module } = req.params;
    const note = await Note.findById(id);

    if (!note || !note.resources?.notes?.[module])
      return res.status(404).send("File not found");

    const fileEntry = note.resources.notes[module];

    // CASE 1 → Online link
    if (typeof fileEntry === "string" && fileEntry.startsWith("http"))
      return res.redirect(fileEntry);

    // CASE 2 → Local storage (string)
    const filePath = path.join(__dirname, "..", fileEntry.url || fileEntry);
    if (!fs.existsSync(filePath)) return res.status(404).send("Missing file");

    return res.download(filePath);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// =========================
// DOWNLOAD SYLLABUS
// =========================
router.get("/download/syllabus/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note?.syllabus?.url) return res.status(404).send("No syllabus found");

  const file = note.syllabus;

  if (file.url.startsWith("http")) return res.redirect(file.url);

  const filePath = path.join(__dirname, "..", file.url);
  return res.download(filePath);
});

// =========================
// ROUTE: INDEX + CREATE
// =========================
router
  .route("/")
  .get(WrapAsync(noteController.index))
  .post(
    isLoggedin,
    upload.fields([
      { name: "module_1", maxCount: 1 },
      { name: "module_2", maxCount: 1 },
      { name: "module_3", maxCount: 1 },
      { name: "module_4", maxCount: 1 },
      { name: "module_5", maxCount: 1 },
      { name: "note[syllabus]", maxCount: 1 }
    ]),
    validateNote,
    WrapAsync(noteController.create)
  );

// =========================
// USER PROFILE
// =========================
router.get("/profile", async (req, res) => {
  const currUser = req.user;
  const users = await User.find({ _id: { $ne: currUser._id } });
  res.render("users/profile", { currUser, users });
});

// =========================
// NEW FORM
// =========================
router.get("/new", isLoggedin, noteController.renderNewForm);

// =========================
// SHOW / UPDATE / DELETE
// =========================
router
  .route("/:id")
  .get(WrapAsync(noteController.show))
  .put(
    isLoggedin,
    isOwner,
    upload.single("note[image]"),
    validateNote,
    WrapAsync(noteController.update)
  )
  .delete(isLoggedin, isOwner, noteController.delete);

// =========================
// EDIT FORM
// =========================
router.get("/:id/edit", isLoggedin, isOwner, WrapAsync(noteController.edit));

module.exports = router;

























// const express = require("express");
// const router = express.Router();
// const WrapAsync = require("../utils/wrapAsync");
// const noteController = require("../controllers/notes");
// const multer = require("multer");
// const { isLoggedin, isOwner, validateNote } = require("../Middleware");
// const path = require("path");
// const fs = require("fs");

// // -------------------- MULTER SETUP --------------------
// const uploadDir = path.join(__dirname, "../uploads/notes");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 50 * 1024 * 1024 }
// });

// // -------------------- INDEX + CREATE --------------------
// router.route("/")
//   .get(WrapAsync(noteController.index))
//   .post(
//     isLoggedin,
//     upload.fields([
//       { name: "module_1", maxCount: 1 },
//       { name: "module_2", maxCount: 1 },
//       { name: "module_3", maxCount: 1 },
//       { name: "module_4", maxCount: 1 },
//       { name: "module_5", maxCount: 1 },
//       { name: "note[syllabus]", maxCount: 1 }
//     ]),
//     validateNote,
//     WrapAsync(noteController.create)
//   );

// // -------------------- NEW NOTE FORM --------------------
// router.get("/new", isLoggedin, WrapAsync(noteController.renderNewForm));

// // -------------------- SHOW, UPDATE, DELETE --------------------
// router.route("/:id")
//   .get(WrapAsync(noteController.show))
//   .put(
//     isLoggedin,
//     isOwner,
//     upload.single("note[image]"),
//     validateNote,
//     WrapAsync(noteController.update)
//   )
//   .delete(
//     isLoggedin,
//     isOwner,
//     WrapAsync(noteController.delete)
//   );

// // -------------------- EDIT FORM --------------------
// router.get("/:id/edit", isLoggedin, isOwner, WrapAsync(noteController.edit));

// module.exports = router;