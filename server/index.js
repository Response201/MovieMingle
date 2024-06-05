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
   
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    
    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    
    // Slice the products array based on the indexes
    const paginatedMovies = movies.slice(startIndex, endIndex);
    
    // Calculate the total number of pages
    const totalPages = Math.ceil(movies.length / pageSize);
    

    res.send({movies:paginatedMovies, totalPages});
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