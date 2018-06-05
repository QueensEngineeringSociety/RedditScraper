const express = require('express');
const app = express();
const reddit = require('./reddit/reddit.js');
const port = process.env.PORT || 8080;
const logger = require('./reddit/postLog.js');
const mail = require("./email.js");

app.listen(port);
console.log('Listening on localhost/' + port);

let interval = 20 * 1000;//12 * 60 * 60 * 1000; //12 hours
//setInterval(function () {
// console.log("start");
reddit.findNewPosts().then(function (posts) {
    if (posts.length > 0) {
        let links = createFullLinksString(posts);
        mail.sendMail(links).then(function () {
            logger.logPosts(posts).then(function () {
                console.log("posts emailed and logged");
            }).catch(function () {
                console.log("ERROR WRITING POSTS TO FILE");
            });
        }).catch(function (err) {
            console.log("ERROR SENDING EMAIL: " + err);
        });
    } else {
        console.log("No new posts");
    }
}).catch(function (err) {
    console.log("ERR: " + err);
});

//}, interval);

function createFullLinksString(partialLinks) {
    let links = "";
    for (let i = 0; i < partialLinks.length; ++i) {
        links += "https://reddit.com" + partialLinks[i] + '\n';
    }
    return links;
}