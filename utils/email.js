const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports.sendAdminAlert = async (subject, message) => {
    await transporter.sendMail({
        from: `"EnggNotesClub Alert" <${process.env.EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: subject,
        html: message
    });
};