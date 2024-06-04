const express = require('express');
const cors = require('cors');
const app = express();
const movies = require('./data.json');
require('dotenv').config()
const port = 3000;
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/all', (req, res) => {
    res.send(movies);
});



app.post('/api/v1/:id', (req, res) => {
    const { id } = req.params;

    try {
        const findMovie = movies.find((item) => item.id === +id);
        if (findMovie) {
            res.status(200).send(findMovie);
        } else {
            res.status(404).send('Produkt saknas');
        }
    } catch (error) {
        res.status(500).send('Något gick fel');
    }
});



app.post('/api/genre/:genre', (req, res) => {
    const { genre } = req.params;
    const moviesInGenre = [];
    try {
        movies.forEach((item) => {

            item.genre.map(allGenre => {
                if (allGenre === genre) {

                    moviesInGenre.push(item)

                }
            })
        });

        if (moviesInGenre.length >= 1) {
            res.status(200).send(moviesInGenre);
        } else {
            res.status(404).send('Produkt saknas');
        }
    } catch (error) {
        res.status(500).send('Något gick fel');
    }
});







app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});