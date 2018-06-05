const nodemailer = require("nodemailer");
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader("secrets.ini");

//TODO send from outlook

let transport = nodemailer.createTransport({
    host: properties.get("email_host"), //'outlook.office.com',
    secure: true, // use SSL
    auth: {
        user: properties.get("email_user"),
        pass: properties.get("email_password")
    }
});

let mailOptions = {
    from: properties.get('email_user'),
    to: "president@engsoc.queensu.ca",
    subject: "Queen's First Year Engineering Questions",
    text: "Here are links to new posts that relate to first year engineering:\n\n"
};

exports.sendMail = function (content) {
    return new Promise(function (res, rej) {
        mailOptions.text += content;
        transport.sendMail(mailOptions, function (err) {
            if (err) {
                return rej(err);
            } else {
                return res();
            }
        })
    });
};