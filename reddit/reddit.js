const request = require("request");
const logger = require("./postLog.js");

const url = "https://www.reddit.com/r/queensuniversity/new.json?sort=new";
exports.findNewPosts = function () {
    return new Promise(function (res, rej) {
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                getNewPosts(body).then(function (newPosts) {
                    return res(newPosts);
                }).catch(function (err) {
                    return rej(err);
                });
            }
        })
    });
};

function getNewPosts(body) {
    return new Promise(function (res, rej) {
        logger.read().then(function (postPermalinks) {
            let oldLinksArray = postPermalinks.split('\n');
            let postData = body['data'];
            let posts = postData['children'];
            let newPostPermalinks = [];
            for (let i = 0; i < posts.length; ++i) {
                let permalink = ((posts[i])['data'])['permalink'];
                if (oldLinksArray.indexOf(permalink) > -1) {
                    //permalink in array - in file, so have already scraped this post. Therefore,
                    //any later posts are in file and have been scraped, so stop here
                    break;
                } else {
                    newPostPermalinks.push(permalink);
                }
            }
            return res(newPostPermalinks);
        }).catch(function (err) {
            console.log("ERROR READING PREVIOUS POSTS: " + err);
            return rej(err);
        });
    });
}