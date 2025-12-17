






const Note = require("../models/note.js");
const { paperData, syllabusData, youtubeLinks, quizzes } = require("../init/data.js");

// INDEX PAGE
//MINE
module.exports.index = async (req, res) => {
  const allNotes = await Note.find({});
  res.render("notes/index.ejs", { allNotes });
};

//CHATGPT


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
    owner: req.user._id,
    uploaderRole: req.user.role
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



















