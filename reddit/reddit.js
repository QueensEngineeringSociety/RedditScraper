const RedditApi = require('reddit-oauth');
const PropertiesReader = require('properties-reader');

const properties = PropertiesReader("./reddit/reddit_secrets.ini");
const reddit = new RedditApi({
    app_id: properties.get('bot_id'),
    app_secret: properties.get('bot_secret'),
    redirect_uri: properties.get('redirect_uri')
});

exports.auth = function () {
    reddit.passAuth(
        properties.get('username'),
        properties.get('password'),
        function (success) {
            if (success) {
                console.log(reddit.access_token);
            }
        }
    );
};