const isEmail = require('validator/lib/isEmail');
const toEmailUser = require('../utilities/toEmailUser');
const toEmailOwner = require("../utilities/toEmailOwner");

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

        // send an plaint text email to company email. in prod. a paid STMP service
        // will be able to track all of the emails, no need of sending to its self
        await toEmailOwner(
            process.env.COMPANY_EMAIL,
            `Contact Request has been made`,
            `Mr/Mrs ${name} with email ${email} answered the contact form.

            Here is the details of his/her contact request:
            ${details}
            `
        )

        // send an email to the user
        await toEmailUser(
            email,
            `Hoster: Successful Contact Request!`,
            name
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