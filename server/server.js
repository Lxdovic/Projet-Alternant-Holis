require('dotenv').config();

const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const pool = require('./database');
const mailer = require('./mailer');
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(cors())
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening  http://localhost:${process.env.SERVER_PORT}`);
});

app.post('/profile_update', verifyAuthToken, async (req, res) => {
    const { username, bio } = req.body;
    const image = req.files && req.files.image;

    if (!username && !bio && !image) { return res.status(400).json({ message: 'Please enter at least one field.' }); }

    try {
        const result = image
        
        ? await pool.query(
            `UPDATE users SET username = $1, bio = $2, profile_picture = $3 WHERE email = $4 RETURNING *;`,
            [username, bio, image?.data, req.user.email])
        : await pool.query(
            `UPDATE users SET username = $1, bio = $2 WHERE email = $3 RETURNING *;`,
            [username, bio, req.user.email])

        res.status(200).json({ message: 'Profile updated.', user: result.rows[0] });
    } catch (err) { console.log(err); res.status(400).json({ message: 'An error occured, please retry later.' }) }
});

app.get('/profile', verifyAuthToken, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [req.user.email]
        );
        
        res.status(200).json({ message: 'Success.', user: result.rows[0] });
    } catch (err) { res.status(400).json({ message: 'An error occured, please retry later.' }) }
});

async function verifyAuthToken (req, res, next) {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1]

    if (!token) return res.status(403).json({ message: 'Access denied.' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { return res.status(403).json({ message: 'Invalid token.' })}

        req.user = user
        next()
    })
}