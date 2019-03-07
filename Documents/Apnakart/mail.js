const nodemailer = require('nodemailer'),
    config = require('./config'),
    ejs=require('ejs'),
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.creds.user,
            pass: config.creds.pass,
        },
    });

    function mailing(templatename,details){ 
    ejs.renderFile(__dirname + templatename, {  details  }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var mainOptions = {
                from: "ss20200707@gmail.com",
                to: details.email,
                subject: "Notification from ApnaKart",
                html: data
            };
            // console.log(data);
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log("mail error", err);
                    // resolve(false);
                } else {
                    console.log("success");
                    // resolve(info.response);
                }
            });
        }
    });
    }

    module.exports.mailing=mailing;