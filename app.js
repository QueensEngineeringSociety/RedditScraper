const express = require('express');
const app = express();
const reddit = require('./reddit/reddit.js');
const port = process.env.PORT || 8080;
const logger = require('./reddit/postLog.js');
const mail = require("./email.js");

app.listen(port);
console.log('Listening on localhost/' + port);

let interval = 12 * 60 * 60 * 1000; //12 hours
setInterval(function () {
    reddit.findNewPosts().then(function (newPostInfo) {
        if (newPostInfo[0].length > 0) {
            let emailContent = createEmailContent(newPostInfo[0], newPostInfo[1]);
            mail.sendMail(emailContent).then(function () {
                logger.logPosts(newPostInfo[0]).then(function () {
                }).catch(function () {
                    console.log("ERROR WRITING POSTS TO FILE");
                });
            }).catch(function (err) {
                console.log("ERROR SENDING EMAIL: " + err);
            });
        }
    }).catch(function (err) {
        console.log("ERR: " + err);
    });
}, interval);

function createEmailContent(partialLinks, titles) {
    let content = "";
    for (let i = 0; i < partialLinks.length; ++i) {
        content += titles[i] + '\n';
        content += "https://reddit.com" + partialLinks[i] + "\n\n";
    }
    return content;
}