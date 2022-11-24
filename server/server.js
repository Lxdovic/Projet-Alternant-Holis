require('dotenv').config();

const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const pool = require('./database');
const mailer = require('./mailer');
const cors = require('cors');

app.use(express.json());
app.use(cors())

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening  http://localhost:${process.env.SERVER_PORT}`);
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