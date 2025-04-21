const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/book');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// ➕ Add a new book
app.post('/books', async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.send(book);
});

// 📚 Retrieve all books
app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.send(books);
});

// ✏️ Update book details
app.put('/books/:id', async (req, res) => {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updated);
});

// 🗑️ Delete a book
app.delete('/books/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.send({ message: 'Book deleted successfully' });
});

app.listen(3000, () => {
    console.log('Bookstore server running at http://localhost:3000');
});
