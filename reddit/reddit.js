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
                getNewPosts(body).then(function (newPostInfo) {
                    return res(newPostInfo);
                }).catch(function (err) {
                    return rej(err);
                });
            } else {
                return rej(error);
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
            let newPostTitles = [];
            for (let i = 0; i < posts.length; ++i) {
                let permalink = ((posts[i])['data'])['permalink'];
                let title = ((posts[i])['data'])['title'];
                let text = ((posts[i])['data'])['selftext'];
                if (isFirstYearEngPost(title, text)) {
                    if (oldLinksArray.indexOf(permalink) > -1) {
                        //permalink in array - in file, so have already scraped this post. Therefore,
                        //any later posts are in file and have been scraped, so stop here
                        break;
                    } else {
                        newPostPermalinks.push(permalink);
                        newPostTitles.push(title);
                    }
                }
            }
            let result = [newPostPermalinks, newPostTitles];
            return res(result);
        }).catch(function (err) {
            return rej(err);
        });
    });
}

//TODO make this smarter
function isFirstYearEngPost(postTitle, postText) {
    postText = postText.toLowerCase();
    postTitle = postTitle.toLowerCase();
    return postTitle.includes("first year") || postTitle.includes('eng"') || postText.includes("first year") || postText.includes("eng");
}