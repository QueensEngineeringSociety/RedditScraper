const express = require('express');
const app = express();
const reddit = require('./reddit/reddit.js');
const port = process.env.PORT || 8080;

app.listen(port);
console.log('Listening on localhost/' + port);
reddit.auth();