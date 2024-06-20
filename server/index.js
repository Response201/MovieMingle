const express = require('express');
const cors = require('cors');
const app = express();
const movies = require('./data.json');
const bcrypt = require("bcrypt");
const { Pool } = require('pg');
require('dotenv').config();
const Stripe = require('stripe');
const port = 3000;
app.use(cors());
app.use(express.json());
const pool = new Pool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.pass,
    database: process.env.db,
    ssl: {
        rejectUnauthorized: false
    }
});
/* Paymet */
const stripe = require("stripe")(process.env.KEY);
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "sek",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/all', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const movieResult = await pool.query('SELECT * FROM movies');
    // Slice the products array based on the indexes
    const paginatedMovies = movieResult.rows.slice(startIndex, endIndex);
    // Calculate the total number of pages
    const totalPages = Math.ceil(movieResult.rows.length / pageSize);
    res.send({ movies: paginatedMovies, totalPages });
});
app.get('/api/v1/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
        const movieResult = result.rows[0];
        if (movieResult) {
            res.send(movieResult);
        } else {
            res.send('Produkt saknas');
        }
    } catch (error) {
        res.send('Något gick fel');
    }
});
app.get('/api/genre/:genre', async (req, res) => {
    const { genre } = req.params;
    try {
        const movieResult = await pool.query('SELECT * FROM movies');
        /* Tar ut all genres efter , och loopar igenom för att kontrollera att genre är angiven för filmen, 
        måste vara korrekt (Action -> passar på 3 filmer medan "Acti" -> inte passar någon films genre)  */
        const moviesInGenre = movieResult.rows.filter(movie => {
            const movieGenres = movie.genre.split(',').map(itemGenre => itemGenre.trim());
            return movieGenres.includes(genre);
        });
        if (moviesInGenre.length > 0) {
            res.json(moviesInGenre);
        } else {
            res.send('No movies found for the provided genre');
        }
    } catch (error) {
        res.send('Something went wrong');
    }
});
app.get('/genre', async (req, res) => {
    try {
        const movieResult = await pool.query('SELECT * FROM movies');
        const movietitles = [];
        if (movieResult)
            for (const item of movieResult.rows) {
                item.genre.split(',').forEach(itemGenre => {
                    const trimmedGenre = itemGenre.trim();
                    if (!movietitles.includes(trimmedGenre)) {
                        movietitles.push(trimmedGenre);
                    }
                });
            }
        res.send(movietitles);
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).send('Något gick fel vid hämtning av genrer.');
    }
});








/* Användar flöde */

app.get("/users", async (req, res) => {
    const result = await pool.query('SELECT * FROM users ');
    res.json(result.rows);

})

app.post("/createUser", async (req, res) => {
    const { email, password, provider } = req.body;



    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);


        /* om användaren redan finns */
        if (result.rows.length >= 1) {
            return res.json("Something went wrong");
        }

        /* krypeterar användarens lösenord innan det sparas i databasen, google-användare får null  */
        let crypted = null;
        if (provider === 'default') {
            crypted = await bcrypt.hash(password, 12);
        }

        const sql = `
    INSERT INTO users (email, password, provider)
     VALUES ($1, $2, $3)
    ON CONFLICT (email) DO NOTHING;
  `;
        await pool.query(sql, [email, crypted, provider]);
        res.json("Registration successful!");
    } catch (error) {
        res.json('Something went wrong');
    }
});



app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length >= 1 && result.rows[0].provider === "default") {
            const check = await bcrypt.compareSync(password, result.rows[0].password);
            if (check) {
                res.json("Log in successful!");
            }
            else {
                res.json('Something went wrong');
            }
        } else {
            res.json('Something went wrong');
        }
    } catch (error) {
        res.json('Something went wrong');
    }
})






/* spara köp i sql-server - Viktigt glöm inte att skicka med body: user, movies i post-anropet !!! användsinte men ska möjligen implementeras !!! */

app.post('/makereceipt', async (req, res) => {
    const { user, movies } = req.body;
    if (!user || !movies || !Array.isArray(movies)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    try {
        const date = new Date();
        const dateNow = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
        for (const movie of movies) {
            const { id } = movie;
            if (!id) {
                return res.json({ error: 'Invalid movie id' });
            }
            await pool.query(
                'INSERT INTO receipt (username, productId, timeDate) VALUES ($1, $2, $3)',
                [user, id, dateNow]
            );
        }
        res.json({ message: 'Receipt created successfully' });
    } catch (error) {
        res.json({ error: 'Something went wrong' });
    }
});






app.get('/receipts', async (req, res) => {
    const { username } = req.body;
    try {
        const result = await pool.query('SELECT * FROM receipt WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.send("Inga köp genomförda");
        }
    } catch (error) {
        res.json({ error: 'Something went wrong' });
    }
});




app.get('/seeReceipt', async (req, res) => {
    const { username, timedate } = req.body;
    try {
        const result = await pool.query('SELECT * FROM receipt WHERE username = $1 AND timedate = $2 ', [username, timedate]);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.send("Inga köp gjorda");
        }
    } catch (error) {
        res.json({ error: 'Something went wrong' });
    }
});




/* skapar tabeller - all funktion föe movies-tabellen är utmarkerad eftersom alla aktuella filmer redan finns i databasen */

const createReceiptTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS receipt (
            username VARCHAR(100) NOT NULL,
            productId INT NOT NULL,
            timeDate VARCHAR(50) NOT NULL,
            PRIMARY KEY (username, productId, timeDate)
        )
    `;
    pool.query(sql, (error) => {
        if (error) {
            console.error('Fel vid skapande av tabell: receipt');
        }
    });
};

/* Användar tabell */
const createUserTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            email VARCHAR(100) NOT NULL,
            password VARCHAR(100) NULL,
            provider VARCHAR(100) NOT NULL,
            PRIMARY KEY (email)
        )
    `;
    pool.query(sql, (error) => {
        if (error) {
            console.error('fel');
        }
    });
};




/* 



const dropUserTable = () => {
    const sql = `DROP TABLE IF EXISTS users`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Table dropped');

    });
};

dropUserTable()



 const insertMovies = async (movies) => {
  const sql = `
    INSERT INTO movies (id, title, description, length, image, price, genre)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO NOTHING;
  `;
  try {
    for (const movie of movies) {
      const { id, title, description, length, image, price, genre } = movie;
      await pool.query(sql, [id,title, description, length, image, price, genre.join(', ')]);
    }
  } catch (error) {
    console.error('Error inserting movies:');
  }
}; 
insertMovies(movies);
 const createMoviesTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS movies (
           id INT NOT NULL,
      title VARCHAR(100) NOT NULL,
      description VARCHAR(500) NOT NULL,
      length INTEGER NOT NULL,
      image VARCHAR(200) NOT NULL,
      price INTEGER NOT NULL,
      genre VARCHAR(50) NOT NULL,
       PRIMARY KEY (id) 
        )
    `;
    pool.query(sql, (error) => {
        if (error) {
            console.error('Fel vid skapande av tabell:');
        } 
    });
}; 
createMoviesTable(); */
createReceiptTable();
createUserTable();
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 