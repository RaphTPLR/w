const express = require("express");
const mariadb = require("mariadb");
const bcrypt = require('bcrypt');
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

app.get('/article/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM article WHERE id = ?', [id]);
        res.status(200).json(rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.post('/article', async (req, res) => {
    const newArticle = req.body;
    let conn;
    try {
        conn = await pool.getConnection();

        const formattedDate = new Date(newArticle.create_date).toISOString().slice(0, 19).replace("T", " ");

        const result = await conn.query('INSERT INTO article (titre, texte, auteur, create_date) VALUES (?, ?, ?, ?)', [
            newArticle.titre,
            newArticle.texte,
            newArticle.auteur,
            formattedDate,
        ]);

        const insertedArticleId = result.insertId.toString();

        res.status(201).json({ insertedArticleId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.delete('/article/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM article WHERE id = ?', [id]);
        res.status(200).json({ message: 'Article supprimée' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

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

app.get('/utilisateur/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM utilisateur WHERE id = ?', [id]);
        res.status(200).json(rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.post('/utilisateur', async (req, res) => {
    const newUser = req.body;
    let conn;
    try {
        conn = await pool.getConnection();

        const hashedPassword = await bcrypt.hash(newUser.pwd, 10);

        const hashedEmail = await bcrypt.hash(newUser.email, 10);

        const result = await conn.query('INSERT INTO utilisateur (email, pwd, nom, prenom) VALUES (?, ?, ?, ?)', [
            hashedEmail || newUser.email,
            hashedPassword,
            newUser.nom,
            newUser.prenom,
        ]);

        const insertedUserId = result.insertId.toString();

        res.status(201).json({ insertedUserId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.delete('/utilisateur/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM utilisateur WHERE id = ?', [id]);
        res.status(200).json({ message: 'Utilisateur supprimée' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});


app.listen(port, () => console.log(`Server Listening on : http:localhost:${port}`))