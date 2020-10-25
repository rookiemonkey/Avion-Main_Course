const isEmail = require('validator/lib/isEmail');
const toEmail = require("../utilities/toEmail");

const email = async (req, res) => {
    try {
        // destructure the request body
        const { name, email, details } = req.body;

        // check if the users inputs are valid
        if (!name) {
            throw new Error('Please provide a valid contact name')
        }

        if (!isEmail(email)) {
            throw new Error('Please provide a valid contact email');
        }

        // send an email to company email
        await toEmail(
            process.env.COMPANY_EMAIL,
            `Contact Request has been made`,
            `Mr/Mrs ${name} with email ${email} answered the contact form.
            
            Here is the details of his/her contact request:
            ${details}
            `
        )

        // send an email to the user
        await toEmail(
            email,
            `Successful Contact Request has been made`,
            `Thank you for your time in using the contact form to reach us. We will get back to you as soon as we are able to do something regarding your concern. Have a good day!
            `
        )

        return res
            .status(200)
            .json({ message: 'success' })
    }

    catch (error) {
        return res
            .status(404)
            .json({ message: error.message })
    }
}

module.exports = email;