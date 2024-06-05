const express = require('express');
const cors = require('cors');
const app = express();
const movies = require('./data.json');
const mysql = require('mysql2');
require('dotenv').config();
const port = 3000;
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.pass,
    database: process.env.db
  });
  





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



/* spara köp i sql-server - Viktigt glöm inte att skicka med body: user, movies i post-anropet */

    app.post('/makereceipt', async (req, res) => {
 const { user, movies } = req.body; 

    try {
        const dt = new Date();
        const dateNow = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')} ${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}:${String(dt.getSeconds()).padStart(2, '0')}`;

        for (const movie of movies) {
            const { id } = movie;
            await pool.execute(
                'INSERT INTO receipt (username, productId, timeDate) VALUES (?, ?, ?)',
                  [user, id, dateNow]
            );
        }
        res.json({ message: 'Receipt created successfully' });
    } catch (err) {
        console.error('Error creating receipt:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
    });




    
const createReceiptTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS receipt (
            username VARCHAR(100) NOT NULL,
            productId INT NOT NULL,
            timeDate VARCHAR(50) NOT NULL,
            PRIMARY KEY (username, productId, timeDate)
        )
    `;

    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Fel vid skapande av tabell:', err);
        } else {
    
        }
    });
};


createReceiptTable();
      
    
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});