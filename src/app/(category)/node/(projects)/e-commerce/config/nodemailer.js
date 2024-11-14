require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmail = async (email, subject, body) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: body,
    };
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail
