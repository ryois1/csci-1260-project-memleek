// mysql connection

const mysql = require("mysql2");
const bodyParser = require('body-parser');
const express = require("express");
const port = 3069;
const app = express();
const cookieParser = require('cookie-parser');
const connection = mysql.createConnection({
    host: 'dbcluster.internal.ryois.me',
    user: 'memleek_svc',
    password: '6.l()j_1RHKfk6[V',
    database: 'memleek'
});
const http = require('http');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

// CORS based on request origin

app.use(cors({
    origin: function (origin, callback) {
        if (origin == null) {
            callback(null, true);
        }
        else if (origin.includes("localhost")) {
            callback(null, true);
        }
        else if (origin.includes("ryois.me")) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

// API Endpoints
app.post("/api/key", (req, res) => {
    const key = uuidv4();
    connection.query(
        'INSERT INTO `users` (`id`) VALUES (?)',
        [key],
        function (err, results) {
            res.json({ key: key });
        }
    );
});

app.post("/api/client", (req, res) => {
    const client_id = uuidv4();
    connection.query(
        'INSERT INTO `clients` (`id`) VALUES (?)',
        [client_id],
        function (err, results) {
            res.json({ client_id: client_id });
        }
    );
});

// API Endpoint to upload game state
app.post("/api/game_state/:key", (req, res) => {
    if (req.body.state == null) {
        return res.json({ status: false, error: "No state provided" });
    }
    if (req.params.key == null) {
        return res.json({ status: false, error: "No key provided" });
    }
    if (req.params.key == "undefined") {
        return res.json({ status: false, error: "No key provided" });
    }

    // Check if client is locked to this save state
    connection.query(
        'SELECT `client_id` FROM `game_state_locks` WHERE `user_id` = ?',
        [req.body.client_id],
        function (err, results) {
            if (err) {
                console.log(err);
            }
            if (results.length == 0) {
                connection.query(
                    'INSERT INTO `game_states` (`user_id`, `state`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `state` = ?',
                    [req.params.key, req.body.state, req.body.state],
                    function (err) {
                        if (err) {
                            return res.json({ status: false, error: err });
                        }
                        res.json({ status: true });
                    }
                );
            }
        }
    );
});

// API Endpoint to get game state
app.get("/api/game_state/:key", (req, res) => {
    if (req.params.key == null) {
        return res.json({ status: false, error: "No key provided" });
    }
    if (req.params.key == "undefined") {
        return res.json({ status: false, error: "No key provided" });
    }
    connection.query(
        'SELECT `state` FROM `game_states` WHERE `user_id` = ?',
        [req.params.key],
        function (err, results) {
            if (err) {
                return res.json({ status: false, error: err });
            }
            if (results.length == 0) {
                return res.json({ status: false, error: "No game state found" });
            }
            res.json({ status: true, state: results[0].state });
        }
    );
});

app.post("/api/game_state/:key/lock/:client", (req, res) => {
    if (req.params.key == null) {
        return res.json({ status: false, error: "No key provided" });
    }
    if (req.params.key == "undefined") {
        return res.json({ status: false, error: "No key provided" });
    }
    if (req.params.client == null) {
        return res.json({ status: false, error: "No client provided" });
    }
    if (req.params.client == "undefined") {
        return res.json({ status: false, error: "No client provided" });
    }
    connection.query(
        'SELECT `client_id` FROM `game_state_locks` WHERE `user_id` = ?',
        [req.params.key],
        function (err, results) {
            if (results.length == 0) {
                connection.query(
                    'INSERT INTO `game_state_locks` (`user_id`, `client_id`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `client_id` = ?',
                    [req.params.key, req.params.client, req.params.client],
                    function (err, results) {
                        if (err) {
                            return res.json({ status: false, error: err });
                        }
                        return res.json({ error: false, status: true, client: req.params.client });
                    }
                );
            } else {
                if (results[0].client_id == req.params.client) {
                    return res.json({ error: false, status: true, client: req.params.client });
                }
                res.json({ status: true, client: results[0].client_id });
            }
        }
    );


});

app.get("/api/game_state/:key/lock", (req, res) => {
    if (req.params.key == null) {
        return res.json({ status: false, error: "No key provided" });
    }
    if (req.params.key == "undefined") {
        return res.json({ status: false, error: "No key provided" });
    }
    connection.query(
        'SELECT `client_id` FROM `game_state_locks` WHERE `user_id` = ?',
        [req.params.key],
        function (err, results) {
            if (results.length == 0) {
                return res.json({ status: false });
            }
            if (results[0].client_id == req.query.client_id) {
                return res.json({ status: true, client: results[0].client_id, self: true });
            }
            res.json({ status: true, client: results[0].client_id });
        }
    );
});

app.delete("/api/game_state/:key/lock/:client", (req, res) => {
    if (req.params.key == null) {
        return res.json({ status: false, error: "No key provided" });
    }
    if (req.params.key == "undefined") {
        return res.json({ status: false, error: "No key provided" });
    }
    if (req.params.client == null) {
        return res.json({ status: false, error: "No client provided" });
    }
    if (req.params.client == "undefined") {
        return res.json({ status: false, error: "No client provided" });
    }
    connection.query(
        'DELETE FROM `game_state_locks` WHERE `user_id` = ? AND `client_id` = ?',
        [req.params.key, req.params.client],
        function (err, results) {
            if (err) {
                return res.json({ status: false, error: err });
            }
            res.json({ status: true });
        }
    );
});


wss.on('connection', (ws) => {
    ws.onopen = function () {
        console.log('connected');
        ws.send("Need auth");
    };

    ws.on('message', (message) => {
        message = JSON.parse(message);
        switch (message.type) {
            case "auth":
                if (message.payload.saveKey == null) {
                    ws.send(JSON.stringify({type: "error", message: "No key provided"}));
                    return;
                }
                if (message.payload.saveKey == "undefined") {
                    ws.send(JSON.stringify({type: "error", message: "No key provided"}));
                    return;
                }
                if(message.payload.clientID == null) {
                    ws.send(JSON.stringify({type: "error", message: "No client provided"}));
                    return;
                }
                if(message.payload.clientID == "undefined") {
                    ws.send(JSON.stringify({type: "error", message: "No client provided"}));
                    return;
                }
                connection.query(
                    'SELECT `client_id` FROM `game_state_locks` WHERE `user_id` = ?',
                    [message.key],
                    function (err, results) {
                        if (results.length == 0) {
                            ws.send(JSON.stringify({type: "locking", message: "No lock found"}));
                            return;
                        }
                        if (results[0].client_id == message.client) {
                            ws.send(JSON.stringify({type: "locking", message: "Lock found"}));
                            return;
                        }
                        ws.send(JSON.stringify({type: "locking", message: "Lock found"}));
                    }
                );
                break;
            case "heartbeat":
                if(message.payload.clientID == null) {
                    ws.send(JSON.stringify({type: "error", message: "No client provided"}));
                    return;
                }
                if(message.payload.clientID == "undefined") {
                    ws.send(JSON.stringify({type: "error", message: "No client provided"}));
                    return;
                }
                if (message.payload.key == null) {
                    ws.send(JSON.stringify({type: "error", message: "No key provided"}));
                    return;
                }
                if (message.payload.key == "undefined") {
                    ws.send(JSON.stringify({type: "error", message: "No key provided"}));
                    return;
                }
                connection.query(
                    'SELECT `client_id` FROM `game_state_locks` WHERE `user_id` = ? AND `client_id` = ?',
                    [message.payload.key, message.payload.clientID],
                    function (err, results) {
                        if (results.length == 0) {
                            ws.send(JSON.stringify({type: "locking", message: "No lock found"}));
                            return;
                        }
                        if (results[0].client_id == message.payload.clientID) {
                            // Update heartbeat time for this client and key pair in database
                            connection.query(
                                'UPDATE `game_state_locks` SET `last_ping` = CURRENT_TIMESTAMP WHERE `user_id` = ? AND `client_id` = ?',
                                [message.payload.key, message.payload.clientID],
                                function (err, results2) {
                                    if (err) {
                                        ws.send(JSON.stringify({type: "error", message: err}));
                                        return;
                                    }
                                    ws.send(JSON.stringify({type: "heartbeat", message: {status: "ACK"}}));
                                }
                            );

                            connection.commit();
                        } else {
                            ws.send(JSON.stringify({type: "locking", message: "Lock found"}));
                        }
                    }
                );
        }
    });


    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (err) => {
        console.log(err);
    });

    ws.on('ping', () => {
        ws.send('pong')
        console.log('pong');
    });

    // Heartbeat
    setInterval(() => {
        ws.send(JSON.stringify({type: "heartbeat", message: {time: Date.now(), status: "SYN"}}));
    }, 500);



});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});