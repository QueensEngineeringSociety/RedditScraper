const fs = require('fs');

let file = "errorLog.txt";

exports.log = function (content) {
    return new Promise(function (res, rej) {
        let currentdate = new Date();
        let datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        fs.writeFile(file, datetime + ": " + content, function (err) {
                if (err) {
                    return rej(err);
                }
                return res();
            }
        )
        ;
    });
};