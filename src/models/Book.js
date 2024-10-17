// models/Book.js
const mongoose = require('mongoose');

// Defina o esquema para o livro
const bookSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    genero: { type: String, required: true },
    sinopse: { type: String, required: true },
    imagem: { type: Buffer },  // Se você armazenar a imagem como string
});

// Crie o modelo e associe à coleção 'documents'
const Book = mongoose.model('Book', bookSchema, 'documents');

module.exports = Book;
