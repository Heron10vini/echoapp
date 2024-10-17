// models/Comment.js
const mongoose = require('mongoose');
const Book = require('./Book'); // Importa o modelo Book

const commentSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // Referência ao modelo Book
    texto: { type: String, required: true }
});

// Crie o modelo Comment
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
