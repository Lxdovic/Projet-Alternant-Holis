require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('./database');
const mailer = require('./mailer');
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(cors())
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.listen(process.env.AUTH_SERVER_PORT, () => {
    console.log(`Server listening  http://localhost:${process.env.AUTH_SERVER_PORT}`);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) { return res.status(400).json({ message: 'Please enter all fields.' }); }

    try {
        const result = await pool.query(
            `SELECT email, password, verified FROM users WHERE email = $1`,
            [email]
        );

        const isPassValid = await bcrypt.compare(password, result.rows[0]?.password || '');

        if (!isPassValid) { return res.status(400).json({ message: 'Invalid credentials.' }); }

        if (!result.rows[0]?.verified) { return res.status(400).json({ message: 'Please verify your email.' }); }
        
        const accessToken = generateAccess({ email: result.rows[0].email }, '20m');
        const refreshToken = jwt.sign(result.rows[0], process.env.REFRESH_TOKEN_SECRET);

        await pool.query(`INSERT INTO refresh_tokens (value) VALUES ($1)`, [refreshToken]);
        
        res.status(200).json({ message: 'User logged in.', accessToken, refreshToken });
    } catch (err) { console.log(err); res.status(400).json({ message: 'An error occured, please retry later.' }) }
});

app.post('/token', async (req, res) => {
    const refreshToken = req.body.refreshToken

    if (!refreshToken) return res.status(401).json({ message: 'Access denied.' })

    const result = await pool.query(`SELECT value FROM refresh_tokens WHERE value = $1`, [refreshToken])

    if (result.rows.length == 0) return res.status(403).json({ message: 'Invalid token.' })

    jwt.verify(result.rows[0].value, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token couldn't be verified." })

        const accessToken = generateAccess({ email: user.email }, '20m')

        res.status(200).json({ accessToken })
    })
})

app.get('/verify', (req, res) => {
    const { token, email } = req.query;

    if (!token || !email) { return res.status(400).json({ message: 'Invalid email/token.' }); }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) { console.log(err); return res.status(403).json({ message: 'Invalid token.' }) }

        await pool.query('UPDATE users SET verified = true WHERE email = $1', [email]);

        res.status(200).json({ message: 'Account verified.' })
    })
});

app.get('/forgot_pass', async (req, res) => {
    const { email } = req.body;

    if (!email) { return res.status(400).json({ message: 'Please provide an email.'})}

    
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const { image } = req.files;

    console.log(image);

    if (!username || !email || !password || !image) { return res.status(400).json({ message: 'Please enter all fields.' }); }

    try {
        const hash = await hashPassword(password);
        const user = await pool.query(
            'INSERT INTO users (profile_picture, email, username, password) VALUES ($1, $2, $3, $4)', 
            [image.data, email, username, hash]
        );

        const verifyToken = generateAccess({ user: email }, '15m')
        const url = `http://localhost:${process.env.AUTH_SERVER_PORT}/verify?token=${verifyToken}&email=${email}`

        mailer.sendMail({
            from: process.env.MAILER_EMAIL,
            to: email,
            subject: 'Welcome to the app!',
            text: `Hello ${username}! Welcome to the app. To verify your account, click the link below. For security reasons, this link is valid for 10sins \n ${url}`
        });

        res.status(200).json({ message: 'User registered.', user });
    } catch (err) { res.status(400).json({ message: 'An account already exists with this email.' }) };
});

function generateAccess (user, time) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: time })
}

async function hashPassword (pass) {
    const saltRounds = 10;
  
    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(pass, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hash
}