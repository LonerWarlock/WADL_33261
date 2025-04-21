const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Song = require('./models/song');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// c) Insert 5 songs
app.post('/songs', async (req, res) => {
    const data = req.body; // array or single object
    const songs = await Song.insertMany(data);
    res.send(songs);
});

// d) Total count + list all
app.get('/songs', async (req, res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();
    res.render('index', { songs, count });
});

// e) List by music director
app.get('/songs/music-director/:name', async (req, res) => {
    const songs = await Song.find({ musicDirector: req.params.name });
    res.send(songs);
});

// f) List by music director & singer
app.get('/songs/music-director/:name/singer/:singer', async (req, res) => {
    const songs = await Song.find({
        musicDirector: req.params.name,
        singer: req.params.singer
    });
    res.send(songs);
});

// g) Delete by ID
app.delete('/songs/:id', async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.send('Deleted');
});

// h) Add new favorite song
app.post('/songs/new', async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.send(song);
});

// i) List by singer and film
app.get('/songs/film/:film/singer/:singer', async (req, res) => {
    const songs = await Song.find({
        film: req.params.film,
        singer: req.params.singer
    });
    res.send(songs);
});

// j) Update with actor and actress
app.put('/songs/:id', async (req, res) => {
    const updated = await Song.findByIdAndUpdate(req.params.id, {
        actor: req.body.actor,
        actress: req.body.actress
    }, { new: true });
    res.send(updated);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
