const express = require("express");
const mariadb = require("mariadb");
let cors = require("cors");
require('dotenv').config();

const app = express()
const port = 3000

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
})

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome</h1>');
})

app.get('/article', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM article');
        res.status(200).json(rows);
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/utilisateur', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM utilisateur');
        res.status(200).json(rows);
    }
    catch (err) {
        console.log(err);
    }
})


app.listen(port, () => console.log(`Server Listening on : http:localhost:${port}`))