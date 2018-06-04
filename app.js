const express = require('express');
const app = express();
const reddit = require('./reddit/reddit.js');
const port = process.env.PORT || 8080;
const logger = require('./reddit/postLog.js');

app.listen(port);
console.log('Listening on localhost/' + port);
reddit.findNewPosts().then(function (posts) {
    //email
    //write to file newly sent posts
    logger.logPosts(posts);
}).catch(function (err) {
    console.log("ERR: " + err);
});