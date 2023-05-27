const express = require('express');

const noteRouter = require('./note');

const app = express();

app.use('/notes', noteRouter);

module.exports = app;