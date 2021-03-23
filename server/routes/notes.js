const express = require("express");
const router = express.Router();

// @desc    Get notes on mount
// @route   GET /notes

router.get("/", ( req, res ) => {
    Note.find(( err, notes ) => {
        res.send(notes);
        return;
    })
})

// @desc    Adds new note to database
// @route   POST /notes

router.post("/", ( req, res ) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    note.save();
})

.post((req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    note.save();
});
