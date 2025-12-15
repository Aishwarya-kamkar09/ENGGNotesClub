const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

// AI Tools home
router.get("/ai/tools", aiController.toolsHome);

// Pages
router.get("/ai/mcq", (req, res) => res.render("ai/mcq"));
router.get("/ai/summarize", (req, res) => res.render("ai/summarize"));
router.get("/ai/improve", (req, res) => res.render("ai/improve"));
router.get("/ai/explain", (req, res) => res.render("ai/explain"));

// POST actions
router.post("/ai/mcq", aiController.generateMCQ);
router.post("/ai/summarize", aiController.summarizeText);
router.post("/ai/improve", aiController.improveAnswer);
router.post("/ai/explain", aiController.explainTopic);

module.exports = router;