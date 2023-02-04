// with mail gun

const API_KEY = 'b2dbe7c5bb3560902abe962ac394d850-c9746cf8-bf8804d8';
// const DOMAIN = 'YOUR_DOMAIN_NAME';

const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: API_KEY });

module.exports.sendMailWithMailgun = async(data) => {
    const result = await client.messages.create(
        "sandboxe306fdd4dd4247a1854ec155d09ab02c.mailgun.org", {
            from: 'Excited User <me@samples.mailgun.org>',
            to: data.to,
            subject: data.subject,
            text: data.text,
        }
    )
    return result.id;
}


// client.messages.create(messageData)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.error(err);
//     });