const nodemailer = require('nodemailer');

const toEmail = async (recipient, subject, emailBody) => {

    const smtpTransport = nodemailer.createTransport({
        service: process.env.CLIENT,
        auth: {
            user: process.env.CLIENT_UN,
            pass: process.env.CLIENT_PW
        }
    });

    const mailOptions = {
        subject: subject,
        to: recipient,
        from: 'product.landing.page@gmail.com',
        text: emailBody
    }

    await smtpTransport.sendMail(mailOptions);

}

module.exports = toEmail;