const fs = require('fs');

let file = "lastPost.txt";

exports.read = function () {
    return new Promise(function (res, rej) {
        fs.readFile(file, "utf8", function (err, data) {
            if (!err) {
                return res(data);
            } else {
                return rej(err);
            }
        });
    });
};

exports.logPosts = function (newLinks) {
    return new Promise(function (res, rej) {
        exports.read().then(function (currentLinks) {
            //get last 5 links between new and old links
            let currentLinksArray = currentLinks.split('\n');
            newLinks.concat(currentLinksArray);
            if (newLinks.length > 5) {
                newLinks.splice(5, newLinks.length - 1);
            }
            write(newLinks);
        });
    });
};

function write(content) {
    let postPermalinks = "";
    for (let i = 0; i < content.length; ++i) {
        postPermalinks += content[i];
        postPermalinks += '\n';
    }
    writePostPermalink(postPermalinks);
}

function writePostPermalink(content) {
    fs.writeFile(file, content, function (err) {
        if (err) {
            console.log(err);
        }
    });
}