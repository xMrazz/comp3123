const express = require('express');
const router = express.Router();
const Note = require('../models/NotesModel.js');

// Create a new note
router.post('/notes', (req, res) => {
    if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    const newNote = new Note({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
    });

    newNote.save((err, note) => {
        if (err) {
            return res.status(500).send({
                message: "Can't create note",
                error: err.message
            });
        }
        res.status(201).json(note);
    });
});

// Retrieve all notes
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({}).exec();
        res.json(notes);
    } catch (err) {
        res.status(500).send({
            message: "Can't retrieve notes",
            error: err.message
        });
    }
});

// Retrieve one note
router.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteId).exec();
        if (!note) {
            return res.status(404).send({
                message: "Note not found"
            });
        }
        res.json(note);
    } catch (err) {
        res.status(500).send({
            message: "Can't retrieve note",
            error: err.message
        });
    }
});

// Update a note
router.put('/notes/:noteId', async (req, res) => {
    if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "Note title, description, and priority are required"
        });
    }
    try {
        const note = await Note.findByIdAndUpdate(req.params.noteId, {
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority,
            dateUpdated: Date.now(),
        }, { new: true }).exec();
        if (!note) {
            return res.status(404).send({
                message: "Note not found"
            });
        }
        res.json(note);
    } catch (err) {
        res.status(500).send({
            message: "Error updating note",
            error: err.message
        });
    }
});

// Delete a note
router.delete('/notes/:noteId', async (req, res) => {
    try {
        const note = await Note.findByIdAndRemove(req.params.noteId).exec();
        if (!note) {
            return res.status(404).send({
                message: "Note not found"
            });
        }
        res.json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).send({
            message: "Error deleting note",
            error: err.message
        });
    }
});

module.exports = router;