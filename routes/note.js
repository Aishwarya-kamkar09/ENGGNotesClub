


// =========================
//  REQUIRED MODULES
// =========================
const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/wrapAsync.js");
const Note = require("../models/note.js");
const { isLoggedin, isOwner, validateNote, isTeacher } = require("../Middleware.js");
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
    isTeacher,
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
router.get("/new", isLoggedin, isTeacher, noteController.renderNewForm);

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



router.get("/:id", async (req, res) => {
    const note = await Note.findById(req.params.id);

    const user = await User.findById(req.user._id);

    user.recentNotes.unshift(note._id);

    if (user.recentNotes.length > 10) {
        user.recentNotes.pop();
    }

    await user.save();

    res.render("notes/show", { note });
});


// ===============================
// ⭐ SAVE NOTE ROUTE (FINAL)
// ===============================

function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in first!");
        return res.redirect("/login");
    }
    next();
}


router.post("/:id/save", isLoggedIn, async (req, res) => {
    try {
        const noteId = req.params.id;
        const user = await User.findById(req.user._id);

        if (!user.savedNotes.includes(noteId)) {
            user.savedNotes.push(noteId);
            await user.save();
        }

        res.redirect("/notes/" + noteId);

    } catch (err) {
        console.log(err);
        res.send("Error saving note");
    }
});

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