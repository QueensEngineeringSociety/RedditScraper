const express = require('express');
const app = express();
const reddit = require('./reddit/reddit.js');
const port = process.env.PORT || 8080;
const logger = require('./reddit/postLog.js');

app.listen(port);
console.log('Listening on localhost/' + port);

let interval = 20 * 1000;//12 * 60 * 60 * 1000; //12 hours
setInterval(function () {
    console.log("start");
    reddit.findNewPosts().then(function (posts) {
        //email
        //write to file newly sent posts
        logger.logPosts(posts).then(function () {
            console.log("at end");
        });
    }).catch(function (err) {
        console.log("ERR: " + err);
    });
}, interval);