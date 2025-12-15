const express = require("express");
const router = express.Router();
const Notes = require("../models/note");

router.get("/search/results", async (req, res) => {
    try {
        const q = req.query.q;

        const notes = await Notes.find({
            $or: [
                { subject: { $regex: q, $options: "i" } },
                { branch: { $regex: q, $options: "i" } },
                { title: { $regex: q, $options: "i" } },
                { content: { $regex: q, $options: "i" } }
            ]
        });

        res.render("search_results", { notes, query: q });

    } catch (err) {
        console.error("Search error:", err);
        res.send("Error searching");
    }
});

module.exports = router;