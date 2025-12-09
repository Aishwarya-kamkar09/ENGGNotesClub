const mongoose = require('mongoose');


const quizSchema = new mongoose.Schema({
    subject: String,
    questions: Array,
    score: Number,
    userId: String,
    date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Quiz', quizSchema);
