var createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');
const passport = require('passport');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const cors = require('cors');
const socketio = require('socket.io')
// const authRouter = require('./lib/auth.router')
// const passportInit = require('./lib/passport.init')

const port = process.env.PORT || 5000;
const app = express();
app.set('trust proxy', 1)

// const certOptions = {
//     key: fs.readFileSync(path.resolve('certs/server.key')),
//     cert: fs.readFileSync(path.resolve('certs/server.crt'))
// };

var authenticationRouter = require('./routes/authenticate');
var indexRouter = require('./routes/index');
var riverStatusRouter = require('./routes/riverStatus');
var riverLogRouter = require('./routes/riverLog');

app.use(session({
    // store: new FileStore(),
    secret: process.env.SESSION_SECRET || 'secretsession',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
// passportInit();
// TODO: client origin {origin: client_origin}
app.use(cors());

app.use('/authenticate', authenticationRouter);
app.use('/api', indexRouter);
app.use('/api/rivers', riverStatusRouter);
app.use('/api/log', riverLogRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));

// const server = https.createServer(certOptions, app);
// server.listen(port, () => console.log(`Listening on port ${port}`));
