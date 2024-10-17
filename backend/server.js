const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const multer = require('multer');
const mongoose = require('mongoose')
const Comment = require('../src/models/Comment')


dotenv.config();

const app = express();
app.use(express.json()); // Para processar JSON

// Configuração do multer para armazenar a imagem em memória
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Conectar ao MongoDB
const client = new MongoClient(process.env.MONGO_URI);

async function connectToDatabase() {
  try {
    await client.connect();
    return client.db('teste').collection('documents');
  } catch (error) {
    console.error('Falha ao conectar ao MongoDB', error);
    throw error;
  }
}

async function connectToCommentsDatabase() {
  try {
    await client.connect();
    return client.db('teste').collection('comments'); // Mude aqui para a coleção de comentários
  } catch (error) {
    console.log('Falha ao conectar ao MongoDB', error);
    throw error;
  }
}

// Rota para inserir dados
app.post('/insert', upload.single('imagem'), async (req, res) => {
  const { titulo, autor, genero, sinopse } = req.body;
  const imagem = req.file; 

  try {
    const collection = await connectToDatabase();
    const result = await collection.insertOne({
      titulo,
      autor,
      genero,
      sinopse,
      imagem: imagem.buffer, // Armazena a imagem no banco como buffer binário
    });
    res.status(201).json({ message: 'Documento inserido com sucesso', result });
  } catch (error) {
    console.error('Erro ao inserir documento:', error);
    res.status(500).json({ message: 'Erro ao inserir documento', error });
  }
});

app.get('/documents', async (req, res) => {
  try {
    const collection = await connectToDatabase();
    const documents = await collection.find({}).toArray();
    // console.log('Documentos encontrados:', documents);
    res.status(200).json(documents);
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    res.status(500).json({ message: 'Erro ao buscar documentos', error });
  }
});

app.get('/comments/:bookId', async (req, res) => {
  const { bookId } = req.params; // Extrai o bookId dos parâmetros da requisição

  try {
    const collection = await connectToCommentsDatabase();
    
    // Busca os comentários que correspondem ao bookId
    const comments = await collection.find({ bookId }).toArray(); // Aqui está a correção

    res.status(200).json(comments); // Retorna os comentários encontrados
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    res.status(500).json({ message: 'Erro ao buscar comentários', error });
  }
});


app.post('/comments', async (req, res) => {
  const { bookId, texto } = req.body;

  try {
    const collection = await connectToCommentsDatabase();
    const result = await collection.insertOne({
     bookId,
     texto
    });
    res.status(201).json({ message: 'Comentário inserido com sucesso', result });
  } catch (error) {
    console.error('Erro ao inserir comentário:', error);
    res.status(500).json({ message: 'Erro ao inserir conetário', error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
