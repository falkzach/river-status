var createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

var indexRouter = require('./routes/index');
var riverStatusRouter = require('./routes/riverStatus');
var riverLogRouter = require('./routes/riverLog');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', indexRouter);
app.use('/api/rivers', riverStatusRouter)
app.use('/api/log', riverLogRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
