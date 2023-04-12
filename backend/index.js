// mysql connection

const mysql = require("mysql2");

const bodyParser = require('body-parser');

const express = require("express");

const session = require('express-session');

const port = 3000;

const app = express();

const connection = mysql.createConnection({
    host: 'dbcluster.internal.ryois.me',
    user: 'memleek_svc',
    password: '6.l()j_1RHKfk6[V',
    database: 'memleek'
});

const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
// CORS middleware
const cors = require('cors');

app.use(cors(
    {
        origin: '*',
        credentials: true
    }
));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passport.use(new LocalStrategy(function verify(username, password, cb) {

    connection.query('SELECT * FROM users WHERE username = ?', [username], function (err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
        console.log(user[0])

        crypto.pbkdf2(password, user[0].salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) { return cb(err); }
            if (!crypto(user[0].password, hashedPassword)) {
                console.log("Incorrect username or password.")
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            console.log("Logged in.")
            return cb(null, user[0]);
        });

    });
}));

// Passport.js serialize and deserialize user
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    db.get('SELECT * FROM users WHERE id = ?', [id], function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

// Passport.js signup with local strategy
app.post('/api/signup', function (req, res, next) {
    console.log("Signing up...");
    console.log(req.body);
    crypto.randomBytes(32, function (err, salt) {
        if (err) { return next(err); }
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) { return next(err); }

            const id = uuidv4();

            connection.query(
                'INSERT INTO `users` (`id`, `username`, `password`, `salt`) VALUES (?, ?, ?, ?)',
                [id, req.body.username, hashedPassword, salt],
                function (err, results) {
                    if (err) { return next(err); }
                    res.json({ status: true, id: id, username: req.body.username });
                }
            );
        });
    });
});



// Express session

app.use(session({
    secret: 'lol',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());


// API Endpoints

// API Endpoint to upload game state
app.post("/api/game_state", (req, res) => {
    console.log(req.body);
    res.send("TODO: Save game state");
});

// API Endpoint to get game state
app.get("/api/game_state", (req, res) => {
    connection.query(
        'SELECT state FROM `game_states` WHERE `user_id` = ?',
        [1],
        function (err, results) {
            console.log(results);
            res.json(results[0].state);
        }
    );
});

// API Login Endpoint with Passport.js
app.post("/api/login", passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
    res.json({ status: true, id: req.user.id, username: req.user.username });
});

// API Logout Endpoint with Passport.js
app.get("/api/logout", function (req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});