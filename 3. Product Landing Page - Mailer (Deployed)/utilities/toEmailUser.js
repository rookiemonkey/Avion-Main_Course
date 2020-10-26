const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const handlebars = require('handlebars');
const parseHtml = require('./parseHtml');

const toEmailUser = async (recipient, subject, name) => {

    // instantiate a smtp transport object
    const smtpTransport = nodemailer.createTransport({
        service: process.env.CLIENT,
        auth: {
            user: process.env.CLIENT_UN,
            pass: process.env.CLIENT_PW
        }
    });

    parseHtml(__dirname + '/../templates/main.handlebars', async function (err, html) {

        // compile the html texts from the parsed template
        const template = handlebars.compile(html);

        // define the variables that will become available inside the html file
        const variables = {
            name
        };

        // pass in the variables to the HTML Email template, returns html with dynamic contents
        const htmlToSend = template(variables);

        // define mailing options in sending the email, attach the html file
        const mailOptions = {
            subject: subject,
            to: recipient,
            from: 'product.landing.page@gmail.com',
            html: htmlToSend
        }

        // use the sendMail method to send the email
        await smtpTransport.sendMail(mailOptions);
    });

}

module.exports = toEmailUser;